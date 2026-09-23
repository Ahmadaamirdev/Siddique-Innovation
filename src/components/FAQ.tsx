import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { WingLogo } from './WingLogo';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqsData: FAQItem[] = [
  {
    id: 'cost',
    question: 'How much does a project cost?',
    answer:
      'Every project is different, so pricing depends on your specific needs and goals. Contact us for a free, no-obligation quote.',
  },
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer:
      "Timelines vary by service and scope, but most projects are completed within a few weeks. We'll give you a clear timeline after understanding your requirements.",
  },
  {
    id: 'international',
    question: 'Do you work with clients outside Pakistan?',
    answer:
      'We primarily serve international clients and work across different countries and time zones, keeping communication clear and support accessible throughout each project.',
  },
  {
    id: 'post-launch',
    question: 'What happens after my website or project launches?',
    answer:
      "We don't disappear after launch. Our support team stays available for updates, fixes, and ongoing help whenever you need it.",
  },
  {
    id: 'multi-service',
    question: 'Can you handle multiple services together, like a website plus SEO?',
    answer:
      "Yes, that's actually where we add the most value. Since we handle web development, SEO, marketing, and automation under one team, everything is built to work together from day one.",
  },
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#00E6D2]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3"
          >
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>FAQS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
              Everything you need to know about working with us, our delivery process, and ongoing support.
            </p>
          </motion.div>
        </div>

        {/* Decent, Refined Accordion List */}
        <div className="space-y-3.5">
          {faqsData.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 0.61, 0.36, 1] as const,
                }}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A0E13] border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0A0E13]/60 border-white/10 hover:border-white/20 hover:bg-[#0A0E13]/85'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <span className="text-xs font-mono font-medium text-gray-500 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-base sm:text-[17px] font-medium tracking-tight transition-colors font-heading ${
                        isOpen
                          ? 'text-white'
                          : 'text-gray-200 group-hover:text-white'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Clean Dropdown Arrow Button */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#00E6D2]/15 border-[#00E6D2]/50 text-[#00FFE5] rotate-180 shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                        : 'bg-white/[0.04] border-white/10 text-gray-400 group-hover:bg-[#00E6D2]/15 group-hover:border-[#00E6D2]/50 group-hover:text-[#00FFE5] group-hover:shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] as const }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-gray-400 text-sm sm:text-[15px] leading-relaxed font-sans border-t border-white/5">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
