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
  experience: [
    {
      company: 'Aptronix Sdn Bhd',
      role: 'Software Developer Intern',
      period: 'Sep 2025 - Feb 2026',
      duration: '6 mos',
      location: 'On-site',
      employmentType: 'Full-time',
      points: [
        'Designed and implemented a serverless identity platform using AWS Cognito with MFA to secure over 100 user accounts.',
        'Built AWS Lambda authorization services integrated with API Gateway for JWT-based authentication and role-based access control.',
        'Implemented DynamoDB session storage supporting secure JWT validation and token revocation.',
        'Applied least-privilege IAM policies to strengthen cloud security.',
        'Configured CloudWatch monitoring for operational visibility and faster issue detection.',
        'Collaborated with developers to deliver scalable cloud authentication components.',
      ],
    },
  ],
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
