import React from 'react';
import {
  Terminal,
  Sparkles,
  CheckCircle2,
  Zap,
  TrendingUp,
  Target,
  Search,
  Globe2,
  Video,
  Play,
} from 'lucide-react';
import sbdCommercialImg from '../assets/projects/sbd_commercial_avenue.png';
import saimElectronicsImg from '../assets/projects/saim_electronics.webp';
import dewatsonFurnitureImg from '../assets/projects/dewatson_furniture.webp';
import nawazGroupImg from '../assets/projects/nawaz_group.webp';
import alHadithaEnergyImg from '../assets/projects/al_haditha_energy.webp';
import disdInternationalImg from '../assets/projects/disd_international.png';
import callingAgentImg from '../assets/projects/calling_agent.png';
import leadHarvestImg from '../assets/projects/lead_harvest.png';
import dataMapperImg from '../assets/projects/data_mapper.png';
import leadFlowImg from '../assets/projects/lead_flow.png';
import alHadithaBotImg from '../assets/projects/al_haditha_bot.png';

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'marketing' | 'seo' | 'youtube' | string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  description?: string;
  detailedDescription?: string;
  workflow?: ProjectWorkflowStep[];
  features?: string[];
  renderPreview: () => React.ReactNode;
}

const ProjectScreenshotPreview: React.FC<{
  image: string;
  alt: string;
  domain: string;
  imageClassName?: string;
}> = ({ image, alt, domain, imageClassName = 'object-top' }) => (
  <div className="w-full aspect-video relative overflow-hidden bg-[#080B10]">
    <img
      src={image}
      alt={alt}
      className={`w-full h-full object-cover ${imageClassName}`}
      loading="lazy"
    />
    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/95 shadow-md">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE5]" />
      <span>{domain}</span>
    </div>
  </div>
);

export const allProjects: ProjectItem[] = [
  {
    id: 'sbd-commercial-avenue',
    title: 'SBD Commercial Avenue',
    category: 'web',
    tags: ['Next.js', 'Commercial Showrooms', 'DHA Multan', 'Luxury Living'],
    link: 'https://www.sbdcommercialavenue.com/',
    description:
      'Premier commercial showroom and corporate retail development in DHA Multan featuring modern architecture and luxury business spaces.',
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
      'High-performance e-commerce storefront for consumer electronics and mobile tech with seamless catalog browsing and instant checkout.',
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
      'Luxury home and office furniture e-commerce experience with interactive catalog filtering, responsive UI, and custom order workflows.',
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
      'Corporate enterprise web platform showcasing multi-industry conglomerate ventures, industrial divisions, and brand leadership.',
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
    tags: ['React', 'Energy & Infrastructure', 'Corporate Portal', 'Sultanate of Oman'],
    link: 'https://hde.om/',
    description:
      'Official corporate web portal for Sultanate of Oman energy, oil & gas engineering infrastructure, and sustainable utility projects.',
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
      'Interactive 3D web experience built with Three.js showcasing heavy mining, drilling equipment, and global industrial machinery logistics.',
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={disdInternationalImg}
        alt="Dragon International Services & Development Hero Section"
        domain="disd2.vercel.app"
      />
    ),
  },
  {
    id: 'al-haditha-chatbot',
    title: 'Al Haditha Chatbot – AI Customer Support Assistant',
    category: 'ai',
    tags: ['AI Support Agent', 'Knowledge Base', 'Oman Energy', '24/7 Availability'],
    link: 'https://hde.om/',
    description:
      'AI-powered chatbot deployed on the Al Haditha client website providing instant responses to customer inquiries, scenario-based queries, and 24/7 engagement within secure boundaries.',
    detailedDescription: `An AI-powered chatbot deployed on the Al Haditha client website to provide instant responses to customer inquiries. It handles quick questions and predefined, scenario-based queries using company-specific information, helping visitors understand the company's services and offerings.

Designed to deliver consistent, round-the-clock assistance, the chatbot operates within defined information boundaries to protect confidential company data while improving customer engagement and support.`,
    workflow: [
      {
        step: '01',
        title: 'User Query Ingestion',
        desc: 'Visitors interact with the smart AI assistant widget embedded directly on the hde.om corporate portal.',
      },
      {
        step: '02',
        title: 'Scenario & Intent Classification',
        desc: 'Classifies inquiries across EPC contracting, mechanical, electrical, instrumentation, and civil services.',
      },
      {
        step: '03',
        title: 'Company Knowledge Retrieval',
        desc: 'Pulls validated operational details from company-specific data sheets and capability matrices.',
      },
      {
        step: '04',
        title: 'Information Boundary & Security Guardrails',
        desc: 'Enforces strict data protections to safeguard confidential enterprise assets and pricing policies.',
      },
      {
        step: '05',
        title: 'Contextual Resolution & RFQ Routing',
        desc: 'Answers questions instantly and routes qualified corporate inquiries directly to business development teams.',
      },
    ],
    features: [
      '24/7 Autonomous Customer Engagement on hde.om',
      'Company-Specific Knowledge Base Integration (EPC & Contracting)',
      'Strict Confidentiality & Information Boundary Guardrails',
      'Instant Response to Predefined & Scenario-Based Queries',
      'Multilingual Inquiry Support (English & Arabic)',
      'Lightweight Responsive Widget with Zero Page Overhead',
      'Automated RFQ Guidance & Engineering Department Routing',
    ],
    renderPreview: () => (
      <ProjectScreenshotPreview
        image={alHadithaBotImg}
        alt="Al Haditha AI Chatbot Assistant"
        domain="hde.om"
        imageClassName="object-cover object-center"
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
      'Autonomous voice AI solution built with Retell AI to automate 24/7 B2B sales conversations, lead qualification, time zone-aware calendar scheduling, and follow-up emails.',
    detailedDescription: `An enterprise-grade, human-realistic AI calling solution powered by Retell AI engineered to automate B2B sales conversations and 24/7 customer support. The agent dynamically fields customer inquiries, qualifies incoming leads, separates high-intent prospects, and steers conversations toward closing opportunities with natural voice modulation and sub-second latency.

Integrated with live calendar sync, the bot verifies real-time availability across global time zones, proposes optimal meeting slots, books appointments directly into your schedule, and triggers automated follow-up emails to prospects. This production-ready prototype can be customized to any bespoke business model, sales pipeline, or operational requirement.`,
    workflow: [
      {
        step: '01',
        title: 'Call Ingestion & Context Loading',
        desc: 'Receive inbound customer calls or trigger automated outbound calls with live CRM context.',
      },
      {
        step: '02',
        title: 'Natural Voice Dialogue & Inquiry Handling',
        desc: 'Engage prospects with sub-500ms latency, handling product queries and objection handling naturally.',
      },
      {
        step: '03',
        title: 'Lead Qualification & Intent Scoring',
        desc: 'Ask custom qualification criteria to distinguish high-potential buyers from cold inquiries.',
      },
      {
        step: '04',
        title: 'Time Zone-Aware Calendar Booking',
        desc: 'Check live team availability, compute time zone offsets, suggest slots, and confirm appointments on calendar.',
      },
      {
        step: '05',
        title: 'Automated Email Follow-Up & CRM Sync',
        desc: 'Send confirmation emails, dispatch meeting invites, and sync call audio transcripts and summaries into CRM.',
      },
    ],
    features: [
      '24/7 Inbound Support & Outbound Sales Automation',
      'Built with Retell AI for Natural Low-Latency Speech (<500ms)',
      'Automated Lead Qualification & Prospect Intent Scoring',
      'Real-Time Time Zone Detection & Dynamic Slot Suggestion',
      'Direct Calendar Booking (Google Calendar, Outlook, Cal.com)',
      'Automated Post-Call Email Follow-Ups & Meeting Confirmation',
      'Live CRM Data Logging (HubSpot, Salesforce, Pipedrive)',
      'Fully Customizable Sales Logic, Voice Personas & Scripts',
    ],
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
      'Multi-source lead generation and market intelligence platform extracting, categorizing, and enriching 600+ B2B decision-makers and Reddit customer pain points via Apify.',
    detailedDescription: `LeadHarvest is an AI-powered prototype engineered to streamline lead generation and market research by extracting and analyzing data across Google Maps, LinkedIn, and Reddit. Powered by Apify, it discovers qualified business leads, categorizes them by star ratings, website availability, and review volume, and pinpoints key decision-makers based on custom search terms.

In addition to B2B prospecting, LeadHarvest performs automated Reddit research to uncover genuine customer pain points and unmet market demands—empowering teams to validate new product opportunities. It reliably delivers 600+ leads per account, with extraction limits and capacity fully customizable to your operational needs.`,
    workflow: [
      {
        step: '01',
        title: 'Target & Query Configuration',
        desc: 'Set custom search queries, target industries, geographies, and specific decision-maker job titles.',
      },
      {
        step: '02',
        title: 'Multi-Channel Extraction (Apify)',
        desc: 'Automate data collection across Google Maps, LinkedIn profiles, and Reddit threads without manual blocks.',
      },
      {
        step: '03',
        title: 'Smart Categorization & Scoring',
        desc: 'Filter leads by star ratings, review counts, active website presence, and role relevance.',
      },
      {
        step: '04',
        title: 'Reddit Pain-Point & Opportunity Mining',
        desc: 'Analyze user discussions to pinpoint authentic customer frustrations and validate new product ideas.',
      },
      {
        step: '05',
        title: 'High-Volume Delivery & Quota Scaling',
        desc: 'Export 600+ structured, verified leads per account with customizable extraction limits.',
      },
    ],
    features: [
      'Multi-Platform Data Ingestion (Google Maps, LinkedIn, Reddit)',
      'Custom Decision-Maker Identification & Role Matching',
      'Smart Lead Categorization (Ratings, Reviews & Website Availability)',
      'Reddit Market Research & Customer Pain-Point Discovery',
      'High-Capacity Throughput (600+ Leads Per Account)',
      'Customizable Extraction Limits & Scalable Scraping Quotas',
      'Reliable Apify Cloud Workflows with Zero Cookie Dependencies',
    ],
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
      'Streamlines e-commerce product listing by extracting relevant product information from images and custom prompts, automatically mapping data into predefined templates.',
    detailedDescription: `DataMapper streamlines e-commerce product listing by extracting relevant product information from uploaded images and custom prompts. It organizes the generated data into predefined listing templates, automatically mapping information to the required columns and formats.

Users can download the completed template, reducing manual data entry, saving time, and enabling faster, more efficient product listing at scale.`,
    workflow: [
      {
        step: '01',
        title: 'Image & Prompt Ingestion',
        desc: 'Upload product photos, raw supplier sheets, and custom listing instructions into the portal.',
      },
      {
        step: '02',
        title: 'Multimodal AI Extraction',
        desc: 'Extract key attributes, specifications, materials, and dimensions using high-speed Groq vision LLMs.',
      },
      {
        step: '03',
        title: 'Schema & Template Mapping',
        desc: 'Automatically normalize and map attributes into marketplace-specific columns and required formats.',
      },
      {
        step: '04',
        title: 'Validation & Compliance Check',
        desc: 'Ensure zero hallucinations, verify required field compliance, and structure product variants.',
      },
      {
        step: '05',
        title: 'Instant Template Export',
        desc: 'Download ready-to-upload Amazon, Shopify, or custom CSV/Excel listing sheets at scale.',
      },
    ],
    features: [
      'Automated Image & Prompt Product Feature Extraction',
      'Predefined Marketplace Templates (Amazon, Shopify, WooCommerce)',
      'Intelligent Column & Format Auto-Mapping',
      'Instant CSV & XLSX Batch Export for High-Volume Cataloging',
      'Elimination of Manual Copy-Paste & Repetitive Data Entry',
      'Sub-Second Groq Vision LLM Processing Pipeline',
      'Variant Attribute Organization & Tagging',
      'Enterprise-Ready Scalable Product Catalog Workflows',
    ],
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
      'Centralized AI operations workspace and management console connecting lead ingestion, automated employee assignment routing, and multi-stage pipeline status workflows.',
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
    link: 'https://github.com/alimusa2/Lead-Generation-SWOT-Analysis-Cold-Outreach-Automation',
    isGithub: true,
    description:
      'Autonomous Python workflow automating multi-channel lead discovery, AI SWOT business matrix generation, and personalized cold outreach.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#070D18] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans">
        {/* Header Bar */}
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
        {/* Body Content */}
        <div className="my-auto grid grid-cols-5 gap-2 items-center z-10 py-1">
          {/* Log Stream */}
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
          {/* Visual SWOT Grid Badge */}
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
        {/* Footer Metrics */}
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-cyan-400/90 border-t border-cyan-900/40">
          <span>Lead Scraping + AI SWOT</span>
          <span className="text-[#00E6D2] font-semibold">100% Automated</span>
        </div>
        {/* Cyber BG Glow */}
        <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
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
      'Intelligent ATS recruitment agent for automated resume screening, semantic qualification scoring, and hands-free interview scheduling.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#061214] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-emerald-500/20">
        {/* Header Bar */}
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
        {/* Body Content */}
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
        {/* Footer Metrics */}
        <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-emerald-400/90 border-t border-emerald-900/40">
          <span>ATS + Candidate AI Agent</span>
          <span className="text-emerald-300 font-semibold">Zero Friction</span>
        </div>
        {/* Emerald BG Glow */}
        <div className="absolute right-1/4 bottom-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    ),
  },
  {
    id: 'dm-omnichannel-roas',
    title: 'Omnichannel B2B & D2C Paid Ad Scaling',
    category: 'marketing',
    tags: ['Meta Ads', 'Google Performance Max', '4.8x ROAS', 'Scale'],
    description:
      'Data-driven omnichannel paid advertising campaign scaling B2B & D2C revenues with 4.8x average ROAS and conversion rate optimization.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#081216] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-cyan-500/20">
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
    description:
      'High-intent B2B SaaS growth funnel integrating LinkedIn ads, conversion rate optimization, and pipeline attribution modeling.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#0E0C1A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-indigo-500/20">
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
    description:
      'Automated Klaviyo lifecycle email and SMS retention sequences driving repeat orders, cart recovery, and maximized customer LTV.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#120B10] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-rose-500/20">
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
  {
    id: 'seo-fintech-traffic',
    title: 'Enterprise FinTech Organic Traffic Scaler',
    category: 'seo',
    tags: ['Technical SEO', 'Keyword Clusters', '+380% Organic', 'High DA'],
    description:
      'Enterprise technical search architecture and commercial keyword clusters driving +380% organic growth and top 3 rankings on competitive terms.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#091512] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-emerald-500/20">
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
    description:
      'Programmatic catalog SEO, rich schema markup, and Core Web Vitals optimization capturing global Google search results.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#0B121A] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-cyan-500/20">
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
    description:
      'Multi-location Google Business Profile ranking and local 3-pack search accelerator across 18 regional hubs driving direct qualified inquiries.',
    renderPreview: () => (
      <div className="w-full aspect-video bg-[#0E150F] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-teal-500/20">
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
  {
    id: 'yt-autonomous-tech-channel',
    title: 'AI Tech Insights Autonomous Media Channel',
    category: 'youtube',
    tags: ['AI Scripting', 'Voice Synthesis', '1.2M Subscribers', 'Monetized'],
    description:
      'End-to-end automated YouTube channel pipeline generating viral AI tech content with 1.2M+ subscribers and automated video workflows.',
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
      'Autonomous daily global finance and crypto news synthesis pipeline publishing 2 high-retention videos daily with automated editing.',
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
      'High-retention 4K historical and scientific documentary automation factory with algorithmic recommendation reach and dynamic editing.',
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
  'data-mapper',
];

export const featuredProjects: ProjectItem[] = featuredProjectIds
  .map((id) => allProjects.find((p) => p.id === id))
  .filter((p): p is ProjectItem => Boolean(p));
