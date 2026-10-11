export const portfolioConfig = {
  siteUrl: 'https://hariziskandar.nexus',
  name: 'Hariz Iskandar',
  role: 'Cloud & Security Engineer',
  intro:
    'I design and build secure cloud infrastructure, threat-detection systems, automation workflows, and production-oriented applications.',
  availability: 'Open to Internship / Graduate Opportunities',
  heroTechnologies: ['AWS', 'Cloud Security', 'Networking', 'DevOps', 'Python', 'Infrastructure', 'AI Security'],
  primaryCtaLabel: 'View Projects',
  primaryCtaHref: '#projects',
  secondaryCtaLabel: 'Contact Me',
  secondaryCtaHref: '#contact',
  email: 'hariziskandar0504@gmail.com',
  location: 'Based in Malaysia',
  // Web resume (printable). For a direct PDF file, drop it at public/resume.pdf
  // and point this back at '/resume.pdf'.
  resumeUrl: '/resume',
  socialLinks: {
    github: 'https://github.com/HarizuAru',
    linkedin: 'https://www.linkedin.com/in/hariz-iskandar-9a2817251' as string,
  },
  skills: [
    {
      title: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Backend & APIs',
      items: ['Node.js', 'Express', 'REST APIs', 'Serverless Functions'],
    },
    {
      title: 'Cloud & Security',
      items: ['AWS', 'IAM', 'Observability', 'Security-first Design'],
    },
  ],
  // TODO(you): replace with your real work history (most recent first).
  // Left empty so no placeholder claims are shown; sections hide until filled.
  experience: [] as { role: string; period: string; location: string; points: string[] }[],
  // TODO(you): replace with your real education.
  education: [] as { title: string; period: string; detail: string }[],
  careerFocus: [
    {
      title: 'Cloud Infrastructure',
      description: 'Secure AWS architecture, serverless systems, networking, IAM, scalable infrastructure.',
    },
    {
      title: 'Cloud Security',
      description: 'Threat detection, monitoring, logging, IAM security, incident-response automation.',
    },
    {
      title: 'DevSecOps',
      description: 'CI/CD, automation, Linux, containers, observability, security integrated into delivery.',
    },
    {
      title: 'AI + Cloud Security',
      description: 'AI-assisted security analysis, automation, and emerging intelligent infrastructure workflows.',
    },
  ],
  currentlyLearning: [
    'AWS security architecture',
    'Infrastructure as code',
    'Cloud incident response',
    'Advanced networking',
    'AI-assisted security operations',
  ],
} as const;
