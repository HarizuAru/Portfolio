import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/section';
import { projectsData } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Skills | Hariz Iskandar',
  description:
    'Technical capability map: cloud, security, networking, DevOps, programming, infrastructure, databases and observability — with project usage.',
  alternates: { canonical: '/skills' },
};

const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: 'Cloud',
    skills: ['AWS', 'Lambda', 'S3', 'IAM', 'VPC', 'CloudWatch', 'EventBridge', 'DynamoDB', 'API Gateway'],
  },
  {
    title: 'Security',
    skills: ['IAM', 'CloudTrail', 'Threat Detection', 'Security Monitoring', 'Least Privilege', 'Logging', 'Incident Response', 'KMS'],
  },
  {
    title: 'Networking',
    skills: ['TCP/IP', 'DNS', 'Subnetting', 'Routing', 'OSPF', 'EIGRP', 'ACLs', 'VLAN', 'Firewall Concepts'],
  },
  {
    title: 'DevOps',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'CI/CD', 'SNS'],
  },
  {
    title: 'Programming',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Rust'],
  },
  {
    title: 'Infrastructure',
    skills: ['Terraform', 'CloudFormation', 'Serverless Framework'],
  },
  {
    title: 'Databases',
    skills: ['DynamoDB', 'CosmosDB'],
  },
  {
    title: 'Observability',
    skills: ['CloudWatch', 'X-Ray', 'Datadog', 'Telemetry'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'LocalStack', 'Jest', 'PyTest', 'VS Code'],
  },
];

function usageCount(skill: string): number {
  const needle = skill.toLowerCase();
  return projectsData.filter((p) => {
    const hay = [...p.tags, ...Object.values(p.techStack).flat()]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(needle);
  }).length;
}

export default function SkillsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Technical Skills"
        description="Capability map grouped by domain. Counts show in how many documented projects each skill is used — select one to see those projects."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const n = usageCount(skill);
                return (
                  <li key={`${group.title}-${skill}`}>
                    <Link
                      href={`/projects?skill=${encodeURIComponent(skill)}`}
                      title={n > 0 ? `Used in ${n} project${n === 1 ? '' : 's'}` : skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-muted hover:text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {skill}
                      {n > 0 && <span className="text-primary">×{n}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
