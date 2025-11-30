'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function DP900Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Core Data Concepts (25-30%)
    {q: 1, text: "What type of data is stored in a relational database?", opts: ["Unstructured data", "Structured data in tables with rows and columns", "Semi-structured data", "Binary data only"], correct: 1, hint: "Relational databases organize data into related tables.", cat: "Core Data Concepts", scored: true},
    
    {q: 2, text: "Which of the following is an example of structured data?", opts: ["Email messages", "Social media posts", "Customer records in a SQL database", "Video files"], correct: 2, hint: "Structured data has a defined schema and format.", cat: "Core Data Concepts", scored: true},
    
    {q: 3, text: "What is semi-structured data?", opts: ["Data with no organization", "Data with some organizational properties like tags or metadata", "Data stored in tables", "Encrypted data"], correct: 1, hint: "JSON and XML are examples of semi-structured data.", cat: "Core Data Concepts", scored: true},
    
    {q: 4, text: "What does ACID stand for in database transactions?", opts: ["Atomicity, Consistency, Isolation, Durability", "Automation, Consistency, Integrity, Data", "Analysis, Control, Integration, Design", "Access, Consistency, Identity, Data"], correct: 0, hint: "ACID ensures reliable transaction processing.", cat: "Core Data Concepts", scored: true},
    
    {q: 5, text: "What is the primary purpose of Extract, Transform, Load (ETL)?", opts: ["To backup databases", "To move and transform data from sources to a data warehouse", "To create database schemas", "To encrypt data"], correct: 1, hint: "ETL processes prepare data for analytics.", cat: "Core Data Concepts", scored: true},
    
    {q: 6, text: "What is the difference between OLTP and OLAP?", opts: ["No difference", "OLTP handles transactions; OLAP handles analytics", "OLAP is faster than OLTP", "OLTP is for big data only"], correct: 1, hint: "OLTP = transactional, OLAP = analytical.", cat: "Core Data Concepts", scored: true},
    
    {q: 7, text: "What is a data warehouse?", opts: ["A physical storage building", "A centralized repository for integrated data from multiple sources", "A backup system", "A type of database"], correct: 1, hint: "Data warehouses support business intelligence and analytics.", cat: "Core Data Concepts", scored: false},
    
    {q: 8, text: "What type of workload is characterized by many short, simple transactions?", opts: ["OLAP", "OLTP", "Batch processing", "Stream processing"], correct: 1, hint: "Think of e-commerce checkout or ATM withdrawals.", cat: "Core Data Concepts", scored: true},

    // Relational Data Concepts (25-30%)
    {q: 9, text: "What is a primary key in a relational database?", opts: ["The first column in a table", "A unique identifier for each row in a table", "A foreign key reference", "An index"], correct: 1, hint: "Primary keys ensure each row is unique.", cat: "Relational Data", scored: true},
    
    {q: 10, text: "What is a foreign key?", opts: ["A key from another database", "A column that references the primary key of another table", "An encrypted key", "A backup key"], correct: 1, hint: "Foreign keys create relationships between tables.", cat: "Relational Data", scored: true},
    
    {q: 11, text: "Which SQL command is used to retrieve data from a database?", opts: ["GET", "SELECT", "RETRIEVE", "FETCH"], correct: 1, hint: "This is the most common SQL query command.", cat: "Relational Data", scored: true},
    
    {q: 12, text: "What does the SQL JOIN operation do?", opts: ["Combines columns from one or more tables", "Deletes duplicate rows", "Creates a new table", "Backs up data"], correct: 0, hint: "JOIN relates data from multiple tables.", cat: "Relational Data", scored: true},
    
    {q: 13, text: "Which SQL statement is used to modify existing data?", opts: ["MODIFY", "CHANGE", "UPDATE", "ALTER"], correct: 2, hint: "This command updates existing rows.", cat: "Relational Data", scored: true},
    
    {q: 14, text: "What is normalization in database design?", opts: ["Making all data uppercase", "Organizing data to reduce redundancy", "Encrypting sensitive data", "Creating backups"], correct: 1, hint: "Normalization eliminates duplicate data.", cat: "Relational Data", scored: true},
    
    {q: 15, text: "What is a view in SQL?", opts: ["A physical table", "A virtual table based on a query", "A backup copy", "An index"], correct: 1, hint: "Views are saved queries that act like tables.", cat: "Relational Data", scored: true},
    
    {q: 16, text: "Which type of JOIN returns all rows from both tables, matching rows where available?", opts: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: 3, hint: "This JOIN includes all rows from both tables.", cat: "Relational Data", scored: false},
    
    {q: 17, text: "What is an index in a database?", opts: ["A table of contents", "A data structure that improves query performance", "A type of constraint", "A backup mechanism"], correct: 1, hint: "Indexes speed up data retrieval.", cat: "Relational Data", scored: true},

    // Non-Relational Data Concepts (25-30%)
    {q: 18, text: "What type of NoSQL database stores data as key-value pairs?", opts: ["Document database", "Graph database", "Key-value store", "Column-family database"], correct: 2, hint: "Redis and DynamoDB are examples.", cat: "Non-Relational Data", scored: true},
    
    {q: 19, text: "Which NoSQL database type is best for storing JSON documents?", opts: ["Key-value store", "Document database", "Graph database", "Time-series database"], correct: 1, hint: "MongoDB and Cosmos DB support document storage.", cat: "Non-Relational Data", scored: true},
    
    {q: 20, text: "What is Azure Cosmos DB?", opts: ["A relational database", "A globally distributed, multi-model database service", "A data warehouse", "A file storage service"], correct: 1, hint: "Cosmos DB supports multiple data models and APIs.", cat: "Non-Relational Data", scored: true},
    
    {q: 21, text: "Which API does Azure Cosmos DB NOT support?", opts: ["SQL API", "MongoDB API", "Cassandra API", "Oracle API"], correct: 3, hint: "Cosmos DB supports SQL, MongoDB, Cassandra, Gremlin, and Table APIs.", cat: "Non-Relational Data", scored: true},
    
    {q: 22, text: "What is a graph database best suited for?", opts: ["Storing files", "Analyzing relationships between entities", "Time-series data", "Storing images"], correct: 1, hint: "Social networks and recommendation engines use graph databases.", cat: "Non-Relational Data", scored: true},
    
    {q: 23, text: "What is the CAP theorem?", opts: ["A database design pattern", "States you can have only 2 of: Consistency, Availability, Partition tolerance", "A security model", "A backup strategy"], correct: 1, hint: "CAP defines tradeoffs in distributed systems.", cat: "Non-Relational Data", scored: false},

    // Analytics Workloads (25-30%)
    {q: 24, text: "What is Azure Synapse Analytics?", opts: ["A relational database", "An integrated analytics service combining data warehousing and big data", "A NoSQL database", "A backup service"], correct: 1, hint: "Synapse unifies data warehousing and analytics.", cat: "Analytics Workloads", scored: true},
    
    {q: 25, text: "What is Apache Spark?", opts: ["A database", "A unified analytics engine for big data processing", "A storage service", "A backup tool"], correct: 1, hint: "Spark processes large-scale data in memory.", cat: "Analytics Workloads", scored: true},
    
    {q: 26, text: "What is Azure Databricks?", opts: ["A database service", "An Apache Spark-based analytics platform", "A storage account", "A web server"], correct: 1, hint: "Databricks provides a collaborative Spark environment.", cat: "Analytics Workloads", scored: true},
    
    {q: 27, text: "What is the purpose of Azure Data Lake Storage?", opts: ["To store relational data", "To store massive amounts of unstructured data for analytics", "To host websites", "To run virtual machines"], correct: 1, hint: "Data lakes store raw data in native format.", cat: "Analytics Workloads", scored: true},
    
    {q: 28, text: "What is batch processing?", opts: ["Processing data one record at a time", "Processing large volumes of data at scheduled intervals", "Real-time data processing", "Manual data entry"], correct: 1, hint: "Batch jobs run on a schedule, not continuously.", cat: "Analytics Workloads", scored: true},
    
    {q: 29, text: "What is stream processing?", opts: ["Processing data in batches", "Processing data in real-time as it arrives", "Storing data in files", "Backing up data"], correct: 1, hint: "Streaming handles continuous data flows.", cat: "Analytics Workloads", scored: true},
    
    {q: 30, text: "What is Azure Stream Analytics?", opts: ["A batch processing service", "A real-time analytics service for streaming data", "A database", "A storage service"], correct: 1, hint: "Stream Analytics processes IoT and event data in real-time.", cat: "Analytics Workloads", scored: true},
    
    {q: 31, text: "What visualization tool integrates with Azure data services for creating reports and dashboards?", opts: ["Excel", "Power BI", "Word", "PowerPoint"], correct: 1, hint: "This Microsoft tool is designed for business intelligence.", cat: "Analytics Workloads", scored: true},

    // Azure Data Services
    {q: 32, text: "What is Azure SQL Database?", opts: ["A NoSQL database", "A fully managed relational database service (PaaS)", "A data warehouse", "A file storage"], correct: 1, hint: "SQL Database is a managed SQL Server in the cloud.", cat: "Azure Data Services", scored: true},
    
    {q: 33, text: "What is the difference between Azure SQL Database and SQL Server on Azure VMs?", opts: ["No difference", "SQL Database is PaaS (managed); VMs are IaaS (you manage)", "VMs are faster", "SQL Database doesn't support T-SQL"], correct: 1, hint: "PaaS means Microsoft manages the infrastructure.", cat: "Azure Data Services", scored: true},
    
    {q: 34, text: "What is Azure SQL Managed Instance?", opts: ["A NoSQL service", "A PaaS offering with near 100% compatibility with SQL Server", "A data warehouse", "A backup service"], correct: 1, hint: "Managed Instance supports legacy SQL Server features.", cat: "Azure Data Services", scored: true},
    
    {q: 35, text: "What is Azure Database for PostgreSQL?", opts: ["A Microsoft SQL Server variant", "A fully managed PostgreSQL database service", "A NoSQL database", "A data warehouse"], correct: 1, hint: "Azure offers managed versions of popular open-source databases.", cat: "Azure Data Services", scored: true},
    
    {q: 36, text: "What is Azure Database for MySQL?", opts: ["A Microsoft proprietary database", "A fully managed MySQL database service", "A NoSQL database", "A graph database"], correct: 1, hint: "Azure supports MySQL as a managed service.", cat: "Azure Data Services", scored: false},
    
    {q: 37, text: "Which Azure service provides a fully managed Cassandra database?", opts: ["Azure SQL Database", "Azure Cosmos DB (Cassandra API)", "Azure Synapse Analytics", "Azure Data Lake"], correct: 1, hint: "Cosmos DB supports multiple APIs including Cassandra.", cat: "Azure Data Services", scored: true},
    
    {q: 38, text: "What is Azure Data Factory?", opts: ["A database service", "A cloud-based ETL and data integration service", "A storage service", "A backup tool"], correct: 1, hint: "Data Factory orchestrates data movement and transformation.", cat: "Azure Data Services", scored: true},

    // SQL Fundamentals
    {q: 39, text: "Which SQL clause filters rows returned by a query?", opts: ["SELECT", "FROM", "WHERE", "ORDER BY"], correct: 2, hint: "This clause specifies conditions for filtering.", cat: "SQL Fundamentals", scored: true},
    
    {q: 40, text: "What does the SQL GROUP BY clause do?", opts: ["Groups rows with the same values", "Sorts rows", "Filters rows", "Joins tables"], correct: 0, hint: "GROUP BY is used with aggregate functions.", cat: "SQL Fundamentals", scored: true},
    
    {q: 41, text: "Which SQL aggregate function returns the number of rows?", opts: ["SUM()", "AVG()", "COUNT()", "MAX()"], correct: 2, hint: "This function counts records.", cat: "SQL Fundamentals", scored: true},
    
    {q: 42, text: "What does the SQL DISTINCT keyword do?", opts: ["Deletes duplicates", "Returns unique values only", "Sorts values", "Counts values"], correct: 1, hint: "DISTINCT eliminates duplicate rows from results.", cat: "SQL Fundamentals", scored: true},
    
    {q: 43, text: "Which SQL statement creates a new table?", opts: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", "ADD TABLE"], correct: 1, hint: "This DDL statement defines a new table structure.", cat: "SQL Fundamentals", scored: true},
    
    {q: 44, text: "What is the purpose of the SQL ORDER BY clause?", opts: ["To filter rows", "To sort query results", "To group rows", "To join tables"], correct: 1, hint: "ORDER BY controls the sort order of results.", cat: "SQL Fundamentals", scored: true},
    
    {q: 45, text: "Which SQL command removes all rows from a table but keeps the table structure?", opts: ["DELETE", "DROP", "TRUNCATE", "REMOVE"], correct: 2, hint: "TRUNCATE is faster than DELETE for removing all rows.", cat: "SQL Fundamentals", scored: false},

    // Data Security and Governance
    {q: 46, text: "What is encryption at rest?", opts: ["Encrypting data while it's being transmitted", "Encrypting data while it's stored on disk", "Encrypting passwords", "Encrypting backups only"], correct: 1, hint: "At rest means data is stored, not moving.", cat: "Data Security", scored: true},
    
    {q: 47, text: "What is encryption in transit?", opts: ["Encrypting data while it's being transmitted over networks", "Encrypting stored data", "Backing up data", "Compressing data"], correct: 0, hint: "In transit means data is moving between locations.", cat: "Data Security", scored: true},
    
    {q: 48, text: "What authentication method uses a username and password?", opts: ["SQL authentication", "Multi-factor authentication", "Certificate-based authentication", "Biometric authentication"], correct: 0, hint: "This is the traditional credential-based method.", cat: "Data Security", scored: true},
    
    {q: 49, text: "What is Azure Active Directory (Azure AD)?", opts: ["A database", "Microsoft's cloud-based identity and access management service", "A storage service", "A backup service"], correct: 1, hint: "Azure AD manages user identities and access.", cat: "Data Security", scored: true},
    
    {q: 50, text: "What is row-level security in a database?", opts: ["Encrypting all rows", "Controlling access to specific rows based on user identity", "Deleting sensitive rows", "Backing up rows"], correct: 1, hint: "RLS restricts which rows users can see.", cat: "Data Security", scored: true},
    
    {q: 51, text: "What is the principle of least privilege?", opts: ["Give everyone admin access", "Grant only the minimum permissions needed to perform a job", "Deny all access by default", "Use the same password everywhere"], correct: 1, hint: "Minimize permissions to reduce security risk.", cat: "Data Security", scored: true},

    // Data Roles and Responsibilities
    {q: 52, text: "What is the primary responsibility of a database administrator (DBA)?", opts: ["Writing application code", "Managing and maintaining database systems", "Creating reports", "Designing user interfaces"], correct: 1, hint: "DBAs ensure database availability and performance.", cat: "Data Roles", scored: true},
    
    {q: 53, text: "What does a data engineer primarily do?", opts: ["Design databases", "Build data pipelines and ETL processes", "Create visualizations", "Manage security"], correct: 1, hint: "Data engineers prepare data for analytics.", cat: "Data Roles", scored: true},
    
    {q: 54, text: "What is the main role of a data analyst?", opts: ["Build databases", "Analyze data and create reports/visualizations", "Write SQL Server code", "Manage servers"], correct: 1, hint: "Analysts turn data into insights.", cat: "Data Roles", scored: false},
    
    {q: 55, text: "What does a data scientist do?", opts: ["Manage databases", "Apply statistical and machine learning techniques to extract insights", "Create backups", "Design schemas"], correct: 1, hint: "Data scientists use advanced analytics and ML.", cat: "Data Roles", scored: true},

    // Additional Concepts
    {q: 56, text: "What is a stored procedure?", opts: ["A backup file", "A precompiled collection of SQL statements", "A table index", "A view"], correct: 1, hint: "Stored procedures are reusable SQL code.", cat: "SQL Fundamentals", scored: true},
    
    {q: 57, text: "What is data redundancy?", opts: ["Having backup copies", "Storing the same data in multiple places", "Encrypting data", "Compressing data"], correct: 1, hint: "Redundancy means duplicate data exists.", cat: "Core Data Concepts", scored: true},
    
    {q: 58, text: "What is a schema in a database?", opts: ["A backup plan", "The structure that defines how data is organized", "An encryption method", "A user account"], correct: 1, hint: "Schema defines tables, columns, and relationships.", cat: "Relational Data", scored: true},
    
    {q: 59, text: "What does SQL stand for?", opts: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "System Query Language"], correct: 1, hint: "SQL is the standard language for relational databases.", cat: "SQL Fundamentals", scored: true},
    
    {q: 60, text: "What is the purpose of a transaction log?", opts: ["To store user data", "To record all changes made to the database for recovery", "To create backups", "To index tables"], correct: 1, hint: "Transaction logs enable point-in-time recovery.", cat: "Core Data Concepts", scored: true}
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
            Passing Score: 70% | You answered {score.correct} out of {score.total} questions correctly
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-2" /> Performance by Topic
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
              ? "Great job! Review these resources before taking the real DP-900 exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <a href="https://learn.microsoft.com/en-us/certifications/exams/dp-900" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official DP-900 Exam Page</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/training/courses/dp-900t00" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Microsoft Learn: DP-900 Learning Path</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/sql/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Microsoft SQL Documentation</a></li>
            <li>• <a href="https://learn.microsoft.com/en-us/azure/azure-sql/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Azure SQL Documentation</a></li>
            <li>• <a href="https://www.udemy.com/topic/microsoft-azure-dp-900/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Udemy DP-900 Courses</a></li>
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
            setTimeRemaining(45 * 60);
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Microsoft DP-900: Azure Data Fundamentals</h1>
        <p className="text-blue-100">60 Questions | 45 Minutes | Passing Score: 700/1000 (~70%)</p>
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
          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
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
        <p>💡 Tip: Focus on understanding data concepts and Azure data services</p>
        <p className="mt-2">⏰ You have about 45 seconds per question</p>
      </div>
    </div>
  );
}