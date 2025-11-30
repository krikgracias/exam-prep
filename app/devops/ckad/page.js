'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function CKADExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutes (2 hours)
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Application Design and Build (20%)
    {q: 1, text: "You need to create a multi-container pod with an nginx container and a sidecar logging container. Which pattern does this represent?", opts: ["Ambassador pattern", "Adapter pattern", "Sidecar pattern", "Init container pattern"], correct: 2, hint: "Sidecar containers run alongside the main container to provide supporting functionality.", cat: "Application Design", scored: true},
    
    {q: 2, text: "What is the purpose of an init container in a pod?", opts: ["To provide persistent storage", "To run setup tasks before the main container starts", "To proxy traffic to the main container", "To scale the application"], correct: 1, hint: "Init containers complete before app containers start.", cat: "Application Design", scored: true},
    
    {q: 3, text: "Which command correctly creates a deployment named 'webapp' with the nginx:1.19 image and 3 replicas?", opts: ["kubectl create deploy webapp --image=nginx:1.19 --replicas=3", "kubectl run webapp --image=nginx:1.19 --replicas=3", "kubectl create deployment webapp --image=nginx:1.19", "kubectl deploy create webapp --image=nginx:1.19 --replicas=3"], correct: 0, hint: "Use 'kubectl create deployment' with --replicas flag.", cat: "Application Design", scored: true},
    
    {q: 4, text: "How do you expose a deployment named 'myapp' as a NodePort service on port 8080?", opts: ["kubectl expose deployment myapp --port=8080 --type=NodePort", "kubectl create service nodeport myapp --tcp=8080", "kubectl expose pod myapp --port=8080 --type=NodePort", "kubectl service create myapp --port=8080"], correct: 0, hint: "Use 'kubectl expose deployment' with --type=NodePort.", cat: "Application Design", scored: true},

    // Application Deployment (20%)
    {q: 5, text: "What is the default update strategy for a Deployment?", opts: ["Recreate", "RollingUpdate", "BlueGreen", "Canary"], correct: 1, hint: "Kubernetes uses RollingUpdate by default for zero-downtime deployments.", cat: "Application Deployment", scored: true},
    
    {q: 6, text: "You need to rollback a deployment to the previous version. Which command should you use?", opts: ["kubectl rollout undo deployment/myapp", "kubectl rollback deployment myapp", "kubectl rollout restart deployment/myapp", "kubectl deployment rollback myapp"], correct: 0, hint: "Use 'kubectl rollout undo' to revert to previous version.", cat: "Application Deployment", scored: true},
    
    {q: 7, text: "How do you set environment variables in a pod specification?", opts: ["Using spec.environment", "Using spec.containers[].env", "Using metadata.env", "Using spec.env"], correct: 1, hint: "Environment variables are defined in the container spec.", cat: "Application Deployment", scored: false},
    
    {q: 8, text: "Which resource ensures that pods are recreated in order with stable network identities?", opts: ["Deployment", "ReplicaSet", "StatefulSet", "DaemonSet"], correct: 2, hint: "StatefulSets provide stable pod identities and ordered deployment.", cat: "Application Deployment", scored: true},

    // Application Observability and Maintenance (15%)
    {q: 9, text: "How do you define a liveness probe that checks HTTP endpoint /health on port 8080?", opts: ["Use livenessProbe with httpGet action", "Use healthCheck with httpGet", "Use readinessProbe with tcpSocket", "Use startupProbe with exec"], correct: 0, hint: "livenessProbe with httpGet checks if container is running.", cat: "Observability", scored: true},
    
    {q: 10, text: "What is the difference between a liveness probe and a readiness probe?", opts: ["Liveness checks if container is alive; readiness checks if ready for traffic", "They are the same", "Liveness is for HTTP; readiness is for TCP", "Readiness restarts containers; liveness doesn't"], correct: 0, hint: "Liveness determines restart; readiness determines traffic routing.", cat: "Observability", scored: true},
    
    {q: 11, text: "How do you view real-time logs from a pod named 'myapp'?", opts: ["kubectl logs myapp", "kubectl logs myapp --follow", "kubectl logs myapp --stream", "kubectl tail -f myapp"], correct: 1, hint: "Use --follow or -f flag for streaming logs.", cat: "Observability", scored: true},
    
    {q: 12, text: "Which command shows you the labels attached to a pod?", opts: ["kubectl get pod myapp --show-labels", "kubectl describe pod myapp", "kubectl labels pod myapp", "Both A and B"], correct: 3, hint: "Both --show-labels and describe display pod labels.", cat: "Observability", scored: false},

    // Application Environment, Configuration and Security (25%)
    {q: 13, text: "How do you create a ConfigMap from a file named 'app.properties'?", opts: ["kubectl create configmap myconfig --from-file=app.properties", "kubectl create cm myconfig --from-literal=app.properties", "kubectl configmap create myconfig --file=app.properties", "kubectl create config myconfig --from-file=app.properties"], correct: 0, hint: "Use 'kubectl create configmap' with --from-file flag.", cat: "Configuration", scored: true},
    
    {q: 14, text: "What is the correct way to mount a ConfigMap as a volume in a pod?", opts: ["Use configMapRef in volumeMounts", "Use configMap in volumes and volumeMounts", "Use configMapKeyRef in env", "Use secretRef in volumes"], correct: 1, hint: "Define configMap in volumes, then reference in volumeMounts.", cat: "Configuration", scored: true},
    
    {q: 15, text: "How do you create a secret named 'db-secret' with username=admin and password=secret123?", opts: ["kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=secret123", "kubectl create secret db-secret --user=admin --pass=secret123", "kubectl secret create db-secret username=admin password=secret123", "kubectl create configmap db-secret --from-literal=username=admin"], correct: 0, hint: "Use 'kubectl create secret generic' with --from-literal.", cat: "Configuration", scored: true},
    
    {q: 16, text: "Which security context setting runs a container as a non-root user with UID 1000?", opts: ["securityContext.runAsUser: 1000", "securityContext.user: 1000", "securityContext.uid: 1000", "securityContext.runAsNonRoot: 1000"], correct: 0, hint: "Use runAsUser field in securityContext.", cat: "Configuration", scored: true},
    
    {q: 17, text: "What does setting 'runAsNonRoot: true' in securityContext do?", opts: ["Forces container to run as UID 1000", "Prevents container from running as root (UID 0)", "Runs container as current user", "Disables all root privileges"], correct: 1, hint: "Validation check that prevents root execution.", cat: "Configuration", scored: true},

    // Services & Networking (20%)
    {q: 18, text: "How do you create a service that load balances traffic across pods with label 'app=myapp'?", opts: ["Use selector: app=myapp in service spec", "Use podSelector: app=myapp", "Use matchLabels: app=myapp", "Use targetLabels: app=myapp"], correct: 0, hint: "Services use selector field to match pod labels.", cat: "Services & Networking", scored: true},
    
    {q: 19, text: "What is the ClusterIP of a headless service?", opts: ["10.0.0.1", "None", "0.0.0.0", "Auto-assigned"], correct: 1, hint: "Headless services have ClusterIP set to None.", cat: "Services & Networking", scored: true},
    
    {q: 20, text: "How do you allow ingress traffic from pods with label 'role=frontend' to pods with label 'role=backend' on port 8080?", opts: ["Create Ingress resource", "Create NetworkPolicy with ingress rule", "Create Service with targetPort 8080", "Create PodSecurityPolicy"], correct: 1, hint: "NetworkPolicy controls pod-to-pod traffic rules.", cat: "Services & Networking", scored: false}
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
    const passed = score.percentage >= 66; // 66% passing score

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
            Passing Score: 66% | You answered {score.correct} out of {score.total} questions correctly
          </div>
          <div className="text-center text-sm text-gray-500">
            Note: The real CKAD exam is performance-based with hands-on tasks, not multiple choice
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
              ? "Great job! Practice deploying applications in real Kubernetes clusters before the exam." 
              : "Focus on your weak areas and practice hands-on application deployment:"}
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <a href="https://kubernetes.io/docs/home/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official Kubernetes Documentation</a></li>
            <li>• <a href="https://killer.sh" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Killer.sh CKAD Practice Exam</a> (Free with exam registration)</li>
            <li>• <a href="https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">KodeKloud CKAD Course</a></li>
            <li>• <a href="https://github.com/cncf/curriculum" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official CKAD Curriculum</a></li>
            <li>• <a href="https://labs.play-with-k8s.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Play with Kubernetes</a> (Free practice environment)</li>
            <li>• <a href="https://kubernetes.io/docs/tasks/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Kubernetes Tasks Documentation</a> (Practice scenarios)</li>
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
          className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-medium"
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Kubernetes CKAD Practice Exam</h1>
        <p className="text-indigo-100">20 Questions | 120 Minutes | Passing Score: 66%</p>
        <p className="text-sm text-indigo-200 mt-2">⚠️ Note: Real CKAD is performance-based (hands-on tasks), not multiple choice</p>
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
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
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
                  ? 'border-indigo-600 bg-indigo-50 font-medium'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-indigo-600 bg-indigo-600'
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
                  ? 'bg-indigo-600 text-white'
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
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>💡 Tip: The real CKAD focuses on deploying and managing applications in K8s!</p>
        <p className="mt-2">⏰ You have 6 minutes per question on average</p>
      </div>
    </div>
  );
}