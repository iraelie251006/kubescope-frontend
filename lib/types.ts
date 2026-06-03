export type ClusterOverview = {
  totalNodes: number;
  totalPods: number;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  estimatedMonthlyCostUsd: number;
};

export type NodeRow = {
  name: string;
  instanceType: string | null;
  region: string | null;
  cpuCapacityMillicores: number | null;
  cpuUsageMillicores: number | null;
  memoryCapacityBytes: number | null;
  memoryUsageBytes: number | null;
  hourlyCostUsd: number | null;
  monthlyCostUsd: number | null;
};

export type NamespaceRow = {
  namespace: string;
  podCount: number;
  cpuUsageMillicores: number | null;
  memoryUsageBytes: number | null;
  estimatedMonthlyCostUsd: number | null;
};

export type HistoryPoint = {
  timestamp: string;
  totalHourlyCostUsd: number;
  totalMonthlyCostUsd: number;
  totalCpuUsageMillicores: number;
  totalMemoryUsageBytes: number;
  totalCpuCapacityMillicores: number;
  totalMemoryCapacityBytes: number;
};

export type HistoryRange = '24h' | '7d' | '30d';

export type DeploymentRow = {
  name: string;
  namespace: string;
  replicas: number;
  cpuRequestMillicores: number | null;
  memoryRequestBytes: number | null;
  estimatedMonthlyCostUsd: number | null;
};

export type MetricType = 'MONTHLY_COST' | 'CPU_USAGE_PERCENT' | 'MEMORY_USAGE_PERCENT';
export type AlertCondition = 'GREATER_THAN';

export type AlertRuleRow = {
  id: string;
  metricType: MetricType;
  condition: AlertCondition;
  thresholdValue: number;
  notificationEmail: string;
  lastFiredAt: string | null;
  createdAt: string;
};
