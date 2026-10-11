export type CertificationStatus = 'verified' | 'in-progress' | 'planned';
export type CertificationGroup = 'Cloud' | 'Cybersecurity' | 'Networking' | 'DevOps' | 'Other';

export interface Certification {
  name: string;
  issuer: string;
  group: CertificationGroup;
  status: CertificationStatus;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

// Only list credentials you actually hold as 'verified'.
// 'planned' items are shown as goals, never as completed.
export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    group: 'Cloud',
    status: 'planned',
    skills: ['EC2', 'S3', 'VPC', 'IAM', 'High Availability'],
  },
  {
    name: 'AWS Certified Security – Specialty',
    issuer: 'Amazon Web Services',
    group: 'Cybersecurity',
    status: 'planned',
    skills: ['Threat Detection', 'Logging', 'IAM', 'Encryption', 'Incident Response'],
  },
];
