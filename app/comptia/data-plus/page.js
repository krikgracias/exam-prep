'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function DataPlusExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Data Concepts and Environments (15%)
    {q: 1, text: "What is the difference between structured and unstructured data?", opts: ["Structured data is organized in a defined format; unstructured data lacks predefined structure", "Unstructured data is faster to process", "Structured data is always larger", "There is no difference"], correct: 0, hint: "Think databases vs. text documents and images.", cat: "Data Concepts", scored: true},
    
    {q: 2, text: "Which of the following is an example of structured data?", opts: ["Email messages", "Social media posts", "Relational database table", "Video files"], correct: 2, hint: "Structured data fits in rows and columns.", cat: "Data Concepts", scored: true},
    
    {q: 3, text: "What is metadata?", opts: ["Data about data", "Large datasets", "Encrypted data", "Backup data"], correct: 0, hint: "Metadata describes other data's characteristics.", cat: "Data Concepts", scored: true},
    
    {q: 4, text: "What does OLTP stand for?", opts: ["Online Transaction Processing", "Offline Transaction Protocol", "Online Transfer Processing", "Operational Transaction Platform"], correct: 0, hint: "OLTP handles day-to-day transactional operations.", cat: "Data Concepts", scored: true},
    
    {q: 5, text: "What does OLAP stand for?", opts: ["Online Analytical Processing", "Offline Analysis Protocol", "Online Application Processing", "Operational Analysis Platform"], correct: 0, hint: "OLAP is used for complex analytical queries.", cat: "Data Concepts", scored: true},
    
    {q: 6, text: "What is a data warehouse?", opts: ["A physical storage facility", "A centralized repository for integrated data from multiple sources", "A backup system", "A database type"], correct: 1, hint: "Data warehouses support business intelligence and reporting.", cat: "Data Concepts", scored: true},
    
    {q: 7, text: "What is a data lake?", opts: ["A small database", "A repository that stores raw data in its native format", "A type of data warehouse", "A backup solution"], correct: 1, hint: "Data lakes store unprocessed data of any type.", cat: "Data Concepts", scored: false},
    
    {q: 8, text: "What is the difference between a database and a data warehouse?", opts: ["No difference", "Databases support operations; data warehouses support analytics", "Data warehouses are smaller", "Databases are cloud-only"], correct: 1, hint: "Databases = OLTP, data warehouses = OLAP.", cat: "Data Concepts", scored: true},
    
    {q: 9, text: "What does ETL stand for?", opts: ["Extract, Transform, Load", "Execute, Test, Launch", "Encrypt, Transfer, Log", "Extract, Transfer, Link"], correct: 0, hint: "ETL is the process of moving and preparing data.", cat: "Data Concepts", scored: true},
    
    {q: 10, text: "In the ETL process, what happens during the Transform stage?", opts: ["Data is extracted from sources", "Data is cleaned, validated, and converted", "Data is loaded into the target", "Data is deleted"], correct: 1, hint: "Transformation prepares data for analysis.", cat: "Data Concepts", scored: true},
    
    {q: 11, text: "What is a schema in database terminology?", opts: ["A backup file", "The structure that defines how data is organized", "A query", "A user account"], correct: 1, hint: "Schema defines tables, columns, relationships, and constraints.", cat: "Data Concepts", scored: true},
    
    {q: 12, text: "What is normalization in database design?", opts: ["Making data normal", "Organizing data to reduce redundancy", "Encrypting data", "Backing up data"], correct: 1, hint: "Normalization eliminates duplicate data.", cat: "Data Concepts", scored: true},
    
    {q: 13, text: "What is a primary key?", opts: ["The first column in a table", "A unique identifier for each row", "A password", "An index"], correct: 1, hint: "Primary keys ensure each record is unique.", cat: "Data Concepts", scored: true},

    // Data Mining (15%)
    {q: 14, text: "What is data mining?", opts: ["Extracting valuable insights from large datasets", "Deleting old data", "Backing up data", "Encrypting data"], correct: 0, hint: "Data mining discovers patterns and relationships.", cat: "Data Mining", scored: true},
    
    {q: 15, text: "What is a common use case for clustering in data mining?", opts: ["Predicting future values", "Grouping similar data points together", "Deleting duplicates", "Encrypting data"], correct: 1, hint: "Clustering finds natural groups in data.", cat: "Data Mining", scored: true},
    
    {q: 16, text: "What is the purpose of classification in data mining?", opts: ["To cluster data", "To predict which category an item belongs to", "To delete data", "To encrypt data"], correct: 1, hint: "Classification assigns items to predefined categories.", cat: "Data Mining", scored: true},
    
    {q: 17, text: "What is association rule mining used for?", opts: ["Finding relationships between variables", "Deleting associations", "Creating databases", "Encrypting associations"], correct: 0, hint: "Famous example: 'customers who buy X also buy Y'", cat: "Data Mining", scored: true},
    
    {q: 18, text: "What is outlier detection?", opts: ["Finding the average value", "Identifying data points that differ significantly from the norm", "Deleting all data", "Encrypting outliers"], correct: 1, hint: "Outliers are anomalies or unusual observations.", cat: "Data Mining", scored: true},
    
    {q: 19, text: "What is regression analysis used for?", opts: ["Grouping data", "Predicting continuous numerical values", "Deleting data", "Encrypting data"], correct: 1, hint: "Regression models relationships between variables.", cat: "Data Mining", scored: true},
    
    {q: 20, text: "What is the difference between supervised and unsupervised learning?", opts: ["Supervised uses labeled data; unsupervised doesn't", "Unsupervised is faster", "No difference", "Supervised is for images only"], correct: 0, hint: "Supervised learning has known outcomes; unsupervised discovers patterns.", cat: "Data Mining", scored: false},
    
    {q: 21, text: "What is a decision tree?", opts: ["A tree structure for organizing files", "A model that makes decisions based on asking questions about features", "A database structure", "A backup method"], correct: 1, hint: "Decision trees split data based on attribute values.", cat: "Data Mining", scored: true},
    
    {q: 22, text: "What is cross-validation?", opts: ["Checking data twice", "A technique to assess model performance on unseen data", "Validating passwords", "A backup method"], correct: 1, hint: "Cross-validation tests model generalization.", cat: "Data Mining", scored: true},
    
    {q: 23, text: "What does overfitting mean?", opts: ["A model fits the training data too well and performs poorly on new data", "A model is too simple", "Data is too large", "Files are too big"], correct: 0, hint: "Overfitting = memorizing instead of learning patterns.", cat: "Data Mining", scored: true},
    
    {q: 24, text: "What is the purpose of a training dataset?", opts: ["To test the final model", "To build and train the model", "To deploy the model", "To delete data"], correct: 1, hint: "Training data teaches the model.", cat: "Data Mining", scored: true},
    
    {q: 25, text: "What is the purpose of a test dataset?", opts: ["To train the model", "To evaluate model performance on unseen data", "To delete data", "To backup data"], correct: 1, hint: "Test data assesses how well the model generalizes.", cat: "Data Mining", scored: true},

    // Data Analysis (30%)
    {q: 26, text: "What is descriptive statistics?", opts: ["Predicting future values", "Summarizing and describing data characteristics", "Deleting data", "Encrypting data"], correct: 1, hint: "Descriptive stats include mean, median, mode, standard deviation.", cat: "Data Analysis", scored: true},
    
    {q: 27, text: "What is the mean?", opts: ["The middle value", "The average of all values", "The most common value", "The range"], correct: 1, hint: "Mean = sum of values / number of values.", cat: "Data Analysis", scored: true},
    
    {q: 28, text: "What is the median?", opts: ["The average", "The middle value when data is sorted", "The most common value", "The range"], correct: 1, hint: "Median is the 50th percentile.", cat: "Data Analysis", scored: true},
    
    {q: 29, text: "What is the mode?", opts: ["The average", "The middle value", "The most frequently occurring value", "The range"], correct: 2, hint: "Mode is the value that appears most often.", cat: "Data Analysis", scored: true},
    
    {q: 30, text: "What does standard deviation measure?", opts: ["Central tendency", "Spread or dispersion of data", "Skewness", "Correlation"], correct: 1, hint: "Standard deviation shows how spread out the data is.", cat: "Data Analysis", scored: true},
    
    {q: 31, text: "What is correlation?", opts: ["Causation", "A measure of the relationship between two variables", "The average", "The median"], correct: 1, hint: "Correlation shows if variables move together.", cat: "Data Analysis", scored: true},
    
    {q: 32, text: "If correlation is -0.8, what does this indicate?", opts: ["Strong positive relationship", "Strong negative relationship", "No relationship", "Weak relationship"], correct: 1, hint: "Negative correlation means variables move in opposite directions.", cat: "Data Analysis", scored: false},
    
    {q: 33, text: "What is the difference between correlation and causation?", opts: ["No difference", "Correlation shows relationship; causation shows one causes the other", "Causation is weaker", "Correlation is always stronger"], correct: 1, hint: "Correlation doesn't prove causation.", cat: "Data Analysis", scored: true},
    
    {q: 34, text: "What is a histogram used for?", opts: ["Showing trends over time", "Displaying the distribution of a continuous variable", "Showing relationships between variables", "Creating categories"], correct: 1, hint: "Histograms show frequency distributions in bins.", cat: "Data Analysis", scored: true},
    
    {q: 35, text: "What is a scatter plot used for?", opts: ["Showing distribution", "Displaying relationships between two continuous variables", "Showing categories", "Displaying time series"], correct: 1, hint: "Scatter plots show how two variables relate.", cat: "Data Analysis", scored: true},
    
    {q: 36, text: "What is a box plot used for?", opts: ["Showing the five-number summary and outliers", "Showing trends", "Showing correlations", "Showing categories"], correct: 0, hint: "Box plots display min, Q1, median, Q3, and max.", cat: "Data Analysis", scattered: true},
    
    {q: 37, text: "What does a p-value indicate in hypothesis testing?", opts: ["The probability of observing the data if the null hypothesis is true", "The mean", "The median", "The correlation"], correct: 0, hint: "Low p-value suggests rejecting the null hypothesis.", cat: "Data Analysis", scored: true},
    
    {q: 38, text: "What is typically considered a statistically significant p-value?", opts: ["p > 0.5", "p < 0.05", "p = 1", "p > 0.1"], correct: 1, hint: "p < 0.05 is the common threshold for significance.", cat: "Data Analysis", scored: true},
    
    {q: 39, text: "What is the null hypothesis?", opts: ["The hypothesis we want to prove", "The default assumption of no effect or no difference", "The alternative hypothesis", "The final conclusion"], correct: 1, hint: "We test whether to reject the null hypothesis.", cat: "Data Analysis", scored: true},
    
    {q: 40, text: "What is a confidence interval?", opts: ["A range of values likely to contain the true parameter", "The exact value", "The error rate", "The sample size"], correct: 0, hint: "E.g., 95% confidence interval for the mean.", cat: "Data Analysis", scored: true},
    
    {q: 41, text: "What is sampling?", opts: ["Deleting data", "Selecting a subset of data from a larger population", "Encrypting data", "Backing up data"], correct: 1, hint: "Sampling allows us to make inferences about populations.", cat: "Data Analysis", scored: true},
    
    {q: 42, text: "What is a random sample?", opts: ["Any sample", "A sample where each member has an equal chance of selection", "The first sample", "The largest sample"], correct: 1, hint: "Random sampling reduces bias.", cat: "Data Analysis", scored: true},
    
    {q: 43, text: "What is selection bias?", opts: ["Bias in selecting a model", "Systematic error in sample selection", "Random error", "Data encryption error"], correct: 1, hint: "Selection bias makes the sample unrepresentative.", cat: "Data Analysis", scored: true},
    
    {q: 44, text: "What is time series data?", opts: ["Data collected at random times", "Data points indexed in time order", "Static data", "Encrypted data"], correct: 1, hint: "Time series tracks changes over time.", cat: "Data Analysis", scored: false},
    
    {q: 45, text: "What is a trend in time series analysis?", opts: ["Random variation", "Long-term movement in a particular direction", "Seasonal variation", "Noise"], correct: 1, hint: "Trends show overall direction (up, down, flat).", cat: "Data Analysis", scored: true},
    
    {q: 46, text: "What is seasonality in time series?", opts: ["Data from different seasons", "Regular patterns that repeat at fixed intervals", "Random patterns", "Trends"], correct: 1, hint: "E.g., retail sales spike every December.", cat: "Data Analysis", scored: true},

    // Visualization (15%)
    {q: 47, text: "What is the purpose of data visualization?", opts: ["To delete data", "To communicate data insights visually", "To encrypt data", "To backup data"], correct: 1, hint: "Visualizations make patterns and insights easier to understand.", cat: "Visualization", scored: true},
    
    {q: 48, text: "Which chart type is best for showing parts of a whole?", opts: ["Line chart", "Pie chart", "Scatter plot", "Histogram"], correct: 1, hint: "Pie charts show proportions and percentages.", cat: "Visualization", scored: true},
    
    {q: 49, text: "Which chart type is best for showing trends over time?", opts: ["Pie chart", "Line chart", "Bar chart", "Scatter plot"], correct: 1, hint: "Line charts connect data points across time.", cat: "Visualization", scored: true},
    
    {q: 50, text: "Which chart type is best for comparing categories?", opts: ["Line chart", "Bar chart", "Scatter plot", "Histogram"], correct: 1, hint: "Bar charts compare discrete categories.", cat: "Visualization", scored: true},
    
    {q: 51, text: "What is a dashboard?", opts: ["A database", "A visual display of key metrics and data", "A backup system", "A security tool"], correct: 1, hint: "Dashboards provide at-a-glance views of important information.", cat: "Visualization", scored: true},
    
    {q: 52, text: "What is a heat map used for?", opts: ["Temperature data only", "Showing data density or intensity using color", "Time series", "Categories"], correct: 1, hint: "Heat maps use color gradients to represent values.", cat: "Visualization", scored: true},
    
    {q: 53, text: "What does it mean for a visualization to be interactive?", opts: ["It moves automatically", "Users can manipulate it to explore data", "It updates in real-time", "It's animated"], correct: 1, hint: "Interactive visualizations let users filter, drill down, and explore.", cat: "Visualization", scored: false},
    
    {q: 54, text: "What is the purpose of using color in visualizations?", opts: ["To make it pretty", "To encode additional information and highlight patterns", "To hide data", "No purpose"], correct: 1, hint: "Color should be meaningful and accessible.", cat: "Visualization", scored: true},
    
    {q: 55, text: "What is chart junk?", opts: ["Deleted charts", "Unnecessary or distracting visual elements", "Old charts", "Encrypted charts"], correct: 1, hint: "Chart junk reduces clarity without adding value.", cat: "Visualization", scored: true},
    
    {q: 56, text: "Which visualization tool is known for business intelligence and interactive dashboards?", opts: ["Excel", "Tableau", "Notepad", "PowerPoint"], correct: 1, hint: "Tableau is a leading BI visualization platform.", cat: "Visualization", scored: true},
    
    {q: 57, text: "What is Power BI?", opts: ["A database", "Microsoft's business analytics and visualization tool", "A programming language", "A backup tool"], correct: 1, hint: "Power BI creates reports and dashboards.", cat: "Visualization", scored: true},

    // Data Governance, Quality, and Controls (25%)
    {q: 58, text: "What is data quality?", opts: ["The size of data", "The degree to which data is accurate, complete, and reliable", "The age of data", "The format of data"], correct: 1, hint: "Quality data is fit for its intended use.", cat: "Data Governance", scored: true},
    
    {q: 59, text: "What are the key dimensions of data quality?", opts: ["Size, color, shape", "Accuracy, completeness, consistency, timeliness, validity", "Speed, volume, variety", "None"], correct: 1, hint: "These dimensions define data quality.", cat: "Data Governance", scored: true},
    
    {q: 60, text: "What is data accuracy?", opts: ["How old the data is", "How correctly data represents the real-world values", "How large the data is", "How fast data is"], correct: 1, hint: "Accurate data matches reality.", cat: "Data Governance", scored: true},
    
    {q: 61, text: "What is data completeness?", opts: ["Data is compressed", "All required data is present", "Data is encrypted", "Data is backed up"], correct: 1, hint: "Complete data has no missing values.", cat: "Data Governance", scored: true},
    
    {q: 62, text: "What is data consistency?", opts: ["Data stays the same forever", "Data is uniform across different datasets and systems", "Data is large", "Data is encrypted"], correct: 1, hint: "Consistent data doesn't conflict across sources.", cat: "Data Governance", scored: true},
    
    {q: 63, text: "What is data validity?", opts: ["Data is old", "Data conforms to defined formats and rules", "Data is large", "Data is fast"], correct: 1, hint: "Valid data follows the correct format and constraints.", cat: "Data Governance", scored: false},
    
    {q: 64, text: "What is data timeliness?", opts: ["Data is stored for a long time", "Data is available when needed and up-to-date", "Data is deleted quickly", "Data is encrypted"], correct: 1, hint: "Timely data is current and available promptly.", cat: "Data Governance", scored: true},
    
    {q: 65, text: "What is data profiling?", opts: ["Creating user profiles", "Analyzing data to understand its structure, content, and quality", "Deleting data", "Encrypting data"], correct: 1, hint: "Profiling examines data characteristics.", cat: "Data Governance", scored: true},
    
    {q: 66, text: "What is data cleansing (or data cleaning)?", opts: ["Deleting all data", "Detecting and correcting errors and inconsistencies", "Encrypting data", "Backing up data"], correct: 1, hint: "Cleansing improves data quality.", cat: "Data Governance", scored: true},
    
    {q: 67, text: "What is a data dictionary?", opts: ["A book about data", "A centralized repository of information about data elements", "A backup file", "An encryption key"], correct: 1, hint: "Data dictionaries document metadata and definitions.", cat: "Data Governance", scored: true},
    
    {q: 68, text: "What is data lineage?", opts: ["The age of data", "The tracking of data's origin, movement, and transformations", "The size of data", "The format of data"], correct: 1, hint: "Lineage shows the data's lifecycle.", cat: "Data Governance", scored: true},
    
    {q: 69, text: "What is master data management (MDM)?", opts: ["Managing master passwords", "Creating a single, consistent view of key business entities", "Backing up data", "Encrypting data"], correct: 1, hint: "MDM ensures one 'golden record' for critical data.", cat: "Data Governance", scored: true},
    
    {q: 70, text: "What is data governance?", opts: ["Data storage", "The management of data availability, usability, integrity, and security", "Data deletion", "Data encryption"], correct: 1, hint: "Governance establishes policies and accountability.", cat: "Data Governance", scored: true},
    
    {q: 71, text: "What is the purpose of data classification?", opts: ["To delete data", "To categorize data based on sensitivity and importance", "To encrypt all data", "To backup data"], correct: 1, hint: "Classification guides security and handling.", cat: "Data Governance", scored: true},
    
    {q: 72, text: "What is PII?", opts: ["Publicly Important Information", "Personally Identifiable Information", "Private Internal Information", "Protected Internet Information"], correct: 1, hint: "PII can identify specific individuals.", cat: "Data Governance", scored: true},
    
    {q: 73, text: "Which regulation protects personal data of EU citizens?", opts: ["HIPAA", "GDPR", "SOX", "PCI DSS"], correct: 1, hint: "GDPR = General Data Protection Regulation.", cat: "Data Governance", scored: true},
    
    {q: 74, text: "What is HIPAA?", opts: ["A data format", "US law protecting health information", "A database", "An encryption method"], correct: 1, hint: "HIPAA governs healthcare data privacy.", cat: "Data Governance", scored: false},
    
    {q: 75, text: "What is data retention?", opts: ["How long data is kept", "How data is deleted", "How data is encrypted", "How data is backed up"], correct: 0, hint: "Retention policies specify storage duration.", cat: "Data Governance", scored: true},
    
    {q: 76, text: "What is the right to be forgotten (data erasure)?", opts: ["Forgetting passwords", "Individual's right to have personal data deleted", "Deleting all data", "Archiving data"], correct: 1, hint: "GDPR grants this right to individuals.", cat: "Data Governance", scored: true},
    
    {q: 77, text: "What is encryption at rest?", opts: ["Encrypting data while transmitted", "Encrypting stored data", "Encrypting passwords", "Encrypting networks"], correct: 1, hint: "At rest = data on disk or storage.", cat: "Data Governance", scored: true},
    
    {q: 78, text: "What is encryption in transit?", opts: ["Encrypting stored data", "Encrypting data while being transmitted", "Encrypting backups", "Encrypting databases"], correct: 1, hint: "In transit = data moving over networks.", cat: "Data Governance", scored: true},
    
    {q: 79, text: "What is data masking?", opts: ["Hiding entire databases", "Obscuring specific data to protect sensitive information", "Deleting data", "Encrypting data"], correct: 1, hint: "Masking hides real data while maintaining format.", cat: "Data Governance", scored: true},
    
    {q: 80, text: "What is tokenization?", opts: ["Creating database tokens", "Replacing sensitive data with non-sensitive tokens", "Encrypting tokens", "Deleting data"], correct: 1, hint: "Tokens can be mapped back to original data.", cat: "Data Governance", scored: true},
    
    {q: 81, text: "What is an audit trail?", opts: ["A hiking path", "A chronological record of system activities and data access", "A backup log", "A network path"], correct: 1, hint: "Audit trails support compliance and security.", cat: "Data Governance", scored: true},
    
    {q: 82, text: "What is role-based access control (RBAC)?", opts: ["Random access", "Granting permissions based on user roles", "Encrypting data", "Backing up data"], correct: 1, hint: "RBAC ensures users have appropriate access.", cat: "Data Governance", scored: true},
    
    {q: 83, text: "What is the principle of least privilege?", opts: ["Give everyone maximum access", "Grant only minimum permissions needed for a job", "Deny all access", "Random access control"], correct: 1, hint: "Minimize access to reduce security risk.", cat: "Data Governance", scored: true},

    // SQL and Databases
    {q: 84, text: "Which SQL command retrieves data from a database?", opts: ["GET", "SELECT", "RETRIEVE", "FETCH"], correct: 1, hint: "SELECT is the primary query command.", cat: "SQL", scored: true},
    
    {q: 85, text: "What does the WHERE clause do in SQL?", opts: ["Sorts data", "Filters rows based on conditions", "Groups data", "Joins tables"], correct: 1, hint: "WHERE specifies which rows to include.", cat: "SQL", scored: true},
    
    {q: 86, text: "Which SQL function counts the number of rows?", opts: ["SUM()", "COUNT()", "TOTAL()", "NUM()"], correct: 1, hint: "COUNT() returns the number of records.", cat: "SQL", scored: false},
    
    {q: 87, text: "What does GROUP BY do in SQL?", opts: ["Sorts rows", "Groups rows with the same values", "Filters rows", "Joins tables"], correct: 1, hint: "GROUP BY is used with aggregate functions.", cat: "SQL", scored: true},
    
    {q: 88, text: "What is a JOIN in SQL?", opts: ["Combining tables", "Deleting data", "Creating tables", "Backing up data"], correct: 0, hint: "JOIN combines columns from multiple tables.", cat: "SQL", scored: true},
    
    {q: 89, text: "Which type of JOIN returns all rows from both tables?", opts: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: 3, hint: "FULL OUTER JOIN includes all rows from both tables.", cat: "SQL", scored: true},
    
    {q: 90, text: "What does the DISTINCT keyword do in SQL?", opts: ["Deletes duplicates", "Returns only unique values", "Sorts values", "Counts values"], correct: 1, hint: "DISTINCT eliminates duplicate rows from results.", cat: "SQL", scored: true}
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
    const scaledScore = Math.round(100 + (percentage / 100) * 800); // Scale to 100-900
    
    return { correct, total: scoredQuestions, percentage, scaled: scaledScore };
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
    const passed = score.scaled >= 675; // 675/900 passing

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
            Score: {score.scaled}/900 {passed ? '✓' : '✗'}
          </div>
          <div className="text-center text-gray-600 mb-4">
            Passing Score: 675/900 | You answered {score.correct} out of {score.total} questions correctly ({score.percentage.toFixed(1)}%)
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

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-cyan-900">📚 Study Resources</h3>
          <p className="mb-4 text-cyan-800">
            {passed 
              ? "Great job! Review these resources to reinforce your knowledge before the real exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-cyan-800">
            <li>• <a href="https://www.comptia.org/training/books/data-da0-001-study-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-600 font-medium">CompTIA Data+ Study Guide</a> (Official)</li>
            <li>• <a href="https://www.comptia.org/training/certmaster-learn/data" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-600 font-medium">CompTIA CertMaster Learn for Data+</a></li>
            <li>• <a href="https://www.udemy.com/topic/comptia-data-plus/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-600 font-medium">Udemy CompTIA Data+ Courses</a></li>
            <li>• <a href="https://www.linkedin.com/learning/topics/data-analytics" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-600 font-medium">LinkedIn Learning Data Analytics</a></li>
            <li>• <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-600 font-medium">Kaggle Learn</a> (Free hands-on practice)</li>
          </ul>

          {!passed && weakAreas.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded border border-cyan-300">
              <h4 className="font-bold mb-2 text-cyan-900">🎯 Focus Areas:</h4>
              <ul className="text-sm space-y-1">
                {weakAreas.filter(a => a.percentage < 70).map((area, idx) => (
                  <li key={idx} className="text-cyan-800">
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
            setTimeRemaining(90 * 60);
            setIsTimerActive(true);
          }}
          className="w-full mt-6 bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 font-medium"
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
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">CompTIA Data+ Practice Exam (DA0-001)</h1>
        <p className="text-cyan-100">90 Questions | 90 Minutes | Passing Score: 675/900</p>
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
          className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full">
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
                  ? 'border-cyan-600 bg-cyan-50 font-medium'
                  : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-cyan-600 bg-cyan-600'
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
                  ? 'bg-cyan-600 text-white'
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
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium"
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>💡 Tip: Focus on data quality, governance, and statistical concepts</p>
        <p className="mt-2">⏰ You have 1 minute per question on average</p>
      </div>
    </div>
  );
}