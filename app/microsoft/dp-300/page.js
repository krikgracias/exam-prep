'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function DP300Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Plan and implement data platform resources (15-20%)
    {q: 1, text: "Which Azure SQL deployment option provides the highest compatibility with on-premises SQL Server?", opts: ["Azure SQL Database", "Azure SQL Managed Instance", "SQL Server on Azure VMs", "Azure Synapse Analytics"], correct: 1, hint: "Managed Instance supports features like SQL Agent and CLR.", cat: "Platform Resources", scored: true},
    
    {q: 2, text: "What is the main difference between vCore and DTU purchasing models?", opts: ["vCore is cheaper", "vCore gives more control over compute and storage; DTU is a bundled measure", "DTU is only for Managed Instance", "No difference"], correct: 1, hint: "vCore separates compute, storage, and I/O; DTU bundles them.", cat: "Platform Resources", scored: true},
    
    {q: 3, text: "Which service tier provides the lowest latency for transaction log writes?", opts: ["General Purpose", "Business Critical", "Hyperscale", "Basic"], correct: 1, hint: "Business Critical uses local SSD storage.", cat: "Platform Resources", scored: true},
    
    {q: 4, text: "What is the maximum database size in the Hyperscale service tier?", opts: ["4 TB", "100 TB", "No predefined limit", "10 TB"], correct: 2, hint: "Hyperscale grows as needed without a fixed limit.", cat: "Platform Resources", scored: true},
    
    {q: 5, text: "Which feature enables you to pause and resume a database to save costs?", opts: ["Auto-pause in Serverless tier", "Elastic pools", "Read replicas", "Failover groups"], correct: 0, hint: "Serverless compute can automatically pause.", cat: "Platform Resources", scored: true},
    
    {q: 6, text: "What is an elastic pool in Azure SQL Database?", opts: ["A backup pool", "A shared resource pool for multiple databases", "A type of failover", "A storage tier"], correct: 1, hint: "Elastic pools share resources across databases.", cat: "Platform Resources", scored: true},

    // Implement a secure environment (15-20%)
    {q: 7, text: "What authentication method allows users to connect using Azure AD credentials?", opts: ["SQL authentication", "Windows authentication", "Azure Active Directory authentication", "Certificate authentication"], correct: 2, hint: "Azure AD provides centralized identity management.", cat: "Security", scored: true},
    
    {q: 8, text: "Which feature encrypts data automatically at rest without application changes?", opts: ["Always Encrypted", "Transparent Data Encryption (TDE)", "Column-level encryption", "SSL/TLS"], correct: 1, hint: "TDE encrypts the entire database transparently.", cat: "Security", scored: true},
    
    {q: 9, text: "What is the purpose of Always Encrypted?", opts: ["Encrypts backups", "Encrypts sensitive columns end-to-end, even from DBAs", "Encrypts network traffic", "Encrypts transaction logs"], correct: 1, hint: "Always Encrypted protects data from high-privilege users.", cat: "Security", scored: true},
    
    {q: 10, text: "Which security feature restricts database access to specific IP addresses?", opts: ["Network Security Groups", "Firewall rules", "Private endpoints", "VNet rules"], correct: 1, hint: "Server-level and database-level firewall rules control IP access.", cat: "Security", scored: true},
    
    {q: 11, text: "What does Dynamic Data Masking do?", opts: ["Encrypts data", "Obscures sensitive data in query results for non-privileged users", "Deletes data", "Backs up data"], correct: 1, hint: "Masking hides data without changing it in the database.", cat: "Security", scored: false},
    
    {q: 12, text: "Which feature provides automatic threat detection and alerts?", opts: ["Azure Defender for SQL", "Firewall rules", "TDE", "Auditing"], correct: 0, hint: "Defender identifies suspicious activities.", cat: "Security", scored: true},
    
    {q: 13, text: "What is Row-Level Security (RLS)?", opts: ["Encrypting rows", "Restricting row access based on user context", "Deleting rows automatically", "Backing up rows"], correct: 1, hint: "RLS filters which rows users can see.", cat: "Security", scored: true},
    
    {q: 14, text: "How can you audit database activities in Azure SQL?", opts: ["Enable auditing to send logs to Storage, Log Analytics, or Event Hub", "Use firewall rules", "Enable TDE", "Create backups"], correct: 0, hint: "Auditing tracks database events.", cat: "Security", scored: true},

    // Monitor and optimize operational resources (15-20%)
    {q: 15, text: "Which DMV shows currently executing queries?", opts: ["sys.dm_exec_sessions", "sys.dm_exec_requests", "sys.dm_exec_query_stats", "sys.databases"], correct: 1, hint: "dm_exec_requests shows active requests.", cat: "Monitoring", scored: true},
    
    {q: 16, text: "What tool provides automatic performance tuning recommendations?", opts: ["SQL Profiler", "Automatic tuning", "Extended Events", "Query Store"], correct: 1, hint: "Automatic tuning can create/drop indexes and force plans.", cat: "Monitoring", scored: true},
    
    {q: 17, text: "What is the purpose of Query Store?", opts: ["Store query text only", "Capture query performance history for troubleshooting", "Store data", "Create backups"], correct: 1, hint: "Query Store tracks query plans and runtime stats.", cat: "Monitoring", scored: true},
    
    {q: 18, text: "Which Azure service provides centralized monitoring for Azure SQL?", opts: ["Azure Monitor", "Azure Advisor", "Azure Security Center", "Azure Backup"], correct: 0, hint: "Azure Monitor collects metrics and logs.", cat: "Monitoring", scored: true},
    
    {q: 19, text: "What does the missing index DMV provide?", opts: ["List of unused indexes", "Recommendations for indexes that could improve query performance", "List of fragmented indexes", "Backup status"], correct: 1, hint: "Missing index DMVs suggest beneficial indexes.", cat: "Monitoring", scored: true},
    
    {q: 20, text: "Which feature allows you to force a specific query execution plan?", opts: ["Plan guides", "Query Store", "Statistics", "Both A and B"], correct: 3, hint: "Both can force plans, but Query Store is easier.", cat: "Monitoring", scored: true},
    
    {q: 21, text: "What is index fragmentation?", opts: ["Broken indexes", "Logical disorder of index pages", "Missing indexes", "Duplicate indexes"], correct: 1, hint: "Fragmentation occurs when index pages are not in order.", cat: "Monitoring", scored: true},
    
    {q: 22, text: "How do you rebuild an index?", opts: ["ALTER INDEX REBUILD", "CREATE INDEX", "DROP INDEX", "UPDATE INDEX"], correct: 0, hint: "REBUILD recreates the index from scratch.", cat: "Monitoring", scored: false},

    // Optimize query performance (15-20%)
    {q: 23, text: "What does the SQL Server execution plan show?", opts: ["Database schema", "How SQL Server executes a query", "Table data", "Backup history"], correct: 1, hint: "Execution plans visualize query processing steps.", cat: "Query Performance", scored: true},
    
    {q: 24, text: "What is a covering index?", opts: ["An index that includes all columns needed by a query", "The primary key", "A clustered index", "An index on every column"], correct: 0, hint: "Covering indexes eliminate key lookups.", cat: "Query Performance", scored: true},
    
    {q: 25, text: "Which type of index physically orders table data?", opts: ["Nonclustered index", "Clustered index", "Filtered index", "Full-text index"], correct: 1, hint: "Only one clustered index per table.", cat: "Query Performance", scored: true},
    
    {q: 26, text: "What does the INCLUDE clause in an index do?", opts: ["Adds columns to the leaf level without ordering by them", "Creates a clustered index", "Filters the index", "Deletes columns"], correct: 0, hint: "INCLUDE adds extra columns to covering indexes.", cat: "Query Performance", scored: true},
    
    {q: 27, text: "What is parameter sniffing?", opts: ["A security feature", "When SQL Server creates a plan based on initial parameter values", "A type of injection attack", "A backup method"], correct: 1, hint: "The first execution's parameters influence the cached plan.", cat: "Query Performance", scored: true},
    
    {q: 28, text: "How can you update table statistics manually?", opts: ["UPDATE STATISTICS", "REBUILD INDEX", "CREATE STATISTICS", "ANALYZE STATISTICS"], correct: 0, hint: "UPDATE STATISTICS refreshes statistics.", cat: "Query Performance", scored: true},
    
    {q: 29, text: "What is a filtered index?", opts: ["An index on a subset of rows based on a WHERE clause", "An index that filters duplicates", "A temporary index", "An encrypted index"], correct: 0, hint: "Filtered indexes cover specific row sets.", cat: "Query Performance", scored: true},
    
    {q: 30, text: "Which hint forces a query to use a specific index?", opts: ["WITH (INDEX(index_name))", "FORCE INDEX", "USE INDEX", "SET INDEX"], correct: 0, hint: "Table hints go in the FROM clause.", cat: "Query Performance", scored: false},

    // Perform automation of tasks (10-15%)
    {q: 31, text: "Which service in Azure SQL Managed Instance allows scheduled jobs?", opts: ["SQL Agent", "Azure Automation", "Logic Apps", "Azure Functions"], correct: 0, hint: "Managed Instance supports SQL Server Agent.", cat: "Automation", scored: true},
    
    {q: 32, text: "How can you automate backups in Azure SQL Database?", opts: ["Backups are automatic by default", "You must schedule them manually", "Use SQL Agent", "Backups are not supported"], correct: 0, hint: "Azure SQL Database has automated backups.", cat: "Automation", scored: true},
    
    {q: 33, text: "What is Azure Automation used for?", opts: ["Automated backups only", "Automating recurring management tasks across Azure resources", "Query optimization", "Index creation"], correct: 1, hint: "Automation handles runbooks and configuration.", cat: "Automation", scored: true},
    
    {q: 34, text: "Which tool allows you to deploy database changes using CI/CD?", opts: ["Azure DevOps", "SQL Agent", "Query Store", "Firewall rules"], correct: 0, hint: "DevOps pipelines support database deployment.", cat: "Automation", scored: true},
    
    {q: 35, text: "What is an elastic job in Azure SQL?", opts: ["A type of query", "A service for running T-SQL scripts across multiple databases", "A backup type", "An index type"], correct: 1, hint: "Elastic jobs manage cross-database scripts.", cat: "Automation", scored: true},

    // Plan and implement a high availability and disaster recovery environment (15-20%)
    {q: 36, text: "What is the RPO (Recovery Point Objective)?", opts: ["How long recovery takes", "The maximum acceptable data loss", "The backup schedule", "The replication method"], correct: 1, hint: "RPO defines acceptable data loss in time.", cat: "HA/DR", scored: true},
    
    {q: 37, text: "What is the RTO (Recovery Time Objective)?", opts: ["The maximum acceptable downtime", "The backup retention period", "The data loss window", "The replication lag"], correct: 0, hint: "RTO defines acceptable downtime duration.", cat: "HA/DR", scored: true},
    
    {q: 38, text: "Which feature provides automatic failover to a secondary replica?", opts: ["Geo-replication", "Failover groups", "Backups", "Read replicas"], correct: 1, hint: "Failover groups enable automatic failover.", cat: "HA/DR", scored: true},
    
    {q: 39, text: "What is active geo-replication?", opts: ["Backup to geo-redundant storage", "Asynchronous replication to up to 4 readable secondaries", "Synchronous replication", "Archive storage"], correct: 1, hint: "Geo-replication creates readable secondaries.", cat: "HA/DR", scored: true},
    
    {q: 40, text: "What is the maximum backup retention period for LTR (Long-Term Retention)?", opts: ["7 days", "35 days", "10 years", "1 year"], correct: 2, hint: "LTR can store backups for up to 10 years.", cat: "HA/DR", scored: true},
    
    {q: 41, text: "Which backup type captures only changes since the last full backup?", opts: ["Differential backup", "Transaction log backup", "Copy-only backup", "Full backup"], correct: 0, hint: "Differential backs up changes since last full.", cat: "HA/DR", scored: true},
    
    {q: 42, text: "How often are automated transaction log backups taken?", opts: ["Every hour", "Every 5-10 minutes", "Daily", "Weekly"], correct: 1, hint: "Log backups are very frequent for point-in-time recovery.", cat: "HA/DR", scored: false},
    
    {q: 43, text: "What is a read-scale out replica used for?", opts: ["Failover only", "Offloading read-only queries from the primary", "Backups", "Writing data"], correct: 1, hint: "Read replicas handle reporting queries.", cat: "HA/DR", scored: true},
    
    {q: 44, text: "Which storage type is used for automated backups?", opts: ["Locally redundant storage (LRS)", "Geo-redundant storage (GRS) by default", "Zone-redundant storage (ZRS)", "Premium storage"], correct: 1, hint: "Backups are geo-redundant by default.", cat: "HA/DR", scored: true},
    
    {q: 45, text: "What is the point-in-time restore capability?", opts: ["Restore to any point within retention period", "Restore only full backups", "Restore deleted databases only", "Restore schemas only"], correct: 0, hint: "PITR uses transaction logs to restore to any moment.", cat: "HA/DR", scored: true},

    // Advanced T-SQL and Performance
    {q: 46, text: "What does the NOLOCK hint do?", opts: ["Prevents locking", "Reads uncommitted data (dirty reads)", "Locks the table", "Prevents updates"], correct: 1, hint: "NOLOCK can read uncommitted transactions.", cat: "Query Performance", scored: true},
    
    {q: 47, text: "Which isolation level prevents dirty reads but allows non-repeatable reads?", opts: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], correct: 1, hint: "Read Committed is the default isolation level.", cat: "Query Performance", scored: true},
    
    {q: 48, text: "What is a deadlock?", opts: ["A slow query", "Two transactions blocking each other indefinitely", "A missing index", "A full transaction log"], correct: 1, hint: "Deadlocks occur when transactions wait for each other's locks.", cat: "Query Performance", scored: true},
    
    {q: 49, text: "Which DMV can you query to find blocking sessions?", opts: ["sys.dm_exec_requests", "sys.dm_os_waiting_tasks", "sys.dm_tran_locks", "All of the above"], correct: 3, hint: "Multiple DMVs provide blocking information.", cat: "Monitoring", scored: true},
    
    {q: 50, text: "What does the MAXDOP setting control?", opts: ["Maximum database size", "Maximum degree of parallelism for queries", "Maximum connections", "Maximum memory"], correct: 1, hint: "MAXDOP limits parallel query execution.", cat: "Query Performance", scored: true},

    // Migration and Data Movement
    {q: 51, text: "Which service is recommended for migrating on-premises SQL Server to Azure SQL?", opts: ["Azure Site Recovery", "Azure Database Migration Service", "Azure Backup", "Azure DevOps"], correct: 1, hint: "DMS is purpose-built for database migrations.", cat: "Migration", scored: true},
    
    {q: 52, text: "What is the Data Migration Assistant (DMA)?", opts: ["A migration service", "A tool that assesses compatibility and recommends migration path", "A backup tool", "A monitoring tool"], correct: 1, hint: "DMA assesses databases before migration.", cat: "Migration", scored: true},
    
    {q: 53, text: "Which method provides the fastest way to import large amounts of data?", opts: ["INSERT statements", "BCP (Bulk Copy Program)", "SSIS", "Replication"], correct: 1, hint: "BCP is optimized for bulk data loading.", cat: "Migration", scored: true},
    
    {q: 54, text: "What is transactional replication used for?", opts: ["Backups", "Real-time data synchronization from publisher to subscriber", "Load balancing", "Archiving"], correct: 1, hint: "Replication keeps databases synchronized.", cat: "Migration", scored: false},

    // Advanced Administration
    {q: 55, text: "What is a contained database?", opts: ["A database in a container", "A database that includes authentication and metadata", "A backup database", "A read-only database"], correct: 1, hint: "Contained databases are more portable.", cat: "Platform Resources", scored: true},
    
    {q: 56, text: "What is the sys.dm_db_index_physical_stats DMV used for?", opts: ["Checking index fragmentation", "Creating indexes", "Deleting indexes", "Viewing query plans"], correct: 0, hint: "This DMV shows index health and fragmentation.", cat: "Monitoring", scored: true},
    
    {q: 57, text: "What does columnstore index improve?", opts: ["OLTP workloads", "Analytical queries on large datasets", "Primary key lookups", "JOIN performance"], correct: 1, hint: "Columnstore is optimized for data warehouse queries.", cat: "Query Performance", scored: true},
    
    {q: 58, text: "What is in-memory OLTP?", opts: ["Storing tables in RAM for faster performance", "Disk-based storage", "Backup to memory", "Caching layer"], correct: 0, hint: "Memory-optimized tables reduce disk I/O.", cat: "Query Performance", scored: true},
    
    {q: 59, text: "What is the purpose of tempdb?", opts: ["Permanent storage", "Temporary storage for temp tables, sort operations, and row versioning", "Backup storage", "User database"], correct: 1, hint: "tempdb holds temporary objects and operations.", cat: "Platform Resources", scored: true},
    
    {q: 60, text: "Which compatibility level should you use for new features in SQL Server 2022?", opts: ["150", "160", "140", "130"], correct: 1, hint: "Each SQL version has a compatibility level: 2022 = 160.", cat: "Platform Resources", scored: true}
  ];

  useEffect(() => {
    if (!isTimerActive || showResults) return;
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
  }, [isTimerActive, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers({...answers, [questionIndex]: answerIndex});
  };

  const calculateScore = () => {
    let correct = 0;
    let scoredQuestions = 0;
    
    questions.forEach((q, idx) => {
      if (q.scored && answers[idx] === q.correct) {
        correct++;
      }
      if (q.scored) scoredQuestions++;
    });

    const percentage = (correct / scoredQuestions) * 100;
    
    return { correct, total: scoredQuestions, percentage };
  };

  const getWeakAreas = () => {
    const categoryScores = {};
    
    questions.forEach((q, idx) => {
      if (!q.scored) return;
      
      if (!categoryScores[q.cat]) {
        categoryScores[q.cat] = { correct: 0, total: 0 };
      }
      categoryScores[q.cat].total++;
      if (answers[idx] === q.correct) {
        categoryScores[q.cat].correct++;
      }
    });

    return Object.entries(categoryScores)
      .map(([cat, scores]) => ({
        category: cat,
        percentage: (scores.correct / scores.total) * 100,
        correct: scores.correct,
        total: scores.total
      }))
      .sort((a, b) => a.percentage - b.percentage);
  };

  const submitExam = () => {
    setIsTimerActive(false);
    setShowResults(true);
  };

  if (showResults) {
    const score = calculateScore();
    const weakAreas = getWeakAreas();
    const passed = score.percentage >= 70; // 70% passing score

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
          <span className="mr-2">←</span> Back to Exam List
        </a>

        <div className={`${passed ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-2 rounded-lg p-8 mb-6`}>
          <div className="flex items-center justify-center mb-4">
            {passed ? <Award className="w-16 h-16 text-green-600" /> : <XCircle className="w-16 h-16 text-red-600" />}
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">
            {passed ? '🎉 Congratulations! You Passed!' : '📚 Keep Studying!'}
          </h2>
          <div className="text-center text-2xl font-bold mb-2">
            Score: {score.correct}/{score.total} ({score.percentage.toFixed(1)}%) {passed ? '✓' : '✗'}
          </div>
          <div className="text-center text-gray-600 mb-4">
            Passing Score: 700/1000 (~70%) | You answered {score.correct} out of {score.total} questions correctly
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-2" /> Performance by Domain
          </h3>
          {weakAreas.map((area, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{area.category}</span>
                <span className="text-sm text-gray-600">{area.correct}/{area.total} ({area.percentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${area.percentage >= 70 ? 'bg-green-500' : area.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{width: `${area.percentage}%`}}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-blue-900">📚 Study Resources</h3>
          <p className="mb-4 text-blue-800">
            {passed 
              ? "Great job! Review these resources before taking the real DP-300 exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <a href="https://learn.microsoft.com/en-us/certifications/exams/dp-300" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official DP-300 Exam Page</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/training/courses/dp-300t00" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Microsoft Learn: DP-300 Learning Path</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/azure/azure-sql/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Azure SQL Documentation</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/sql/relational-databases/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">SQL Server Relational Databases</a></li>
            <li>• <a href="https://www.udemy.com/topic/microsoft-azure-dp-300/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Udemy DP-300 Courses</a></li>
          </ul>

          {!passed && weakAreas.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded border border-blue-300">
              <h4 className="font-bold mb-2 text-blue-900">🎯 Focus Areas:</h4>
              <ul className="text-sm space-y-1">
                {weakAreas.filter(a => a.percentage < 70).map((area, idx) => (
                  <li key={idx} className="text-blue-800">
                    • <strong>{area.category}</strong> - {area.percentage.toFixed(0)}% correct
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button 
          onClick={() => {
            setShowResults(false);
            setAnswers({});
            setCurrentQuestion(0);
            setTimeRemaining(120 * 60);
            setIsTimerActive(true);
          }}
          className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
        >
          Retake Exam
        </button>

        <a 
          href="/"
          className="block w-full mt-3 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 font-medium text-center"
        >
          ← Back to Exam List
        </a>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
        <span className="mr-2">←</span> Back to Exam List
      </a>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Microsoft DP-300: Administering Azure SQL Solutions</h1>
        <p className="text-blue-100">60 Questions | 120 Minutes | Passing Score: 700/1000 (~70%)</p>
      </div>

      {/* Timer and Progress */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Time Remaining</div>
          <div className={`text-2xl font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatTime(timeRemaining)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Question</div>
          <div className="text-2xl font-bold text-gray-900">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Answered</div>
          <div className="text-2xl font-bold text-gray-900">
            {answeredCount} / {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-700 to-indigo-700 h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {currentQ.cat}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-6 text-gray-900 leading-relaxed">
          {currentQ.text}
        </h2>

        <div className="space-y-3">
          {currentQ.opts.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQuestion, idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === idx
                  ? 'border-blue-600 bg-blue-50 font-medium'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === idx && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← Previous
        </button>

        <div className="flex gap-2 flex-wrap justify-center max-w-2xl">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-10 h-10 rounded-lg font-medium text-sm ${
                currentQuestion === idx
                  ? 'bg-blue-600 text-white'
                  : answers[idx] !== undefined
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              } hover:opacity-80`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={submitExam}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>💡 Tip: Focus on Azure SQL deployment options, security, and performance tuning</p>
        <p className="mt-2">⏰ You have 2 minutes per question on average</p>
      </div>
    </div>
  );
}