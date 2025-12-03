
# 神盾短链 (Cloak) 系统 - 开发规格说明书

## 1. 系统概览
**项目名称：** 神盾短链 (Shendun Cloak)
**核心功能：** 一套流量分发与过滤系统（俗称 Cloak/斗篷）。主要用于区分“真实用户”与“爬虫/审核/代理/黑名单IP”。系统将符合规则的有效流量引导至“变现页 (Money Page)”，将无效或风险流量引导至“安全页 (Safe Page)”。

## 2. 功能模块分析

### 2.1 我的面板 (Dashboard)
*   **概览数据：** 会员到期时间、网站数量、短链接收数量、多国实时时钟（北京、东京、纽约、洛杉矶、柏林）。
*   **可视化图表：**
    *   **流量趋势图：** 展示总访问量、正常用户、爬虫、拦截数的线性趋势。
    *   **会员状态卡片：** 显示等级（试用版/正式版）、每日 API 额度（如 1/200）、剩余天数及续费入口。
    *   **分布统计：** 系统类型分布（Windows/iOS等）、设备类型分布、拦截通过率统计。

### 2.2 规则管理 (Rule Management) - *核心引擎*
允许用户创建复杂的流量过滤逻辑集合。
*   **规则结构 (多标签页)：**
    1.  **基础信息：** 规则名称、状态（启用/禁用）、备注。
    2.  **来源 (Source)：** 来源地址 (Referrer) 过滤、跳转应用检测。
    3.  **设备 (Device)：**
        *   系统类型：iOS, Android, Windows, Mac, Linux。
        *   设备类型：Mobile, PC, Tablet。
        *   设备品牌：Apple, Samsung, Huawei 等。
        *   指定设备名称过滤。
    4.  **统计 (Stats)：** 频次控制（例如：限制同 IP 每日访问次数）。
    5.  **地理位置 (Geo)：** 国家/地区、语言的白名单/黑名单模式。
    6.  **网络 (Network) - *会员高级功能*：**
        *   VPN 检测与拦截。
        *   Tor (洋葱路由) 网络检测。
        *   代理 (Proxy) IP 检测。
    7.  **爬虫 (Crawler)：** 识别并拦截已知机器人（Facebook, Google, Meta, Telegram 等）。

### 2.3 网站/短链管理 (Website Management)
*   **功能：** 生成短链接（`唯一编码`）。
*   **逻辑：** 将`规则`绑定到`推广链接`。
*   **核心字段：** 短链域名、安全跳转页 (Safe Page)、目标推广页 (Money Page)、绑定规则 ID。

### 2.4 访客记录 (Visitor Logs)
*   **实时日志：** 记录每一次点击请求。
*   **数据维度：**
    *   基础：时间、IP地址、归属地 (国家/城市)、ISP。
    *   结果：检测结果 (允许/拒绝)、是否爬虫、是否原生IP。
    *   指纹：设备名称、系统版本、浏览器内核、屏幕分辨率。
    *   链路：访问 URL、实际跳转 URL。
*   **筛选能力：** 支持按 IP、短链编码、检测结果、是否爬虫、日期范围进行检索。

### 2.5 IP 黑白名单 (IP Management)
*   **功能：** 全局或特定链接的 IP 访问控制。
*   **操作：** 批量添加 IP、设置备注、一键拉黑访客。

## 3. 数据库设计建议 (Database Schema)

### 表：`users` (用户表)
*   `id`: UUID
*   `username`: String
*   `plan_level`: Enum (Free, VIP, Enterprise) - 对应前端的“会员等级”
*   `expiry_date`: Timestamp - 会员到期日
*   `api_quota_daily`: Integer - 每日额度

### 表：`rules` (规则表)
*   `id`: UUID
*   `user_id`: UUID
*   `name`: String
*   `config_json`: JSONB (存储所有 Tab 的过滤配置)
    *   *示例:* `{ "network": { "block_vpn": true, "block_tor": true }, "device": { "allowed_os": ["iOS", "Android"] } }`
*   `status`: Boolean (1: 启用, 0: 禁用)

### 表：`links` (短链表)
*   `id`: UUID
*   `user_id`: UUID
*   `short_code`: String (索引, 唯一)
*   `money_url`: String (A面/推广页)
*   `safe_url`: String (B面/安全页)
*   `rule_id`: UUID (外键)

### 表：`visit_logs` (日志表 - 高并发核心表)
*   *建议使用 ClickHouse 或 PostgreSQL 分区表*
*   `id`: UUID
*   `link_id`: UUID
*   `ip_address`: Inet
*   `country_code`: String(2)
*   `is_crawler`: Boolean
*   `is_vpn`: Boolean
*   `decision`: Enum (ALLOW, BLOCK)
*   `user_agent`: Text
*   `device_info`: JSONB (解析后的设备指纹)
*   `created_at`: Timestamp

## 4. API 架构逻辑

*   **核心接口：POST /api/check (检测接口)**
    *   **输入：** `short_code` (短链码), `http_headers` (UA, Referer 等), `ip_address`。
    *   **处理流程：**
        1.  **缓存层 (Redis)：** 读取 `Link` 信息和绑定的 `Rule` 配置。
        2.  **过滤链 (Filter Chain)：**
            *   IP 黑白名单检查 (最快)。
            *   User-Agent 爬虫特征库匹配。
            *   GeoIP 地理位置校验。
            *   IP 风险库查询 (VPN/Proxy/Tor 数据库)。
            *   设备指纹校验。
        3.  **决策：** 返回 `ALLOW` 或 `BLOCK`。
        4.  **异步日志：** 将访问详情写入消息队列 (Kafka/RabbitMQ)，异步入库 `visit_logs`，避免阻塞跳转。
    *   **输出：** JSON `{ action: "REDIRECT", target_url: "..." }`。

## 5. 技术栈推荐
*   **前端：** React, TypeScript, Tailwind CSS (已在原型中使用)。
*   **后端：** Golang 或 Node.js (NestJS) - 需处理高并发 I/O。
*   **数据库：** PostgreSQL (业务数据), ClickHouse (日志分析), Redis (规则缓存)。
*   **IP 库：** MaxMind GeoIP2, IP2Location 或其他商业 IP 风险库。
