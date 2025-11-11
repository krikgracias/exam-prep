'use client';

import Link from 'next/link';
import { Award, Cloud, Server, Database, Shield, BookOpen } from 'lucide-react';

export default function ExamPrepHub() {
  const examCategories = [
    {
      name: 'AWS Certifications',
      icon: Cloud,
      color: 'bg-orange-500',
      exams: [
        { name: 'Cloud Practitioner', path: '/aws/cloud-practitioner', status: 'Available', questions: 65 },
        { name: 'Solutions Architect Associate', path: '/aws/solutions-architect', status: 'Coming Soon', questions: 65 },
        { name: 'Developer Associate', path: '/aws/developer', status: 'Coming Soon', questions: 65 }
      ]
    },
    {
      name: 'CompTIA Certifications',
      icon: Shield,
      color: 'bg-red-500',
      exams: [
        { name: 'A+ Core 1 (220-1101)', path: '/comptia/a-plus-core1', status: 'Coming Soon', questions: 90 },
        { name: 'A+ Core 2 (220-1102)', path: '/comptia/a-plus-core2', status: 'Coming Soon', questions: 90 },
        { name: 'Network+ (N10-008)', path: '/comptia/network-plus', status: 'Coming Soon', questions: 90 },
        { name: 'Security+ (SY0-701)', path: '/comptia/security-plus', status: 'Coming Soon', questions: 90 }
      ]
    },
    {
      name: 'Google Cloud Certifications',
      icon: Database,
      color: 'bg-blue-500',
      exams: [
        { name: 'Associate Cloud Engineer', path: '/google/associate-cloud-engineer', status: 'Coming Soon', questions: 50 },
        { name: 'Professional Cloud Architect', path: '/google/professional-cloud-architect', status: 'Coming Soon', questions: 50 }
      ]
    },
    {
      name: 'Microsoft Certifications',
      icon: Server,
      color: 'bg-blue-600',
      exams: [
        { name: 'Azure Fundamentals (AZ-900)', path: '/microsoft/az-900', status: 'Coming Soon', questions: 60 },
        { name: 'Azure Administrator (AZ-104)', path: '/microsoft/az-104', status: 'Coming Soon', questions: 60 }
      ]
    }
  ];

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
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900">1</div>
            <div className="text-gray-600">Available Exams</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <div className="text-3xl font-bold text-gray-900">4</div>
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