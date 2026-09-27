export interface ServiceItemData {
  slug: string;
  title: string;
  shortDesc: string;
  iconName: 'bot' | 'code' | 'marketing' | 'seo' | 'youtube';
  heroHeading: string;
  heroDescription: string;
  problemHeading: string;
  problemText: string;
  solutionText: string;
  features: {
    title: string;
    description: string;
  }[];
  processHeading: string;
  processSteps: {
    number: number;
    title: string;
    description: string;
  }[];
  faqsHeading: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaHeading: string;
  ctaSubheading: string;
  ctaButtonText: string;
}

export const servicesData: Record<string, ServiceItemData> = {
  'ai-automation': {
    slug: 'ai-automation',
    title: 'AI Automation',
    shortDesc: 'Save time and reduce manual work with smart automation built around how your business actually runs.',
    iconName: 'bot',
    heroHeading: 'Automate Your Business With Advanced AI',
    heroDescription:
      'We develop AI-powered automation and intelligent AI agents that work alongside your existing business processes and tools. Our solutions handle routine tasks while helping your team stay focused on important work.',
    problemHeading: 'Still Doing It Manually?',
    problemText:
      "Most businesses lose hours every week on repetitive tasks including data entry, follow-ups, scheduling, reporting, customer replies. It's slow, it's easy to get wrong, and it keeps your team from focusing on work that actually grows the business.",
    solutionText:
      'We build automation systems that take these repetitive tasks off your plate. Using AI and smart workflows, we connect your tools, automate the busywork, and let your team focus on decisions only people can make.',
    features: [
      {
        title: 'Workflow Automation',
        description: 'Automating repetitive internal processes like data entry, reporting, and task handoffs.',
      },
      {
        title: 'AI Chatbots & Assistants',
        description: 'Automated customer support and lead responses that work around the clock.',
      },
      {
        title: 'CRM & Tool Integration',
        description: 'Connecting your existing software so information flows automatically, without manual updates.',
      },
      {
        title: 'Automated Follow-ups',
        description: 'Emails, messages, or reminders sent automatically based on triggers you define.',
      },
      {
        title: 'Custom AI Solutions',
        description: 'Automation built specifically around your business processes, not a one-size-fits-all template.',
      },
    ],
    processHeading: 'Our Automation Process',
    processSteps: [
      {
        number: 1,
        title: 'Understand',
        description: 'We learn how your business currently operates and identify where time is being lost to repetitive work.',
      },
      {
        number: 2,
        title: 'Plan',
        description: 'We map out which tasks can be automated and design the right workflow and tools for the job.',
      },
      {
        number: 3,
        title: 'Build',
        description: 'We develop and connect the automation, testing it against real scenarios from your business.',
      },
      {
        number: 4,
        title: 'Review & Refine',
        description: 'We check that everything runs accurately and adjust based on how it performs in practice.',
      },
      {
        number: 5,
        title: 'Deliver & Support',
        description: 'We hand over a working system and stay available to fix, adjust, or expand it as your needs change.',
      },
    ],
    faqsHeading: 'Common Questions About AI Automation',
    faqs: [
      {
        question: 'What kind of tasks can actually be automated?',
        answer:
          "Most repetitive, rule-based tasks can be automated, things like data entry, follow-up messages, report generation, and customer replies. We'll review your workflow and tell you exactly what makes sense to automate.",
      },
      {
        question: 'Will automation replace my team?',
        answer:
          'No. Automation handles repetitive work so your team can spend time on tasks that need judgment, creativity, or a personal touch not replace them.',
      },
      {
        question: 'Do I need existing software or tools for this to work?',
        answer:
          "Not necessarily. If you already use tools like a CRM, email platform, or scheduling software, we can connect them. If not, we can recommend and set up what's needed.",
      },
      {
        question: 'How long does it take to build an automation system?',
        answer:
          "It depends on complexity, simple automations can be ready in days, while larger systems connecting multiple tools may take a few weeks. We'll give you a clear timeline after understanding your requirements.",
      },
      {
        question: 'What happens if something breaks after launch?',
        answer:
          "Our support team stays available to fix, adjust, or improve your automation whenever needed, this isn't a one-time handoff.",
      },
    ],
    ctaHeading: 'Ready to Stop Doing It Manually?',
    ctaSubheading: "Let's find out what parts of your business can run on autopilot.",
    ctaButtonText: 'Get a Free Quote',
  },

  'web-development': {
    slug: 'web-development',
    title: 'Web Development',
    shortDesc: 'Fast, modern, and reliable websites designed to turn visitors into customers.',
    iconName: 'code',
    heroHeading: 'Modern Web Development for Your Business',
    heroDescription:
      'We create modern, responsive websites with advanced design, clean development and strong loading performance.',
    problemHeading: 'Is Your Website Slow or Starting to Look Outdated?',
    problemText:
      'A slow website can frustrate visitors, while an outdated design can make your business look less current than it really is. If your website takes too long to load or no longer reflects your brand, it may be time for an update.',
    solutionText:
      'We improve website speed and refresh outdated websites with cleaner design, better responsiveness, and a smoother user experience. We work with your existing website where possible, improving what matters while giving it a fresh, professional look.',
    features: [
      {
        title: 'Custom Website Design',
        description: 'A design built around your brand, not a generic template.',
      },
      {
        title: 'Responsive Development',
        description: 'Fully functional across desktop, tablet, and mobile devices.',
      },
      {
        title: 'E-commerce Websites',
        description: 'Online stores with secure payments, product management, and smooth checkout.',
      },
      {
        title: 'Web Applications',
        description: 'Custom-built tools and platforms for more complex business needs.',
      },
      {
        title: 'Speed & Performance Optimization',
        description: 'Fast-loading pages, because slow websites lose visitors.',
      },
      {
        title: 'Ongoing Maintenance',
        description: 'Updates, fixes, and improvements after launch.',
      },
    ],
    processHeading: 'Our Development Process',
    processSteps: [
      {
        number: 1,
        title: 'Understand',
        description: 'We learn about your business, your customers, and what you need the website to achieve.',
      },
      {
        number: 2,
        title: 'Plan',
        description: 'We map out the site structure, features, and technology that best fit your goals.',
      },
      {
        number: 3,
        title: 'Build',
        description: 'We design and develop the website, keeping you updated at each stage.',
      },
      {
        number: 4,
        title: 'Review & Refine',
        description: 'We test across devices and browsers, fixing issues and refining details before launch.',
      },
      {
        number: 5,
        title: 'Deliver & Support',
        description: 'We launch your site and remain available for updates, fixes, and future improvements.',
      },
    ],
    faqsHeading: 'Common Questions About Web Development',
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer:
          "Most business websites take a few weeks from start to finish, depending on size and features. E-commerce sites or custom web applications may take longer. We'll give you a clear timeline after understanding your requirements.",
      },
      {
        question: 'Will my website work well on mobile phones?',
        answer: 'Yes. Every website we build is fully responsive, meaning it works properly on phones, tablets, and desktops.',
      },
      {
        question: 'Can you redesign my existing website instead of building a new one?',
        answer:
          "Yes, we can work with your existing website and improve its design, speed, and functionality, or rebuild it from scratch if that's the better option.",
      },
      {
        question: 'Do I need to provide content like text and images?',
        answer:
          "Not necessarily. If you already have content, we'll use it. If not, we can help create or source content that fits your brand.",
      },
      {
        question: 'What happens after my website goes live?',
        answer:
          'Our support team remains available for updates, fixes, and improvements whenever you need them, we will be your team after your website goes live.',
      },
    ],
    ctaHeading: 'Ready for a Website That Actually Works for You?',
    ctaSubheading: "Let's build something that turns visitors into customers.",
    ctaButtonText: 'Get a Free Quote',
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'Data-driven campaigns that put your brand in front of the right people at the right time.',
    iconName: 'marketing',
    heroHeading: 'Marketing That Reaches the Right People',
    heroDescription:
      'We build digital marketing campaigns based on data, not guesswork. From social media to paid ads, our goal is simple: put your brand in front of the people most likely to become your customers.',
    problemHeading: 'Spending on Marketing Without Seeing Results?',
    problemText:
      "Many businesses spend money on ads and social media without a clear strategy, posting inconsistently, targeting the wrong audience, or not tracking what's actually working. The result is a wasted budget and little to show for it.",
    solutionText:
      'We build marketing strategies backed by data, identifying who your customers are, where they spend time online, and what messaging actually gets their attention. Every campaign is tracked and adjusted based on real performance, not just assumptions.',
    features: [
      {
        title: 'Social Media Marketing',
        description: 'Content and campaigns across platforms like Instagram, Facebook, and LinkedIn.',
      },
      {
        title: 'Paid Advertising',
        description: 'Targeted ad campaigns on Google and social platforms, built to maximize return on spend.',
      },
      {
        title: 'Content Strategy',
        description: 'Planning what to post, when, and why, based on your audience and goals.',
      },
      {
        title: 'Brand Positioning',
        description: 'Messaging that clearly communicates what makes your business worth choosing.',
      },
      {
        title: 'Performance Tracking & Reporting',
        description: "Clear, regular reports showing what's working and what's being improved.",
      },
    ],
    processHeading: 'Our Marketing Process',
    processSteps: [
      {
        number: 1,
        title: 'Understand',
        description: 'We learn about your business, your audience, and your current marketing efforts.',
      },
      {
        number: 2,
        title: 'Plan',
        description: 'We build a strategy covering platforms, messaging, budget, and goals.',
      },
      {
        number: 3,
        title: 'Build',
        description: 'We create and launch campaigns and content based on the strategy.',
      },
      {
        number: 4,
        title: 'Review & Refine',
        description: 'We track performance and adjust targeting, messaging, or budget based on real results.',
      },
      {
        number: 5,
        title: 'Deliver & Support',
        description: 'We provide ongoing management and reporting, keeping campaigns optimized over time.',
      },
    ],
    faqsHeading: 'Common Questions About Digital Marketing',
    faqs: [
      {
        question: 'How long does it take to see results from digital marketing?',
        answer:
          "Some results, like paid ad traffic, can show up quickly. Others, like brand awareness and organic engagement, build over a few months. We'll set realistic expectations based on your specific goals.",
      },
      {
        question: 'Which platforms should my business be marketing on?',
        answer:
          "It depends on where your customers actually spend time. We'll help identify the right platforms rather than spreading your budget across all of them.",
      },
      {
        question: 'Do you create the content, or do I need to provide it?',
        answer:
          'We can handle content creation, from graphics to captions and ad copy, or work with content you already have, whichever fits your needs.',
      },
      {
        question: 'How do I know if my marketing budget is being used well?',
        answer:
          "We provide regular performance reports so you can see exactly what's working, what's being adjusted, and where your budget is going.",
      },
      {
        question: 'Can you manage marketing alongside my website and SEO?',
        answer:
          'Yes, this is actually where we add the most value. Since we handle web development, SEO, and marketing under one team, everything is built to work together.',
      },
    ],
    ctaHeading: 'Ready to Reach the Right Audience?',
    ctaSubheading: "Let's build a marketing strategy that actually gets results.",
    ctaButtonText: 'Get a Free Quote',
  },

  seo: {
    slug: 'seo',
    title: 'SEO',
    shortDesc: 'Long-term visibility on search engines, built through proven, ethical strategies.',
    iconName: 'seo',
    heroHeading: 'Get Found on Google and AI Search',
    heroDescription:
      'We improve your visibility across traditional search engines and AI-powered search through thoughtful SEO, AEO, and content strategies. Our approach focuses on building relevant, trustworthy visibility that helps your business get discovered by the right audience.',
    problemHeading: 'Invisible on Google Means Invisible to Customers',
    problemText:
      "If your business doesn't show up when people search for what you offer, you're losing customers to competitors who do. Most businesses either ignore SEO entirely or fall for quick-fix tactics that hurt their ranking in the long run.",
    solutionText:
      "We build SEO strategies focused on lasting results — improving your website's structure, content, and authority so search engines trust it, and so do your customers. It takes time, but it builds visibility that keeps working for you.",
    features: [
      {
        title: 'Technical SEO',
        description: 'Fixing site speed, structure, and other technical issues that affect ranking.',
      },
      {
        title: 'On-Page SEO',
        description: 'Optimizing content, titles, and pages to match what your customers are searching for.',
      },
      {
        title: 'Keyword Research',
        description: 'Identifying the exact terms your potential customers use to find businesses like yours.',
      },
      {
        title: 'Content Optimization',
        description: 'Improving existing content and guiding new content to support ranking goals.',
      },
      {
        title: 'Link Building',
        description: "Building your website's authority through credible, relevant backlinks.",
      },
      {
        title: 'Monthly Reporting',
        description: 'Clear updates showing ranking progress and traffic growth.',
      },
    ],
    processHeading: 'Our SEO Process',
    processSteps: [
      {
        number: 1,
        title: 'Understand',
        description: 'We review your current website, rankings, and competitors to see where you stand.',
      },
      {
        number: 2,
        title: 'Plan',
        description: 'We build a strategy covering technical fixes, keywords, and content priorities.',
      },
      {
        number: 3,
        title: 'Build',
        description: 'We implement the improvements — on-page changes, technical fixes, and content optimization.',
      },
      {
        number: 4,
        title: 'Review & Refine',
        description: "We track rankings and traffic, adjusting the strategy based on what's actually moving the needle.",
      },
      {
        number: 5,
        title: 'Deliver & Support',
        description: 'We provide ongoing optimization and reporting, since SEO is a continuous process, not a one-time fix.',
      },
    ],
    faqsHeading: 'Common Questions About SEO',
    faqs: [
      {
        question: 'How long does SEO take to show results?',
        answer:
          "SEO is a long-term strategy — most businesses start seeing meaningful improvement within 3 to 6 months, depending on competition and starting point. We'll set clear expectations upfront.",
      },
      {
        question: 'Is SEO a one-time task or an ongoing process?',
        answer:
          'Ongoing. Search engines and competitors are constantly changing, so SEO requires continuous attention to maintain and improve rankings.',
      },
      {
        question: 'Do you guarantee a #1 ranking on Google?',
        answer:
          'No ethical SEO provider can guarantee a specific ranking, since search engines control that. What we guarantee is a proven, transparent process aimed at consistent improvement.',
      },
      {
        question: 'Will SEO work for my industry?',
        answer:
          'SEO works across almost every industry — what changes is the strategy and timeline based on competition and how people search for your type of business.',
      },
      {
        question: 'Can SEO work alongside my website and marketing efforts?',
        answer:
          "Yes — since we also handle web development and digital marketing, we make sure your SEO strategy supports everything else we're doing for you, instead of working in isolation.",
      },
    ],
    ctaHeading: 'Ready to Be Found by the Right Customers?',
    ctaSubheading: "Let's build long-term visibility that keeps bringing customers to you.",
    ctaButtonText: 'Get a Free Quote',
  },

  'youtube-automation': {
    slug: 'youtube-automation',
    title: 'YouTube Automation',
    shortDesc: 'Fully managed channels from content strategy to upload built to grow your audience on autopilot.',
    iconName: 'youtube',
    heroHeading: 'Grow a YouTube Channel Without Managing It Yourself',
    heroDescription:
      'We handle everything it takes to run a YouTube channel, from content strategy and video creation to uploading and optimization so your channel grows consistently without taking up your time.',
    problemHeading: 'Growing a Channel Takes More Time Than Most People Have',
    problemText:
      "Running a successful YouTube channel means constant content planning, scripting, editing, uploading and optimizing; on top of everything else you're already managing. Most channels stall not because the idea is bad, but because there's no time to keep up with it.",
    solutionText:
      "We manage the entire process for you. From researching what your audience wants to producing and publishing videos consistently, we run your channel like a business so it grows steadily, without needing your daily involvement.",
    features: [
      {
        title: 'Content Strategy',
        description: "Researching what your audience wants to watch and planning topics that align with your channel's goals.",
      },
      {
        title: 'Scriptwriting',
        description: 'Clear, engaging scripts built around retention and viewer interest.',
      },
      {
        title: 'Video Production & Editing',
        description: 'Professional editing, including visuals, voiceover, and pacing.',
      },
      {
        title: 'Thumbnail & Title Optimization',
        description: 'Designed to increase click-through rates without being misleading.',
      },
      {
        title: 'Upload & Scheduling Management',
        description: 'Consistent posting, handled entirely on your behalf.',
      },
      {
        title: 'Performance Tracking',
        description: 'Monitoring views, watch time, and audience growth to refine future content.',
      },
    ],
    processHeading: 'Our YouTube Automation Process',
    processSteps: [
      {
        number: 1,
        title: 'Understand',
        description: 'We learn about your niche, target audience, and channel goals.',
      },
      {
        number: 2,
        title: 'Plan',
        description: 'We build a content strategy, including topics, formats, and posting schedules.',
      },
      {
        number: 3,
        title: 'Build',
        description: 'We script, produce, and edit videos based on the strategy.',
      },
      {
        number: 4,
        title: 'Review & Refine',
        description: 'We analyze performance data and adjust content direction to improve results.',
      },
      {
        number: 5,
        title: 'Deliver & Support',
        description: 'We manage consistent uploads and remain involved in ongoing channel growth.',
      },
    ],
    faqsHeading: 'Common Questions About YouTube Automation',
    faqs: [
      {
        question: 'Do I need to appear on camera for my channel?',
        answer:
          'No. Many of the channels we manage don\'t require the owner to appear on camera, content can be built using voiceovers, stock footage, animations, or faceless formats depending on the niche.',
      },
      {
        question: 'How long does it take to see channel growth?',
        answer:
          'Growth depends on niche, competition, and consistency, but most channels start showing measurable progress within a few months of consistent uploads.',
      },
      {
        question: 'Do you own the channel, or do I?',
        answer: 'You own the channel. We manage the content and growth strategy, but the channel and its earnings remain entirely yours.',
      },
      {
        question: 'How often will new videos be posted?',
        answer:
          "Posting frequency is set based on your channel's strategy and goals, we'll agree on a schedule that's sustainable and effective before starting.",
      },
      {
        question: 'What if I already have a channel with some content?',
        answer:
          "That's fine, we can work with your existing channel, improving strategy and consistency, rather than starting from scratch.",
      },
    ],
    ctaHeading: 'Ready to Grow a Channel Without the Extra Work?',
    ctaSubheading: "Let's build a content strategy that runs consistently, even when you're not.",
    ctaButtonText: 'Get a Free Quote',
  },
};

export const serviceList = Object.values(servicesData);
