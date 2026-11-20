import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Video,
  Play,
} from 'lucide-react';
import { allProjects } from './projectsData';

// SEO project images
import seoSearchConsoleImg from '@/assets/projects/seo_search_console.jpg';
import seoBacklinksImg from '@/assets/projects/seo_backlinks.jpg';

// Marketing project images (slideshow)
import disdInstagramImg from '@/assets/projects/disd_instagram.jpg';
import disdFacebookImg from '@/assets/projects/disd_facebook.jpg';
import disdMetaAdsImg from '@/assets/projects/disd_meta_ads.jpg';
import ooredooInstagramImg from '@/assets/projects/ooredoo_instagram.jpg';
import ooredooCampaignImg from '@/assets/projects/ooredoo_campaign.jpg';
import ooredooFacebookImg from '@/assets/projects/ooredoo_facebook.jpg';

const SlideshowPreview: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % images.length), 2800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export interface ServiceProjectItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  isYoutube?: boolean;
  description?: string;
  detailedDescription?: string;
  workflow?: { step: string; title: string; desc: string }[];
  features?: string[];
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
const baseWebProjects = allProjects.filter((p) => p.category === 'web');
const topWebProjectIds = ['disd-international', 'al-hadith-energy', 'sbd-commercial-avenue'];

export const webDevelopmentProjects: ServiceProjectItem[] = topWebProjectIds
  .map((id) => baseWebProjects.find((p) => p.id === id)!)
  .filter(Boolean);

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
const topAiProjectIds = ['al-haditha-chatbot', 'ai-calling-agents', 'lead-harvest'];

export const aiAutomationProjects: ServiceProjectItem[] = topAiProjectIds
  .map((id) => allProjects.find((p) => p.id === id)!)
  .filter(Boolean);

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
    id: 'dm-disd-social',
    title: 'Dragon International Services — Social Media & Meta Ads',
    category: 'marketing',
    tags: ['Meta Ads', 'Instagram', 'Facebook', 'Content Strategy', 'Brand Visibility'],
    renderPreview: () => (
      <SlideshowPreview
        images={[disdMetaAdsImg, disdFacebookImg, disdInstagramImg]}
        alt="DISD Digital Marketing"
      />
    ),
  },
  {
    id: 'dm-ooredoo-telecom',
    title: 'Ooredoo WiFi — Multi-Platform Digital Campaign',
    category: 'marketing',
    tags: ['Meta Ads', 'Instagram Reels', 'Facebook', 'Telecom Marketing', '5G'],
    renderPreview: () => (
      <SlideshowPreview
        images={[ooredooCampaignImg, ooredooFacebookImg, ooredooInstagramImg]}
        alt="Ooredoo Digital Campaign"
      />
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
    id: 'seo-organic-performance',
    title: 'Organic SEO Performance & Search Visibility Growth',
    category: 'seo',
    tags: ['Google Search Console', 'Organic Clicks', 'Impressions', 'Search Position', 'CTR'],
    renderPreview: () => (
      <div className="w-full h-full overflow-hidden bg-black">
        <img
          src={seoSearchConsoleImg}
          alt="Google Search Console SEO Performance"
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    id: 'seo-link-building',
    title: 'High Authority Link Building & Backlink Management',
    category: 'seo',
    tags: ['Off-Page SEO', 'Backlink Acquisition', 'Domain Authority', 'Domain Rating', 'High DA'],
    renderPreview: () => (
      <div className="w-full h-full overflow-hidden bg-black">
        <img
          src={seoBacklinksImg}
          alt="High Authority Backlink Management Spreadsheet"
          className="w-full h-full object-contain"
        />
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
      <div className="w-full aspect-video bg-[#160A0A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-red-500/20">
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
      <div className="w-full aspect-video bg-[#120E08] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-amber-500/20">
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
      <div className="w-full aspect-video bg-[#0E0B16] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-purple-500/20">
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

// ==========================================
// 6. SOFTWARE DEVELOPMENT PROJECTS & TESTIMONIALS
// ==========================================
export const softwareDevelopmentProjects: ServiceProjectItem[] = allProjects
  .filter((p) => p.category === 'software')
  .map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    tags: p.tags,
    link: p.link,
    description: p.description,
    detailedDescription: p.detailedDescription,
    workflow: p.workflow,
    features: p.features,
    renderPreview: p.renderPreview,
  }));

export const softwareDevelopmentTestimonials: ServiceTestimonialCard[] = [
  {
    id: 1,
    author: 'Khalid Al-Mishwar',
    role: 'Managing Director',
    company: 'Al Mishwar EV Workshop',
    tag: 'ERP & Fleet Management',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 2,
    author: 'Omar Al-Farsi',
    role: 'Operations Manager',
    company: 'Gulf Fleet Solutions',
    tag: 'Service Management Platform',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 3,
    author: 'Hamad Al-Rashid',
    role: 'CEO',
    company: 'TechOps Arabia',
    tag: 'Custom ERP System',
    video: '/videos/testimonial-3.mp4',
  },
];
