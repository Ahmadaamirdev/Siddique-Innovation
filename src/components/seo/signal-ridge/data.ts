import type { SignalRidgeDataset } from './types';

/**
 * SIGNAL RIDGE DATA CONFIGURATION
 * 12-month organic search performance trajectory (Google Search Console data)
 */
export const SIGNAL_RIDGE_DATA: SignalRidgeDataset = {
  months: [
    { month: 'Jul', clicks: 1.2, impressions: 8 },
    { month: 'Aug', clicks: 1.8, impressions: 14 },
    { month: 'Sep', clicks: 2.5, impressions: 22 },
    { month: 'Oct', clicks: 3.4, impressions: 32 },
    { month: 'Nov', clicks: 4.5, impressions: 46 },
    { month: 'Dec', clicks: 5.7, impressions: 63 },
    { month: 'Jan', clicks: 7.0, impressions: 82 },
    { month: 'Feb', clicks: 8.5, impressions: 104 },
    { month: 'Mar', clicks: 10.1, impressions: 128 },
    { month: 'Apr', clicks: 11.8, impressions: 153 },
    { month: 'May', clicks: 13.6, impressions: 179 },
    { month: 'Jun', clicks: 15.4, impressions: 206 },
  ],
  summary: {
    clicksTotal: 15.4,
    clicksGrowthPercent: 48,
    impressionsTotal: 206,
    impressionsGrowthPercent: 64,
    avgPosition: 1,
    brandName: 'Siddiqui Innovations',
    rankBadge: 'Page one',
    keywordsOnPageOne: 92,
    keywordsGrowth: 38,
  },
};
