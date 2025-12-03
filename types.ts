import React from 'react';

export enum RuleTab {
  BASIC = 'basic',
  SOURCE = 'source',
  DEVICE = 'device',
  STATS = 'stats',
  GEO = 'geo',
  NETWORK = 'network',
  CRAWLER = 'crawler'
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  color?: string;
  icon?: React.ReactNode;
}

export interface Rule {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  note: string;
  creator: string;
  createdAt: string;
}

export interface VisitLog {
  id: string;
  time: string;
  ip: string;
  location: string;
  shortLink: string;
  result: 'allow' | 'block';
  device: string;
  system: string;
  browser: string;
  visitUrl: string;
  jumpUrl: string;
}

export interface IPListItem {
  id: string;
  ip: string;
  listType: 'blacklist' | 'whitelist';
  ipType: 'IPv4' | 'IPv6';
  status: boolean;
  note: string;
  createdAt: string;
}

export interface DistributionItem {
  name: string;
  value: number;
  color: string;
}