import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Target,
  Search,
  Globe2,
  Video,
  Play,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { allProjects } from '../components/projectsData';

export interface ServiceProjectItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  renderPreview: () => React.ReactNode;
}

export interface ServiceTestimonialCard {
  id: number;
  author: string;
  role: string;
  company: string;
  tag: string;
  video: string;
}

// ==========================================
// 1. WEB DEVELOPMENT PROJECTS & TESTIMONIALS
// ==========================================
export const webDevelopmentProjects: ServiceProjectItem[] = allProjects.filter(
  (p) => p.category === 'web'
);

export const webDevelopmentTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'Elena Rostova',
    role: 'Head of Growth',
    company: 'Nexora Digital',
    tag: 'Web Platform & UX',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 2,
    author: 'Tariq Nawaz',
    role: 'Executive Director',
    company: 'Nawaz Group',
    tag: 'Corporate Enterprise Portal',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 3,
    author: 'Julian Vance',
    role: 'Chief Product Officer',
    company: 'Omnia Living',
    tag: 'WooCommerce & Speed',
    video: '/videos/testimonial-3.mp4',
  },
];

// ==========================================
// 2. AI AUTOMATION PROJECTS & TESTIMONIALS
// ==========================================
export const aiAutomationProjects: ServiceProjectItem[] = allProjects.filter(
  (p) => p.category === 'ai'
);

export const aiAutomationTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'ApexScale Logistics',
    tag: 'AI Workflow Automation',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 2,
    author: 'Sarah Jenkins',
    role: 'COO',
    company: 'CloudScale AI',
    tag: 'Autonomous Support Agents',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 3,
    author: 'Michael Torres',
    role: 'VP of Technology',
    company: 'NextWave Systems',
    tag: 'HR & ATS Automation',
    video: '/videos/testimonial-3.mp4',
  },
];

// ==========================================
// 3. DIGITAL MARKETING PROJECTS & TESTIMONIALS
// ==========================================
export const digitalMarketingProjects: ServiceProjectItem[] = [
  {
    id: 'dm-omnichannel-roas',
    title: 'Omnichannel B2B & D2C Paid Ad Scaling',
    category: 'marketing',
    tags: ['Meta Ads', 'Google Performance Max', '4.8x ROAS', 'Scale'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#081216] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-cyan-500/20">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E6D2] animate-pulse" />
            <span className="font-mono font-bold text-xs text-[#00E6D2]">SCALE_ADS v3.2</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-200 font-mono">
            <TrendingUp className="w-3 h-3 text-[#00FFE5]" />
            <span>4.8x ROAS Avg</span>
          </div>
        </div>
        <div className="my-auto space-y-2 z-10 py-1">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cyan-950/40 border border-cyan-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Ad Spend Managed</span>
              <span className="text-sm font-bold text-white font-mono">$180,000+</span>
            </div>
            <div className="bg-cyan-950/40 border border-cyan-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Revenue Generated</span>
              <span className="text-sm font-bold text-[#00FFE5] font-mono">$864,000+</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-300 bg-black/40 px-2.5 py-1.5 rounded-md border border-white/5 font-mono">
            <span>Customer Acquisition (CPA)</span>
            <span className="text-emerald-400 font-bold">-38% Reduction</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-cyan-400/90 border-t border-cyan-900/40">
          <span>Meta + Google Ads Optimization</span>
          <span className="text-[#00FFE5] font-semibold">Live Campaign</span>
        </div>
        <div className="absolute right-1/4 bottom-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'dm-saas-funnel',
    title: 'SaaS Inbound Growth & Multi-Touch Funnel',
    category: 'marketing',
    tags: ['Inbound Funnel', 'LinkedIn Ads', 'CRO', 'Attribution'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#0E0C1A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-indigo-500/20">
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span className="font-mono font-bold text-xs text-indigo-300">FUNNEL_PIPELINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded text-indigo-200 font-mono">
            <Target className="w-3 h-3 text-indigo-400" />
            <span>High-Intent Leads</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[10px]">
          <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/30 p-1.5 rounded">
            <span className="text-gray-300">Top of Funnel Impressions</span>
            <span className="text-indigo-300 font-bold">142,000+</span>
          </div>
          <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/30 p-1.5 rounded">
            <span className="text-gray-300">MQL Conversion Rate</span>
            <span className="text-indigo-400 font-bold">6.8% (Benchmark 2.1%)</span>
          </div>
          <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/30 p-1.5 rounded">
            <span className="text-gray-300">Pipeline Value Added</span>
            <span className="text-emerald-400 font-bold">+$320,000</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-indigo-300/90 border-t border-indigo-900/40">
          <span>LinkedIn Ads + CRO Funnel</span>
          <span className="text-indigo-300 font-semibold">100% Attributed</span>
        </div>
        <div className="absolute left-1/3 top-1/2 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'dm-ecommerce-retention',
    title: 'E-Commerce Email & SMS Flow Engine',
    category: 'marketing',
    tags: ['Klaviyo', 'Retention Flows', 'SMS Marketing', 'LTV Growth'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#120B10] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-rose-500/20">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            <span className="font-mono font-bold text-xs text-rose-300">RETENTION_FLOWS</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 rounded text-rose-200 font-mono">
            <Zap className="w-3 h-3 text-rose-400" />
            <span>Automated Revenue</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-rose-950/30 border border-rose-500/20 p-1.5 rounded">
            <span className="text-gray-300">Cart Abandonment Recovery</span>
            <span className="text-rose-300 font-bold">29.4% Open Rate</span>
          </div>
          <div className="flex items-center justify-between bg-rose-950/30 border border-rose-500/20 p-1.5 rounded">
            <span className="text-gray-300">Post-Purchase VIP Upsell</span>
            <span className="text-rose-400 font-bold">+$48,200 / mo</span>
          </div>
          <div className="flex items-center justify-between bg-rose-950/30 border border-rose-500/20 p-1.5 rounded">
            <span className="text-gray-300">Customer Lifetime Value</span>
            <span className="text-emerald-400 font-bold">+52% Lift</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-rose-300/90 border-t border-rose-900/40">
          <span>Lifecycle Email &amp; SMS Sequences</span>
          <span className="text-rose-300 font-semibold">Zero Churn</span>
        </div>
        <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
];

export const digitalMarketingTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'David Chen',
    role: 'Managing Director',
    company: 'Zenith Global',
    tag: 'Paid Performance & ROAS',
    video: '/videos/testimonial-3.mp4',
  },
  {
    id: 2,
    author: 'Amanda Croft',
    role: 'CMO',
    company: 'Lumina Retail',
    tag: 'Meta & Google Ads Scaling',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 3,
    author: 'Liam O’Connor',
    role: 'Growth Lead',
    company: 'VenturePulse',
    tag: 'Funnel Optimization',
    video: '/videos/testimonial-1.mp4',
  },
];

// ==========================================
// 4. SEO PROJECTS & TESTIMONIALS
// ==========================================
export const seoProjects: ServiceProjectItem[] = [
  {
    id: 'seo-fintech-traffic',
    title: 'Enterprise FinTech Organic Traffic Scaler',
    category: 'seo',
    tags: ['Technical SEO', 'Keyword Clusters', '+380% Organic', 'High DA'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#091512] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-emerald-500/20">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold text-xs text-emerald-300">SEARCH_DOMINANCE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-200 font-mono">
            <Search className="w-3 h-3 text-emerald-400" />
            <span>Top 3 SERP</span>
          </div>
        </div>
        <div className="my-auto space-y-2 z-10 py-1 font-mono text-[9.5px]">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Monthly Organic Clicks</span>
              <span className="text-sm font-bold text-emerald-300">284,000+</span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Organic Traffic Growth</span>
              <span className="text-sm font-bold text-[#00FFE5]">+380% YoY</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-emerald-100 bg-black/40 px-2.5 py-1.5 rounded border border-emerald-500/20">
            <span>High-Value Commercial Keywords</span>
            <span className="text-emerald-400 font-bold">148 Ranked #1-3</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-emerald-400/90 border-t border-emerald-900/40">
          <span>Technical Architecture + Backlinks</span>
          <span className="text-emerald-300 font-semibold">Zero Penalties</span>
        </div>
        <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'seo-ecommerce-serp',
    title: 'E-Commerce Global Keyword & Category Architecture',
    category: 'seo',
    tags: ['Schema Markup', 'Core Web Vitals', 'Product SEO', 'Rich Snippets'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#0B121A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-cyan-500/20">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E6D2]" />
            <span className="font-mono font-bold text-xs text-[#00E6D2]">SCHEMA_ENGINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-200 font-mono">
            <Globe2 className="w-3 h-3 text-[#00E6D2]" />
            <span>Global SERP Index</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-500/30 p-1.5 rounded">
            <span className="text-gray-300">Core Web Vitals Score</span>
            <span className="text-[#00FFE5] font-bold">100 / 100 Performance</span>
          </div>
          <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-500/30 p-1.5 rounded">
            <span className="text-gray-300">Google Rich Snippets Won</span>
            <span className="text-cyan-300 font-bold">84% of Catalog</span>
          </div>
          <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-500/30 p-1.5 rounded">
            <span className="text-gray-300">Non-Brand Search Revenue</span>
            <span className="text-emerald-400 font-bold">+$215,000 / mo</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-cyan-300/90 border-t border-cyan-900/40">
          <span>Programmatic Category Hubs</span>
          <span className="text-[#00FFE5] font-semibold">Indexed Fast</span>
        </div>
        <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'seo-local-multilocation',
    title: 'Multi-Location Google Business & Local Pack Accelerator',
    category: 'seo',
    tags: ['Local SEO', 'Google Maps 3-Pack', 'Review Engine', 'Local Dominance'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#0E150F] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-teal-500/20">
        <div className="flex items-center justify-between border-b border-teal-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono font-bold text-xs text-teal-300">LOCAL_PACK_GRID</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-teal-950/80 border border-teal-500/30 px-2 py-0.5 rounded text-teal-200 font-mono">
            <CheckCircle2 className="w-3 h-3 text-teal-400" />
            <span>#1 in 18 Hubs</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-teal-950/40 border border-teal-500/30 p-1.5 rounded">
            <span className="text-gray-300">Local Search Impression Share</span>
            <span className="text-teal-300 font-bold">92% In-Market</span>
          </div>
          <div className="flex items-center justify-between bg-teal-950/40 border border-teal-500/30 p-1.5 rounded">
            <span className="text-gray-300">Direct Inbound Phone Calls</span>
            <span className="text-emerald-400 font-bold">+280% Surge</span>
          </div>
          <div className="flex items-center justify-between bg-teal-950/40 border border-teal-500/30 p-1.5 rounded">
            <span className="text-gray-300">Citation Consistency Audit</span>
            <span className="text-teal-200 font-bold">100% NAP Match</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-teal-300/90 border-t border-teal-900/40">
          <span>Geo-Targeted Landing Pages</span>
          <span className="text-teal-300 font-semibold">Ranked #1</span>
        </div>
        <div className="absolute right-1/3 top-1/2 w-32 h-32 bg-teal-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
];

export const seoTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'Rachel Adams',
    role: 'VP Marketing',
    company: 'Horizon Digital',
    tag: 'Technical & On-Page SEO',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 2,
    author: 'Daniel Morales',
    role: 'Founder & CEO',
    company: 'FinEdge Global',
    tag: 'High-Intent Keyword Dominance',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 3,
    author: 'Chloe Bennett',
    role: 'Director of Acquisition',
    company: 'HealthPulse Labs',
    tag: 'Top 3 Organic Search Rankings',
    video: '/videos/testimonial-3.mp4',
  },
];

// ==========================================
// 5. YOUTUBE AUTOMATION PROJECTS & TESTIMONIALS
// ==========================================
export const youtubeAutomationProjects: ServiceProjectItem[] = [
  {
    id: 'yt-autonomous-tech-channel',
    title: 'AI Tech Insights Autonomous Media Channel',
    category: 'youtube',
    tags: ['AI Scripting', 'Voice Synthesis', '1.2M Subscribers', 'Monetized'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#160A0A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-red-500/20">
        <div className="flex items-center justify-between border-b border-red-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono font-bold text-xs text-red-300">YT_CHANNEL_BOT</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded text-red-200 font-mono">
            <Video className="w-3 h-3 text-red-400" />
            <span>1.2M Subs Active</span>
          </div>
        </div>
        <div className="my-auto space-y-2 z-10 py-1 font-mono text-[9.5px]">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-950/40 border border-red-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Total Lifetime Views</span>
              <span className="text-sm font-bold text-white">48,600,000+</span>
            </div>
            <div className="bg-red-950/40 border border-red-500/20 p-2 rounded-lg">
              <span className="text-[10px] text-gray-400 block">Average Video CTR</span>
              <span className="text-sm font-bold text-emerald-400">11.4% (Top 1%)</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-red-200 bg-black/40 px-2.5 py-1.5 rounded border border-red-500/20">
            <span>Production Workflow</span>
            <span className="text-emerald-400 font-bold">100% Autonomous Script-to-Upload</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-red-400/90 border-t border-red-900/40">
          <span>AI Script + ElevenLabs Voice + CapCut Auto</span>
          <span className="text-red-300 font-semibold">$38k/mo Ads</span>
        </div>
        <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-red-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'yt-finance-pulse-pipeline',
    title: 'Daily Global Finance & Crypto News Automation Pipeline',
    category: 'youtube',
    tags: ['Daily News', 'Shorts + Long-Form', 'Automated Rendering', 'Scale'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#120E08] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-amber-500/20">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-mono font-bold text-xs text-amber-300">AUTO_PIPELINE v4</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded text-amber-200 font-mono">
            <Play className="w-3 h-3 text-amber-400" />
            <span>2 Videos / Day</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-amber-950/40 border border-amber-500/30 p-1.5 rounded">
            <span className="text-gray-300">Monthly Impression Reach</span>
            <span className="text-amber-300 font-bold">14,200,000+</span>
          </div>
          <div className="flex items-center justify-between bg-amber-950/40 border border-amber-500/30 p-1.5 rounded">
            <span className="text-gray-300">Automated Render Queue</span>
            <span className="text-[#00FFE5] font-bold">Under 18 Mins / Video</span>
          </div>
          <div className="flex items-center justify-between bg-amber-950/40 border border-amber-500/30 p-1.5 rounded">
            <span className="text-gray-300">Monthly AdSense &amp; Affiliates</span>
            <span className="text-emerald-400 font-bold">+$24,500 / mo</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-amber-300/90 border-t border-amber-900/40">
          <span>Automated News Scraping &amp; Synthesis</span>
          <span className="text-amber-300 font-semibold">Zero Manual Work</span>
        </div>
        <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'yt-documentaries-retention',
    title: 'Historical & Scientific 4K Documentary Factory',
    category: 'youtube',
    tags: ['4K AI B-Roll', '74% Retention', 'CTR Thumbnails', 'Evergreen'],
    renderPreview: () => (
      <div className="w-full h-48 sm:h-56 bg-[#0E0B16] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-purple-500/20">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="font-mono font-bold text-xs text-purple-300">DOC_ENGINE_4K</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded text-purple-200 font-mono">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>High Retention</span>
          </div>
        </div>
        <div className="my-auto space-y-1.5 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-purple-950/40 border border-purple-500/30 p-1.5 rounded">
            <span className="text-gray-300">Average View Duration</span>
            <span className="text-purple-300 font-bold">14m 20s (74% Rate)</span>
          </div>
          <div className="flex items-center justify-between bg-purple-950/40 border border-purple-500/30 p-1.5 rounded">
            <span className="text-gray-300">Algorithmic Recommendation</span>
            <span className="text-[#00FFE5] font-bold">88% Browse Features</span>
          </div>
          <div className="flex items-center justify-between bg-purple-950/40 border border-purple-500/30 p-1.5 rounded">
            <span className="text-gray-300">Sponsorship Revenue Added</span>
            <span className="text-emerald-400 font-bold">+$18,000 / video</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-purple-300/90 border-t border-purple-900/40">
          <span>AI Imagery + Dynamic Subtitles</span>
          <span className="text-purple-300 font-semibold">Evergreen Assets</span>
        </div>
        <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
];

export const youtubeAutomationTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'Ethan Brooks',
    role: 'Creator & Media Founder',
    company: 'Apex Media Group',
    tag: 'Automated YouTube Channel',
    video: '/videos/testimonial-3.mp4',
  },
  {
    id: 2,
    author: 'Nathan Ross',
    role: 'Executive Producer',
    company: 'Velocity Shorts Studio',
    tag: 'Shorts & Long-Form Pipeline',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 3,
    author: 'Sophia Martinez',
    role: 'Head of Digital Content',
    company: 'Pulse Global Networks',
    tag: 'Passive Monetization & Scale',
    video: '/videos/testimonial-2.mp4',
  },
];
