export const portfolioConfig = {
  name: 'Hariz Iskandar',
  role: 'Full-Stack Developer & Cloud Security Enthusiast',
  intro:
    'I build secure, user-focused products with modern web technologies and practical systems thinking.',
  primaryCtaLabel: 'View Projects',
  primaryCtaHref: '#projects',
  secondaryCtaLabel: 'Contact Me',
  secondaryCtaHref: '#contact',
  email: 'your.email@example.com', // replace with your preferred public contact email
  location: 'Based in Malaysia',
  socialLinks: {
    github: 'https://github.com/HarizuAru',
    linkedin: '#', // replace with your LinkedIn profile URL
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
} as const;
