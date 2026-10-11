export const portfolioConfig = {
  siteUrl: 'https://hariziskandar.nexus',
  name: 'Hariz Iskandar',
  role: 'Full-Stack Developer & Cloud Security Enthusiast',
  intro:
    'I build secure, user-focused products with modern web technologies and practical systems thinking.',
  primaryCtaLabel: 'View Projects',
  primaryCtaHref: '#projects',
  secondaryCtaLabel: 'Contact Me',
  secondaryCtaHref: '#contact',
  // TODO(you): replace with your real public contact email
  email: 'your.email@example.com',
  location: 'Based in Malaysia',
  // TODO(you): drop your resume file at public/resume.pdf (button below points there)
  resumeUrl: '/resume.pdf',
  socialLinks: {
    github: 'https://github.com/HarizuAru',
    // TODO(you): replace with your LinkedIn profile URL
    linkedin: '#',
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
  // TODO(you): replace with your real work history (most recent first)
  experience: [
    {
      role: 'Your Role — Company Name',
      period: '2024 — Present',
      location: 'Malaysia',
      points: [
        'One-line impact statement with a metric (e.g. cut incident response from hours to minutes).',
        'Another responsibility or achievement, kept to one line.',
      ],
    },
    {
      role: 'Previous Role — Company Name',
      period: '2022 — 2024',
      location: 'Malaysia',
      points: [
        'What you owned and what it achieved, in one line.',
      ],
    },
  ],
  // TODO(you): replace with your real education / certifications
  education: [
    {
      title: 'Your Degree — University',
      period: '2018 — 2022',
      detail: 'Major, honours, or one notable achievement.',
    },
    {
      title: 'AWS Certified Solutions Architect – Associate',
      period: '2025',
      detail: 'Or any certification you hold (delete the placeholders you don’t need).',
    },
  ],
} as const;
