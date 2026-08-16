import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  Bot,
  Megaphone,
  CheckCircle2,
} from 'lucide-react';
import { WingLogo } from './WingLogo';

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: Globe,
      title: 'Web Development',
      description:
        'Modern, responsive websites that look great and convert visitors into customers.',
      bullets: [
        'WordPress Websites',
        'Landing Pages',
        'Website Maintenance',
      ],
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description:
        'Rank higher on Google and get more organic traffic that brings real customers.',
      bullets: [
        'Technical SEO',
        'On-Page SEO',
        'Local SEO',
        'SEO Audits',
      ],
    },
    {
      icon: Bot,
      title: 'AI Automation',
      description:
        'Automate repetitive tasks, save time and focus on growing your business.',
      bullets: [
        'AI Chatbots',
        'Workflow Automation',
        'CRM Automation',
        'Lead Generation',
      ],
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description:
        'Get more leads, sales and visibility through targeted marketing strategies.',
      bullets: [
        'Google Ads',
        'Meta Ads',
        'Social Media Marketing',
        'Content Strategy',
      ],
    },
  ];

  return (
    <section id="services" className="pt-12 pb-8 md:pt-16 md:pb-12 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3 lg:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>WHAT WE CAN DO FOR YOU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Services That Drive <br />
              Real Business Growth
            </h2>
          </motion.div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] as const }}
                className="group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] mb-6 group-hover:scale-110 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                    <IconComp className="w-6 h-6 text-[#00E6D2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E6D2] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
