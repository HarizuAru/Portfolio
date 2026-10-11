import { projectsData } from '@/data/projects';

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
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

/** Number of documented projects whose tags/tech mention this skill. */
export function skillUsage(skill: string): number {
  const needle = skill.toLowerCase();
  return projectsData.filter((p) => {
    const hay = [...p.tags, ...Object.values(p.techStack).flat()]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(needle);
  }).length;
}

export interface SkillNode {
  skill: string;
  group: string;
  usage: number;
}

/** Deduplicated skills (first group wins) with usage counts, most-used first. */
export function skillNodes(): SkillNode[] {
  const seen = new Set<string>();
  const nodes: SkillNode[] = [];
  for (const g of skillGroups) {
    for (const skill of g.skills) {
      const key = skill.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      nodes.push({ skill, group: g.title, usage: skillUsage(skill) });
    }
  }
  return nodes.sort((a, b) => b.usage - a.usage || a.skill.localeCompare(b.skill));
}
