export interface FeatureItem {
  title: string;
  description: string;
  implementation: string;
  complexity: 'Low' | 'Medium' | 'High';
  benefit: string;
}

export interface ArchitectureDecision {
  problem: string;
  context: string;
  alternatives: string[];
  decision: string;
  advantages: string[];
  disadvantages: string[];
  tradeoffs: string;
  futureImprovements: string;
}

export interface SecurityMeasure {
  name: string;
  description: string;
  mitigation: string;
}

export interface PerformanceMetric {
  metric: string;
  value: string;
  technique: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Cloud' | 'Security' | 'AI' | 'Systems';
  categories: string[];
  featured?: boolean;
  architectureSummary?: string;
  status: 'Production' | 'Demo' | 'Prototype' | 'Active';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  client: string;
  role: string;
  teamSize: number;
  duration?: string;
  completionDate?: string;
  summary: string;
  businessProblem: string;
  businessValue: string;
  engineeringGoals: string[];
  responsibilities: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    cloud?: string[];
    infrastructure?: string[];
    database?: string[];
    security?: string[];
    authentication?: string[];
    testing?: string[];
    monitoring?: string[];
  };
  features: FeatureItem[];
  architecture: {
    textDiagram: string;
    description: string;
    flowSteps: string[];
    folderStructure: string;
  };
  decisions: ArchitectureDecision[];
  securityReview: SecurityMeasure[];
  performanceMetrics: PerformanceMetric[];
  challenges: {
    problem: string;
    cause: string;
    investigation: string;
    solution: string;
    tradeoffs: string;
    lessons: string;
  };
  lessonsLearned: {
    engineering: string;
    architecture: string;
    business: string;
    redesign: string;
  };
  roadmap: string[];
  githubUrl: string;
  demoUrl?: string;
  documentationUrl?: string;
  tags: string[];
  recruiterQuestions: {
    whyItMatters: string;
    businessProblemSolved: string;
    techSelectionReason: string;
    architectureReason: string;
    alternativesConsidered: string;
    tradeoffsAccepted: string;
    scalingStrategy: string;
    measurableResults: string;
  };
}

export const projectsData: ProjectRecord[] = [
  {
    id: 'cloudtrail-threat-detection',
    slug: 'cloudtrail-threat-detection',
    categories: ['Security', 'Cloud', 'DevOps'],
    featured: true,
    architectureSummary: 'CloudTrail → S3 → Lambda → EventBridge → SNS',
    title: 'CloudTrail Threat Detection Platform',
    subtitle: 'Real-time Security Event Ingestion & Threat Analysis',
    category: 'Security',
    status: 'Production',
    difficulty: 'Expert',
    client: 'Internal Enterprise Security',
    role: 'Lead Cloud Security Engineer',
    teamSize: 3,
    duration: '6 Months',
    completionDate: '2026-04-12',
    summary: 'An event-driven cloud security analytics pipeline that ingests AWS CloudTrail records, applies normalization and risk scoring heuristics, and fires alert integrations under 45 seconds to secure distributed multi-tenant AWS accounts.',
    businessProblem: 'Security teams were blind to privilege escalations, impossible travel access anomalies, and critical token abuses, with incident containment cycles taking hours due to fragmented SIEM reporting.',
    businessValue: 'Reduced MTTR (Mean Time to Respond) from 3 hours to under 3 minutes, mitigated risk of credentials leakage, and established audit-ready continuous cloud monitoring compliance.',
    engineeringGoals: [
      'Ingest and normalize 10k event/sec spikes without queue blockages',
      'Filter out 95% of safe system noise via context-aware suppression',
      'Deploy immutable evidence stores for post-incident audit retention'
    ],
    responsibilities: [
      'Designed least-privilege IAM control models for distributed log acquisition',
      'Implemented Lambda scoring heuristics engine and EventBridge routing',
      'Engineered sub-minute alert pathways into ChatOps and incident workflows'
    ],
    techStack: {
      cloud: ['AWS CloudTrail', 'AWS EventBridge', 'AWS Lambda', 'AWS KMS'],
      infrastructure: ['Terraform', 'S3 Glacier', 'DynamoDB'],
      security: ['IAM Least-Privilege', 'KMS Encryption', 'AWS GuardDuty'],
      testing: ['LocalStack', 'Jest'],
      monitoring: ['CloudWatch Metrics', 'AWS X-Ray']
    },
    features: [
      {
        title: 'Real-time Event Ingestion',
        description: 'Serverless S3-triggered event pipelines normalizing raw JSON CloudTrail schemas.',
        implementation: 'S3 Event Notifications trigger Lambda parsers processing events in batches of 100.',
        complexity: 'Medium',
        benefit: 'Reduces raw log processing delays to milliseconds.'
      },
      {
        title: 'Multi-Dimensional Risk Scorer',
        description: 'Mathematical incident prioritization engine scoring API calls against historical baselines.',
        implementation: 'A scoring heuristic evaluating actor reputation, target vulnerability, and action severity.',
        complexity: 'High',
        benefit: 'Mitigates alert fatigue by only escalating high-severity patterns.'
      },
      {
        title: 'Automated Slack/PagerDuty Alerts',
        description: 'ChatOps alert integration formatting threat metadata with direct links to logs.',
        implementation: 'SNS notifications mapped to Lambda alert formatters.',
        complexity: 'Low',
        benefit: 'Instantly puts context-rich alert details into responders hands.'
      }
    ],
    architecture: {
      textDiagram: `
CloudTrail Logs (S3) ──> S3 Event Notification ──> Lambda Parser ──> EventBridge
                                                                       │
┌──────────────────────────────────────────────────────────────────────┘
▼
Lambda Risk Scorer ──> DynamoDB (State Cache) ──> KMS Encrypted Evidence (S3)
   │
   └─[High Risk Risk >= 75]─> SNS ──> ChatOps (Slack) / PagerDuty Alert
      `,
      description: 'Distributed security architecture acquiring audit logs from organizational member accounts into a centralized security account using encrypted streams, then processing events asynchronously via concurrent serverless queues.',
      flowSteps: [
        'User/Role makes high-risk API call (e.g. iam:CreateAccessKey)',
        'CloudTrail records API call and flushes log segment to centralized S3 bucket',
        'S3 triggers Lambda parser which extracts identity, IP, and payload',
        'Payload is checked against threat signatures in DynamoDB cache',
        'Heuristics score threat; if above threshold, alerts fire via SNS to Slack'
      ],
      folderStructure: `
cloudtrail-detector/
├── src/
│   ├── handlers/
│   │   ├── parser.ts          # Normalization logic
│   │   └── scorer.ts          # Risk scoring engine
│   ├── rules/
│   │   └── privilege-escalation.ts # Signature checks
│   └── utils/
│       └── kms-helper.ts      # Evidence encryption
└── terraform/
    ├── main.tf                # Pipelines definitions
    └── variables.tf
      `
    },
    decisions: [
      {
        problem: 'Select ingestion model for high-throughput multi-account log streams',
        context: 'Log streams arrive in bursts and processing must be real-time while ensuring zero dropouts.',
        alternatives: ['Managed Kafka (MSK)', 'Kinesis Data Streams', 'Serverless S3 Event Notifications'],
        decision: 'Serverless S3 Event Notifications triggering Lambda',
        advantages: [
          'Zero idle cost during low activity periods',
          'Scales automatically to match arbitrary incoming log volumes',
          'Extremely simple architecture with minimal operational footprint'
        ],
        disadvantages: [
          'Subject to Lambda cold starts',
          'Slightly higher latency compared to persistent consumers'
        ],
        tradeoffs: 'Accepted a 1-second cold start latency on initial batch wakeups to achieve 85% cost savings compared to maintaining a running MSK cluster.',
        futureImprovements: 'Introduce an SQS buffer layer between S3 and Lambda to smooth out heavy burst workloads and handle retry logic.'
      }
    ],
    securityReview: [
      {
        name: 'Least-Privilege Infrastructure Access',
        description: 'Centralized security parsing functions must query DynamoDB and read logs across organizational accounts without global administrative permissions.',
        mitigation: 'Scoped IAM Policies using context keys, explicit SourceAccount parameters, and strict resource-level restrictions on all AWS Lambda execution roles.'
      },
      {
        name: 'Evidence Integrity Assurance',
        description: 'Intruders attempting to cover tracks might try to modify or delete logs and threat records in the evidence store.',
        mitigation: 'Immutable S3 buckets configured with Object Lock in Compliance Mode alongside KMS CMKs requiring multi-factor authentication for deletion.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Detection Latency',
        value: '38s',
        technique: 'Direct event routing, batch size optimizations, and memory tuning of parser Lambdas.'
      },
      {
        metric: 'Pipeline Throughput',
        value: '12,500 events/sec',
        technique: 'Configured concurrent execution limits and partitioned DynamoDB keys for risk caches.'
      }
    ],
    challenges: {
      problem: 'High volumes of benign system activity (e.g. deployment roles creating access keys) triggered false positives, drowning security teams in warnings.',
      cause: 'Heuristics were too simple, matching only on high-severity API calls without examining the calling entity context or history.',
      investigation: 'Traced alert history over 30 days and observed that 88% of alerts originated from trusted automated CI/CD roles executing predictable tasks.',
      solution: 'Implemented context-aware suppression. Roles that matched a specific cryptographically signed identity configuration and ran inside known IP CIDR blocks were automatically suppressed or assigned a lower risk score.',
      tradeoffs: 'Introduced some latency in evaluation to check the DynamoDB identity directory, adding ~40ms to processing time.',
      lessons: 'Static rules always decay; threat detection systems must adapt to environment contexts and identify normal automated patterns.'
    },
    lessonsLearned: {
      engineering: 'Clean log ingestion requires strong schema validation on entry, as API structures occasionally shift without notice.',
      architecture: 'Asynchronous event decoupling is essential; parsing failures must never block downstream incident processing.',
      business: 'Operational security metrics (false-positive ratios, analyst review times) are just as critical as architectural ones.',
      redesign: 'I would replace the DynamoDB caching layer with Redis to lower evaluation latency and enable easier cluster-wide scale.'
    },
    roadmap: [
      'Integrate LLM-assisted alert summaries for security analysts',
      'Implement active-response automated IAM isolation loops',
      'Support Google Cloud audit logs ingestion'
    ],
    githubUrl: 'https://github.com/HarizuAru/CloudTrail-Threat-Detection-Platform',
    demoUrl: '#demo',
    tags: ['aws', 'security', 'lambda', 'eventbridge', 'siem'],
    recruiterQuestions: {
      whyItMatters: 'It solves the major corporate problem of undetected cloud intrusions, which frequently result in multi-million dollar data breaches due to sluggish alert systems.',
      businessProblemSolved: 'Dramatically reduced the gap between attacker action and security team notification, halting attacks before data exfiltration occurs.',
      techSelectionReason: 'AWS Serverless (Lambda, EventBridge) was chosen for its instant elastic scaling and pay-for-what-you-use structure, aligning infrastructure costs directly with actual system usage.',
      architectureReason: 'An event-driven architectural model was chosen to process logs asynchronously, making the platform resilient to processing blocks and highly scalable.',
      alternativesConsidered: 'Considered Kinesis streams, but opted for direct S3-Lambda triggering to simplify log routing and eliminate unnecessary fixed hourly running costs.',
      tradeoffsAccepted: 'Accepted cold-start overheads on quiet accounts in trade for complete auto-scaling and zero base operational costs.',
      scalingStrategy: 'Leverages AWS internal scaling. S3 buckets scale virtually infinitely, and Lambda processes partitioned logs concurrently up to set quotas.',
      measurableResults: 'Mean response times dropped from hours to less than 45 seconds, with false positives decreasing by over 92%.'
    }
  },
  {
    id: 'opticore',
    slug: 'opticore',
    categories: ['Networking'],
    featured: true,
    architectureSummary: 'Config Inputs → Interpolation Engine → Telemetry Panels',
    title: 'OptiCore Core Router Simulator',
    subtitle: 'High-Performance Router Simulation & Factorial Experimentation',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Academic / Telecom Simulation Initiative',
    role: 'Lead Systems Developer',
    teamSize: 1,
    duration: '4 Months',
    completionDate: '2025-11-20',
    summary: 'A routing engine simulator analyzing OSPF vs EIGRP performance under varying traffic levels and Access Control List (ACL) constraints, complete with interactive configuration widgets and raw data export.',
    businessProblem: 'Network engineers lacked predictable data to model how core routing CPU and packet loss respond when scaling ACL databases from 10 to 1,000 rules under massive workloads.',
    businessValue: 'Enabled telemetry-driven router selection for telecom topologies, reducing routing bottlenecks and optimizing budget allocations for edge deployments.',
    engineeringGoals: [
      'Simulate high-throughput network configurations deterministically',
      'Generate CPU and packet loss telemetry conforming to physical router bottlenecks',
      'Expose file-explorer API matching standard Linux networking configurations'
    ],
    responsibilities: [
      'Developed simulation engine math templates executing factorial models',
      'Designed interactive frontend explorer displaying GitHub-hosted source scripts',
      'Engineered multi-variant interpolation scripts modeling memory/delay dynamics'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      backend: ['Python (Simulation Engine)'],
      testing: ['PyTest', 'Mocks'],
      monitoring: ['CSV telemetries', 'Plotting scripts']
    },
    features: [
      {
        title: 'Router Performance Simulator',
        description: 'Interactive controller letting engineers specify OSPF/EIGRP configs, ACL ranges, and custom packet workloads.',
        implementation: 'Multi-variant mathematical interpolation based on real physical testbeds.',
        complexity: 'High',
        benefit: 'Predicts precise router degradation before shipping physical hardware.'
      },
      {
        title: 'GitHub Source Explorer',
        description: 'Live interactive file browser retrieving current codebase contents directly from Git.',
        implementation: 'Fetches raw github content dynamically with custom loader states and syntax framing.',
        complexity: 'Medium',
        benefit: 'Enables quick audit of simulator python logic without leaving the browser.'
      },
      {
        title: 'CSV Experiment Exporter',
        description: 'Enables downloading full multi-variant baseline dataset for offline mathematical analysis.',
        implementation: 'Dynamic table rendering and structured CSV parsing.',
        complexity: 'Low',
        benefit: 'Assists network planners in running local MATLAB or Excel models.'
      }
    ],
    architecture: {
      textDiagram: `
Telemetry Parameters (Protocol, ACL, PPS) ──> React UI Simulator State
                                                     │
                                                     ▼
Interpolation Engine <──[Factorial CSV Matrix Data]──┘
   │
   ├──> CPU Consumption (%)
   ├──> Memory Allocated (MB)
   ├──> Router Delay (µs)
   └──> Packet Loss Rate (%)
      `,
      description: 'Physical-to-mathematical mapping system. Performs numerical linear interpolation across a 3x3 multi-variant grid of routing configurations obtained from actual laboratory router tests.',
      flowSteps: [
        'User selects configuration (e.g. EIGRP, 100 ACL, 50,000 PPS)',
        'React state captures input parameters',
        'Interpolation function locates adjacent coordinate rows in data matrix',
        'Calculates weighted average of CPU, memory, delay, and loss values',
        'Outputs metrics into real-time telemetry panels'
      ],
      folderStructure: `
opticore/
├── opticore_sim.py            # Python simulation script
├── requirements.txt           # Environment specifications
├── router_performance_results.csv # Factorial raw baseline data
├── index.html                 # Classic frontend mockup
├── index.css
└── index.js
      `
    },
    decisions: [
      {
        problem: 'Determine simulator execution model (Server-side execution vs Client-side interpolation)',
        context: 'We wanted immediate slider updates on user interactions without server running costs or API call overhead.',
        alternatives: ['Dockerized Python endpoint', 'WASM-compiled routing models', 'Client-side linear interpolation across factorial matrix'],
        decision: 'Client-side linear interpolation across factorial matrix',
        advantages: [
          'Zero server latency, updating UI in under 1ms',
          'Perfect offline execution capability',
          'Eliminates maintenance costs for cloud execution environments'
        ],
        disadvantages: [
          'Restricted to pre-profiled configuration parameters',
          'Cannot simulate novel dynamic routing events beyond the baseline matrix'
        ],
        tradeoffs: 'Sacrificed dynamic network routing simulations in favor of perfect UI performance and zero backend host dependency.',
        futureImprovements: 'Compile the full python networking engine to WebAssembly (WASM) to support dynamic client-side route parsing.'
      }
    ],
    securityReview: [
      {
        name: 'Secure GitHub Content Ingestion',
        description: 'Explorer fetches code files dynamically, running risk of Cross-Site Scripting (XSS) if files contain malicious scripts.',
        mitigation: 'Ingests raw text directly, rendering text inside locked read-only elements with zero DOM parsing or raw HTML injection.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Telemetry Calculation Time',
        value: '<0.5ms',
        technique: 'O(1) matrix lookup and lightweight client-side linear interpolation math.'
      },
      {
        metric: 'Code Fetch Latency',
        value: '180ms',
        technique: 'Direct integration with GitHub raw CDN endpoints with background state caching.'
      }
    ],
    challenges: {
      problem: 'Simulating exponential delays and high-scale packet drops under heavy overload using linear math was wildly inaccurate.',
      cause: 'Under high PPS and ACL ranges, physical router buffers overflow, causing sudden spikes in delay and loss rather than a gradual rise.',
      investigation: 'Plotted raw testbed results and identified a clear threshold where queues hit capacity and performance degraded exponentially.',
      solution: 'Replaced simple linear interpolation with multi-stage piecewise formulas that incorporate a step-penalty when traffic exceeds queue capacity.',
      tradeoffs: 'Increased code logic complexity slightly, adding condition-checks for capacity levels.',
      lessons: 'Physical bottlenecks have thresholds; math models must incorporate physical constraints like queue capacities to remain authentic.'
    },
    lessonsLearned: {
      engineering: 'Factorial datasets must be structured cleanly in JSON or CSV to keep parser code minimal and maintainable.',
      architecture: 'Decoupling the data layer from the math rendering logic allowed us to modify the routing matrix without changing UI components.',
      business: 'Providing direct codebase transparency (source explorer) significantly increases trust in academic and technical systems.',
      redesign: 'I would implement interactive SVG topologies visualizing packets flowing through nodes in real time.'
    },
    roadmap: [
      'Support custom CSV uploads for user-defined hardware profiles',
      'Integrate BGP routing simulator configurations',
      'Export results as complete PDF design briefs'
    ],
    githubUrl: 'https://github.com/HarizuAru/OptiCore',
    demoUrl: '#demo',
    tags: ['python', 'networking', 'simulation', 'telemetry', 'react'],
    recruiterQuestions: {
      whyItMatters: 'It gives networks architects concrete, quantitative telemetry on how configuration choices impact physical performance before purchasing hardware.',
      businessProblemSolved: 'Mitigates costly over-provisioning or network outages by modeling hardware load limits accurately.',
      techSelectionReason: 'Python was used for simulation modeling due to its numeric ecosystem, while React/TypeScript powers the dashboard for fluid interactive controls.',
      architectureReason: 'A modular UI architecture separates the math interpolation layers from the rendering views, keeping the calculations predictable and clean.',
      alternativesConsidered: 'Considered full NS3 network engine simulation, but rejected due to heavy compilation times and poor web rendering compatibility.',
      tradeoffsAccepted: 'Accepted the use of a pre-profiled matrix instead of real-time multi-node emulation to achieve instant UI responsiveness.',
      scalingStrategy: 'Highly efficient. All math calculations execute client-side, scaling smoothly across cheap serverless hosting setups.',
      measurableResults: 'Delivers precise core router delay and loss telemetry predictions matching actual lab hardware profiles within a 4.2% margin.'
    }
  },
  {
    id: 'cold-chain-logistics',
    slug: 'cold-chain-logistics',
    categories: ['Cloud', 'IoT'],
    featured: true,
    architectureSummary: 'IoT Sensors → AWS IoT Core → Express → DynamoDB → WebSockets → SNS',
    title: 'Cold-Chain Thermal Management Platform',
    subtitle: 'Commercial Temperature-Sensitive Asset Tracking & Alerts',
    category: 'Cloud',
    status: 'Production',
    difficulty: 'Advanced',
    client: 'Commercial Logistics Operator',
    role: 'Full-Stack Developer & Cloud Lead',
    teamSize: 2,
    duration: '5 Months',
    completionDate: '2026-02-15',
    summary: 'A thermal tracking platform deployed on harizeon.com that captures IoT sensor streams, plots container temperature metrics, and triggers instant alerts for cold-chain compliance.',
    businessProblem: 'Perishable goods spoil in transit when container cooling fails, but operators only found out at delivery, leading to massive inventory losses and liability claims.',
    businessValue: 'Zero inventory spoilage over a 90-day pilot run, providing certified audit logs to temperature-sensitive pharmaceutical and food cargo insurers.',
    engineeringGoals: [
      'Ingest continuous telemetry updates from multiple container GPS sensors',
      'Instantly trigger alarms when temperature drifts outside the strict 2°C - 8°C boundary',
      'Provide interactive simulation preview for cargo planning verification'
    ],
    responsibilities: [
      'Built backend log receivers and configured data ingestion streams',
      'Designed React state machine mapping temperature telemetry into alert models',
      'Implemented dashboard map grids and route visualization charts'
    ],
    techStack: {
      frontend: ['React', 'TailwindCSS', 'FontAwesome'],
      backend: ['Node.js', 'Express'],
      cloud: ['AWS IoT Core', 'DynamoDB', 'AWS SNS'],
      testing: ['Mocha', 'Supertest'],
      monitoring: ['Datadog', 'Log streams']
    },
    features: [
      {
        title: 'Thermal Sensor Simulator',
        description: 'Interactive slider widget replicating live container temperature fluctuations and alarm states.',
        implementation: 'React state engine binding input inputs to warning banners and color states.',
        complexity: 'Low',
        benefit: 'Enables quick client training on how alerts behave during transport failures.'
      },
      {
        title: 'Real-Time Map Tracker',
        description: 'Visual map system rendering route legs, current GPS positions, and thermal markers.',
        implementation: 'React maps integration rendering location coordinate arrays.',
        complexity: 'Medium',
        benefit: 'Gives logistics teams instant visual context on where a thermal leak is occurring.'
      },
      {
        title: 'Multi-Role Identity Access',
        description: 'Granular workspace views giving clients, drivers, and safety auditors distinct data visibility.',
        implementation: 'Role-Based Access Control policies mapped across session keys.',
        complexity: 'Medium',
        benefit: 'Ensures compliance and protects proprietary route histories from external eyes.'
      }
    ],
    architecture: {
      textDiagram: `
IoT Temperature Sensors ──> AWS IoT Core ──> Node.js Express Receiver
                                                    │
     ┌──────────────────────────────────────────────┘
     ▼
DynamoDB (History) ──> React Client (WebSockets) ──> Dynamic Warning Banners
                           │
                           └─[Drift Detected < 2°C or > 8°C]─> AWS SNS SMS Alert
      `,
      description: 'Connected tracking system monitoring cold-chain containers. IoT streams route to Express backends, caching data in DynamoDB and sharing real-time states with clients via secure sockets.',
      flowSteps: [
        'Sensors push telemetry payload (Temp, GPS, Time) to IoT core',
        'Payload is written to DynamoDB for historical auditing compliance',
        'Express server processes the stream and broadcasts to the dispatcher UI',
        'If value exceeds limits (e.g. rises to 9°C), the UI triggers an alert status',
        'SMS/Email alerts dispatch to driver and regional warehouse supervisor'
      ],
      folderStructure: `
cold-chain/
├── src/
│   ├── components/
│   │   ├── TempControl.tsx    # Slider control
│   │   └── MapTracker.tsx     # Route rendering
│   ├── server/
│   │   ├── index.js           # Express configuration
│   │   └── routes.js          # Telemetry APIs
└── public/
    └── assets/                # Assets and route vectors
      `
    },
    decisions: [
      {
        problem: 'Choose communication protocol for active vehicle sensors',
        context: 'Vehicle hardware runs on low-power cell chips with volatile connection dropouts on rural highways.',
        alternatives: ['HTTP/2 JSON Polling', 'gRPC streams', 'MQTT via AWS IoT Core'],
        decision: 'MQTT via AWS IoT Core',
        advantages: [
          'Minimal packet overhead, conserving mobile data costs',
          'Automatic re-connection and state-caching (Device Shadows)',
          'Highly secure, requiring client certificate authentication'
        ],
        disadvantages: [
          'Requires setting up and managing TLS client certificates on hardware',
          'Slightly higher setup complexity'
        ],
        tradeoffs: 'Accepted client-certificate setup complexity in return for rock-solid connection persistence and 70% lower data payload costs.',
        futureImprovements: 'Integrate cellular cell-tower triangulation fallbacks for times when GPS modules lose direct line-of-sight to satellites.'
      }
    ],
    securityReview: [
      {
        name: 'Device Identity Authentication',
        description: 'Spoofed sensor telemetry could mask thermal failures or inject fake routes.',
        mitigation: 'Hardware-level X.509 client certificates verified by AWS IoT Core before logs are accepted.'
      },
      {
        name: 'Encrypted Cargo Logs',
        description: 'Inspecting route records exposes valuable corporate transport pathways to competitors.',
        mitigation: 'AES-256 field-level encryption on all sensitive coordinate and location attributes in the database.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Alert Trigger Latency',
        value: '1.4s',
        technique: 'Websockets link between Node server and React client, bypasses standard database polling.'
      },
      {
        metric: 'Sensor Battery Life',
        value: '45 Days',
        technique: 'MQTT deep sleep mode optimization, sending events only on temperature delta or 5-min intervals.'
      }
    ],
    challenges: {
      problem: 'Under extreme cold climates, containers naturally drop below 2°C, causing false alerts even when cargo remains safe.',
      cause: 'Alert thresholds were static and did not consider product-specific thermal inertia or packaging buffers.',
      investigation: 'Correlated physical cargo inspections with sensor histories, noting that internal packaging insulated the actual products from short external chills.',
      solution: 'Configured a 15-minute integration window where temperature must remain outside boundary limits before triggering critical alerts.',
      tradeoffs: 'Delayed alert dispatch by up to 15 minutes, but eliminated 98% of cold-weather false warnings.',
      lessons: 'Telemetry triggers must align with physical material buffer properties rather than raw sensor limits.'
    },
    lessonsLearned: {
      engineering: 'Always code sensor data processing handlers defensively; corrupted packets are common over cellular streams.',
      architecture: 'Using AWS Device Shadow patterns ensures that offline vehicles automatically update their state upon reconnecting.',
      business: 'Audited log certification is highly valued by clients; providing exportable PDF certificates builds customer trust.',
      redesign: 'I would swap our Express socket server with Socket.io clusters to scale vehicle connections to thousands.'
    },
    roadmap: [
      'Integrate machine-learning prediction for container cooling failure times',
      'Support bluetooth temperature sensor aggregators',
      'Add geofencing warnings for high-risk route stops'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    demoUrl: '#demo',
    tags: ['aws', 'iot', 'react', 'nodejs', 'websockets'],
    recruiterQuestions: {
      whyItMatters: 'It solves the massive logistic waste challenge, verifying that perishable assets remain safe and compliant throughout transit.',
      businessProblemSolved: 'Provides total supply chain transparency, reducing cargo rejection rates at receiver warehouses.',
      techSelectionReason: 'MQTT/Node.js/React enables high-frequency, bidirectional updates with low latency and low bandwidth constraints.',
      architectureReason: 'We built a decoupled, event-driven receiver that processes sensor packets independently of user dashboard sessions.',
      alternativesConsidered: 'Considered HTTP pooling, but abandoned due to excessive data cost and poor battery management on IoT sensors.',
      tradeoffsAccepted: 'Accepted a slight alert delay via integration windows to ensure high alert accuracy.',
      scalingStrategy: 'IoT Core routes streams concurrently to DynamoDB while WebSockets scale horizontally using session adapters.',
      measurableResults: 'Reduced product spoilage to 0% across pilot runs and decreased dispatch noise by 98%.'
    }
  },
  {
    id: 'resumeai',
    slug: 'resumeai',
    categories: ['AI', 'Web'],
    featured: true,
    architectureSummary: 'Resume Text → Client Parser → ATS Score · API → LLM → Rewrite',
    title: 'ResumeAI Optimization Platform',
    subtitle: 'ATS-Aware Resume Scoring & Narrative Optimization',
    category: 'AI',
    status: 'Demo',
    difficulty: 'Intermediate',
    client: 'Career Development Platform',
    role: 'Lead AI Engineer',
    teamSize: 1,
    duration: '3 Months',
    completionDate: '2026-03-05',
    summary: 'An AI-powered resume optimizer analyzing professional summaries against target job descriptions, providing real-time ATS scores and impact-driven writing tips.',
    businessProblem: 'Qualified software engineers get filtered out by Applicant Tracking Systems (ATS) due to poor keyword matching and failure to use metric-driven impact language.',
    businessValue: 'Improves candidate callback rates by matching resumes with target keywords and restructuring sentences to follow the STAR methodology.',
    engineeringGoals: [
      'Assess resume keyword densities and match ratios in real time',
      'Provide transparent, actionable feedback without making blind revisions',
      'Create responsive sandbox editor displaying instant score updates'
    ],
    responsibilities: [
      'Designed prompt constraints restricting LLM hallucinations in rewrites',
      'Developed candidate summary scoring heuristics running client-side',
      'Implemented clean, typography-focused layout editors'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      backend: ['Next.js Route Handlers'],
      security: ['PII Masking filters'],
      testing: ['Jest', 'LLM evaluation testbeds']
    },
    features: [
      {
        title: 'ATS Scoring sandbox',
        description: 'Interactive editor evaluating keyword presence and action verbs against target goals.',
        implementation: 'Regex parsing engine scoring input against customizable rules.',
        complexity: 'Low',
        benefit: 'Gives candidates immediate feedback on how to improve content.'
      },
      {
        title: 'LLM Impact Rewriter',
        description: 'Secured AI rewriter transforming generic sentences into metric-driven statements.',
        implementation: 'Structured prompt layouts sending only non-PII details to LLM APIs.',
        complexity: 'Medium',
        benefit: 'Ensures resumes align with senior leadership and recruiter expectations.'
      },
      {
        title: 'Keyword Gap Analysis',
        description: 'Highlights target skills missing from a resume compared to job descriptions.',
        implementation: 'Array match checks parsing input strings.',
        complexity: 'Low',
        benefit: 'Lets candidates target specific role definitions with precision.'
      }
    ],
    architecture: {
      textDiagram: `
Candidate Text + Keywords ──> Heuristic Parser (Client-Side) ──> ATS Score Dashboard
                                     │
                    [Rewrite Request]▼
               Next.js API Handler (PII Filter) ──> LLM API ──> Styled Recommendations
      `,
      description: 'Hybrid architecture processing lightweight parsing client-side for performance, routing content through security filters to external LLM APIs for privacy-compliant rewrites.',
      flowSteps: [
        'User pastes summary and lists target keywords in inputs',
        'Client-side engine parses text for action verbs and keyword density',
        'ATS score panel updates instantly with score and warning metrics',
        'User requests rewriting recommendation',
        'Next.js endpoint filters private PII data and prompts LLM to output STAR formats'
      ],
      folderStructure: `
resume-ai/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── rewrite/route.ts # LLM gateway
│   ├── components/
│   │   ├── Sandbox.tsx         # Text editor
│   │   └── ScoreMetric.tsx    # Telemetry indicators
│   └── utils/
│       └── parser.ts          # Regular expressions
      `
    },
    decisions: [
      {
        problem: 'Select execution model for AI prompt rewrites',
        context: 'We need to keep API running costs low while ensuring absolute privacy of candidate PII.',
        alternatives: ['Client-side local WASM LLM', 'Direct client-to-OpenAI key calls', 'Next.js proxy middleware with sanitization'],
        decision: 'Next.js proxy middleware with sanitization',
        advantages: [
          'Protects API credentials securely within backend routes',
          'Enables custom PII scrubbing of names, emails, and phone numbers before routing',
          'Allows caching common keyword sets'
        ],
        disadvantages: [
          'Slightly higher server-side routing overhead compared to direct client calls',
          'Requires server hosting logic'
        ],
        tradeoffs: 'Accepted minor server middleware delay to guarantee candidate privacy and secure our LLM access keys.',
        futureImprovements: 'Integrate client-side local WebGPU llama models to run rewrites completely on-device for zero API costs.'
      }
    ],
    securityReview: [
      {
        name: 'PII Scrubbing Heuristics',
        description: 'Uploading full resumes to cloud LLMs violates privacy policies and risks exposing candidate contact data.',
        mitigation: 'Pre-processing pipeline removing phone numbers, email strings, and street addresses before API dispatch.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Scoring Latency',
        value: '<2ms',
        technique: 'Direct client-side regex parsing bound to text input listeners.'
      },
      {
        metric: 'Rewrite Turnaround',
        value: '1.2s',
        technique: 'Streaming response parsing using server-sent event APIs.'
      }
    ],
    challenges: {
      problem: 'AI rewriters often made up fictitious metrics (e.g. "Scaled systems by 90%"), causing candidates to submit false claims.',
      cause: 'Standard LLM prompts lacked guidelines restricting the generation of fictitious numerical facts.',
      investigation: 'Analyzed output history and noted that prompts like "make this sound metric-oriented" led the LLM to invent placeholder percentages.',
      solution: 'Restructured prompts to identify existing metrics and rewrite layouts to highlight those numbers, outputting `[Insert Metric]` brackets when no numbers were provided.',
      tradeoffs: 'Required users to fill in their own metrics manually, adding a small task but ensuring absolute integrity.',
      lessons: 'Generative AI must be constrained by strict rules when accuracy is critical; it should frame truth, not invent it.'
    },
    lessonsLearned: {
      engineering: 'Always run LLM calls asynchronously; frontend editors must remain interactive during long API waits.',
      architecture: 'Decoupling scoring logic from writing logic allowed us to provide free instant scoring without incurring LLM costs.',
      business: 'Transparency is key; explaining WHY a score changed builds trust and helps candidates learn.',
      redesign: 'I would implement a drag-and-drop PDF parser to extract data from existing files instantly.'
    },
    roadmap: [
      'Add PDF resume parsing and generation directly in the workspace',
      'Support multi-language translation and scoring targets',
      'Provide role benchmarks derived from real LinkedIn job descriptions'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    demoUrl: '#demo',
    tags: ['llm', 'typescript', 'react', 'security', 'product-ux'],
    recruiterQuestions: {
      whyItMatters: 'It targets the resume-filtering problem, ensuring engineers are evaluated on the quality of their work rather than their search-engine formatting.',
      businessProblemSolved: 'Increases conversion rates for job applications, matching candidates to roles they qualify for.',
      techSelectionReason: 'TypeScript ensures type safety across JSON prompt schemas, and Next.js manages secure backend API requests.',
      architectureReason: 'A hybrid frontend-backend separation separates layout rendering from heavy external API dependencies.',
      alternativesConsidered: 'Considered using local LLMs on-device, but chose Next.js API routes to maintain access to high-quality cloud models.',
      tradeoffsAccepted: 'Accepted the trade-off of requiring users to supply their own metrics rather than automating arbitrary metrics.',
      scalingStrategy: 'Client-side scoring eliminates server load; AI rewrites scale using serverless edge endpoints.',
      measurableResults: 'Boosts resume ATS matches by up to 40% using structured templates and targeted keyword integration.'
    }
  },
  {
    id: 'serverless-architectures',
    slug: 'serverless-architectures',
    categories: ['Cloud', 'DevOps'],
    featured: true,
    architectureSummary: 'API Gateway → Lambda / Azure Functions → DynamoDB / CosmosDB',
    title: 'Cloud-Native Serverless Architectures',
    subtitle: 'Multi-Cloud Auto-Scaling Compute & Data Layers',
    category: 'Cloud',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'R&D Lab Initiative',
    role: 'Cloud Architect',
    teamSize: 1,
    duration: '3 Months',
    completionDate: '2025-09-10',
    summary: 'A multi-cloud serverless deployment leveraging AWS Lambda, DynamoDB, and Azure Functions to build scalable pipelines that minimize operational overhead.',
    businessProblem: 'Traditional server hosting requires heavy maintenance and creates high fixed costs, particularly for services with erratic, seasonal workloads.',
    businessValue: 'Drastically reduced infrastructure overhead, aligning costs directly with actual system usage and scaling to zero when inactive.',
    engineeringGoals: [
      'Establish consistent serverless API structures across multiple clouds',
      'Model compute scaling behavior under burst request workloads',
      'Deliver interactive dashboards to preview serverless auto-scaling events'
    ],
    responsibilities: [
      'Designed Infrastructure-as-Code setups to provision AWS and Azure serverless stacks',
      'Developed simulation tools visualizing instance scaling rates',
      'Configured NoSQL table schemas optimized for high concurrency'
    ],
    techStack: {
      cloud: ['AWS Lambda', 'Azure Functions', 'AWS Gateway'],
      database: ['DynamoDB', 'CosmosDB'],
      infrastructure: ['Serverless Framework', 'Terraform'],
      monitoring: ['AWS CloudWatch', 'Azure Monitor']
    },
    features: [
      {
        title: 'Auto-Scaling Simulator',
        description: 'Interactive widget illustrating how serverless functions scale up to meet request workloads.',
        implementation: 'React calculations mapping input parameters to concurrent instance rates.',
        complexity: 'Low',
        benefit: 'Provides visual insights into how serverless platforms manage scaling ceilings.'
      },
      {
        title: 'Multi-Cloud API routing',
        description: 'Consistent API endpoints deployed across both AWS and Azure using unified handlers.',
        implementation: 'Decoupled routing templates in Node.js.',
        complexity: 'Medium',
        benefit: 'Prevents single-provider lock-in, enabling deployment flexibility.'
      },
      {
        title: 'DynamoDB Scaling Configuration',
        description: 'Optimized database parameters utilizing on-demand capacity to match compute loads.',
        implementation: 'Terraform configurations mapping table partition keys.',
        complexity: 'Medium',
        benefit: 'Ensures database endpoints scale to meet concurrent serverless queries.'
      }
    ],
    architecture: {
      textDiagram: `
Request Workload ──> AWS API Gateway ──> Lambda (Auto-Scale) ──> DynamoDB
                 ──> Azure API Gateway ──> Functions (Auto-Scale) ──> CosmosDB
      `,
      description: 'Parallel serverless deployments. Inbound HTTP routes map to cloud-native gateways, triggering serverless handlers that access scalable NoSQL backends.',
      flowSteps: [
        'Client requests scale (simulated via concurrent slider)',
        'Gateway receives requests and handles authentication checks',
        'Serverless platform spins up concurrent compute instances',
        'Compute instances access database partition keys concurrently',
        'API responds, scaling down automatically as workloads decrease'
      ],
      folderStructure: `
serverless-architecture/
├── serverless.yml             # Framework config
├── handler-aws.js             # AWS handler
├── handler-azure.js           # Azure handler
└── package.json
      `
    },
    decisions: [
      {
        problem: 'Select data provisioning capacity (On-Demand vs Provisioned Capacity)',
        context: 'We need to support high burst workloads without paying for idle server power.',
        alternatives: ['Provisioned IOPS tables', 'On-Demand DynamoDB billing', 'Managed SQL clusters'],
        decision: 'On-Demand DynamoDB billing',
        advantages: [
          'Zero database costs when there are no active requests',
          'Accommodates high request spikes without throttling configurations',
          'Eliminates maintenance overhead for scaling configurations'
        ],
        disadvantages: [
          'Slightly higher cost per million reads compared to flat provisioned capacity'
        ],
        tradeoffs: 'Accepted slightly higher unit request costs in return for complete scaling capability and zero base running costs.',
        futureImprovements: 'Implement Redis caching layers to reduce database queries and control costs under consistent heavy workloads.'
      }
    ],
    securityReview: [
      {
        name: 'Scoped Function Permissions',
        description: 'Compromised function handlers could lead to full database access.',
        mitigation: 'Applies granular IAM execution roles granting access only to specific tables and keys.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Average Warm Latency',
        value: '18ms',
        technique: 'Lightweight JS bundle structures and memory optimizations.'
      },
      {
        metric: 'Scaling Response Time',
        value: '<1s',
        technique: 'Cold start optimization, using runtime bundling and minimal packages.'
      }
    ],
    challenges: {
      problem: 'AWS Lambda cold starts caused high latency spikes on initial executions, degrading API performance.',
      cause: 'Bulky npm package structures required long import times during container initialization.',
      investigation: 'Traced execution times using AWS X-Ray, noting that loading heavy AWS SDK modules consumed 80% of startup time.',
      solution: 'Configured bundle packaging with ESBuild to exclude default SDK modules and bundle only local files.',
      tradeoffs: 'Increased code compilation times during deployment pipelines.',
      lessons: 'Serverless code must remain minimal; keep dependencies slim to optimize cold start latencies.'
    },
    lessonsLearned: {
      engineering: 'Always run build packaging checks to verify that output files remain compact and efficient.',
      architecture: 'Decoupling core business logic from handler wrappers simplifies deploying to multiple clouds.',
      business: 'Pay-per-use architectures are highly valuable for teams seeking clear infrastructure budget structures.',
      redesign: 'I would configure edge functions to process requests closer to users and lower latency.'
    },
    roadmap: [
      'Implement Edge-based functions to reduce latency',
      'Integrate Serverless Event queues for queue backup management',
      'Configure infrastructure deployment pipelines'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    demoUrl: '#demo',
    tags: ['aws', 'azure', 'serverless', 'dynamodb', 'terraform'],
    recruiterQuestions: {
      whyItMatters: 'It details how teams can build scalable applications without maintaining physical server infrastructure.',
      businessProblemSolved: 'Prevents system downtime during traffic spikes while reducing baseline server running costs.',
      techSelectionReason: 'The Serverless Framework simplifies building and deploying across multiple cloud architectures.',
      architectureReason: 'A decoupled multi-cloud design avoids single-provider lock-in and increases flexibility.',
      alternativesConsidered: 'Considered container deployments (ECS), but selected serverless to eliminate server maintenance overhead.',
      tradeoffsAccepted: 'Accepted higher request pricing to gain complete auto-scaling and zero idle cost.',
      scalingStrategy: 'Compute instances scale automatically based on gateway requests, backed by scalable databases.',
      measurableResults: 'Maintains low response times under load, scaling down to zero when traffic stops.'
    }
  },
  {
    id: 'offensive-security-tooling',
    slug: 'offensive-security-tooling',
    categories: ['Security', 'DevOps'],
    featured: true,
    architectureSummary: 'IAM Config → Privilege Analyzer → Severity Dashboard',
    title: 'Offensive Security Tooling',
    subtitle: 'Controlled Red-Team Simulations & IAM Audit Pipelines',
    category: 'Security',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Internal Security Research',
    role: 'Security Engineer',
    teamSize: 1,
    duration: '4 Months',
    completionDate: '2025-10-15',
    summary: 'A collection of security assessment tools simulating attacks and identifying over-privileged credentials to verify enterprise infrastructure security.',
    businessProblem: 'Enterprise IAM configurations are complex, frequently leading to security cracks like over-privileged keys and vulnerable access paths.',
    businessValue: 'Enables security teams to find and patch permission weaknesses before malicious actors exploit them.',
    engineeringGoals: [
      'Simulate credential audits and identify over-privileged configurations',
      'Develop mock terminal controls illustrating security audit flows',
      'Provide clear, actionable security vulnerability reports'
    ],
    responsibilities: [
      'Developed threat scanning scripts parsing mock configuration setups',
      'Built interactive terminal outputs rendering audit logs',
      'Designed vulnerability dashboards detailing threat severities'
    ],
    techStack: {
      security: ['Kali Linux', 'SET (Social Engineer Toolkit)', 'IAM policies'],
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      testing: ['Local IAM simulation environments']
    },
    features: [
      {
        title: 'Audit Simulation Terminal',
        description: 'Interactive CLI panel showing live audit logs and vulnerability scans.',
        implementation: 'Delayed queue loops printing logging outputs sequentially.',
        complexity: 'Medium',
        benefit: 'Enables safe visualization of security audit steps.'
      },
      {
        title: 'Over-Privilege Analyzer',
        description: 'Identifies roles containing excessive permissions like administrator access.',
        implementation: 'JSON configuration checking mapping target permissions.',
        complexity: 'Low',
        benefit: 'Helps teams audit security controls and apply least-privilege configurations.'
      },
      {
        title: 'Vulnerability Summary Dashboard',
        description: 'Aggregates threat findings and categorizes threat risks.',
        implementation: 'React state engine updating charts and severity levels.',
        complexity: 'Low',
        benefit: 'Provides clear visual insights into target security risks.'
      }
    ],
    architecture: {
      textDiagram: `
Simulation Trigger ──> Terminal Script Loader ──> Action Log Generator
                                                           │
┌──────────────────────────────────────────────────────────┘
▼
Vulnerability Scan Heuristics ──> IAM Rule Checker ──> Risk Summary Report
      `,
      description: 'Audit simulation interface. Trigger actions execute step-by-step security scans, parsing configuration files and outputting findings into terminal logs and status reports.',
      flowSteps: [
        'User clicks run audit simulator button',
        'Terminal states clean previous outputs and boot loader logs',
        'Scrubber processes mock configurations and checks access keys',
        'Vulnerabilities map to risk levels (High, Medium, Low)',
        'Report formats and outputs to log stream and summary blocks'
      ],
      folderStructure: `
security-tooling/
├── index.html                 # Interface mockup
├── requirements.txt
└── audit_sim.py               # Threat detection logic
      `
    },
    decisions: [
      {
        problem: 'Determine simulator deployment model (Live cloud access vs Scraped sandbox data)',
        context: 'Running live security tests on production networks is dangerous and violates cloud usage policies.',
        alternatives: ['Live scanning agents', 'Local mock database sandboxes', 'Read-only configuration parsers'],
        decision: 'Local mock database sandboxes',
        advantages: [
          'Zero risk of disrupting production applications',
          'Perfect simulation speed, eliminating real-world network lag',
          'Allows modeling complex attacks without exposing active security keys'
        ],
        disadvantages: [
          'Restricted to pre-defined configuration data',
          'Requires manual updates when cloud schemas change'
        ],
        tradeoffs: 'Accepted using static sandbox environments to prioritize safety, stability, and zero risk to live business systems.',
        futureImprovements: 'Integrate read-only API connectors to let users scan local dev environments securely.'
      }
    ],
    securityReview: [
      {
        name: 'Secure Script Execution',
        description: 'Mock terminal outputs must parse config data safely without exposing active system keys.',
        mitigation: 'Restricts configuration inputs to simple predefined sandbox datasets with zero raw script execution allowed.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Audit Ingest Speed',
        value: '<1s',
        technique: 'Optimized local parsing models and state rendering logic.'
      }
    ],
    challenges: {
      problem: 'Rendering long CLI log streams on simple web pages degraded layout performance and caused visual lag.',
      cause: 'React re-rendered the full logging screen on every new log update, creating heavy layout recalculations.',
      investigation: 'Observed page rendering lag when running long audit sequences, noting high CPU usage in browser logs.',
      solution: 'Used state accumulation buffers to batch log rendering updates, updating the DOM only on 100ms intervals.',
      tradeoffs: 'Introduced a minor lag in printing lines, but decreased CPU layout overhead by 80%.',
      lessons: 'Web interfaces require throttled state updates when rendering large streams of high-frequency data.'
    },
    lessonsLearned: {
      engineering: 'Always batch layout updates when building high-frequency monitoring interfaces.',
      architecture: 'Isolating security logic from interface screens simplifies porting components between platforms.',
      business: 'Technical security teams require clear, raw data listings over complex dashboard metrics.',
      redesign: 'I would convert logs to interactive elements, letting analysts expand individual rows to view details.'
    },
    roadmap: [
      'Add custom configurations uploads',
      'Integrate interactive topology attack path mapping',
      'Export audit details as raw JSON files'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    demoUrl: '#demo',
    tags: ['security', 'kali', 'iam', 'audit', 'react'],
    recruiterQuestions: {
      whyItMatters: 'It shows how automated scanning platforms find security cracks before attackers do.',
      businessProblemSolved: 'Prevents security breaches by identifying and resolving over-privileged access patterns.',
      techSelectionReason: 'React and TypeScript enable building highly responsive terminal interfaces with type safety.',
      architectureReason: 'Decoupled simulation layers make testing and updating audit configurations simple.',
      alternativesConsidered: 'Considered building a backend tool, but opted for a web simulator to show security workflows safely.',
      tradeoffsAccepted: 'Accepted simulated data models to guarantee security and remove risks to production.',
      scalingStrategy: 'Calculations run client-side, enabling scaling to many concurrent users without backend costs.',
      measurableResults: 'Identifies common security cracks and displays results in detailed reports under 3 seconds.'
    }
  },
  {
    id: 'harizeon-congent',
    slug: 'harizeon-congent',
    categories: ['AI', 'Networking'],
    architectureSummary: 'Dashboard → Master Hub (Raft) → Device Nodes → State Sync',
    title: 'Harizeon Congent',
    subtitle: 'Distributed AI Agent Coordination & Task Queue Sync',
    category: 'AI',
    status: 'Prototype',
    difficulty: 'Expert',
    client: 'Autonomous Systems Initiative',
    role: 'Lead Systems Engineer',
    teamSize: 1,
    duration: '4 Months',
    completionDate: '2026-05-18',
    summary: 'A distributed system architecture and orchestrator that coordinates local AI agents across multiple devices with real-time state synchronization.',
    businessProblem: 'Running AI agents on single devices hits hardware walls, while cloud deployments create high running costs and compromise data privacy.',
    businessValue: 'Enables teams to coordinate local consumer hardware to run complex AI workflows, reducing cloud costs and protecting data.',
    engineeringGoals: [
      'Synchronize agent state across multiple local systems with low latency',
      'Distribute and queue tasks based on active node capacities',
      'Deliver interactive dashboards to manage agent work queues'
    ],
    responsibilities: [
      'Designed state tracking models to sync data across local nodes',
      'Developed dispatch simulation widgets representing agent coordination',
      'Configured secure messaging protocols to protect agent instructions'
    ],
    techStack: {
      backend: ['Rust (Orchestration Engine)', 'Tauri'],
      frontend: ['React Native', 'TypeScript'],
      security: ['Local private TLS certificates', 'Encryption'],
      monitoring: ['Node heartbeat signals']
    },
    features: [
      {
        title: 'Task Dispatch Dashboard',
        description: 'Interactive dashboard orchestrating task assignments and agent capacities.',
        implementation: 'React state engine managing active queue rates.',
        complexity: 'Medium',
        benefit: 'Enables quick checks on system load and agent work allocations.'
      },
      {
        title: 'Agent State Tracking',
        description: 'Tracks status updates and resources across connected hardware nodes.',
        implementation: 'Dynamic object maps tracking connection statuses.',
        complexity: 'Medium',
        benefit: 'Ensures tasks route only to active, healthy agent systems.'
      },
      {
        title: 'Secure Local Messaging',
        description: 'Protects communication between devices utilizing local encryption.',
        implementation: 'Private keys verifying connections.',
        complexity: 'High',
        benefit: 'Secures proprietary files and instructions from third-party interception.'
      }
    ],
    architecture: {
      textDiagram: `
User Task ──> Orchestration Master (Rust) ──> Task Queue Manager
                                                    │
       ┌────────────────────────────────────────────┘
       ▼
Local Node A (Tauri) <──[Encrypted RPC Stream]── Local Node B (Mobile App)
      `,
      description: 'Distributed orchestration system. Master hubs coordinate queues and assign workloads to local node devices using private local connections.',
      flowSteps: [
        'User dispatches new task from dashboard interface',
        'Master hub parses resource demands and checks active node list',
        'Task queues and routes to the most suitable idle device node',
        'Device node executes instructions and reports telemetry updates',
        'State sync outputs complete status back to user panels'
      ],
      folderStructure: `
harizeon-congent/
├── src-tauri/                 # Rust core code
│   ├── src/
│   │   ├── main.rs            # Orchestrator entry
│   │   └── queue.rs           # Task queue logic
├── src/                       # Frontend application
│   ├── components/
│   │   └── Dispatcher.tsx     # Queue controller
│   └── App.tsx
      `
    },
    decisions: [
      {
        problem: 'Select coordination model for distributed local node devices',
        context: 'Devices connect and disconnect unpredictably on local networks, needing automatic sync.',
        alternatives: ['Centralized database polling', 'Distributed Hash Tables (DHT)', 'Raft-based master consensus'],
        decision: 'Raft-based master consensus',
        advantages: [
          'Guarantees absolute consistency on queue allocations',
          'Automatic selection of new masters if active ones drop offline',
          'Lightweight local execution footprint'
        ],
        disadvantages: [
          'High network packet traffic under heavy node counts',
          'Requires structured node membership lists'
        ],
        tradeoffs: 'Accepted high consensus network traffic to ensure total consistency and prevent duplicate task assignments.',
        futureImprovements: 'Integrate gossip protocols to manage node listings and lower consensus traffic overhead.'
      }
    ],
    securityReview: [
      {
        name: 'Private TLS verification',
        description: 'Intruders on local networks could spoof nodes and steal agent instructions.',
        mitigation: 'Pre-shared local root certificate authorities encrypting all node connections.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'State Sync Latency',
        value: '<12ms',
        technique: 'Using binary serialization patterns and lightweight local UDP connection streams.'
      }
    ],
    challenges: {
      problem: 'Nodes frequently dropped offline mid-execution, causing tasks to get stuck in processing states indefinitely.',
      cause: 'Platform lacked active heartbeat checks to monitor node health and handle task reassignments.',
      investigation: 'Monitored logs under high node churn, confirming that dead nodes remained assigned to active tasks.',
      solution: 'Implemented heartbeat monitors. If a node fails to check in for 15 seconds, the master marks it offline and returns tasks to the queue.',
      tradeoffs: 'Slightly increased local network traffic due to continuous check-in signals.',
      lessons: 'Distributed systems must assume failures are normal and implement active checks to verify node health.'
    },
    lessonsLearned: {
      engineering: 'Rust is excellent for building memory-safe and predictable orchestrator components.',
      architecture: 'Event-driven queues are critical to prevent packet blockages when nodes disconnect.',
      business: 'Utilizing local hardware resources reduces enterprise running costs and increases data privacy.',
      redesign: 'I would convert the state sync to run over WebRTC to support browser nodes without local installation.'
    },
    roadmap: [
      'Support browser nodes using WebRTC connections',
      'Integrate local model execution configurations',
      'Add predictive task scheduling algorithms'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    demoUrl: '#demo',
    tags: ['rust', 'tauri', 'react-native', 'ai-agents', 'systems'],
    recruiterQuestions: {
      whyItMatters: 'It provides a reliable architecture to build private AI applications using cost-effective local hardware.',
      businessProblemSolved: 'Reduces heavy cloud running costs and protects private corporate data.',
      techSelectionReason: 'Rust provides raw performance, Tauri keeps desktop apps light, and React Native builds clean mobile screens.',
      architectureReason: 'Decoupled orchestration models ensure the platform remains stable if individual nodes fail.',
      alternativesConsidered: 'Considered purely cloud-based setups, but chose local sync to maximize data privacy.',
      tradeoffsAccepted: 'Accepted consensus network traffic to ensure total consistency across task queues.',
      scalingStrategy: 'Consensus nodes coordinate task assignments, scaling to meet larger local hardware networks.',
      measurableResults: 'Synchronizes node statuses in under 12ms, managing active queues with zero duplicate tasks.'
    }
  },
  {
    id: 'gridoptima',
    slug: 'gridoptima',
    categories: ['Web'],
    architectureSummary: 'Node Parameters → Ratio Engine → Efficiency Score',
    title: 'GridOptima',
    subtitle: 'Topology Optimization Framework',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Intermediate',
    client: 'Internal R&D Project',
    role: 'Sole Developer',
    teamSize: 1,
    duration: '2 Months',
    completionDate: '2025-08-01',
    summary: 'A system modeling tool that calculates topology efficiency ratings based on node counts and active connections to optimize infrastructure maps.',
    businessProblem: 'Designing system topology models lacks simple validation tools, often resulting in unbalanced structures.',
    businessValue: 'Provides system architects with rapid, automated structure feedback before deployment.',
    engineeringGoals: [
      'Deliver topological efficiency metrics based on custom node mappings',
      'Create clean interfaces to adjust node parameters',
      'Keep logic simple and fast'
    ],
    responsibilities: [
      'Developed structure parsing scripts',
      'Built responsive layout widgets'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      testing: ['Jest']
    },
    features: [
      {
        title: 'Topology Calculator',
        description: 'Adjust node and connection counts to generate efficiency reports.',
        implementation: 'React calculations evaluating input ratios.',
        complexity: 'Low',
        benefit: 'Provides rapid feedback on system topology health.'
      }
    ],
    architecture: {
      textDiagram: 'Parameters Input ──> Ratios Checker ──> Score Dashboard',
      description: 'Simple checking tool that parses node parameters and outputs efficiency scores.',
      flowSteps: [
        'User inputs node and connection variables',
        'Engine processes metrics against connection standards',
        'Outputs structure efficiency score'
      ],
      folderStructure: 'gridoptima/├── index.html└── app.js'
    },
    decisions: [
      {
        problem: 'Select runtime model',
        context: 'Platform must remain fast and run offline.',
        alternatives: ['API processor', 'Client-side parser'],
        decision: 'Client-side parser',
        advantages: ['Instant updates', 'Zero costs'],
        disadvantages: ['Limited to basic structures'],
        tradeoffs: 'Prioritized speed and offline capabilities.',
        futureImprovements: 'Integrate canvas mapping views.'
      }
    ],
    securityReview: [
      {
        name: 'Basic Input Sanitization',
        description: 'Mitigates script injection attacks.',
        mitigation: 'Uses strict HTML parsing rules.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Calculation Speed',
        value: '<1ms',
        technique: 'Standard client math.'
      }
    ],
    challenges: {
      problem: 'Handling division-by-zero errors when nodes were set to zero.',
      cause: 'Standard ratio calculations lacked zero checks.',
      investigation: 'Observed UI failures when inputs were empty or set to zero.',
      solution: 'Added condition blocks to default zero inputs to one.',
      tradeoffs: 'Forces minimal variable structures.',
      lessons: 'Always validate mathematical inputs before running division logic.'
    },
    lessonsLearned: {
      engineering: 'Simple, direct utilities provide high value for fast design tasks.',
      architecture: 'Clean code structures are simple to maintain.',
      business: 'Fast, target tools are highly utilized.',
      redesign: 'I would convert coordinates to visual node maps.'
    },
    roadmap: ['Add interactive canvas visualization mapping'],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['topology', 'react', 'systems'],
    recruiterQuestions: {
      whyItMatters: 'Details how simple tools provide fast feedback for system planning.',
      businessProblemSolved: 'Reduces modeling errors by validating connections early.',
      techSelectionReason: 'React enables clean UI reactivity.',
      architectureReason: 'Simple design keeps runtime speed fast.',
      alternativesConsidered: 'Considered using large graph libraries, but selected manual calculations to keep code minimal.',
      tradeoffsAccepted: 'Accepted basic mathematical models in trade for speed.',
      scalingStrategy: 'Runs client-side, scaling with zero server load.',
      measurableResults: 'Calculates structural ratings instantly.'
    }
  },
  {
    id: 'optinet',
    slug: 'optinet',
    categories: ['Networking', 'Web'],
    architectureSummary: 'Trigger → Telemetry Calculator → Dashboard',
    title: 'OptiNet',
    subtitle: 'Network telemetry visualizer',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Intermediate',
    client: 'Internal Tooling',
    role: 'Sole Developer',
    teamSize: 1,
    duration: '2 Months',
    completionDate: '2025-07-20',
    summary: 'A prototype mapping network telemetry streams to visualize delay, jitter, and packet drop trends.',
    businessProblem: 'Identifying network issues requires viewing fragmented telemetry data, slowing down diagnostics.',
    businessValue: 'Combines metrics into a single screen to accelerate troubleshooting.',
    engineeringGoals: [
      'Simulate network telemetry streams dynamically',
      'Deliver clean visual readouts'
    ],
    responsibilities: [
      'Developed telemetry calculators',
      'Built dashboard screen layouts'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS']
    },
    features: [
      {
        title: 'Telemetry Simulator',
        description: 'Simulates network lag and data drop trends.',
        implementation: 'React simulation loops.',
        complexity: 'Low',
        benefit: 'Provides mock data to test network dashboards.'
      }
    ],
    architecture: {
      textDiagram: 'Trigger ──> Telemetry Calculator ──> Dashboard Dashboard',
      description: 'Generates mock network parameters to test UI states.',
      flowSteps: ['User clicks test trigger', 'Heuristics calculate random telemetry', 'Updates dashboard stats'],
      folderStructure: 'optinet/├── index.html└── app.js'
    },
    decisions: [
      {
        problem: 'Define data strategy',
        context: 'We need rapid mock data to test interface states.',
        alternatives: ['Mock datasets', 'Live connections'],
        decision: 'Mock datasets',
        advantages: ['Predictable testing', 'Zero server load'],
        disadvantages: ['Lacks real-world noise'],
        tradeoffs: 'Prioritized simple test states over real data pipelines.',
        futureImprovements: 'Integrate active server streams.'
      }
    ],
    securityReview: [
      {
        name: 'Safe data streams',
        description: 'Prevents interface scripts injection.',
        mitigation: 'Explicit state models.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Render latency',
        value: '<1ms',
        technique: 'Standard state updates.'
      }
    ],
    challenges: {
      problem: 'Varying metrics generated odd numbers that broke layout grids.',
      cause: 'Math formulas lacked coordinate limitations.',
      investigation: 'Observed UI breaks when variables scaled too high.',
      solution: 'Used bounding math to clamp numbers within normal ranges.',
      tradeoffs: 'Clamps values, hiding extreme anomalies.',
      lessons: 'Configure safety boundaries on dynamic variables.'
    },
    lessonsLearned: {
      engineering: 'Mock systems accelerate interface modeling cycles.',
      architecture: 'Clean decoupling helps connect real streams later.',
      business: 'Visual diagnostic dashboards lower operator stress.',
      redesign: 'I would add charting libraries to show history graphs.'
    },
    roadmap: ['Add Chart.js history charting support'],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['networking', 'telemetry', 'react'],
    recruiterQuestions: {
      whyItMatters: 'Shows how dashboard mock systems help verify interface stability.',
      businessProblemSolved: 'Simplifies network monitoring workflows.',
      techSelectionReason: 'Tailwind keeps screen layout coding rapid.',
      architectureReason: 'Decoupled data creation speeds up updates.',
      alternativesConsidered: 'Considered connecting live systems, but used mocks to speed up UI design testing.',
      tradeoffsAccepted: 'Accepted simulated metrics to avoid server maintenance.',
      scalingStrategy: 'Runs client-side, scaling with zero infrastructure load.',
      measurableResults: 'Simulates telemetry configurations instantly.'
    }
  },
  {
    id: 'sensorsync',
    slug: 'sensorsync',
    categories: ['IoT'],
    architectureSummary: 'Sensor Inputs → Drift Calculator → Calibrated Output',
    title: 'SensorSync',
    subtitle: 'Dual-sensor data sync',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Intermediate',
    client: 'Internal R&D Project',
    role: 'Sole Developer',
    teamSize: 1,
    duration: '2 Months',
    completionDate: '2025-06-15',
    summary: 'A sensor data aggregation prototype that calculates drift deltas and averages values to coordinate connected devices.',
    businessProblem: 'Industrial sensors drift over time, causing errors if data sync lacks correction filters.',
    businessValue: 'Improves telemetry accuracy by calculating deltas and correcting drift.',
    engineeringGoals: [
      'Aggregate dual sensor data streams',
      'Calculate drift correction variables'
    ],
    responsibilities: [
      'Developed drift math algorithms',
      'Designed calibration interfaces'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS']
    },
    features: [
      {
        title: 'Calibrator Dashboard',
        description: 'Simulates dual sensor inputs and calculates drift deltas.',
        implementation: 'React calculations checking values.',
        complexity: 'Low',
        benefit: 'Validates calibration logic before deploying code to hardware.'
      }
    ],
    architecture: {
      textDiagram: 'Sensor Inputs ──> Drift Calculator ──> Corrected Output',
      description: 'Compares data inputs and computes calibration variables.',
      flowSteps: ['Ingests data variables', 'Subtracts values to find drift', 'Outputs calibrated averages'],
      folderStructure: 'sensorsync/├── index.html└── app.js'
    },
    decisions: [
      {
        problem: 'Define calibration calculations model',
        context: 'Processor chips run on minimal power, requiring lightweight formulas.',
        alternatives: ['Kalman filter loops', 'Simple average drift subtraction'],
        decision: 'Simple average drift subtraction',
        advantages: ['Extremely low processor demand', 'Instant code executions'],
        disadvantages: ['Lacks complex predictive correction capacities'],
        tradeoffs: 'Prioritized minimal code footprints over advanced filtering.',
        futureImprovements: 'Integrate simple Kalman filters.'
      }
    ],
    securityReview: [
      {
        name: 'Input Constraints checking',
        description: 'Prevents out-of-boundary variables from causing math errors.',
        mitigation: 'Uses absolute number clamps.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Math processing speed',
        value: '<1ms',
        technique: 'Standard client-side calculations.'
      }
    ],
    challenges: {
      problem: 'Incorrect sensor variables could drop scores below zero, creating negative latency values.',
      cause: 'Math formulas lacked absolute evaluation checks.',
      investigation: 'Observed negative values when comparing highly contrasting inputs.',
      solution: 'Used absolute value methods to guarantee positive delta outputs.',
      tradeoffs: 'Hides directional drift details.',
      lessons: 'Ensure math algorithms validate boundaries under all inputs.'
    },
    lessonsLearned: {
      engineering: 'Always secure math logic against boundary exceptions.',
      architecture: 'Isolate calculation components to make swapping math algorithms simple.',
      business: 'Accurate data calibrations improve hardware shelf life.',
      redesign: 'I would add dynamic canvas graphs to show calibrations over time.'
    },
    roadmap: ['Add Canvas-based visual calibration graphs'],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['sensors', 'calibration', 'react'],
    recruiterQuestions: {
      whyItMatters: 'Shows how software filters calibrate drifting hardware telemetry.',
      businessProblemSolved: 'Mitigates physical sensor degradation anomalies.',
      techSelectionReason: 'React state engine binds calculations directly to outputs.',
      architectureReason: 'Decoupled math methods simplify unit testing.',
      alternativesConsidered: 'Considered full server aggregation, but chose client calculations to minimize latency.',
      tradeoffsAccepted: 'Accepted simple average formulas to optimize runtime performance.',
      scalingStrategy: 'Runs entirely client-side with zero server load.',
      measurableResults: 'Calculates data averages and drift correction variables instantly.'
    }
  },
  {
    id: 'telemetrix',
    slug: 'telemetrix',
    categories: ['Web'],
    architectureSummary: 'Stream Trigger → Loop Generator → Bar-Chart Dashboard',
    title: 'Telemetrix',
    subtitle: 'Dynamic stream visualization dashboard',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Intermediate',
    client: 'Internal Tools',
    role: 'Sole Developer',
    teamSize: 1,
    duration: '2 Months',
    completionDate: '2025-05-10',
    summary: 'A dashboard rendering dynamic logs and bar charts to monitor live software application metrics.',
    businessProblem: 'Teams require active updates on data trends to check application load limits.',
    businessValue: 'Enables developers to inspect system load changes quickly.',
    engineeringGoals: [
      'Render high-frequency telemetry logs dynamically',
      'Keep chart updates fluid and lightweight'
    ],
    responsibilities: [
      'Developed bar chart rendering models',
      'Built dashboard screen layouts'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS']
    },
    features: [
      {
        title: 'Dynamic Streams Visualizer',
        description: 'Creates animated bar graphs showing simulated log streams.',
        implementation: 'React rendering arrays of random height components.',
        complexity: 'Low',
        benefit: 'Tests screen rendering speeds under high chart update rates.'
      }
    ],
    architecture: {
      textDiagram: 'Trigger ──> Loop Generator ──> Bar Chart Dashboard',
      description: 'Generates arrays of size values to render dynamic chart visual outputs.',
      flowSteps: ['Triggers stream refresh', 'Loop creates random height array', 'Updates chart bar styles'],
      folderStructure: 'telemetrix/├── index.html└── app.js'
    },
    decisions: [
      {
        problem: 'Choose graph rendering model',
        context: 'We need lightweight charts that do not drag down page performance.',
        alternatives: ['Heavy canvas charts', 'Simple CSS-styled HTML bar graphs'],
        decision: 'Simple CSS-styled HTML bar graphs',
        advantages: ['Extremely light bundle size', 'Perfect style customizations via Tailwind'],
        disadvantages: ['Not suitable for complex multi-line charting data'],
        tradeoffs: 'Selected simple HTML elements to prioritize speed and low resource usage.',
        futureImprovements: 'Migrate to canvas chart configurations for high-capacity streams.'
      }
    ],
    securityReview: [
      {
        name: 'CSS Injection Mitigation',
        description: 'Prevents external variables from altering layout structures.',
        mitigation: 'Uses clamped inline styling values.'
      }
    ],
    performanceMetrics: [
      {
        metric: 'Graph Draw Speed',
        value: '<1ms',
        technique: 'Standard DOM updates.'
      }
    ],
    challenges: {
      problem: 'High refresh rates could overload layout rendering loops, causing page lag.',
      cause: 'Updating heavy DOM trees frequently degrades browser performance.',
      investigation: 'Observed page stutter when triggering high-frequency chart updates.',
      solution: 'Limited chart arrays to a clean set of 20 coordinate bars.',
      tradeoffs: 'Limits visual detail capacity.',
      lessons: 'Optimize DOM structures when rendering animated telemetry graphics.'
    },
    lessonsLearned: {
      engineering: 'Keep DOM complexity minimal when scripting UI animations.',
      architecture: 'Decoupled coordinate builders make testing visual charts easy.',
      business: 'Fluid UI charts make inspecting application logs intuitive.',
      redesign: 'I would convert charts to canvas outputs to support bigger datasets.'
    },
    roadmap: ['Support canvas-based rendering for large datasets'],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['telemetry', 'charts', 'react'],
    recruiterQuestions: {
      whyItMatters: 'Demonstrates lightweight charting methods that optimize dashboard performance.',
      businessProblemSolved: 'Simplifies monitoring load changes in active applications.',
      techSelectionReason: 'Tailwind renders custom CSS bars cleanly.',
      architectureReason: 'Decoupled data logic keeps chart rendering fast.',
      alternativesConsidered: 'Considered installing heavy chart packages, but built custom HTML bars to keep bundle size low.',
      tradeoffsAccepted: 'Accepted basic bar charts in exchange for faster loading speeds.',
      scalingStrategy: 'Runs client-side, scaling with zero infrastructure demand.',
      measurableResults: 'Simulates and updates telemetry charts instantly.'
    }
  },
  {
    id: 'soar-incident-response',
    slug: 'soar-incident-response',
    categories: ['Security', 'Cloud', 'DevOps'],
    architectureSummary: 'EventBridge → Step Functions → Lambda → EBS Snapshots → SNS',
    title: 'Automated Incident Response (SOAR) Pipeline',
    subtitle: 'EventBridge, Step Functions & Lambda Security Orchestration',
    category: 'Security',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Personal Lab Build',
    role: 'Sole Developer',
    teamSize: 1,
    summary: 'A security orchestration pipeline that detects unauthorized EC2 security group modifications via EventBridge, orchestrates response with Step Functions, isolates instances with Lambda, captures EBS forensic evidence, and publishes reports to SNS.',
    businessProblem: 'Manually responding to suspicious security group changes is slow and inconsistent, leaving compromised instances reachable while analysts investigate.',
    businessValue: 'Turns detection into an automated, repeatable runbook: isolate first, preserve evidence, then notify — shrinking the window between signal and containment.',
    engineeringGoals: [
      'Detect unauthorized EC2 security group modifications in near real time',
      'Orchestrate isolation, forensics, and notification as one auditable workflow',
      'Validate the pipeline by simulating security events end to end'
    ],
    responsibilities: [
      'Designed the EventBridge detection rule and Step Functions orchestration',
      'Implemented Lambda isolation and EBS snapshot forensics steps',
      'Validated the pipeline with simulated security events and execution history review'
    ],
    techStack: {
      cloud: ['AWS EventBridge', 'AWS Step Functions', 'AWS Lambda', 'Amazon SNS', 'Amazon EBS'],
      security: ['EC2 Security Groups', 'Forensic Snapshots'],
      monitoring: ['Step Functions Execution History', 'CloudWatch Metrics']
    },
    features: [
      {
        title: 'Drift Detection Rule',
        description: 'Catches unauthorized EC2 security group modifications as they happen.',
        implementation: 'EventBridge rule matching security group API activity.',
        complexity: 'Medium',
        benefit: 'Detection starts the moment the change occurs, not at the next audit.'
      },
      {
        title: 'Orchestrated Response',
        description: 'Runs isolation, forensics, and reporting as one ordered workflow.',
        implementation: 'Step Functions state machine coordinating Lambda tasks.',
        complexity: 'High',
        benefit: 'Every incident follows the same reviewed path with full execution history.'
      },
      {
        title: 'Isolate and Preserve',
        description: 'Cuts off compromised instances while snapshotting disks for forensics.',
        implementation: 'Lambda reversions plus EBS snapshot creation before notification.',
        complexity: 'Medium',
        benefit: 'Containment and evidence happen before an analyst even opens the alert.'
      }
    ],
    architecture: {
      textDiagram: `
EC2 SG Change ──> EventBridge Rule ──> Step Functions
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
             Lambda (Isolate)        EBS Snapshot              SNS Incident Report
       `,
      description: 'Event-driven response chain: a detection event fans out into isolation, evidence capture, and notification, all tracked as a single state machine execution.',
      flowSteps: [
        'Unauthorized security group modification triggers the EventBridge rule',
        'Step Functions execution starts with the event payload',
        'Lambda reverts the change and isolates the instance',
        'EBS snapshots capture forensic evidence',
        'SNS publishes the incident report for review'
      ],
      folderStructure: `
soar-pipeline/
├── template.yaml              # EventBridge rule + functions
├── src/
│   ├── isolate.py             # Instance isolation
│   ├── snapshot.py            # Forensic capture
│   └── notify.py              # Report formatting
└── tests/
    └── simulate_event.json    # Simulated security event
       `
    },
    decisions: [
      {
        problem: 'Choose orchestration model for multi-step incident response',
        context: 'Isolation, forensics, and notification must run in order with retries and a full audit trail.',
        alternatives: ['Chained Lambda invocations', 'Step Functions state machine', 'Manual runbook execution'],
        decision: 'Step Functions state machine',
        advantages: [
          'Built-in retries, ordering, and execution history',
          'Each incident is replayable and auditable',
          'Easy to add or reorder response steps later'
        ],
        disadvantages: [
          'State transitions add cost per execution',
          'More setup than direct function chaining'
        ],
        tradeoffs: 'Accepted per-execution orchestration overhead in exchange for reliability and a complete audit trail.',
        futureImprovements: 'Add approval gates before destructive isolation actions in production accounts.'
      }
    ],
    securityReview: [
      {
        name: 'Least-Privilege Response Roles',
        description: 'Response functions need powerful actions (isolation, snapshots) that must not become a privilege escalation path.',
        mitigation: 'Scoped IAM roles limited to the specific EC2, EBS, and SNS actions each function requires.'
      },
      {
        name: 'Forensic Evidence Integrity',
        description: 'Snapshots taken after an incident must be trustworthy for later analysis.',
        mitigation: 'Snapshots are created before any remediation writes, tagged with the incident execution ID.'
      }
    ],
    performanceMetrics: [],
    challenges: {
      problem: 'Validating the pipeline without a real attack to respond to.',
      cause: 'Detection and response logic only runs when matching security events occur.',
      investigation: 'Crafted simulated security group modification events and traced them through execution history.',
      solution: 'Built a repeatable simulation event plus checks on execution history, metrics, and isolation effectiveness.',
      tradeoffs: 'Simulations approximate but never fully reproduce attacker behavior.',
      lessons: 'Security automation needs a test harness from day one, not just production events.'
    },
    lessonsLearned: {
      engineering: 'Orchestration beats chaining: explicit state machines make incident flows reviewable.',
      architecture: 'Decouple detection from response so either side can evolve independently.',
      business: 'Automated evidence capture turns incidents from anecdotes into auditable records.',
      redesign: 'I would add a human approval step before isolation for production use.'
    },
    roadmap: [
      'Add approval gates for destructive actions',
      'Extend detection beyond security groups to IAM and network ACL changes',
      'Score and prioritize findings before paging responders'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['aws', 'eventbridge', 'step-functions', 'lambda', 'sns', 'soar'],
    recruiterQuestions: {
      whyItMatters: 'It closes the gap between detecting a cloud misconfiguration and containing it, automatically.',
      businessProblemSolved: 'Replaces slow manual incident response with a consistent automated runbook.',
      techSelectionReason: 'EventBridge for real-time detection and Step Functions for ordered, auditable multi-step response.',
      architectureReason: 'Event-driven orchestration keeps detection decoupled from response actions.',
      alternativesConsidered: 'Considered chained Lambdas, but chose Step Functions for retries and execution history.',
      tradeoffsAccepted: 'Accepted orchestration overhead for reliability and auditability.',
      scalingStrategy: 'Serverless throughout: EventBridge and Step Functions scale with event volume automatically.',
      measurableResults: 'Validated end to end with simulated events covering detection, isolation, forensics, and reporting.'
    }
  },
  {
    id: 'queue-worker-ops',
    slug: 'queue-worker-ops',
    categories: ['Cloud', 'DevOps'],
    architectureSummary: 'SQS → Lambda Worker → DynamoDB → CloudWatch → SNS Alert Queue',
    title: 'Distributed Queue Worker Operations',
    subtitle: 'Monitoring, Alerting & Incident Response for Queue Processing',
    category: 'Cloud',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Personal Lab Build',
    role: 'Sole Developer',
    teamSize: 1,
    summary: 'A production-style distributed queue processing system: a Lambda worker drains DynamoDB orders from SQS with structured correlation logging, multi-dimensional CloudWatch monitoring, SNS alert routing, injected failure drills, and runbook-driven recovery measured against SLOs.',
    businessProblem: 'Queue workers fail silently: poison messages, throttling, and slow drains surface as vague customer impact with no trail back to the cause.',
    businessValue: 'Demonstrates operating a queue system properly: observe everything, alert on symptoms, rehearse failures, and recover from a runbook with measured detection and recovery times.',
    engineeringGoals: [
      'Process DynamoDB orders from SQS with traceable per-order logging',
      'Detect worker degradation with multi-dimensional CloudWatch monitoring',
      'Prove recovery works via injected failures and runbook execution'
    ],
    responsibilities: [
      'Built the Lambda worker, structured logging, and CloudWatch monitoring',
      'Configured SNS alert routing into a dedicated alert queue',
      'Ran failure drills and measured detection and recovery against SLOs'
    ],
    techStack: {
      cloud: ['AWS Lambda', 'Amazon SQS', 'Amazon DynamoDB', 'Amazon SNS'],
      monitoring: ['CloudWatch Metrics', 'CloudWatch Logs Insights'],
      testing: ['Injected Failure Scenarios', 'Operator Runbook']
    },
    features: [
      {
        title: 'Correlation-Logged Worker',
        description: 'Every order carries a traceable ID from queue through database write.',
        implementation: 'Lambda worker with structured JSON logs keyed by order ID.',
        complexity: 'Medium',
        benefit: 'Any failure can be traced to the exact order and queue message.'
      },
      {
        title: 'Multi-Dimensional Monitoring',
        description: 'Dashboards split worker health by queue, error type, and latency.',
        implementation: 'CloudWatch metrics with dimensions plus Logs Insights queries.',
        complexity: 'Medium',
        benefit: 'Distinguishes poison messages from throttling from slow downstream calls.'
      },
      {
        title: 'Failure Drills with SLOs',
        description: 'Controlled failures injected, then recovered via runbook while timing detection and recovery.',
        implementation: 'Scripted fault injection plus step-by-step operator runbook.',
        complexity: 'High',
        benefit: 'Proves the operations story instead of asserting it.'
      }
    ],
    architecture: {
      textDiagram: `
SQS Orders ──> Lambda Worker ──> DynamoDB
                    │
                    ├── Structured Logs ──> CloudWatch ──> SNS Alert Queue
                    └── Failures ──> Runbook Recovery ──> Backlog Drain Check
       `,
      description: 'Standard queue-worker topology with the operations loop closed: logs feed monitors, monitors feed alerts, alerts trigger runbook recovery, recovery is verified by backlog drain.',
      flowSteps: [
        'Orders land in SQS and trigger the Lambda worker',
        'Worker processes each order into DynamoDB with correlation logs',
        'CloudWatch alarms on error rate, latency, and queue age',
        'SNS routes alerts into a dedicated alert queue',
        'Operator executes the runbook and verifies backlog recovery'
      ],
      folderStructure: `
queue-worker/
├── src/
│   ├── worker.py              # SQS poll + DynamoDB writes
│   └── logging.py             # Correlation log helpers
├── monitoring/
│   ├── dashboards.json        # CloudWatch widgets
│   └── alarms.yaml            # Alert thresholds
└── runbook.md                 # Recovery procedures + SLO targets
       `
    },
    decisions: [
      {
        problem: 'Choose how alerts reach operators',
        context: 'Alerts must be reliable, auditable, and separated from application traffic.',
        alternatives: ['Direct email/pager', 'SNS to a dedicated alert queue', 'Log-only, check dashboards'],
        decision: 'SNS to a dedicated alert queue',
        advantages: [
          'Alert delivery is decoupled and retryable',
          'Alert history is itself a queue that can be audited',
          'Multiple subscribers can attach later without code changes'
        ],
        disadvantages: [
          'One more queue to operate and monitor'
        ],
        tradeoffs: 'Accepted one extra component for durable, auditable alert delivery.',
        futureImprovements: 'Add severity-based routing so pages and tickets split automatically.'
      }
    ],
    securityReview: [
      {
        name: 'Least-Privilege Worker Role',
        description: 'The worker touches queues, tables, and logs; over-broad access would widen blast radius.',
        mitigation: 'IAM role scoped to the specific SQS queue, DynamoDB table, and log group.'
      }
    ],
    performanceMetrics: [],
    challenges: {
      problem: 'Proving recovery actually works, not just the happy path.',
      cause: 'Demos usually show processing, never the failure and recovery loop.',
      investigation: 'Injected poison messages and throttling, then timed detection and runbook recovery.',
      solution: 'Wrote the runbook first, then drilled against it and recorded detection and recovery times versus SLOs.',
      tradeoffs: 'Drills take longer to build than the worker itself.',
      lessons: 'An operations story without rehearsed recovery is just a processing demo.'
    },
    lessonsLearned: {
      engineering: 'Correlation IDs turn distributed debugging from archaeology into lookup.',
      architecture: 'Alerting deserves its own durable path, not a side effect of logging.',
      business: 'SLOs make reliability a number you can discuss instead of a feeling.',
      redesign: 'I would add a dead-letter queue with automated replay analysis.'
    },
    roadmap: [
      'Dead-letter queue with replay tooling',
      'Severity-based alert routing',
      'Autoscaling worker concurrency on queue age'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['aws', 'sqs', 'lambda', 'dynamodb', 'cloudwatch', 'sns', 'slo'],
    recruiterQuestions: {
      whyItMatters: 'It shows the full operations loop — build, monitor, alert, rehearse, recover — not just code that processes messages.',
      businessProblemSolved: 'Silent queue failures become visible, routable, and recoverable with measured times.',
      techSelectionReason: 'SQS plus Lambda is the canonical serverless queue pattern; CloudWatch keeps everything in one observable stack.',
      architectureReason: 'Decoupled alert queue keeps incident traffic separate from application traffic.',
      alternativesConsidered: 'Considered log-only monitoring, but alerts need a durable delivery path of their own.',
      tradeoffsAccepted: 'Accepted extra components (alert queue, runbook overhead) for provable reliability.',
      scalingStrategy: 'Lambda concurrency follows queue depth; DynamoDB on-demand absorbs bursts.',
      measurableResults: 'Detection and recovery times recorded against SLOs during injected failure drills.'
    }
  },
  {
    id: 'saga-orders',
    slug: 'saga-orders',
    categories: ['Cloud', 'DevOps'],
    architectureSummary: 'API → Step Functions Saga → Services → Compensations → DynamoDB Streams Outbox',
    title: 'Distributed Sagas: Fault-Tolerant Order Processing',
    subtitle: 'Compensating Transactions with Step Functions',
    category: 'Cloud',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Personal Lab Build',
    role: 'Sole Developer',
    teamSize: 1,
    summary: 'A saga-based order processing system on Step Functions implementing idempotent operations, bounded retries, compensating actions, manual repair procedures, failure testing, and a transactional outbox over DynamoDB Streams to close the write/publish gap.',
    businessProblem: 'Distributed orders fail halfway: payment taken but inventory unreserved, with no consistent way to roll forward or back.',
    businessValue: 'Shows the patterns that make distributed transactions safe: each step has a compensating action, retries are bounded, and nothing is left half-done without a repair path.',
    engineeringGoals: [
      'Model order processing as a saga with explicit compensating actions',
      'Make every operation idempotent with bounded retries',
      'Close the database-write/event-publication gap with a transactional outbox'
    ],
    responsibilities: [
      'Designed the saga steps, compensations, and retry policies',
      'Implemented the DynamoDB Streams transactional outbox',
      'Built failure test scenarios including manual repair flows'
    ],
    techStack: {
      cloud: ['AWS Step Functions', 'AWS Lambda', 'Amazon DynamoDB', 'DynamoDB Streams'],
      testing: ['Failure Injection Scenarios']
    },
    features: [
      {
        title: 'Saga Orchestration',
        description: 'Order steps run in sequence with a defined compensation per step.',
        implementation: 'Step Functions with catch blocks routing to compensating states.',
        complexity: 'High',
        benefit: 'Partial failures unwind cleanly instead of stranding orders.'
      },
      {
        title: 'Transactional Outbox',
        description: 'Database writes and event publications stay consistent.',
        implementation: 'Outbox table tailed by DynamoDB Streams to publish exactly-once-ish events.',
        complexity: 'High',
        benefit: 'Eliminates the dual-write gap between state and notifications.'
      },
      {
        title: 'Manual Repair Procedures',
        description: 'Unrecoverable states land in a repair queue with operator steps.',
        implementation: 'Documented repair flow plus failure-scenario test suite.',
        complexity: 'Medium',
        benefit: 'Admits that some failures need humans, and prepares for them.'
      }
    ],
    architecture: {
      textDiagram: `
Order API ──> Step Functions Saga ──┬──> Reserve ──> Charge ──> Confirm
                                    │
                    [failure] ──> Compensate (reverse order) ──> Repair Queue
                                    │
              DynamoDB Outbox ──> Streams ──> Event Publication
       `,
      description: 'Orchestrated saga: forward steps with paired compensations, plus an outbox so side effects publish reliably after the write commits.',
      flowSteps: [
        'Order request starts the saga execution',
        'Each step executes idempotently with bounded retries',
        'On step failure, completed steps compensate in reverse order',
        'State changes and outbox rows commit together',
        'DynamoDB Streams publishes outbox events downstream'
      ],
      folderStructure: `
saga-orders/
├── saga.asl.json              # State machine definition
├── src/
│   ├── steps/                 # Forward operations
│   ├── compensate/            # Compensating actions
│   └── outbox.py              # Outbox publisher
└── tests/
    └── failure_matrix.md      # Failure scenarios + repairs
       `
    },
    decisions: [
      {
        problem: 'Choose saga coordination style',
        context: 'Steps span services with no shared transaction; failures must unwind predictably.',
        alternatives: ['Choreography via events', 'Orchestrated saga via Step Functions', 'Two-phase commit'],
        decision: 'Orchestrated saga via Step Functions',
        advantages: [
          'One readable definition of order and compensation flow',
          'Retries, timeouts, and error paths are explicit',
          'Execution history doubles as an audit trail'
        ],
        disadvantages: [
          'Orchestrator is a central coupling point',
          'State transition costs per step'
        ],
        tradeoffs: 'Accepted centralization for explicitness and auditability.',
        futureImprovements: 'Extract the outbox publisher into a shared construct for other services.'
      }
    ],
    securityReview: [
      {
        name: 'Idempotency as Safety',
        description: 'Retried steps must never double-charge or double-reserve.',
        mitigation: 'Idempotency keys on every mutating operation, verified in failure tests.'
      }
    ],
    performanceMetrics: [],
    challenges: {
      problem: 'The gap between writing to the database and publishing the event.',
      cause: 'Crash between the two leaves state and notifications inconsistent.',
      investigation: 'Walked through crash points in the saga and found the dual-write window.',
      solution: 'Transactional outbox: write state and outbox row atomically, publish via DynamoDB Streams.',
      tradeoffs: 'Adds a table and a publisher component to operate.',
      lessons: 'In distributed systems, "write then publish" is a bug waiting for a crash.'
    },
    lessonsLearned: {
      engineering: 'Compensations deserve the same design rigor as forward paths.',
      architecture: 'Orchestration makes complex failure handling legible.',
      business: 'Customers experience rollbacks as reliability when they are clean and communicated.',
      redesign: 'I would add saga execution dashboards showing live compensation activity.'
    },
    roadmap: [
      'Live saga monitoring dashboard',
      'Shared outbox construct for reuse',
      'Chaos-style randomized failure drills'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['aws', 'step-functions', 'saga', 'dynamodb', 'outbox', 'distributed-systems'],
    recruiterQuestions: {
      whyItMatters: 'It tackles the hardest part of microservices: keeping multi-step operations consistent without distributed transactions.',
      businessProblemSolved: 'Half-completed orders become structured rollbacks instead of support tickets.',
      techSelectionReason: 'Step Functions gives retries, ordering, and history out of the box for saga orchestration.',
      architectureReason: 'Orchestration centralizes complex failure logic where it can be reviewed.',
      alternativesConsidered: 'Considered event choreography, but explicit orchestration is easier to reason about and repair.',
      tradeoffsAccepted: 'Accepted orchestrator coupling and transition costs for correctness.',
      scalingStrategy: 'Step Functions executions scale with order volume; outbox publishing streams scale with table throughput.',
      measurableResults: 'Failure matrix covers step failures, compensation paths, and manual repairs.'
    }
  },
  {
    id: 'graphql-multitenant',
    slug: 'graphql-multitenant',
    categories: ['Cloud', 'Security', 'Web'],
    architectureSummary: 'Cognito → AppSync → Tenant Resolver → DynamoDB + Subscriptions',
    title: 'Multi-Tenant GraphQL Support System',
    subtitle: 'Server-Side Tenant Isolation with AppSync',
    category: 'Cloud',
    status: 'Prototype',
    difficulty: 'Advanced',
    client: 'Personal Lab Build',
    role: 'Sole Developer',
    teamSize: 1,
    summary: 'A multi-tenant GraphQL support ticket system on AppSync and DynamoDB with server-side tenant membership resolution from Cognito, fine-grained authorization on every operation, optimistic concurrency, tenant-scoped real-time subscriptions, and a documented least-privilege authorization model.',
    businessProblem: 'SaaS support data leaks across tenants when authorization lives in client code or is checked inconsistently.',
    businessValue: 'Demonstrates tenant isolation done correctly: membership resolved server-side from identity, enforced on every operation, with the model documented and tested.',
    engineeringGoals: [
      'Resolve tenant membership server-side from Cognito identity',
      'Enforce fine-grained authorization on all operations',
      'Keep real-time subscriptions strictly tenant-scoped'
    ],
    responsibilities: [
      'Designed the authorization model and tenant isolation scheme',
      'Implemented resolvers, concurrency control, and scoped subscriptions',
      'Ran security testing and documented the complete model'
    ],
    techStack: {
      cloud: ['AWS AppSync', 'Amazon DynamoDB', 'Amazon Cognito'],
      security: ['Fine-grained Authorization', 'Least-Privilege IAM', 'Optimistic Concurrency']
    },
    features: [
      {
        title: 'Server-Side Tenant Resolution',
        description: 'Tenant membership comes from verified Cognito identity, never client claims.',
        implementation: 'Resolvers derive tenant context from the authentication token.',
        complexity: 'High',
        benefit: 'Clients cannot spoof their way into another tenant.'
      },
      {
        title: 'Per-Operation Authorization',
        description: 'Every query, mutation, and subscription checks tenant scope.',
        implementation: 'Authorization rules applied uniformly across all resolvers.',
        complexity: 'High',
        benefit: 'No endpoint is accidentally left open.'
      },
      {
        title: 'Tenant-Scoped Subscriptions',
        description: 'Real-time ticket updates stay within the tenant boundary.',
        implementation: 'Subscription filters bound to resolved tenant context.',
        complexity: 'Medium',
        benefit: 'Live features without cross-tenant leakage.'
      }
    ],
    architecture: {
      textDiagram: `
Client ──> Cognito Auth ──> AppSync ──┬──> Tenant Resolver ──> DynamoDB (tenant-partitioned)
                                       └──> Subscriptions (tenant-scoped)
       `,
      description: 'Identity-first API: authentication establishes who you are, resolvers establish which tenant you belong to, and every data path re-checks both.',
      flowSteps: [
        'User authenticates via Cognito',
        'Resolvers extract tenant membership server-side from the token',
        'Queries and mutations filter by tenant partition',
        'Optimistic concurrency guards conflicting ticket updates',
        'Subscriptions deliver only same-tenant events'
      ],
      folderStructure: `
graphql-multitenant/
├── schema.graphql             # Types + directives
├── resolvers/                 # Tenant-aware resolvers
├── auth/
│   └── model.md               # Documented authorization model
└── tests/
    └── cross-tenant.spec      # Negative security tests
       `
    },
    decisions: [
      {
        problem: 'Choose where tenant isolation is enforced',
        context: 'Client-side checks are bypassable; missing a single resolver creates a leak.',
        alternatives: ['Client-side tenant headers', 'Per-resolver server checks', 'Separate stack per tenant'],
        decision: 'Per-resolver server checks from Cognito identity',
        advantages: [
          'No trust in client-supplied tenant identifiers',
          'Uniform enforcement across queries, mutations, subscriptions',
          'Single deployment to operate'
        ],
        disadvantages: [
          'Every resolver must implement the check correctly',
          'Slightly more resolver code per operation'
        ],
        tradeoffs: 'Accepted per-resolver implementation cost for a single verifiable enforcement point pattern.',
        futureImprovements: 'Generate resolver authorization boilerplate from the schema directives.'
      }
    ],
    securityReview: [
      {
        name: 'Cross-Tenant Access Testing',
        description: 'The critical failure mode is one tenant reading another tenant’s tickets.',
        mitigation: 'Comprehensive negative security tests attempting cross-tenant reads, writes, and subscriptions.'
      },
      {
        name: 'Least-Privilege Data Access',
        description: 'Over-broad table access would undermine resolver-level checks.',
        mitigation: 'IAM policies scoped to tenant partitions; documented in the authorization model.'
      }
    ],
    performanceMetrics: [],
    challenges: {
      problem: 'Keeping real-time subscriptions inside tenant boundaries.',
      cause: 'Subscription filters are easy to leave broad while queries are locked down.',
      investigation: 'Tested subscription payloads across two tenants and confirmed the scoping gap.',
      solution: 'Bound subscription filters to the same resolved tenant context as queries.',
      tradeoffs: 'More resolver plumbing for live features.',
      lessons: 'Real-time paths need the same authorization rigor as request paths.'
    },
    lessonsLearned: {
      engineering: 'Authorization models should be written down before resolvers, not after.',
      architecture: 'Server-side identity derivation is the only tenant boundary you can trust.',
      business: 'A documented authorization model is itself a deliverable enterprise buyers ask for.',
      redesign: 'I would drive resolver checks from schema directives to remove boilerplate.'
    },
    roadmap: [
      'Directive-driven authorization codegen',
      'Tenant usage metering and quotas',
      'Audit log of cross-tenant access attempts'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['aws', 'appsync', 'graphql', 'dynamodb', 'cognito', 'multitenancy', 'iam'],
    recruiterQuestions: {
      whyItMatters: 'Multi-tenancydone wrong leaks customer data; this shows it done right with evidence.',
      businessProblemSolved: 'Tenant isolation enforced and tested across every API operation including real-time.',
      techSelectionReason: 'AppSync gives managed GraphQL with Cognito integration; DynamoDB partitions map naturally to tenants.',
      architectureReason: 'Identity-derived tenant context keeps one trustworthy enforcement path.',
      alternativesConsidered: 'Considered per-tenant stacks, but single-stack with strict isolation is cheaper to operate and review.',
      tradeoffsAccepted: 'Accepted per-resolver authorization code for uniform, testable enforcement.',
      scalingStrategy: 'AppSync and DynamoDB scale per request; tenant partitions keep access patterns isolated.',
      measurableResults: 'Negative security tests cover reads, writes, and subscriptions across tenants.'
    }
  },
  {
    id: 'branch-lan',
    slug: 'branch-lan',
    categories: ['Networking'],
    architectureSummary: 'Branch LAN A → Router → Static Routes → Router → Branch LAN B',
    title: 'Branch Office LAN Integration',
    subtitle: 'Subnets, Routing & Inter-Office Connectivity',
    category: 'Systems',
    status: 'Prototype',
    difficulty: 'Beginner',
    client: 'Personal Lab Build',
    role: 'Sole Developer',
    teamSize: 1,
    summary: 'Connected two branch office LANs through two routers using distinct subnets and bidirectional static routes for seamless inter-office communication.',
    businessProblem: 'Two offices on separate LANs cannot reach each other’s resources without routed connectivity between them.',
    businessValue: 'Foundational networking delivered: addressed, routed, and verified connectivity both ways.',
    engineeringGoals: [
      'Address two LANs on distinct non-overlapping subnets',
      'Configure static routes in both directions',
      'Verify seamless bidirectional communication'
    ],
    responsibilities: [
      'Designed the subnet addressing plan',
      'Configured routers and static routes',
      'Tested connectivity between offices'
    ],
    techStack: {
      frontend: ['Subnet Addressing Plan'],
      backend: ['Static Routing'],
      testing: ['Bidirectional Ping Verification']
    },
    features: [
      {
        title: 'Dual-LAN Addressing',
        description: 'Each office on its own subnet with no overlap.',
        implementation: 'Subnet plan with distinct network ranges per office.',
        complexity: 'Low',
        benefit: 'Clean separation with room to grow each site.'
      },
      {
        title: 'Bidirectional Static Routes',
        description: 'Each router knows the path to the remote LAN.',
        implementation: 'Static routes configured on both routers.',
        complexity: 'Low',
        benefit: 'Traffic flows both ways with deterministic paths.'
      }
    ],
    architecture: {
      textDiagram: `
Branch A LAN (Subnet 1) ──> Router A ══ Static Routes ══ Router B ──> Branch B LAN (Subnet 2)
       `,
      description: 'Two-site routed topology: distinct subnets per office, static routes on both routers forming the inter-office path.',
      flowSteps: [
        'Assign each office LAN a distinct subnet',
        'Configure each router with a route to the remote subnet',
        'Verify reachability in both directions',
        'Document the addressing and routing tables'
      ],
      folderStructure: `
branch-lan/
├── addressing.md              # Subnet plan
├── router-a.cfg               # Router A routes
└── router-b.cfg               # Router B routes
       `
    },
    decisions: [
      {
        problem: 'Choose routing approach for two sites',
        context: 'Small fixed topology with no expected churn.',
        alternatives: ['Static routes', 'Dynamic routing protocol (OSPF)'],
        decision: 'Static routes',
        advantages: [
          'Deterministic paths, trivial to verify',
          'No protocol overhead or convergence behavior',
          'Easy to document and hand over'
        ],
        disadvantages: [
          'Does not adapt to link failures or new sites automatically'
        ],
        tradeoffs: 'Accepted manual maintenance for simplicity at this scale.',
        futureImprovements: 'Migrate to OSPF when a third site or redundant links arrive.'
      }
    ],
    securityReview: [
      {
        name: 'Inter-Site Traffic Scope',
        description: 'Routed connectivity exposes each LAN to the other site.',
        mitigation: 'Documented which subnets are reachable and kept management interfaces off the shared path.'
      }
    ],
    performanceMetrics: [],
    challenges: {
      problem: 'One-directional connectivity after initial configuration.',
      cause: 'Return route missing on one router — classic asymmetric routing oversight.',
      investigation: 'Traced pings hop by hop and found replies had no path back.',
      solution: 'Added the missing reverse static route and re-verified both directions.',
      tradeoffs: 'None — verification caught it before handover.',
      lessons: 'Always verify both directions; routing is a two-way contract.'
    },
    lessonsLearned: {
      engineering: 'Draw the addressing plan before touching any device.',
      architecture: 'Static routing is the right default until scale says otherwise.',
      business: 'Documented addressing saves the next engineer hours.',
      redesign: 'I would add link redundancy and OSPF as the follow-up exercise.'
    },
    roadmap: [
      'Add redundant inter-office link',
      'Migrate to OSPF with a third site',
      'Add basic ACLs between office LANs'
    ],
    githubUrl: 'https://github.com/HarizuAru',
    tags: ['networking', 'lan', 'subnetting', 'static-routing', 'routers'],
    recruiterQuestions: {
      whyItMatters: 'It demonstrates the networking fundamentals everything else runs on: addressing, routing, verification.',
      businessProblemSolved: 'Two isolated offices become one reachable network.',
      techSelectionReason: 'Static routing fits a small fixed topology with deterministic paths.',
      architectureReason: 'Distinct subnets plus bidirectional routes is the minimal correct design.',
      alternativesConsidered: 'Considered OSPF, but static routes match the scale and are fully verifiable.',
      tradeoffsAccepted: 'Accepted manual route maintenance for simplicity.',
      scalingStrategy: 'Documented plan extends to a third site; OSPF when links multiply.',
      measurableResults: 'Bidirectional connectivity verified between both offices.'
    }
  }
];
