'use client';

import Link from 'next/link';
import { Award, Cloud, Server, Database, Shield, BookOpen, Terminal, Network, ShieldCheck } from 'lucide-react';

export default function ExamPrepHub() {
const examCategories = [
  {
    name: 'AWS Certifications',
    icon: Cloud,
    color: 'bg-orange-500',
    description: 'Amazon Web Services - 13 Certification Paths',
    paths: [
      {
        pathName: 'Foundational',
        pathDescription: 'Start here - No prerequisites',
        exams: [
          { name: 'Cloud Practitioner (CLF-C02)', path: '/aws/cloud-practitioner', status: 'Available', questions: 65, duration: '90 min', cost: '$100' }
        ]
      },
      {
        pathName: 'Associate Level',
        pathDescription: 'Choose based on your role - Cloud Practitioner recommended',
        exams: [
          { name: 'Solutions Architect Associate (SAA-C03)', path: '/aws/solutions-architect-associate', status: 'Coming Soon', questions: 65, duration: '130 min', cost: '$150', recommended: 'Architects, SREs' },
          { name: 'Developer Associate (DVA-C02)', path: '/aws/developer-associate', status: 'Coming Soon', questions: 65, duration: '130 min', cost: '$150', recommended: 'Developers' },
          { name: 'SysOps Administrator Associate (SOA-C02)', path: '/aws/sysops-administrator', status: 'Coming Soon', questions: 65, duration: '130 min', cost: '$150', recommended: 'SysAdmins, SREs' },
          { name: 'Data Engineer Associate (DEA-C01)', path: '/aws/data-engineer-associate', status: 'Coming Soon', questions: 85, duration: '170 min', cost: '$150', recommended: 'Data Engineers' }
        ]
      },
      {
        pathName: 'Professional Level',
        pathDescription: 'Advanced certifications - Associate level required',
        exams: [
          { name: 'Solutions Architect Professional (SAP-C02)', path: '/aws/solutions-architect-professional', status: 'Coming Soon', questions: 75, duration: '180 min', cost: '$300', prereq: 'SAA-C03' },
          { name: 'DevOps Engineer Professional (DOP-C02)', path: '/aws/devops-engineer-professional', status: 'Coming Soon', questions: 75, duration: '180 min', cost: '$300', prereq: 'DVA-C02 or SOA-C02' }
        ]
      },
      {
        pathName: 'Specialty Certifications',
        pathDescription: 'Deep expertise in specific domains',
        exams: [
          { name: 'Advanced Networking Specialty (ANS-C01)', path: '/aws/advanced-networking-specialty', status: 'Coming Soon', questions: 65, duration: '170 min', cost: '$300', recommended: 'Network Engineers' },
          { name: 'Security Specialty (SCS-C02)', path: '/aws/security-specialty', status: 'Coming Soon', questions: 65, duration: '170 min', cost: '$300', recommended: 'Security Engineers' },
          { name: 'Machine Learning Specialty (MLS-C01)', path: '/aws/machine-learning-specialty', status: 'Coming Soon', questions: 65, duration: '180 min', cost: '$300', recommended: 'ML Engineers' },
          { name: 'Data Analytics Specialty (DAS-C01)', path: '/aws/data-analytics-specialty', status: 'Coming Soon', questions: 65, duration: '180 min', cost: '$300', recommended: 'Data Analysts' },
          { name: 'Database Specialty (DBS-C01)', path: '/aws/database-specialty', status: 'Coming Soon', questions: 65, duration: '180 min', cost: '$300', recommended: 'DBAs' },
          { name: 'SAP on AWS Specialty (PAS-C01)', path: '/aws/sap-on-aws-specialty', status: 'Coming Soon', questions: 65, duration: '170 min', cost: '$300', recommended: 'SAP Consultants' }
        ]
      }
    ],
    recommendedPaths: [
      {
        title: 'Cloud Architecture Path',
        sequence: ['Cloud Practitioner', 'Solutions Architect Associate', 'Solutions Architect Professional', 'Choose Specialty: Networking/Security/Database']
      },
      {
        title: 'Development Path',
        sequence: ['Cloud Practitioner', 'Developer Associate', 'DevOps Engineer Professional', 'Choose Specialty: ML/Data Analytics']
      },
      {
        title: 'SRE/Operations Path',
        sequence: ['Cloud Practitioner', 'SysOps Administrator Associate', 'DevOps Engineer Professional', 'Choose Specialty: Networking/Security']
      },
      {
        title: 'Data Engineering Path',
        sequence: ['Cloud Practitioner', 'Data Engineer Associate', 'Choose Specialty: Data Analytics/Database/ML']
      }
    ]
  },
  {
    name: 'CompTIA Certifications',
    icon: Shield,
    color: 'bg-red-500',
    exams: [
      { name: 'A+ Core 1 (220-1101)', path: '/comptia/a-plus-core1', status: 'Coming Soon', questions: 90 },
      { name: 'A+ Core 2 (220-1102)', path: '/comptia/a-plus-core2', status: 'Coming Soon', questions: 90 },
      { name: 'Network+ (N10-008)', path: '/comptia/network-plus', status: 'Available', questions: 90 },
      { name: 'Security+ (SY0-701)', path: '/comptia/security-plus', status: 'Coming Soon', questions: 90 },
      { name: 'Project+ (PK0-005)', path: '/comptia/project-plus', status: 'Available', questions: 90 },
      { name: 'Linux+ (XK0-005)', path: '/comptia/linux-plus', status: 'Available', questions: 90 },
      { name: 'Data+ (DA0-001)', path: '/comptia/data-plus', status: 'Available', questions: 90 },
      { name: 'Cloud+ (CV0-004)', path: '/comptia/cloud-plus', status: 'Coming Soon', questions: 90 },
      { name: 'CySA+ (CS0-003)', path: '/comptia/cysa-plus', status: 'Coming Soon', questions: 85 }
    ]
  },
  {
    name: 'Microsoft Certifications',
    icon: Server,
    color: 'bg-blue-600',
    exams: [
      { name: 'Azure Fundamentals (AZ-900)', path: '/microsoft/az-900', status: 'Coming Soon', questions: 60 },
      { name: 'Azure Administrator (AZ-104)', path: '/microsoft/az-104', status: 'Coming Soon', questions: 60 },
      { name: 'Azure Security Engineer (AZ-500)', path: '/microsoft/az-500', status: 'Coming Soon', questions: 60 },
      { name: 'Azure Data Fundamentals (DP-900)', path: '/microsoft/dp-900', status: 'Available', questions: 60 },
      { name: 'Administering Azure SQL (DP-300)', path: '/microsoft/dp-300', status: 'Available', questions: 60 },
      { name: 'Microsoft 365 Fundamentals (MS-900)', path: '/microsoft/ms-900', status: 'Coming Soon', questions: 60 }
    ]
  },
  {
    name: 'Google Cloud Certifications',
    icon: Database,
    color: 'bg-blue-500',
    exams: [
      { name: 'Cloud Digital Leader', path: '/google/cloud-digital-leader', status: 'Coming Soon', questions: 50 },
      { name: 'Associate Cloud Engineer', path: '/google/associate-cloud-engineer', status: 'Coming Soon', questions: 50 },
      { name: 'Professional Cloud Architect', path: '/google/professional-cloud-architect', status: 'Coming Soon', questions: 50 },
      { name: 'Professional Data Engineer', path: '/google/professional-data-engineer', status: 'Coming Soon', questions: 50 }
    ]
  },
  {
    name: 'Cisco Certifications',
    icon: Network,
    color: 'bg-cyan-600',
    exams: [
      { name: 'CCNA (200-301)', path: '/cisco/ccna', status: 'Coming Soon', questions: 100 },
      { name: 'CCNP Enterprise', path: '/cisco/ccnp-enterprise', status: 'Coming Soon', questions: 90 },
      { name: 'CyberOps Associate', path: '/cisco/cyberops-associate', status: 'Coming Soon', questions: 100 }
    ]
  },
  {
    name: 'Linux & DevOps Certifications',
    icon: Terminal,
    color: 'bg-green-600',
    exams: [
      { name: 'RHCSA (Red Hat Certified System Administrator)', path: '/linux/rhcsa', status: 'Coming Soon', questions: 80 },
      { name: 'LFCS (Linux Foundation Certified SysAdmin)', path: '/linux/lfcs', status: 'Coming Soon', questions: 60 },
      { name: 'Kubernetes CKA', path: '/devops/cka', status: 'Available', questions: 20 },
      { name: 'Kubernetes CKAD', path: '/devops/ckad', status: 'Available', questions: 20 },
      { name: 'Terraform Associate', path: '/devops/terraform-associate', status: 'Available', questions: 57 },
      { name: 'Docker Certified Associate', path: '/devops/docker-dca', status: 'Coming Soon', questions: 55 }
    ]
  },
  {
    name: 'Security Certifications',
    icon: ShieldCheck,
    color: 'bg-purple-600',
    exams: [
      { name: 'CISSP', path: '/security/cissp', status: 'Coming Soon', questions: 125 },
      { name: 'CEH (Certified Ethical Hacker)', path: '/security/ceh', status: 'Coming Soon', questions: 125 },
      { name: 'CISM', path: '/security/cism', status: 'Coming Soon', questions: 150 },
      { name: 'Security+ (SY0-701)', path: '/comptia/security-plus', status: 'Coming Soon', questions: 90 }
    ]
  }
];

  // --- DYNAMIC CALCULATIONS START HERE ---
  
  // 1. Count total categories (Tracks)
  const totalTracks = examCategories.length;

  // 2. Count total exams marked as 'Available' across all categories
  const availableExamsCount = examCategories.reduce((total, category) => {
    // Filter the exams in this category to find 'Available' ones, and add that count to the total
    const categoryAvailableCount = category.exams.filter(exam => exam.status === 'Available').length;
    return total + categoryAvailableCount;
  }, 0);

  // --- CALCULATIONS END ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Certification Exam Prep</h1>
              <p className="text-gray-600">Practice exams to help you pass on your first try</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Dynamic Available Exams Count */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900">{availableExamsCount}</div>
            <div className="text-gray-600">Available Exams</div>
          </div>

          {/* Dynamic Certification Tracks Count */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <div className="text-3xl font-bold text-gray-900">{totalTracks}</div>
            <div className="text-gray-600">Certification Tracks</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Free Practice</div>
          </div>
        </div>

        <div className="space-y-8">
          {examCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${category.color} text-white px-6 py-4 flex items-center gap-3`}>
                  <Icon className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                </div>

                <div className="divide-y">
                  {category.exams.map((exam) => (
                    <div key={exam.path} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{exam.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {exam.questions} questions
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              exam.status === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {exam.status}
                            </span>
                          </div>
                        </div>

                        {exam.status === 'Available' ? (
                          <Link 
                            href={exam.path}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                          >
                            Start Exam →
                          </Link>
                        ) : (
                          <button 
                            disabled
                            className="px-6 py-2 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                          >
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📚 About These Practice Exams</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Full-length practice exams matching real certification formats</li>
            <li>• Detailed explanations and study guides for weak areas</li>
            <li>• Timed tests with scoring (700/1000 passing score for most exams)</li>
            <li>• 100% free - no sign-up required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}