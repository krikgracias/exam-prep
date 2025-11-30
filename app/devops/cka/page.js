'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function CKAExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutes (2 hours)
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Cluster Architecture, Installation & Configuration (25%)
    {q: 1, text: "You need to create a new Kubernetes cluster with kubeadm. What is the correct sequence of commands to initialize the control plane node?", opts: ["kubeadm init, kubectl apply -f calico.yaml, kubeadm join", "kubeadm join, kubeadm init, kubectl apply -f calico.yaml", "kubectl apply -f calico.yaml, kubeadm init, kubeadm join", "kubeadm init --pod-network-cidr=192.168.0.0/16, kubectl apply -f calico.yaml"], correct: 3, hint: "Initialize control plane with pod network CIDR, then install CNI plugin.", cat: "Cluster Architecture", scored: true},
    
    {q: 2, text: "Which component is responsible for maintaining the desired state of the cluster by watching for pod creation/deletion?", opts: ["kube-apiserver", "kube-controller-manager", "kube-scheduler", "kubelet"], correct: 1, hint: "This component runs various controllers that regulate cluster state.", cat: "Cluster Architecture", scored: true},
    
    {q: 3, text: "You need to backup the etcd database. Which command correctly creates a backup snapshot?", opts: ["etcdctl backup --endpoints=https://127.0.0.1:2379", "etcdctl snapshot save /backup/etcd-snapshot.db --endpoints=https://127.0.0.1:2379", "kubectl backup etcd --output=/backup/etcd.db", "etcd backup create /backup/etcd-snapshot.db"], correct: 1, hint: "Use etcdctl snapshot save with the backup file path.", cat: "Cluster Architecture", scored: true},
    
    {q: 4, text: "How do you upgrade a Kubernetes cluster from version 1.26 to 1.27 on the control plane node?", opts: ["apt-get upgrade kubeadm kubelet kubectl", "kubeadm upgrade apply v1.27.0, apt-get install kubelet=1.27.0-00 kubectl=1.27.0-00", "kubectl upgrade cluster --version=1.27.0", "kubeadm init --kubernetes-version=1.27.0"], correct: 1, hint: "Upgrade kubeadm first, run upgrade apply, then upgrade kubelet and kubectl.", cat: "Cluster Architecture", scored: true},
    
    // Workloads & Scheduling (15%)
    {q: 5, text: "You need to ensure a pod runs on every node in the cluster. What resource type should you use?", opts: ["Deployment", "StatefulSet", "DaemonSet", "ReplicaSet"], correct: 2, hint: "This resource ensures one pod per node automatically.", cat: "Workloads & Scheduling", scored: true},
    
    {q: 6, text: "Which field in a pod spec is used to define resource limits and requests?", opts: ["spec.resources", "spec.containers[].resources", "spec.resourceRequirements", "metadata.resources"], correct: 1, hint: "Resources are specified at the container level within spec.", cat: "Workloads & Scheduling", scored: true},
    
    {q: 7, text: "How do you prevent a pod from being scheduled on nodes with label 'env=production'?", opts: ["Use nodeSelector with env!=production", "Use a nodeAffinity rule with NotIn operator", "Use tolerations", "Use podAntiAffinity"], correct: 1, hint: "Node affinity with NotIn operator excludes specific labels.", cat: "Workloads & Scheduling", scored: false},
    
    {q: 8, text: "What happens when you set a pod's restart policy to 'Never' and the container fails?", opts: ["Pod is deleted", "Pod stays in Failed state", "Pod is automatically restarted", "Pod is rescheduled to another node"], correct: 1, hint: "With 'Never' policy, failed pods remain in Failed state.", cat: "Workloads & Scheduling", scored: true},
    
    // Services & Networking (20%)
    {q: 9, text: "Which service type exposes a service on each node's IP at a static port?", opts: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], correct: 1, hint: "This service type opens a specific port on all nodes.", cat: "Services & Networking", scored: true},
    
    {q: 10, text: "What is the default DNS name format for a service in Kubernetes?", opts: ["<service-name>.<namespace>", "<service-name>.<namespace>.svc.cluster.local", "<namespace>.<service-name>.svc", "svc.<service-name>.<namespace>"], correct: 1, hint: "Format includes service name, namespace, svc, and cluster domain.", cat: "Services & Networking", scored: true},
    
    {q: 11, text: "You need to restrict traffic so only pods with label 'app=frontend' can access pods with label 'app=backend' on port 8080. What resource should you create?", opts: ["Service", "Ingress", "NetworkPolicy", "PodSecurityPolicy"], correct: 2, hint: "This resource controls pod-to-pod communication rules.", cat: "Services & Networking", scored: true},
    
    {q: 12, text: "Which Ingress annotation is commonly used to specify the ingress controller class?", opts: ["kubernetes.io/ingress.class", "ingress.kubernetes.io/controller", "nginx.ingress.kubernetes.io/class", "spec.ingressClassName"], correct: 0, hint: "The annotation uses kubernetes.io/ingress.class format.", cat: "Services & Networking", scored: false},
    
    // Storage (10%)
    {q: 13, text: "What is the difference between a PersistentVolume (PV) and PersistentVolumeClaim (PVC)?", opts: ["PV is cluster-level storage, PVC is namespace-scoped request for storage", "PV is for StatefulSets, PVC is for Deployments", "PV is dynamic, PVC is static", "There is no difference"], correct: 0, hint: "PV is admin-provisioned storage; PVC is user's request for that storage.", cat: "Storage", scored: true},
    
    {q: 14, text: "Which access mode allows a volume to be mounted as read-write by multiple nodes?", opts: ["ReadWriteOnce (RWO)", "ReadOnlyMany (ROX)", "ReadWriteMany (RWX)", "ReadWriteOncePod (RWOP)"], correct: 2, hint: "RWX allows multiple nodes to mount the volume with write access.", cat: "Storage", scored: true},
    
    {q: 15, text: "What happens to data in an emptyDir volume when a pod is deleted?", opts: ["Data persists on the node", "Data is lost", "Data is backed up automatically", "Data is moved to a PersistentVolume"], correct: 1, hint: "emptyDir is ephemeral storage tied to pod lifecycle.", cat: "Storage", scored: true},
    
    // Troubleshooting (30%)
    {q: 16, text: "A pod is stuck in 'Pending' state. Which command helps identify the issue?", opts: ["kubectl logs <pod-name>", "kubectl describe pod <pod-name>", "kubectl get pod <pod-name> -o yaml", "kubectl exec -it <pod-name> -- /bin/sh"], correct: 1, hint: "Describe shows events that indicate scheduling or resource issues.", cat: "Troubleshooting", scored: true},
    
    {q: 17, text: "How do you view logs from a crashed container in a pod?", opts: ["kubectl logs <pod-name>", "kubectl logs <pod-name> --previous", "kubectl describe pod <pod-name>", "kubectl get events"], correct: 1, hint: "Use --previous flag to view logs from the previous container instance.", cat: "Troubleshooting", scored: true},
    
    {q: 18, text: "A node is showing as 'NotReady'. What is the first component to check?", opts: ["kube-apiserver", "kubelet", "kube-proxy", "etcd"], correct: 1, hint: "The kubelet is responsible for node health and status reporting.", cat: "Troubleshooting", scored: false},
    
    {q: 19, text: "Which command shows resource usage (CPU/memory) of pods?", opts: ["kubectl top pods", "kubectl describe pods", "kubectl get pods --show-metrics", "kubectl stats pods"], correct: 0, hint: "The top command displays resource metrics.", cat: "Troubleshooting", scored: true},
    
    {q: 20, text: "How do you check which node a pod is running on?", opts: ["kubectl get pods -o wide", "kubectl describe pod <pod-name>", "kubectl get nodes", "Both A and B"], correct: 3, hint: "Both get pods -o wide and describe show the node assignment.", cat: "Troubleshooting", scored: true}
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
            Note: The real CKA exam is performance-based with hands-on tasks, not multiple choice
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
              ? "Great job! Practice hands-on labs before taking the real exam." 
              : "Focus on your weak areas and practice in real Kubernetes clusters:"}
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <a href="https://kubernetes.io/docs/home/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official Kubernetes Documentation</a></li>
            <li>• <a href="https://killer.sh" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Killer.sh CKA Practice Exam</a> (Free with exam registration)</li>
            <li>• <a href="https://kodekloud.com/courses/certified-kubernetes-administrator-cka/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">KodeKloud CKA Course</a></li>
            <li>• <a href="https://github.com/cncf/curriculum" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Official CKA Curriculum</a></li>
            <li>• <a href="https://labs.play-with-k8s.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Play with Kubernetes</a> (Free practice environment)</li>
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Kubernetes CKA Practice Exam</h1>
        <p className="text-blue-100">20 Questions | 120 Minutes | Passing Score: 66%</p>
        <p className="text-sm text-blue-200 mt-2">⚠️ Note: Real CKA is performance-based (hands-on tasks), not multiple choice</p>
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
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
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
        <p>💡 Tip: The real CKA exam is hands-on - practice in real clusters!</p>
        <p className="mt-2">⏰ You have 6 minutes per question on average</p>
      </div>
    </div>
  );
}