import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Sparkles,
  CheckCircle2,
  Zap,
  Video,
  Play,
} from 'lucide-react';
import { CLOUDINARY_ASSETS } from './cloudinaryAssets';

// SEO project images
import seoSearchConsoleImg from '@/assets/projects/seo_search_console.jpg';
import seoBacklinksImg from '@/assets/projects/seo_backlinks.jpg';

import disdInstagramImg from '@/assets/projects/disd_instagram.jpg';
import disdFacebookImg from '@/assets/projects/disd_facebook.jpg';
import disdMetaAdsImg from '@/assets/projects/disd_meta_ads.jpg';
import ooredooInstagramImg from '@/assets/projects/ooredoo_instagram.jpg';
import ooredooCampaignImg from '@/assets/projects/ooredoo_campaign.jpg';
import ooredooFacebookImg from '@/assets/projects/ooredoo_facebook.jpg';

/** Auto-advancing image slideshow for project cards */
const SlideshowPreview: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Slide dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const sbdCommercialImg = CLOUDINARY_ASSETS.project_sbd_commercial_avenue.url;
const saimElectronicsImg = CLOUDINARY_ASSETS.project_saim_electronics.url;
const dewatsonFurnitureImg = CLOUDINARY_ASSETS.project_dewatson_furniture.url;
const nawazGroupImg = CLOUDINARY_ASSETS.project_nawaz_group.url;
const alHadithaEnergyImg = CLOUDINARY_ASSETS.project_al_haditha_energy.url;
const disdInternationalImg = CLOUDINARY_ASSETS.project_disd_international.url;
const callingAgentImg = CLOUDINARY_ASSETS.project_calling_agent.url;
const leadHarvestImg = CLOUDINARY_ASSETS.project_lead_harvest.url;
const dataMapperImg = CLOUDINARY_ASSETS.project_data_mapper.url;
const leadFlowImg = CLOUDINARY_ASSETS.project_lead_flow.url;
const alHadithaBotImg = CLOUDINARY_ASSETS.project_al_haditha_bot.url;

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'marketing' | 'seo' | 'youtube' | 'software' | string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  isYoutube?: boolean;
  description?: string;
  detailedDescription?: string;
  workflow?: ProjectWorkflowStep[];
  features?: string[];
  tallPreview?: boolean;
  renderPreview: () => React.ReactNode;
}

const ProjectScreenshotPreview: React.FC<{
  image: string;
  alt: string;
  domain: string;
  imageClassName?: string;
}> = ({ image, alt, domain, imageClassName = '' }) => (
  <div className="w-full h-[190px] sm:h-[220px] relative overflow-hidden bg-[#080B10] flex items-center justify-center">
    <img
      src={image}
      alt={alt}
      className={`max-w-full max-h-full object-contain ${imageClassName}`}
      loading="lazy"
    />
    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/95 shadow-md">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE5]" />
      <span>{domain}</span>
    </div>
  </div>
);

export const allProjects: ProjectItem[] = [
  // ==========================================
  // WEB DEVELOPMENT
  // ==========================================
  {
    id: 'sbd-commercial-avenue',
    title: 'SBD Commercial Avenue',
    category: 'web',
    tags: ['Next.js', 'Commercial Showrooms', 'DHA Multan', 'Luxury Living'],
    link: 'https://www.sbdcommercialavenue.com/',
    description:
      'Corporate website for SBD Commercial Avenue showcasing modern showroom layouts, floor plans, and investment options in DHA Multan.',
    detailedDescription:
      'Built for SBD Commercial Avenue, a commercial showroom and retail development located in DHA Multan.\n\nThe website presents showroom floor plans, retail layouts, investor documentation, and site location highlights to prospective commercial tenants and real estate investors looking to establish their presence in DHA Multan.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={sbdCommercialImg}
        alt="SBD Commercial Avenue Hero Section"
        domain="sbdcommercialavenue.com"
      />
    ),
  },
  {
    id: 'saim-electronics',
    title: 'SAIM Electronics',
    category: 'web',
    tags: ['React', 'E-Commerce', 'Smartphones & Tech', 'Online Store'],
    link: 'https://saim-electronics.vercel.app/',
    description:
      'Online retail store for SAIM Electronics featuring smartphones, gadgets, real-time product stock, and instant checkout.',
    detailedDescription:
      'Built for SAIM Electronics, a consumer electronics and tech retailer.\n\nThe online storefront provides customers with smooth catalog browsing, real-time product availability, transparent pricing on the latest devices and accessories, and a fast, easy checkout experience.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={saimElectronicsImg}
        alt="SAIM Electronics Hero Section"
        domain="saim-electronics.vercel.app"
      />
    ),
  },
  {
    id: 'd-watson-shop',
    title: 'D.Watson Home & Furniture',
    category: 'web',
    tags: ['WooCommerce', 'Furniture & Decor', 'E-Commerce', 'UI/UX'],
    link: 'https://dewatsonshop.com',
    description:
      'E-commerce store for D.Watson Home & Furniture showcasing living, bedroom, and office furniture collections with custom order requests.',
    detailedDescription:
      'Built for D.Watson Home & Furniture, an established retail furniture and home decor brand.\n\nThe e-commerce website enables customers to browse furniture collections by room, inspect custom wood and fabric options, calculate dimensions, and submit custom orders online.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={dewatsonFurnitureImg}
        alt="D.Watson Home & Furniture Hero Section"
        domain="dewatsonshop.com"
      />
    ),
  },
  {
    id: 'nawaz-group',
    title: 'Nawaz Group of Companies',
    category: 'web',
    tags: ['WordPress', 'Corporate', 'Enterprise', 'Development'],
    link: 'https://nawazgroupofcompanies.com',
    description:
      'Corporate portal for Nawaz Group of Companies highlighting their subsidiaries, manufacturing facilities, and industrial divisions.',
    detailedDescription:
      'Built for Nawaz Group of Companies, a multi-industry conglomerate with operations across textiles, manufacturing, and real estate.\n\nThe corporate platform introduces corporate partners and clients to the group’s subsidiary companies, corporate leadership, infrastructure projects, and compliance standards.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={nawazGroupImg}
        alt="Nawaz Group of Companies Hero Section"
        domain="nawazgroupofcompanies.com"
      />
    ),
  },
  {
    id: 'al-hadith-energy',
    title: 'Al Haditha Energy S.A.O.C',
    category: 'web',
    tags: ['React', 'Energy & Infrastructure', 'Corporate Website', 'Sultanate of Oman'],
    link: 'https://hde.om/',
    description:
      'Official corporate website for Al Haditha Energy S.A.O.C, a large energy and infrastructure contractor with 2,000+ employees operating at an international level.',
    detailedDescription:
      'Built for Al Haditha Energy S.A.O.C, a large engineering and infrastructure contracting company with over 2,000 employees operating on an international level.\n\nThe corporate website showcases the company’s oil, gas, and energy infrastructure projects, engineering capabilities, safety certifications, and client inquiry channels.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={alHadithaEnergyImg}
        alt="Al Haditha Energy Hero Section"
        domain="hde.om"
      />
    ),
  },
  {
    id: 'disd-international',
    title: 'Dragon International Services & Development (DISD)',
    category: 'web',
    tags: ['React & Three.js', 'Heavy Mining Equipment', '3D Web Experience', 'Industrial'],
    link: 'https://disd2.vercel.app/',
    description:
      'Interactive 3D web platform for Dragon International showcasing heavy mining equipment, drilling rigs, and global industrial machinery.',
    detailedDescription:
      'Built for Dragon International Services & Development (DISD), a global supplier of heavy mining and industrial drilling equipment.\n\nThe platform features an interactive 3D machinery viewer that lets international mining operators explore heavy equipment models, specifications, and procurement details.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={disdInternationalImg}
        alt="Dragon International Services & Development Hero Section"
        domain="disd2.vercel.app"
      />
    ),
  },

  // ==========================================
  // AI AUTOMATION & INTELLIGENT AGENTS
  // ==========================================
  {
    id: 'al-haditha-chatbot',
    title: 'Al Haditha Chatbot – AI Customer Support Assistant',
    category: 'ai',
    tags: ['AI Support Agent', 'Knowledge Base', 'Oman Energy', '24/7 Availability'],
    link: 'https://hde.om/',
    description:
      'AI customer support assistant built for Al Haditha Energy, a large international contractor with 2,000+ employees, answering inquiries 24/7.',
    detailedDescription:
      'Built for Al Haditha Energy S.A.O.C, a large engineering and energy contracting firm with over 2,000 employees operating on an international level.\n\nThis AI assistant sits directly on the corporate website to answer visitor questions 24/7. It explains engineering capabilities, answers questions about oil and gas contracting services, and guides potential corporate clients on how to request formal project quotations, all while keeping internal company information completely secure.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={alHadithaBotImg}
        alt="Al Haditha AI Chatbot Assistant"
        domain="hde.om"
        imageClassName="object-contain object-center"
      />
    ),
  },
  {
    id: 'ai-calling-agents',
    title: 'AI Calling Agents – Autonomous Inbound & Outbound Voice',
    category: 'ai',
    tags: ['Voice AI Engine', 'Sub-500ms Latency', 'Inbound & Outbound', 'CRM Booking'],
    link: 'https://agent.retellai.com/orb/agent_da7b265b66bd8cf11f2c2b05bc?token=66ba30e9f3f5468e72af11a122c1a3d8',
    description:
      'Voice AI assistant that makes outbound calls to new leads, answers inbound customer inquiries, and books appointments directly on team calendars.',
    detailedDescription:
      'Built for sales teams and service-based companies looking to handle customer calls without staffing a large call center.\n\nThis voice assistant makes outbound calls to new leads and handles incoming customer calls in natural spoken English. It answers product questions, asks qualifying questions to find out if the caller is ready to buy, checks team calendar availability in real time, and books sales appointments directly into Google Calendar or Outlook.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={callingAgentImg}
        alt="AI Calling Agent Live Interface"
        domain="agent.retellai.com"
        imageClassName="object-center"
      />
    ),
  },
  {
    id: 'lead-harvest',
    title: 'LeadHarvest – AI Lead Scraper & Discovery Engine',
    category: 'ai',
    tags: ['AI Lead Scraping', 'LinkedIn & B2B', 'Apify Engine', 'Data Enrichment'],
    link: 'https://leads-scrapper-drab.vercel.app/',
    description:
      'Lead discovery tool extracting qualified B2B contacts from Google Maps, LinkedIn, and Reddit, while analyzing discussions to identify customer pain points.',
    detailedDescription:
      'Built for B2B sales teams and business owners looking to discover new clients without manual internet research.\n\nThis tool automatically searches Google Maps, LinkedIn, and Reddit for companies matching chosen business criteria. It collects verified company details, phone numbers, and decision-maker contact info, while also analyzing public discussions on Reddit to find the exact problems potential customers are actively trying to solve.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={leadHarvestImg}
        alt="LeadHarvest AI Lead Scraper Dashboard"
        domain="leads-scrapper-drab.vercel.app"
      />
    ),
  },
  {
    id: 'data-mapper',
    title: 'DataMapper – AI Ecommerce Listing & Template Engine',
    category: 'ai',
    tags: ['Groq AI Engine', 'Ecommerce Automation', 'Amazon & Shopify', 'Zero Hallucination'],
    link: 'https://ecommerce-listing-iota.vercel.app/',
    description:
      'Automated tool that extracts product attributes from photos and supplier sheets, formatting them directly into Amazon and Shopify listing files.',
    detailedDescription:
      'Built for e-commerce brands and multi-channel retailers who sell on marketplaces like Amazon and Shopify.\n\nThis automation tool eliminates hours of manual data entry by extracting product titles, dimensions, materials, and colors directly from supplier spreadsheets and product photos. It automatically organizes the extracted data into ready-to-upload listing files formatted to meet each marketplace’s exact template standards.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={dataMapperImg}
        alt="DataMapper AI Ecommerce Listing Dashboard"
        domain="ecommerce-listing-iota.vercel.app"
      />
    ),
  },
  {
    id: 'lead-flow',
    title: 'LeadFlow – AI Workspace & CRM Console',
    category: 'ai',
    tags: ['LeadFlow CRM', 'AI Pipeline Routing', 'Lead Management', 'Enterprise Console'],
    link: 'https://lead-smoky-psi.vercel.app/',
    description:
      'Operations workspace that organizes incoming sales inquiries, assigns leads to team members automatically, and tracks conversation stages.',
    detailedDescription:
      'Built for sales agencies and business operations teams to manage incoming prospect inquiries.\n\nThis workspace brings leads from websites and ad campaigns into a single pipeline. It automatically assigns new leads to available team members, sends instant notification alerts, and tracks each conversation through every stage from initial inquiry to closed deal.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={leadFlowImg}
        alt="LeadFlow AI Management Console"
        domain="lead-smoky-psi.vercel.app"
      />
    ),
  },
  {
    id: 'swot-cold-outreach',
    title: 'Lead Gen & SWOT Cold Outreach Automation',
    category: 'ai',
    tags: ['Python', 'AI Lead Gen', 'SWOT Analysis', 'Outreach'],
    link: 'https://youtu.be/lmLf2BMX9zA',
    isYoutube: true,
    description:
      'Automated outbound system that finds prospective clients online, generates an instant SWOT business analysis, and drafts personalized emails.',
    detailedDescription:
      'Built for B2B agencies and consulting firms conducting outbound client outreach.\n\nThis automation finds prospective business clients online and immediately evaluates each company’s strengths, weaknesses, and online presence. It uses those findings to write personalized cold email messages that pinpoint specific areas where the company can improve, significantly boosting response rates compared to generic cold templates.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#070D18] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E6D2] animate-pulse" />
            <span className="font-mono font-bold text-xs text-[#00E6D2]">LEAD_GEN_BOT v2.4</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-300 font-mono">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Python Bot</span>
          </div>
        </div>
        <div className="my-auto grid grid-cols-5 gap-2 items-center z-10 py-1">
          <div className="col-span-3 space-y-1.5 font-mono text-[9px]">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3 h-3 text-[#00E6D2] shrink-0" />
              <span className="truncate">Scraped 500+ Qualified Leads</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">AI SWOT Matrix Generated</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Cold Email Sequence Sent</span>
            </div>
          </div>
          <div className="col-span-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg p-1.5 grid grid-cols-2 gap-1 text-center font-mono text-[8px]">
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-1 rounded text-emerald-300">
              <span className="font-bold block">S</span>Strengths
            </div>
            <div className="bg-amber-950/60 border border-amber-500/40 p-1 rounded text-amber-300">
              <span className="font-bold block">W</span>Weakness
            </div>
            <div className="bg-cyan-950/60 border border-cyan-500/40 p-1 rounded text-cyan-300">
              <span className="font-bold block">O</span>Opps
            </div>
            <div className="bg-rose-950/60 border border-rose-500/40 p-1 rounded text-rose-300">
              <span className="font-bold block">T</span>Threats
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-cyan-400/90 border-t border-cyan-900/40">
          <span>Lead Scraping + AI SWOT</span>
          <span className="text-[#00E6D2] font-semibold">100% Automated</span>
        </div>
        <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'ai-article-generation',
    title: 'AI Article Generation & Autonomous Pinterest Publisher',
    category: 'ai',
    tags: ['Autonomous Agent', 'LLM Article Engine', 'AI Image Gen', 'Pinterest API', 'SEO Articles'],
    link: 'https://youtu.be/omymi9Zg454',
    isYoutube: true,
    description:
      'Autonomous system researching and writing SEO articles, generating matching vertical graphics, and publishing pins directly to Pinterest.',
    detailedDescription:
      'Built for digital media publishers and content creators looking to drive organic website traffic without spending hours writing and designing pins.\n\nThis system takes a target search topic, drafts an in-depth, structured blog article optimized for Google search, generates high-resolution vertical graphics, and automatically publishes scheduled pins to Pinterest with direct links back to the article.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#0A0D14] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-rose-500/20">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E60023] animate-pulse" />
            <span className="font-mono font-bold text-xs text-rose-300">ARTICLE_PIN_BOT v1.4</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 rounded text-rose-300 font-mono">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>AI Publisher</span>
          </div>
        </div>
        <div className="my-auto grid grid-cols-5 gap-2 items-center z-10 py-1">
          <div className="col-span-3 space-y-1.5 font-mono text-[9px]">
            <div className="flex items-center gap-1.5 text-rose-200">
              <CheckCircle2 className="w-3 h-3 text-[#00E6D2] shrink-0" />
              <span className="truncate">SEO Article Written (1,800w)</span>
            </div>
            <div className="flex items-center gap-1.5 text-pink-200">
              <Zap className="w-3 h-3 text-pink-400 shrink-0" />
              <span className="truncate">AI Vertical Visuals Generated</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Published to Pinterest API</span>
            </div>
          </div>
          <div className="col-span-2 bg-[#121620] border border-rose-500/30 rounded-lg p-2 text-center font-mono text-[8px] flex flex-col items-center justify-center space-y-1">
            <div className="w-full h-8 rounded bg-gradient-to-br from-rose-900/60 via-purple-900/40 to-cyan-900/40 flex items-center justify-center text-[10px] text-white font-bold border border-rose-500/20">
              📌 Pin Published
            </div>
            <span className="text-rose-300 font-semibold truncate w-full block">Auto Syndicated</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-rose-400/90 border-t border-rose-900/40">
          <span>Article + Image + Social</span>
          <span className="text-[#00E6D2] font-semibold">100% Automated</span>
        </div>
        <div className="absolute right-1/4 bottom-0 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'ai-hr-assistance',
    title: 'AI HR Assistance Automation',
    category: 'ai',
    tags: ['Python', 'AI HR Agent', 'ATS Automation', 'Workflow'],
    link: 'https://github.com/Ahmadaamirdev/AI-HR-Assistance-Automation',
    isGithub: true,
    description:
      'Recruitment tool that screens candidate resumes against job criteria, ranks applicant qualifications, and coordinates interview invitations.',
    detailedDescription:
      'Built for recruiting teams and HR departments handling large volumes of job applications.\n\nThis tool automatically reviews incoming resumes against specific job requirements, ranks candidates based on relevant skills and experience, and emails qualified applicants to book interview times, freeing hiring teams from tedious manual resume screening.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#061214] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-emerald-500/20">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold text-xs text-emerald-300">HR_AUTOMATION_BOT v1.8</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-300 font-mono">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>Python Bot</span>
          </div>
        </div>
        <div className="my-auto space-y-2 z-10 py-1 font-mono text-[9.5px]">
          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
            <span className="text-emerald-200">Resume Screening & Match</span>
            <span className="text-emerald-400 font-bold">96% Accuracy</span>
          </div>
          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
            <span className="text-teal-200">Interview Scheduling Bot</span>
            <span className="text-teal-400 font-bold">Automated</span>
          </div>
          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
            <span className="text-cyan-200">Candidate Onboarding</span>
            <span className="text-cyan-400 font-bold">Workflow Active</span>
          </div>
        </div>
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-emerald-400/90 border-t border-emerald-900/40">
          <span>ATS + Candidate AI Agent</span>
          <span className="text-emerald-300 font-semibold">Zero Friction</span>
        </div>
        <div className="absolute right-1/4 bottom-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },

  // ==========================================
  // SOFTWARE DEVELOPMENT
  // ==========================================
  {
    id: 'ev-service-management',
    title: 'EV Service Management Software',
    category: 'software',
    tags: ['EV Workshop', 'Quotation Engine', 'Tax Invoicing', 'Job Cards', 'Technician Dispatch', 'Diagnostics'],
    description:
      'Workshop management software for EV service centers, handling digital check-in, repair quotes, technician job cards, and tax invoicing.',
    detailedDescription:
      'Built for Al Mishwar EV Workshop, an electric vehicle maintenance center in Oman.\n\nThis software manages the entire repair and service workflow on a single digital dashboard. When a vehicle arrives, service advisors log customer details and battery diagnostics, generate clear repair estimates and official tax invoices, and assign job cards directly to workshop technicians to track repair progress until the car is picked up.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={CLOUDINARY_ASSETS.ev_service_dashboard.url}
        alt="EV Service Management Software Dashboard"
        domain="Al Mishwar EV Workshop"
        imageClassName="object-contain object-top"
      />
    ),
  },
  {
    id: 'car-rental-management',
    title: 'Car Rental Management Software',
    category: 'software',
    tags: ['Fleet Rental', 'Booking Engine', 'Rental Agreements', 'Vehicle Availability', 'Security Deposits', 'Returns & Inspections'],
    description:
      'Fleet operations software for car rental businesses, managing live car availability, customer contracts, vehicle inspections, and deposits.',
    detailedDescription:
      'Built for Al Mishwar Car Rental, a commercial vehicle rental business in Oman.\n\nThis software automates daily fleet operations from one screen. Rental agents can check which cars are available on a live calendar, print or sign digital rental agreements, collect security deposits, record vehicle condition and mileage at pick-up and return, and calculate final bills automatically without spreadsheet errors.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={CLOUDINARY_ASSETS.car_rental_dashboard.url}
        alt="Car Rental Management Software Dashboard"
        domain="Al Mishwar Car Rental & Fleet"
        imageClassName="object-contain object-top"
      />
    ),
  },

  // ==========================================
  // DIGITAL MARKETING
  // ==========================================
  {
    id: 'dm-disd-social',
    title: 'Dragon International Services — Social Media & Meta Ads',
    category: 'marketing',
    tags: ['Meta Ads', 'Instagram', 'Facebook', 'Content Strategy', 'Brand Visibility'],
    detailedDescription:
      'Delivering measurable digital growth across Meta Ads, Facebook, and Instagram.\n\n• 12,400+ Meta Ads impressions and 248 clicks, driving brand visibility and audience engagement.\n• 18 customer conversations generated through Meta Ads.\n• 71,336 Facebook views and 1,053 engagements, expanding brand reach.\n• 28,169 Instagram views, 12,687 viewers, and 372 interactions.\n• Top-performing content reached up to 5.9K views, highlighting effective content strategies.\n\nBuilding stronger visibility, meaningful engagement, and data-driven marketing results for DISD.',
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
    detailedDescription:
      'Delivered measurable digital marketing results through targeted advertising, engaging content, and data-driven campaign optimization.\n\n• 30,045 ad impressions and 18,858 people reached across Meta ad campaigns.\n• 398 total clicks and 167 link clicks, driving audience engagement and traffic.\n• Vodafone 5G Reel: 11,446 impressions, 8,075 reach, and 47 link clicks.\n• Facebook: 37,442 views and 436 engagements.\n• Instagram: 11,678 views, 73 interactions, and 137 profile visits.\n• Content performance: Instagram Reels generated approximately 1.1K views, followed by 455 post views.\n\nThese results showcase our ability to strengthen brand visibility, engage audiences, and deliver measurable digital marketing performance across multiple telecom brands.',
    renderPreview: () => (
      <SlideshowPreview
        images={[ooredooCampaignImg, ooredooFacebookImg, ooredooInstagramImg]}
        alt="Ooredoo Digital Campaign"
      />
    ),
  },

  // ==========================================
  // SEO (SEARCH ENGINE OPTIMIZATION)
  // ==========================================
  {
    id: 'seo-organic-performance',
    title: 'Organic SEO Performance & Search Visibility Growth',
    category: 'seo',
    tallPreview: true,
    tags: ['Google Search Console', 'Organic Clicks', 'Impressions', 'Search Position', 'CTR'],
    description:
      'Managed website SEO performance using Google Search Console, achieving 241K impressions and 3.55K organic clicks with an average search position of 6.2.',
    detailedDescription:
      'Managed website SEO performance using Google Search Console, monitoring organic clicks, search impressions, click-through rate, and average search positions.\n\nAnalyzed search performance trends to evaluate organic visibility, identify growth opportunities, and track improvements in search engine rankings. Achieved 241K impressions and 3.55K organic clicks with an average search position of 6.2.',
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
    tallPreview: true,
    tags: ['Off-Page SEO', 'Backlink Acquisition', 'Domain Authority', 'Domain Rating', 'High DA'],
    description:
      'Executed a targeted off-page SEO campaign to acquire high-authority backlinks, strengthening backlink profiles and improving search visibility.',
    detailedDescription:
      'Executed an off-page SEO campaign focused on acquiring high-authority backlinks to strengthen the website\'s backlink profile and improve search visibility.\n\nResearched backlink opportunities, managed branded anchor text and target URLs, and monitored backlink status, Domain Authority, and Domain Rating to maintain and track link building progress.',
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

  // ==========================================
  // YOUTUBE AUTOMATION
  // ==========================================
  {
    id: 'yt-autonomous-tech-channel',
    title: 'AI Tech Insights Autonomous Media Channel',
    category: 'youtube',
    tags: ['AI Scripting', 'Voice Synthesis', '1.2M Subscribers', 'Monetized'],
    description:
      'Video production workflow for technology education channels, coordinating topic research, script structuring, voice narration, and scheduled uploads.',
    detailedDescription:
      'Built for digital content studios producing educational technology videos.\n\nThe pipeline coordinates topic research, script structuring, voice narration, and video uploads to maintain an active publishing schedule that engages audiences interested in modern technology.',
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
    description:
      'Daily financial news synthesis workflow that summarizes global market headlines into concise video updates for investors and crypto followers.',
    detailedDescription:
      'Built for market commentary publishers covering daily financial developments.\n\nThe workflow synthesizes daily market headlines into concise, easy-to-follow video updates that keep viewers informed on stock and crypto market movements.',
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
    description:
      'Long-form documentary production workflow combining factual research with high-resolution visual storytelling for science and history channels.',
    detailedDescription:
      'Built for online documentary creators focused on history and science topics.\n\nThe production workflow combines thorough factual research with high-resolution visual storytelling to deliver engaging, long-format educational videos that maintain viewer interest throughout.',
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

const featuredProjectIds = [
  'al-hadith-energy',
  'disd-international',
  'sbd-commercial-avenue',
  'ai-calling-agents',
  'lead-harvest',
  'ev-service-management',
];

export const featuredProjects: ProjectItem[] = featuredProjectIds
  .map((id) => allProjects.find((p) => p.id === id))
  .filter((p): p is ProjectItem => Boolean(p));
