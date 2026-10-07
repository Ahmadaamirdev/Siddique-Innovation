export interface MonthMetric {
  month: string;
  clicks: number; // in thousands (e.g. 3.1k = 3.1)
  impressions: number; // in thousands (e.g. 20k = 20)
}

export interface SeoPerformanceSummary {
  clicksTotal: number;
  clicksGrowthPercent: number;
  impressionsTotal: number;
  impressionsGrowthPercent: number;
  avgPosition: number;
  brandName: string;
  rankBadge: string;
  keywordsOnPageOne: number;
  keywordsGrowth: number;
}

export interface SignalRidgeDataset {
  months: MonthMetric[];
  summary: SeoPerformanceSummary;
}

export interface HoveredColumnInfo {
  index: number;
  month: string;
  clicks: number;
  impressions: number;
  screenX: number;
  screenY: number;
}
