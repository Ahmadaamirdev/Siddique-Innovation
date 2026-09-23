import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Globe,
  Megaphone,
  Search,
  Video,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { WingLogo } from './WingLogo';

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: Bot,
      title: 'AI Automation',
      description:
        'Save time and reduce manual work with smart automation built around how your business actually runs.',
      points: [
        'Custom Workflow Automation',
        'Intelligent AI Chatbots',
        'CRM & Lead Pipeline Sync',
      ],
      link: '/services/ai-automation',
    },
    {
      icon: Globe,
      title: 'Web Development',
      description:
        'Fast, modern, and reliable websites designed to turn visitors into customers.',
      points: [
        'High-Converting Landing Pages',
        'Modern Responsive Design',
        'Lightning Fast Performance',
      ],
      link: '/services/web-development',
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description:
        'Data-driven campaigns that put your brand in front of the right people at the right time.',
      points: [
        'Targeted PPC & Social Ads',
        'Precision Audience Reach',
        'Maximizing Sales & ROI',
      ],
      link: '/services/digital-marketing',
    },
    {
      icon: Search,
      title: 'SEO',
      description:
        'Long-term visibility on search engines, built through proven, ethical strategies.',
      points: [
        'Google First-Page Ranking',
        'On-Page & Technical Audits',
        'Consistent Organic Traffic',
      ],
      link: '/services/seo',
    },
    {
      icon: Video,
      title: 'YouTube Automation',
      description:
        'Fully managed channels from content strategy to upload built to grow your audience on autopilot.',
      points: [
        'End-to-End Channel Growth',
        'Content Strategy & Scripts',
        'Editing & Thumbnail Design',
      ],
      link: '/services/youtube-automation',
    },
  ];

  return (
    <section id="services" className="pt-12 pb-8 md:pt-16 md:pb-12 bg-[#050505] relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3"
          >
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              What We Do
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
              Our work brings together digital technology, automation, and marketing to support modern businesses.
            </p>
          </motion.div>
        </div>

        {/* 5 Service Cards Grid: 3 in first row, 2 centered in second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;

            // 3 cards in row 1 (each spans 2 of 6 cols), next 2 centered in row 2 (starts at col 2 and col 4)
            const layoutClasses =
              index === 3
                ? 'lg:col-span-2 lg:col-start-2'
                : index === 4
                ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-2 lg:col-start-4 lg:max-w-none lg:w-auto'
                : 'lg:col-span-2';

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] as const }}
                className={`group relative flex flex-col justify-between h-full bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform ${layoutClasses}`}
              >
                <div className="flex flex-col flex-1">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] mb-5 group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                    <IconComp className="w-6 h-6 text-[#00E6D2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg xl:text-xl font-bold text-white mb-2 group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                    {service.title}
                  </h3>

                  {/* Description with unified min-height for uniform baseline */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 min-h-[42px] font-sans">
                    {service.description}
                  </p>

                  {/* Bullet Checklist Points */}
                  <ul className="space-y-3 mb-6 mt-auto">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-gray-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Link to Service Page */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00E6D2] group-hover:text-white transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#00E6D2] group-hover:text-white" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
