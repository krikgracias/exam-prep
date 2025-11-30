'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function TerraformExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Understand Infrastructure as Code (IaC) concepts
    {q: 1, text: "What is the primary benefit of using Infrastructure as Code (IaC)?", opts: ["Faster manual configuration", "Version control and reproducibility", "Reduced need for documentation", "Elimination of all errors"], correct: 1, hint: "IaC allows infrastructure to be versioned and recreated consistently.", cat: "IaC Concepts", scored: true},
    
    {q: 2, text: "Which of the following best describes declarative configuration?", opts: ["Specify the exact steps to achieve a result", "Describe the desired end state", "Write scripts in a specific order", "Use imperative commands"], correct: 1, hint: "Declarative means describing what you want, not how to get there.", cat: "IaC Concepts", scored: true},
    
    {q: 3, text: "What is idempotency in the context of Infrastructure as Code?", opts: ["Running the same configuration multiple times produces the same result", "The ability to run multiple configurations simultaneously", "Automatic rollback on errors", "Version control integration"], correct: 0, hint: "Idempotent operations can be applied repeatedly without changing the result.", cat: "IaC Concepts", scored: true},

    // Understand Terraform's purpose (vs other IaC)
    {q: 4, text: "What makes Terraform different from cloud-specific tools like AWS CloudFormation?", opts: ["Terraform is faster", "Terraform is cloud-agnostic and works across multiple providers", "Terraform doesn't require state files", "Terraform is imperative"], correct: 1, hint: "Terraform can manage resources across many different providers.", cat: "Terraform Purpose", scored: true},
    
    {q: 5, text: "What is a Terraform provider?", opts: ["A person who provides Terraform support", "A plugin that enables Terraform to interact with an API", "A cloud service provider", "A state management tool"], correct: 1, hint: "Providers are plugins that allow Terraform to manage external resources.", cat: "Terraform Purpose", scored: true},
    
    {q: 6, text: "Which command initializes a Terraform working directory and downloads provider plugins?", opts: ["terraform apply", "terraform init", "terraform plan", "terraform start"], correct: 1, hint: "This command must be run before any other Terraform commands.", cat: "Terraform Basics", scored: true},

    // Understand Terraform basics
    {q: 7, text: "What is the purpose of the terraform plan command?", opts: ["To apply changes immediately", "To preview changes before applying them", "To destroy all resources", "To initialize the working directory"], correct: 1, hint: "This command shows what will happen without making any changes.", cat: "Terraform Basics", scored: true},
    
    {q: 8, text: "Which file extension is used for Terraform configuration files?", opts: [".terraform", ".tf", ".config", ".hcl"], correct: 1, hint: "Terraform files use a specific two-letter extension.", cat: "Terraform Basics", scored: true},
    
    {q: 9, text: "What does the terraform apply command do?", opts: ["Shows planned changes", "Creates or updates infrastructure based on configuration", "Destroys all resources", "Validates configuration syntax"], correct: 1, hint: "This command executes the planned changes.", cat: "Terraform Basics", scored: true},
    
    {q: 10, text: "How do you destroy all resources managed by Terraform?", opts: ["terraform delete", "terraform destroy", "terraform remove", "terraform clean"], correct: 1, hint: "This command removes all infrastructure managed by your configuration.", cat: "Terraform Basics", scored: true},

    // Use the Terraform CLI (outside of core workflow)
    {q: 11, text: "Which command validates the syntax of Terraform configuration files?", opts: ["terraform check", "terraform validate", "terraform test", "terraform verify"], correct: 1, hint: "This command checks for syntax errors without accessing remote services.", cat: "Terraform CLI", scored: true},
    
    {q: 12, text: "What does the terraform fmt command do?", opts: ["Formats code to a canonical style", "Deletes unused files", "Compresses configuration files", "Creates a new module"], correct: 0, hint: "This command automatically formats your Terraform files.", cat: "Terraform CLI", scored: true},
    
    {q: 13, text: "How do you view the current state of your infrastructure?", opts: ["terraform show", "terraform state list", "terraform get", "Both A and B"], correct: 3, hint: "Multiple commands can display state information.", cat: "Terraform CLI", scored: false},
    
    {q: 14, text: "Which command generates a dependency graph of resources?", opts: ["terraform graph", "terraform deps", "terraform tree", "terraform diagram"], correct: 0, hint: "This command outputs a visual graph in DOT format.", cat: "Terraform CLI", scored: true},
    
    {q: 15, text: "What does terraform refresh do?", opts: ["Updates the state file to match real infrastructure", "Reloads provider plugins", "Restarts the Terraform service", "Clears the cache"], correct: 0, hint: "This command reconciles state with actual infrastructure.", cat: "Terraform CLI", scored: true},

    // Interact with Terraform modules
    {q: 16, text: "What is a Terraform module?", opts: ["A container for multiple resources used together", "A single resource definition", "A provider configuration", "A backend configuration"], correct: 0, hint: "Modules group resources for reuse and organization.", cat: "Modules", scored: true},
    
    {q: 17, text: "Where can Terraform modules be sourced from?", opts: ["Local filesystem", "Terraform Registry", "Git repositories", "All of the above"], correct: 3, hint: "Modules can come from many different sources.", cat: "Modules", scored: true},
    
    {q: 18, text: "What is the root module in Terraform?", opts: ["The first module you create", "The module in the current working directory", "The most important module", "The module with the most resources"], correct: 1, hint: "The root module is where you run Terraform commands.", cat: "Modules", scored: true},
    
    {q: 19, text: "How do you pass values into a module?", opts: ["Using input variables", "Using environment variables", "Using command-line flags", "Using config files"], correct: 0, hint: "Modules accept inputs through variables.", cat: "Modules", scored: true},
    
    {q: 20, text: "What is the purpose of module outputs?", opts: ["To display values to the console", "To pass values to other modules or the root module", "To log information", "To export data to files"], correct: 1, hint: "Outputs make values available outside the module.", cat: "Modules", scored: true},

    // Navigate Terraform workflow
    {q: 21, text: "What is the correct order of the core Terraform workflow?", opts: ["init -> plan -> apply", "plan -> init -> apply", "apply -> plan -> init", "init -> apply -> plan"], correct: 0, hint: "Initialize, preview changes, then apply.", cat: "Workflow", scored: true},
    
    {q: 22, text: "What happens if you run terraform apply without terraform plan?", opts: ["An error occurs", "Terraform runs plan automatically before applying", "Resources are created immediately without preview", "Nothing happens"], correct: 1, hint: "Apply includes an implicit plan step.", cat: "Workflow", scored: true},
    
    {q: 23, text: "How can you save a Terraform plan for later use?", opts: ["terraform plan -out=planfile", "terraform save plan", "terraform plan --save", "terraform export plan"], correct: 0, hint: "Use the -out flag to save a plan file.", cat: "Workflow", scored: true},
    
    {q: 24, text: "What does the -auto-approve flag do with terraform apply?", opts: ["Automatically formats code", "Skips the interactive approval prompt", "Validates configuration automatically", "Applies changes in the background"], correct: 1, hint: "This flag bypasses the yes/no confirmation.", cat: "Workflow", scored: false},

    // Implement and maintain state
    {q: 25, text: "What is the Terraform state file?", opts: ["A backup of configuration files", "A mapping of resources to real-world infrastructure", "A log of all Terraform commands", "A list of provider plugins"], correct: 1, hint: "State tracks which resources Terraform manages.", cat: "State Management", scored: true},
    
    {q: 26, text: "What is the default name of the Terraform state file?", opts: ["terraform.state", "state.tf", "terraform.tfstate", "default.state"], correct: 2, hint: "The state file has a .tfstate extension.", cat: "State Management", scored: true},
    
    {q: 27, text: "Why should you store state remotely instead of locally?", opts: ["Faster performance", "Team collaboration and state locking", "Reduced file size", "Better security only"], correct: 1, hint: "Remote state enables teams to work together safely.", cat: "State Management", scored: true},
    
    {q: 28, text: "What is state locking?", opts: ["Encrypting the state file", "Preventing concurrent modifications to state", "Making state read-only", "Backing up state automatically"], correct: 1, hint: "Locking prevents multiple users from modifying state simultaneously.", cat: "State Management", scored: true},
    
    {q: 29, text: "Which backends support state locking?", opts: ["S3 with DynamoDB", "Terraform Cloud", "Azure Storage", "All of the above"], correct: 3, hint: "Many backends provide locking capabilities.", cat: "State Management", scored: true},
    
    {q: 30, text: "How do you import existing infrastructure into Terraform state?", opts: ["terraform import <resource_type>.<name> <id>", "terraform add <resource>", "terraform sync <resource>", "terraform link <resource>"], correct: 0, hint: "The import command adds existing resources to state.", cat: "State Management", scored: true},
    
    {q: 31, text: "What does terraform state list do?", opts: ["Shows all resources in the state file", "Lists all Terraform files", "Lists all providers", "Shows all modules"], correct: 0, hint: "This command displays resources tracked in state.", cat: "State Management", scored: true},
    
    {q: 32, text: "Can you manually edit the Terraform state file?", opts: ["Yes, it's recommended", "Yes, but it's not recommended", "No, it's impossible", "Only with special tools"], correct: 1, hint: "Manual edits are possible but risky and discouraged.", cat: "State Management", scored: false},

    // Read, generate, and modify configuration
    {q: 33, text: "What are the three types of blocks in Terraform configuration?", opts: ["resource, data, output", "resource, variable, provider", "terraform, resource, data", "provider, resource, module"], correct: 0, hint: "These blocks define resources, read data, and expose values.", cat: "Configuration", scored: true},
    
    {q: 34, text: "How do you reference an attribute of a resource in Terraform?", opts: ["resource.type.name.attribute", "type.name.attribute", "resource_name.attribute", "name.attribute"], correct: 0, hint: "Use the format: resource_type.resource_name.attribute", cat: "Configuration", scored: true},
    
    {q: 35, text: "What is the purpose of a data source in Terraform?", opts: ["To create new resources", "To read information from existing infrastructure", "To store variables", "To define outputs"], correct: 1, hint: "Data sources fetch information without creating resources.", cat: "Configuration", scored: true},
    
    {q: 36, text: "How do you define a variable in Terraform?", opts: ["var block", "variable block", "input block", "parameter block"], correct: 1, hint: "Variables are declared in specific blocks.", cat: "Configuration", scored: true},
    
    {q: 37, text: "What are the ways to assign values to variables?", opts: ["terraform.tfvars file", "Command-line flags (-var)", "Environment variables (TF_VAR_name)", "All of the above"], correct: 3, hint: "Terraform accepts variable values from multiple sources.", cat: "Configuration", scored: true},
    
    {q: 38, text: "What is the difference between a variable and a local value?", opts: ["No difference", "Variables are inputs; locals are computed values used internally", "Locals are inputs; variables are computed", "Variables are faster"], correct: 1, hint: "Variables are configurable inputs; locals are derived values.", cat: "Configuration", scored: true},
    
    {q: 39, text: "How do you mark a variable as required (no default value)?", opts: ["required = true", "Don't provide a default value", "mandatory = true", "optional = false"], correct: 1, hint: "Omitting the default attribute makes a variable required.", cat: "Configuration", scored: true},
    
    {q: 40, text: "What does the depends_on meta-argument do?", opts: ["Creates implicit dependencies", "Explicitly defines resource dependencies", "Validates dependencies", "Removes dependencies"], correct: 1, hint: "This creates explicit dependency relationships.", cat: "Configuration", scored: true},

    // Understand Terraform Cloud and Enterprise capabilities
    {q: 41, text: "What is a key benefit of using Terraform Cloud?", opts: ["Free for all users", "Remote state management and collaboration", "Faster execution", "No need for providers"], correct: 1, hint: "Terraform Cloud provides hosted state and team features.", cat: "Terraform Cloud", scored: true},
    
    {q: 42, text: "What is a workspace in Terraform Cloud?", opts: ["A folder on your computer", "An isolated instance of your infrastructure with its own state", "A type of variable", "A provider configuration"], correct: 1, hint: "Workspaces separate environments with independent state.", cat: "Terraform Cloud", scored: true},
    
    {q: 43, text: "What is Sentinel in Terraform Enterprise?", opts: ["A monitoring tool", "A policy-as-code framework", "A backup service", "A logging system"], correct: 1, hint: "Sentinel enforces policies on Terraform runs.", cat: "Terraform Cloud", scored: false},
    
    {q: 44, text: "What is the purpose of a private module registry?", opts: ["To store public modules", "To share modules within an organization", "To backup modules", "To test modules"], correct: 1, hint: "Private registries enable internal module sharing.", cat: "Terraform Cloud", scored: true},

    // Resource meta-arguments and provisioners
    {q: 45, text: "What does the count meta-argument do?", opts: ["Counts resources", "Creates multiple instances of a resource", "Limits resource creation", "Validates resource count"], correct: 1, hint: "Count creates multiple similar resources.", cat: "Meta-Arguments", scored: true},
    
    {q: 46, text: "What is the difference between count and for_each?", opts: ["No difference", "count uses numbers; for_each uses maps or sets", "for_each is faster", "count is deprecated"], correct: 1, hint: "for_each provides more flexibility with keys.", cat: "Meta-Arguments", scored: true},
    
    {q: 47, text: "What does the lifecycle meta-argument control?", opts: ["Resource lifespan", "Resource creation, update, and deletion behavior", "Resource monitoring", "Resource backups"], correct: 1, hint: "Lifecycle customizes how resources are managed.", cat: "Meta-Arguments", scored: true},
    
    {q: 48, text: "What does create_before_destroy in a lifecycle block do?", opts: ["Deletes before creating", "Creates new resource before destroying the old one", "Prevents resource creation", "Validates before destroying"], correct: 1, hint: "This prevents downtime during resource replacement.", cat: "Meta-Arguments", scored: true},
    
    {q: 49, text: "What is a provisioner in Terraform?", opts: ["A way to execute scripts on resources after creation", "A type of provider", "A state management tool", "A validation tool"], correct: 0, hint: "Provisioners run actions on resources.", cat: "Provisioners", scored: true},
    
    {q: 50, text: "Which provisioner type is recommended as a last resort?", opts: ["file", "remote-exec", "local-exec", "All provisioners"], correct: 3, hint: "Provisioners should be avoided when possible; use native provider features.", cat: "Provisioners", scored: true},

    // Functions and expressions
    {q: 51, text: "What does the terraform console command do?", opts: ["Opens a GUI", "Provides an interactive console for testing expressions", "Displays logs", "Validates configuration"], correct: 1, hint: "The console allows you to test Terraform expressions.", cat: "Functions", scored: true},
    
    {q: 52, text: "Which function joins a list of strings with a delimiter?", opts: ["concat", "join", "merge", "combine"], correct: 1, hint: "This function takes a separator and a list.", cat: "Functions", scored: true},
    
    {q: 53, text: "What does the lookup function do?", opts: ["Searches for files", "Retrieves a value from a map given a key", "Finds resources", "Queries state"], correct: 1, hint: "lookup retrieves map values with an optional default.", cat: "Functions", scored: false},
    
    {q: 54, text: "How do you write a conditional expression in Terraform?", opts: ["if/else statement", "condition ? true_val : false_val", "case statement", "switch statement"], correct: 1, hint: "Terraform uses ternary operator syntax.", cat: "Expressions", scored: true},

    // Version constraints
    {q: 55, text: "What does the required_version argument specify?", opts: ["Provider version", "Terraform CLI version required", "Module version", "Resource version"], correct: 1, hint: "This constrains which Terraform version can be used.", cat: "Versions", scored: true},
    
    {q: 56, text: "How do you specify that a provider version must be at least 3.0 but less than 4.0?", opts: ["version = \"3.0\"", "version = \">= 3.0, < 4.0\"", "version = \"~> 3.0\"", "Both B and C"], correct: 3, hint: "Multiple constraint syntaxes can express this requirement.", cat: "Versions", scored: true},
    
    {q: 57, text: "What does the ~> operator mean in version constraints?", opts: ["Greater than", "Approximately equal to (pessimistic constraint)", "Less than", "Exactly equal to"], correct: 1, hint: "~> 1.2 allows 1.2.x but not 1.3.0", cat: "Versions", scored: true}
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

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-purple-900">📚 Study Resources</h3>
          <p className="mb-4 text-purple-800">
            {passed 
              ? "Great job! Review these resources to reinforce your knowledge before the real exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>• <a href="https://learn.hashicorp.com/terraform" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 font-medium">HashiCorp Learn - Terraform</a> (Official tutorials)</li>
            <li>• <a href="https://www.terraform.io/docs" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 font-medium">Official Terraform Documentation</a></li>
            <li>• <a href="https://www.hashicorp.com/certification/terraform-associate" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 font-medium">Terraform Associate Certification Page</a></li>
            <li>• <a href="https://github.com/hashicorp/terraform" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 font-medium">Terraform GitHub Repository</a></li>
            <li>• <a href="https://www.udemy.com/topic/terraform/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 font-medium">Udemy Terraform Courses</a></li>
          </ul>

          {!passed && weakAreas.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded border border-purple-300">
              <h4 className="font-bold mb-2 text-purple-900">🎯 Focus Areas:</h4>
              <ul className="text-sm space-y-1">
                {weakAreas.filter(a => a.percentage < 70).map((area, idx) => (
                  <li key={idx} className="text-purple-800">
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
            setTimeRemaining(60 * 60);
            setIsTimerActive(true);
          }}
          className="w-full mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 font-medium"
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">HashiCorp Terraform Associate Practice Exam</h1>
        <p className="text-purple-100">57 Questions | 60 Minutes | Passing Score: 70%</p>
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
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
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
                  ? 'border-purple-600 bg-purple-50 font-medium'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-purple-600 bg-purple-600'
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
                  ? 'bg-purple-600 text-white'
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
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>💡 Tip: The exam covers Terraform 1.0+ features and best practices</p>
        <p className="mt-2">⏰ You have about 1 minute per question</p>
      </div>
    </div>
  );
}