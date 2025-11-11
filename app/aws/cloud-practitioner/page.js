'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle } from 'lucide-react';

export default function AWSExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    {q: 1, text: "A company is migrating a legacy application that requires full control over the operating system, including custom security hardening and patches. Which cloud service model should the company choose?", opts: ["Software as a Service (SaaS)", "Platform as a Service (PaaS)", "Infrastructure as a Service (IaaS)", "Function as a Service (FaaS)"], correct: 2, hint: "Full control over the OS means the customer must handle more responsibilities than PaaS or SaaS.", cat: "Cloud Concepts"},
    {q: 2, text: "Which AWS security service is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads?", opts: ["AWS Identity and Access Management (IAM)", "Amazon GuardDuty", "AWS Security Hub", "Amazon Inspector"], correct: 1, hint: "Look for the service that acts as a continuous security monitoring and intelligence agent.", cat: "Security"},
    {q: 3, text: "According to the Shared Responsibility Model, which task is AWS's responsibility (Security of the Cloud) when using Amazon EC2?", opts: ["Managing network traffic using Security Groups", "Patching the underlying virtualization layer (Hypervisor)", "Configuration of database backups and replication", "Operating system and application security patches on the EC2 instance"], correct: 1, hint: "AWS is responsible for the foundational hardware and software that underpins the cloud services.", cat: "Security"},
    {q: 4, text: "Which AWS security feature is stateful and operates at the instance level to filter traffic for a single or group of EC2 instances?", opts: ["AWS WAF (Web Application Firewall)", "Network Access Control List (NACL)", "Security Group", "Amazon CloudFront"], correct: 2, hint: "Recall the two primary virtual firewalls in a VPC and which one tracks the connection status.", cat: "Security"},
    {q: 5, text: "A security requirement states that root user access should be disabled for daily operational tasks. What is the recommended best practice for daily administrative use?", opts: ["Use an IAM Group with root user permissions.", "Create a new IAM User with AdministratorAccess permissions.", "Use an EC2 instance with an IAM Role attached for daily operations.", "Store the root user credentials in S3 for easy access."], correct: 1, hint: "You should use a non-root entity for all daily tasks.", cat: "Security"},
    {q: 6, text: "To satisfy a governance requirement, an organization must track all changes to the configuration of their AWS resources (e.g., when a Security Group rule was changed). Which AWS service is best suited for this auditing purpose?", opts: ["AWS CloudTrail", "AWS Config", "Amazon CloudWatch", "AWS Systems Manager"], correct: 1, hint: "The service's name suggests its purpose is to maintain an inventory and history of resource settings.", cat: "Security"},
    {q: 7, text: "Which service is used to create and manage encryption keys and provides auditable logs of key usage to meet regulatory compliance requirements?", opts: ["AWS IAM", "AWS CloudHSM", "AWS Key Management Service (KMS)", "AWS Certificate Manager (ACM)"], correct: 2, hint: "The service is named for its function: Key Management.", cat: "Security"},
    {q: 8, text: "A customer is storing millions of small image files in S3 and wants to ensure the data is encrypted at rest. Which service is integrated with S3 to manage the keys used for this encryption?", opts: ["AWS IAM", "AWS CloudTrail", "AWS Key Management Service (KMS)", "AWS Secrets Manager"], correct: 2, hint: "Look for the key management service.", cat: "Security"},
    {q: 9, text: "Which IAM entity is best suited for granting permissions to an application or service (like an EC2 instance) that needs to interact with other AWS services (like S3 or DynamoDB)?", opts: ["IAM User", "IAM Group", "IAM Policy", "IAM Role"], correct: 3, hint: "This entity is designed to grant temporary, revolving permissions to a service or resource.", cat: "Security"},
    {q: 10, text: "What is the primary function of Service Control Policies (SCPs) in AWS Organizations?", opts: ["To define which users can access specific EC2 instances.", "To apply mandatory security monitoring and threat detection across all member accounts.", "To specify the maximum permissions for IAM users and roles in all affected member accounts.", "To automatically consolidate billing for all services across all accounts."], correct: 2, hint: "SCPs are governance tools that set a ceiling on what is allowed across the entire organization.", cat: "Security"},
    {q: 11, text: "A company requires a highly available service to route user traffic to the closest available endpoint, ensuring low latency globally. Which AWS networking service should they use for this Global DNS requirement?", opts: ["AWS Direct Connect", "Amazon CloudFront", "Amazon Route 53", "AWS Transit Gateway"], correct: 2, hint: "The service must handle the translation of domain names to IP addresses for global routing.", cat: "Technology"},
    {q: 12, text: "Which component of the AWS Global Infrastructure is a geographically separate cluster of data centers, with isolated power, cooling, and networking, designed to be fault-tolerant from other similar components within the same Region?", opts: ["Edge Location", "Availability Zone (AZ)", "Region", "VPC (Virtual Private Cloud)"], correct: 1, hint: "This term describes the building block for high availability and fault tolerance within a geographical area.", cat: "Technology"},
    {q: 13, text: "Which service is the foundational networking component that allows customers to provision a logically isolated section of the AWS Cloud where they can launch AWS resources?", opts: ["AWS IAM", "AWS Region", "Amazon Virtual Private Cloud (VPC)", "AWS Direct Connect"], correct: 2, hint: "Think of the virtual data center you create within a Region.", cat: "Technology"},
    {q: 14, text: "A company requires a private, dedicated, 10 Gbps physical network connection between its on-premises data center and its AWS Virtual Private Cloud (VPC). Which service should they use?", opts: ["AWS Site-to-Site VPN", "AWS Direct Connect", "Amazon CloudFront", "AWS Transit Gateway"], correct: 1, hint: "Look for the AWS service that provides a dedicated, non-Internet-based connection.", cat: "Technology"},
    {q: 15, text: "Which AWS networking component allows EC2 instances in a private subnet to initiate outbound connections to the internet (e.g., for software updates) while preventing incoming, unsolicited internet connections?", opts: ["Internet Gateway (IGW)", "VPC Endpoint", "NAT Gateway", "Virtual Private Gateway (VGW)"], correct: 2, hint: "The service performs Network Address Translation (NAT) for private subnets.", cat: "Technology"},
    {q: 16, text: "Which service uses a network of Edge Locations to cache content globally for improved performance and reduced latency for end-users?", opts: ["Amazon Route 53", "AWS Global Accelerator", "Amazon CloudFront", "AWS Direct Connect"], correct: 2, hint: "Edge Locations are key to the Content Delivery Network (CDN).", cat: "Technology"},
    {q: 17, text: "Which service is a managed, highly scalable relational database service that automatically handles patching, backups, and replication across multiple AZs?", opts: ["Amazon EC2", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"], correct: 1, hint: "Look for the database service named after its function: Relational Database Service.", cat: "Technology"},
    {q: 18, text: "A team needs a NoSQL database that can handle millions of requests per second and provides consistent, single-digit millisecond latency for gaming applications. Which service is the best fit?", opts: ["Amazon Aurora", "Amazon DocumentDB", "Amazon DynamoDB", "Amazon RDS"], correct: 2, hint: "Look for the fully managed NoSQL service that advertises massive scale and single-digit millisecond performance.", cat: "Technology"},
    {q: 19, text: "Which service is a fully managed, columnar data warehouse designed to run complex analytical queries (OLAP) on large, petabyte-scale datasets?", opts: ["Amazon RDS", "Amazon Redshift", "Amazon DynamoDB", "Amazon Aurora"], correct: 1, hint: "The key term 'data warehouse' should guide you to the purpose-built service.", cat: "Technology"},
    {q: 20, text: "A company is seeking to gain insights from large amounts of data stored in S3 by executing standard SQL queries without needing to load the data into a traditional database. Which service enables this query-in-place capability?", opts: ["Amazon Kinesis", "Amazon Redshift", "Amazon SQS", "Amazon Athena"], correct: 3, hint: "Look for the serverless analytics service that runs queries on S3 data.", cat: "Technology"},
    {q: 21, text: "Which service automatically collects and processes log files, metrics, and events from AWS resources and applications, enabling you to set alarms and visualize performance data?", opts: ["AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Config"], correct: 2, hint: "The service is named for watching the state of the cloud.", cat: "Technology"},
    {q: 22, text: "Which service best supports the Reliability pillar by automatically adjusting compute capacity to maintain steady performance against fluctuating demand?", opts: ["AWS CloudFormation", "AWS Auto Scaling", "Amazon CloudWatch", "Amazon VPC"], correct: 1, hint: "The term for automatically adjusting capacity to handle load is often related to 'scaling'.", cat: "Technology"},
    {q: 23, text: "A developer wants to quickly deploy and manage applications in a simple way without worrying about infrastructure complexity but still needs to use EC2 instances under the hood. Which service is best suited?", opts: ["AWS Lambda", "AWS CloudFormation", "AWS Elastic Beanstalk", "Amazon ECS"], correct: 2, hint: "This service is often described as an easy button for deploying web apps.", cat: "Technology"},
    {q: 24, text: "Which service is a fully managed container orchestration service that allows running Docker containers, either on customer-managed EC2 instances or using a serverless option (Fargate)?", opts: ["AWS Lambda", "Amazon EFS", "Amazon Elastic Container Service (ECS)", "AWS Elastic Beanstalk"], correct: 2, hint: "Look for the service named after containers that is elastic.", cat: "Technology"},
    {q: 25, text: "Which of the following is a non-relational database service designed for document and graph data structures?", opts: ["Amazon RDS", "Amazon Redshift", "Amazon Neptune", "Amazon Aurora"], correct: 2, hint: "The term 'non-relational' encompasses key-value (DynamoDB), document (DocumentDB), and graph (Neptune) databases.", cat: "Technology"},
    {q: 26, text: "A media company needs a media ingest and processing workflow that can handle file transformations and quality checks reliably and automatically. Which service is best for orchestrating this workflow?", opts: ["Amazon SQS", "AWS Batch", "AWS Step Functions", "AWS CloudTrail"], correct: 2, hint: "Look for the service that manages the state and steps of a complex process.", cat: "Technology"},
    {q: 27, text: "Which service is a fully managed file storage service that can be shared across multiple Amazon EC2 instances simultaneously using the NFS protocol?", opts: ["Amazon Elastic Block Store (EBS)", "Amazon Simple Storage Service (S3)", "Amazon Elastic File System (EFS)", "Amazon FSx"], correct: 2, hint: "Look for the service named after a File System that is elastic.", cat: "Technology"},
    {q: 28, text: "Which method is the most cost-effective for migrating a large amount of physical data (petabytes) from an on-premises data center to AWS where network bandwidth is limited or expensive?", opts: ["AWS Direct Connect", "AWS Site-to-Site VPN", "AWS DataSync", "AWS Snowball"], correct: 3, hint: "When the amount of data is huge and the network is limited, the physical transfer option is usually the answer.", cat: "Technology"},
    {q: 29, text: "A software development company uses a third-party application hosted entirely on AWS that is accessed via a web browser (e.g., Salesforce). Which cloud model are they primarily consuming?", opts: ["Infrastructure as a Service (IaaS)", "Software as a Service (SaaS)", "Platform as a Service (PaaS)", "Hybrid Cloud"], correct: 1, hint: "If the user is only using the software via a browser, they are consuming a specific service model.", cat: "Cloud Concepts"},
    {q: 30, text: "Which of the following cloud models involves both the customer's on-premises infrastructure and AWS Cloud infrastructure, connected to work as a single environment?", opts: ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Community Cloud"], correct: 2, hint: "The term for mixing two types of environments.", cat: "Cloud Concepts"},
    {q: 31, text: "Which AWS service is designed for long-term, low-cost archiving of data that may be retrieved infrequently, requiring several hours of lead time for retrieval?", opts: ["Amazon S3 Standard", "Amazon S3 Glacier Deep Archive", "Amazon EBS", "Amazon EFS"], correct: 1, hint: "Look for the storage class named after a frozen body of water and the deepest tier.", cat: "Technology"},
    {q: 32, text: "A developer needs to convert large upfront costs for database hardware into smaller, ongoing, usage-based payments. Which cloud economic benefit does this scenario demonstrate?", opts: ["Benefit from Massive Economies of Scale", "Trade Capital Expense for Variable Expense", "Increase Speed and Agility", "Go Global in Minutes"], correct: 1, hint: "Think about replacing a large one-time purchase with a pay-as-you-go utility model.", cat: "Cloud Concepts"},
    {q: 33, text: "Which benefit allows a company to stop spending money on running and maintaining data centers, focusing those resources instead on developing business applications?", opts: ["Benefit from massive economies of scale.", "Increase speed and agility.", "Stop guessing capacity.", "Stop spending money running and maintaining data centers."], correct: 3, hint: "The focus is on the saved time and money from eliminating on-premises infrastructure.", cat: "Cloud Concepts"},
    {q: 34, text: "Which of the following is a security benefit of using the cloud rather than an on-premises data center?", opts: ["Elimination of the Shared Responsibility Model", "AWS automatically encrypts all customer data by default", "AWS manages the physical security of the underlying infrastructure", "Customers gain complete control over the AWS global network"], correct: 2, hint: "Consider the part of the Shared Responsibility Model that the customer no longer needs to worry about.", cat: "Cloud Concepts"},
    {q: 35, text: "Which AWS pricing principle states that the more you use a service, the less you pay per unit of that service?", opts: ["Pay-as-you-go pricing", "Benefit from massive economies of scale", "Volume-based discounts", "Trade capital expense for variable expense"], correct: 2, hint: "This concept is similar to buying in bulk at a grocery store.", cat: "Billing and Pricing"},
    {q: 36, text: "To ensure low latency for a financial application that is consistently active, a company commits to a minimum hourly spend for all compute services over a three-year period. Which pricing model are they using?", opts: ["On-Demand", "Reserved Instances", "Spot Instances", "Compute Savings Plans"], correct: 3, hint: "The 'commitment to an hourly spend' is the key phrase pointing to this pricing model.", cat: "Billing and Pricing"},
    {q: 37, text: "A data science team needs to run an ad-hoc analysis that will take 5 hours and cannot be interrupted. The team wants the lowest cost but requires the process to complete reliably. Which EC2 purchasing option should they choose?", opts: ["On-Demand Instances", "EC2 Instance Savings Plans", "Spot Instances", "Dedicated Hosts"], correct: 1, hint: "The requirement is for non-interruptible and low cost; look for an option that provides a discount without the risk of termination.", cat: "Billing and Pricing"},
    {q: 38, text: "Which type of EC2 instance is NOT recommended for critical production workloads because it can be terminated by AWS with a two-minute warning?", opts: ["On-Demand Instances", "Reserved Instances", "Spot Instances", "Dedicated Hosts"], correct: 2, hint: "This option trades availability for the largest possible cost discount.", cat: "Billing and Pricing"},
    {q: 39, text: "What is the benefit of Consolidated Billing in AWS Organizations?", opts: ["It guarantees that all accounts will share the same IAM roles.", "It allows Service Control Policies (SCPs) to be applied to all accounts.", "It enables the application of volume pricing tiers across all accounts to reduce the overall cost.", "It allows a single account to manage the resources of all other accounts directly."], correct: 2, hint: "The aggregation of usage helps achieve the 'massive economies of scale' benefit.", cat: "Billing and Pricing"},
    {q: 40, text: "Which of the following describes the ability of a system to increase or decrease resources needed for the workload, often automatically, based on demand?", opts: ["Agility", "Fault Tolerance", "Elasticity", "Scalability"], correct: 2, hint: "Focus on the automatic 'stretching' and 'shrinking' based on fluctuating demand.", cat: "Cloud Concepts"},
    {q: 41, text: "A business analyst needs to view recommendations on cost optimization, security improvements, and performance enhancements across their entire AWS environment. Which tool provides these insights?", opts: ["AWS Inspector", "AWS Well-Architected Tool", "AWS Trusted Advisor", "Amazon GuardDuty"], correct: 2, hint: "This tool acts as your 'advisor' for best practices.", cat: "Billing and Pricing"},
    {q: 42, text: "Which AWS management tool is used to set a custom monthly cost threshold and automatically send an email notification when the actual usage is expected to exceed that threshold?", opts: ["AWS Trusted Advisor", "AWS Cost Explorer", "AWS Budgets", "AWS Organizations"], correct: 2, hint: "The service name directly reflects the concept of setting financial limits and alerts.", cat: "Billing and Pricing"},
    {q: 43, text: "Which AWS Support Plan provides a designated Technical Account Manager (TAM), architectural guidance, and the fastest response time (15 minutes) for critical system down events?", opts: ["Developer", "Business", "Enterprise", "Basic"], correct: 2, hint: "The dedicated TAM and white-glove service are characteristic of the highest-tier support offering.", cat: "Billing and Pricing"},
    {q: 44, text: "Which support level provides access to the AWS Support API for programmatic case management and a Concierge Service for billing and account inquiries?", opts: ["Basic", "Developer", "Business", "Enterprise"], correct: 3, hint: "The Concierge Service and programmatic support point to the highest level of comprehensive support.", cat: "Billing and Pricing"},
    {q: 45, text: "The Cost Optimization pillar of the Well-Architected Framework would recommend which of the following practices?", opts: ["Encrypting all data in transit using SSL/TLS.", "Implementing automated failover across multiple Availability Zones.", "Right-sizing compute resources and using Reserved Instances for steady-state workloads.", "Automating infrastructure deployment using CloudFormation."], correct: 2, hint: "Cost Optimization focuses on efficient spending and proper capacity planning.", cat: "Cloud Concepts"},
    {q: 46, text: "The Performance Efficiency pillar of the AWS Well-Architected Framework primarily focuses on what?", opts: ["Minimizing the total number of security violations.", "The ability of the system to recover from infrastructure or service failures.", "Using computing resources efficiently to meet system requirements and maintain efficiency as demand changes.", "Eliminating unnecessary costs by choosing the right pricing models."], correct: 2, hint: "Performance Efficiency is about choosing the right resources and optimizing their speed and efficiency.", cat: "Cloud Concepts"},
    {q: 47, text: "Which AWS management tool is used to visualize, understand, and analyze historical and forecasted costs and usage over time?", opts: ["AWS Budgets", "AWS Trusted Advisor", "AWS Cost Explorer", "AWS Billing Dashboard"], correct: 2, hint: "The service is explicitly named for exploring cost data.", cat: "Billing and Pricing"},
    {q: 48, text: "Which of the following is a benefit of cloud computing's global infrastructure?", opts: ["Eliminating the need for software licenses.", "Enabling customers to quickly deploy applications in multiple Regions to achieve disaster recovery.", "Guaranteed 100% uptime for all services.", "Reducing the need for customer-managed data backups."], correct: 1, hint: "The primary benefit of multiple Regions relates to business continuity.", cat: "Cloud Concepts"},
    {q: 49, text: "Which service is used to centrally manage users, assign permissions, and control access to all AWS resources?", opts: ["AWS Identity and Access Management (IAM)", "Amazon GuardDuty", "AWS Organizations", "AWS Key Management Service (KMS)"], correct: 0, hint: "The service name often stands for its purpose: managing identity and access.", cat: "Security"},
    {q: 50, text: "A development team needs a private, isolated network segment within their VPC to host their backend database servers, which should NOT be directly accessible from the internet. Where should these servers be launched?", opts: ["Public Subnet", "VPC Endpoint", "Private Subnet", "Edge Location"], correct: 2, hint: "Resources that are not internet-facing belong in a specific type of subnet.", cat: "Technology"},
    {q: 51, text: "A developer wants to run a small piece of code in response to an event, such as a file upload to S3, without having to provision or manage any servers. Which AWS compute service should they use?", opts: ["Amazon Elastic Compute Cloud (EC2)", "Amazon Elastic Container Service (ECS)", "AWS Lambda", "AWS Elastic Beanstalk"], correct: 2, hint: "This scenario requires a service that falls under the 'Serverless' computing category.", cat: "Technology"},
    {q: 52, text: "Which service allows a user to create custom budgets that alert them when their costs or usage exceed (or are forecasted to exceed) a budgeted amount?", opts: ["AWS Cost Explorer", "AWS Budgets", "Amazon QuickSight", "AWS Trusted Advisor"], correct: 1, hint: "The name of the service directly correlates with the ability to set financial limits and alerts.", cat: "Billing and Pricing"},
    {q: 53, text: "Which service is a fully managed, highly scalable relational database service that automatically handles patching, backups, and replication across multiple AZs?", opts: ["Amazon EC2", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"], correct: 1, hint: "Look for the keyword 'managed' alongside the requirement for a 'relational database'.", cat: "Technology"},
    {q: 54, text: "Which service is a fully managed, columnar data warehouse designed to run complex analytical queries (OLAP) on large, petabyte-scale datasets?", opts: ["Amazon RDS", "Amazon Redshift", "Amazon DynamoDB", "Amazon Aurora"], correct: 1, hint: "The key term 'data warehouse' should guide you to the purpose-built service.", cat: "Technology"},
    {q: 55, text: "Which service is used to create and manage encryption keys and provides auditable logs of key usage to meet regulatory compliance requirements?", opts: ["AWS IAM", "AWS CloudHSM", "AWS Key Management Service (KMS)", "AWS Certificate Manager (ACM)"], correct: 2, hint: "The service is named for its function: Key Management.", cat: "Security"},
    {q: 56, text: "What is the primary function of Service Control Policies (SCPs) in AWS Organizations?", opts: ["To define which users can access specific EC2 instances.", "To apply mandatory security monitoring and threat detection across all member accounts.", "To specify the maximum permissions for IAM users and roles in all affected member accounts.", "To automatically consolidate billing for all services across all accounts."], correct: 2, hint: "SCPs are governance tools that set a ceiling on what is allowed across the entire organization.", cat: "Security"},
    {q: 57, text: "Which AWS networking component allows EC2 instances in a private subnet to initiate outbound connections to the internet (e.g., for software updates) while preventing incoming, unsolicited internet connections?", opts: ["Internet Gateway (IGW)", "VPC Endpoint", "NAT Gateway", "Virtual Private Gateway (VGW)"], correct: 2, hint: "The service performs Network Address Translation (NAT) for private subnets.", cat: "Technology"},
    {q: 58, text: "AWS offers services that are global in scope (e.g., IAM, Route 53, CloudFront). Where are these services managed and deployed?", opts: ["They are deployed within a specific primary Region (e.g., US-East-1) but accessible globally.", "They are managed at the Edge Locations and only apply to the nearest Region.", "They are deployed and managed across all AWS Regions and Edge Locations simultaneously.", "They must be deployed individually by the customer in each Region they wish to use."], correct: 2, hint: "IAM and Route 53 are examples of services you only configure once, globally.", cat: "Technology"},
    {q: 59, text: "Which service automatically collects and processes log files, metrics, and events from AWS resources and applications, enabling you to set alarms and visualize performance data?", opts: ["AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Config"], correct: 2, hint: "The service is named for watching the state of the cloud.", cat: "Technology"},
    {q: 60, text: "To automatically distribute incoming application traffic across multiple Amazon EC2 instances to ensure high availability and fault tolerance, a customer should utilize which service?", opts: ["Amazon CloudWatch", "Amazon Simple Queue Service (SQS)", "Elastic Load Balancing (ELB)", "AWS Auto Scaling"], correct: 2, hint: "The name of the service suggests it is used to manage and balance the application's intake capacity.", cat: "Technology"},
    {q: 61, text: "A company is launching a new video game and expects a massive, unpredicted spike in users on launch day. Which cloud characteristic is essential to handle this sudden growth without purchasing excess hardware?", opts: ["Fault Tolerance", "Agility", "Elasticity", "Durability"], correct: 2, hint: "The core concept of scaling to match demand on the fly is elasticity.", cat: "Cloud Concepts"},
    {q: 62, text: "A company wants to enable developers to deploy code that automatically scales and requires zero operational overhead for server maintenance. Which AWS compute service should they choose?", opts: ["Amazon EC2", "AWS Lambda", "Amazon ECS (Elastic Container Service)", "AWS Elastic Beanstalk"], correct: 1, hint: "The phrase 'zero operational overhead' is strongly associated with the serverless computing model.", cat: "Technology"},
    {q: 63, text: "Which support level provides access to the AWS Support API for programmatic case management and a Concierge Service for billing and account inquiries?", opts: ["Basic", "Developer", "Business", "Enterprise"], correct: 3, hint: "The Concierge Service and programmatic support point to the highest level of comprehensive support.", cat: "Billing and Pricing"},
    {q: 64, text: "Which service is a fully managed file storage service that can be shared across multiple Amazon EC2 instances simultaneously using the NFS protocol?", opts: ["Amazon Elastic Block Store (EBS)", "Amazon Simple Storage Service (S3)", "Amazon Elastic File System (EFS)", "Amazon FSx"], correct: 2, hint: "Look for the service named after a File System that is elastic.", cat: "Technology"},
    {q: 65, text: "Which of the following is a non-relational database service designed for document and graph data structures?", opts: ["Amazon RDS", "Amazon Redshift", "Amazon Neptune", "Amazon Aurora"], correct: 2, hint: "The term 'non-relational' encompasses key-value (DynamoDB), document (DocumentDB), and graph (Neptune) databases.", cat: "Technology"}
  ];

  const [unscoredQuestions] = useState(() => {
    const indices = Array.from({length: 65}, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return new Set(shuffled.slice(0, 15));
  });

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerActive, timeRemaining, showResults]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({...answers, [currentQuestion]: optionIndex});
  };

  const handleSubmit = () => {
    setIsTimerActive(false);
    setShowResults(true);
  };

  const calculateResults = () => {
    let scoredCorrect = 0;
    let scoredTotal = 0;
    const categoryPerformance = {};
    const weakAreas = [];

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer !== undefined && userAnswer === q.correct;
      
      if (!unscoredQuestions.has(index)) {
        scoredTotal++;
        if (isCorrect) scoredCorrect++;
      }

      if (!categoryPerformance[q.cat]) {
        categoryPerformance[q.cat] = {correct: 0, total: 0};
      }
      categoryPerformance[q.cat].total++;
      if (isCorrect) categoryPerformance[q.cat].correct++;
    });

    Object.entries(categoryPerformance).forEach(([category, stats]) => {
      const percentage = (stats.correct / stats.total) * 100;
      if (percentage < 70) {
        weakAreas.push({
          category,
          correct: stats.correct,
          total: stats.total,
          percentage: percentage.toFixed(1)
        });
      }
    });

    const rawScore = (scoredCorrect / scoredTotal) * 100;
    const scaledScore = Math.round((rawScore / 100) * 1000);
    const passed = scaledScore >= 700;

    return {scoredCorrect, scoredTotal, rawScore: rawScore.toFixed(1), scaledScore, passed, categoryPerformance, weakAreas};
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <Award className={`w-24 h-24 mx-auto mb-4 ${results.passed ? 'text-green-500' : 'text-red-500'}`} />
            <h1 className="text-4xl font-bold mb-2">{results.passed ? '🎉 Congratulations!' : 'Keep Studying!'}</h1>
            <p className="text-xl text-gray-600 mb-4">{results.passed ? 'You PASSED the AWS Certified Cloud Practitioner Exam!' : 'You did not pass this time, but you\'re making progress!'}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-gray-600">Your Score</p>
                <p className={`text-5xl font-bold ${results.passed ? 'text-green-600' : 'text-red-600'}`}>{results.scaledScore}</p>
                <p className="text-sm text-gray-500">out of 1000</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Passing Score</p>
                <p className="text-5xl font-bold text-blue-600">700</p>
                <p className="text-sm text-gray-500">minimum required</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>Scored Questions Correct: {results.scoredCorrect} / {results.scoredTotal} ({results.rawScore}%)</p>
              <p className="text-xs mt-1 italic">Note: 15 unscored questions were included for testing purposes</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-2" />Performance by Category</h2>
            <div className="space-y-3">
              {Object.entries(results.categoryPerformance).map(([category, stats]) => {
                const percentage = (stats.correct / stats.total) * 100;
                const isWeak = percentage < 70;
                return (
                  <div key={category} className={`p-4 rounded-lg ${isWeak ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{category}</span>
                      <span className={`font-bold ${isWeak ? 'text-red-600' : 'text-green-600'}`}>{stats.correct} / {stats.total} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${isWeak ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {results.weakAreas.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-800">📚 Study Guide - Focus Areas</h2>
              <p className="mb-4 text-gray-700">Based on your performance, you should focus on these areas:</p>
              <ul className="space-y-3">
                {results.weakAreas.map((area) => (
                  <li key={area.category} className="bg-white p-4 rounded border border-yellow-300">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg text-yellow-900">{area.category}</span>
                      <span className="text-red-600 font-semibold">{area.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Score: {area.correct}/{area.total} questions correct</p>
                    <div className="text-sm text-gray-700">
                      {area.category === 'Cloud Concepts' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>Six advantages of cloud computing</li>
                            <li>Cloud deployment models (Public, Private, Hybrid)</li>
                            <li>Cloud service models (IaaS, PaaS, SaaS)</li>
                            <li>AWS Well-Architected Framework pillars</li>
                            <li>Elasticity vs Scalability concepts</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Security' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>AWS Shared Responsibility Model</li>
                            <li>IAM Users, Groups, Roles, and Policies</li>
                            <li>Security Groups vs NACLs</li>
                            <li>AWS KMS, CloudTrail, Config, GuardDuty</li>
                            <li>Root user best practices</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Technology' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>Core AWS services: EC2, S3, RDS, Lambda, VPC</li>
                            <li>Database services: RDS, DynamoDB, Redshift, Aurora</li>
                            <li>Networking: VPC, Subnets, NAT Gateway, Route 53</li>
                            <li>Storage: S3, EBS, EFS, Glacier</li>
                            <li>Monitoring: CloudWatch, CloudTrail</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Billing and Pricing' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>AWS pricing models: On-Demand, Reserved, Spot, Savings Plans</li>
                            <li>Cost management tools: Cost Explorer, Budgets, Trusted Advisor</li>
                            <li>Support plans: Basic, Developer, Business, Enterprise</li>
                            <li>Consolidated Billing in AWS Organizations</li>
                            <li>Free Tier offerings</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">📖 Recommended Study Resources:</p>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• AWS Cloud Practitioner Essentials (free digital course)</li>
                  <li>• AWS Whitepapers: Overview of Amazon Web Services</li>
                  <li>• AWS Well-Architected Framework documentation</li>
                  <li>• AWS Pricing Calculator and Cost Management documentation</li>
                  <li>• Practice with AWS Free Tier hands-on labs</li>
                </ul>
              </div>
            </div>
          )}

          {results.passed && results.weakAreas.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-lg text-green-800 font-semibold">Excellent performance across all categories! You're well-prepared for the actual exam! 🎯</p>
            </div>
          )}

          <button onClick={() => window.location.reload()} className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
            Take Another Practice Exam
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const q = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">AWS Cloud Practitioner Exam Prep</h1>
            <div className="text-right">
              <p className={`text-2xl font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-blue-600'}`}>{formatTime(timeRemaining)}</p>
              <p className="text-sm text-gray-500">Time Remaining</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Answered: {answeredCount} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-4">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">{q.cat}</span>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{q.text}</h2>
          </div>

          <div className="space-y-3">
            {q.opts.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {answers[currentQuestion] === index && <CheckCircle className="w-4 h-4 text-white" />}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {answers[currentQuestion] !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800"><strong>Hint:</strong> {q.hint}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition">
            ← Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 