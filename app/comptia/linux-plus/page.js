'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function LinuxPlusExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // System Management (32%)
    {q: 1, text: "Which command displays the current runlevel of a Linux system?", opts: ["runlevel", "systemctl get-default", "init --status", "service --level"], correct: 0, hint: "This command shows the previous and current runlevel.", cat: "System Management", scored: true},
    
    {q: 2, text: "What is the purpose of the systemd init system?", opts: ["To manage file systems", "To initialize and manage system services and processes", "To manage user accounts", "To configure network interfaces"], correct: 1, hint: "systemd is the modern init system that replaced SysV init.", cat: "System Management", scored: true},
    
    {q: 3, text: "Which command is used to view active systemd services?", opts: ["systemctl list-services", "systemctl list-units --type=service", "service --status-all", "systemd --show"], correct: 1, hint: "Use systemctl with list-units and filter by type.", cat: "System Management", scored: true},
    
    {q: 4, text: "How do you enable a service to start automatically at boot with systemd?", opts: ["systemctl start service_name", "systemctl enable service_name", "systemctl autostart service_name", "systemctl boot service_name"], correct: 1, hint: "Enable creates the necessary symlinks for automatic startup.", cat: "System Management", scored: true},
    
    {q: 5, text: "Which directory contains systemd unit files?", opts: ["/etc/init.d/", "/usr/lib/systemd/system/", "/var/systemd/", "/opt/systemd/"], correct: 1, hint: "System unit files are in /usr/lib/systemd/system/.", cat: "System Management", scored: true},
    
    {q: 6, text: "What command displays system boot messages?", opts: ["bootlog", "dmesg", "syslog", "bootmsg"], correct: 1, hint: "This command shows the kernel ring buffer messages.", cat: "System Management", scored: true},
    
    {q: 7, text: "Which file contains the system's hostname?", opts: ["/etc/hostname", "/etc/hosts", "/etc/sysconfig/network", "/var/hostname"], correct: 0, hint: "The hostname is stored in a simple text file in /etc.", cat: "System Management", scored: false},
    
    {q: 8, text: "What is the purpose of cron?", opts: ["To manage processes", "To schedule recurring tasks", "To monitor system resources", "To manage user logins"], correct: 1, hint: "cron executes scheduled commands at specific times.", cat: "System Management", scored: true},
    
    {q: 9, text: "Which command edits the crontab for the current user?", opts: ["crontab -e", "edit crontab", "vi /etc/crontab", "cron --edit"], correct: 0, hint: "The -e flag opens the editor for the user's crontab.", cat: "System Management", scored: true},
    
    {q: 10, text: "What does the at command do?", opts: ["Schedules recurring tasks", "Schedules a one-time task", "Monitors CPU usage", "Manages processes"], correct: 1, hint: "at schedules jobs to run once at a specific time.", cat: "System Management", scored: true},
    
    {q: 11, text: "Which log file typically contains authentication-related messages?", opts: ["/var/log/messages", "/var/log/auth.log", "/var/log/boot.log", "/var/log/kernel"], correct: 1, hint: "Authentication and authorization events are logged separately.", cat: "System Management", scored: true},
    
    {q: 12, text: "What is the purpose of logrotate?", opts: ["To rotate log files to prevent disk space issues", "To rotate users", "To change file permissions", "To rotate processes"], correct: 0, hint: "logrotate manages log file rotation, compression, and deletion.", cat: "System Management", scored: true},
    
    {q: 13, text: "Which command shows the current date and time?", opts: ["time", "date", "clock", "now"], correct: 1, hint: "This command displays or sets the system date and time.", cat: "System Management", scored: true},
    
    {q: 14, text: "What is NTP used for?", opts: ["Network printing", "Network time synchronization", "Network testing", "Network topology"], correct: 1, hint: "NTP keeps system clocks synchronized across networks.", cat: "System Management", scored: true},
    
    {q: 15, text: "Which systemd target is equivalent to runlevel 5 (graphical mode)?", opts: ["multi-user.target", "graphical.target", "runlevel5.target", "gui.target"], correct: 1, hint: "Targets replace runlevels in systemd.", cat: "System Management", scored: true},

    // Security (21%)
    {q: 16, text: "Which command changes file permissions?", opts: ["chown", "chmod", "chgrp", "chperm"], correct: 1, hint: "This command modifies read, write, and execute permissions.", cat: "Security", scored: true},
    
    {q: 17, text: "What does the permission 755 mean?", opts: ["rwxr-xr-x", "rwxrwxrwx", "r-xr-xr-x", "rw-rw-rw-"], correct: 0, hint: "7=rwx for owner, 5=r-x for group and others.", cat: "Security", scored: true},
    
    {q: 18, text: "Which command changes file ownership?", opts: ["chmod", "chown", "chgrp", "owner"], correct: 1, hint: "This command changes the owner and/or group of files.", cat: "Security", scored: true},
    
    {q: 19, text: "What is the purpose of sudo?", opts: ["To switch users", "To execute commands with elevated privileges", "To shut down the system", "To view processes"], correct: 1, hint: "sudo allows permitted users to run commands as root.", cat: "Security", scored: true},
    
    {q: 20, text: "Which file configures sudo permissions?", opts: ["/etc/sudo", "/etc/sudoers", "/etc/security/sudo", "/var/sudo/config"], correct: 1, hint: "Edit this file with visudo to avoid syntax errors.", cat: "Security", scored: true},
    
    {q: 21, text: "What is SELinux?", opts: ["A Linux distribution", "A security module providing mandatory access control", "A firewall", "A package manager"], correct: 1, hint: "SELinux enforces security policies at the kernel level.", cat: "Security", scored: true},
    
    {q: 22, text: "Which command displays SELinux status?", opts: ["selinux --status", "getenforce", "selinux-status", "sestatus"], correct: 1, hint: "This command shows if SELinux is enforcing, permissive, or disabled.", cat: "Security", scored: false},
    
    {q: 23, text: "What does the firewall-cmd command manage?", opts: ["User firewalls", "firewalld firewall rules", "Network interfaces", "SELinux policies"], correct: 1, hint: "firewall-cmd is the command-line client for firewalld.", cat: "Security", scored: true},
    
    {q: 24, text: "Which command lists current iptables rules?", opts: ["iptables -L", "iptables --show", "iptables -S", "Both A and C"], correct: 3, hint: "Both -L and -S display rules in different formats.", cat: "Security", scored: true},
    
    {q: 25, text: "What is the purpose of SSH keys?", opts: ["To encrypt files", "To provide password-less authentication", "To manage services", "To configure networks"], correct: 1, hint: "SSH keys enable secure authentication without passwords.", cat: "Security", scored: true},
    
    {q: 26, text: "Which file contains SSH public keys for a user?", opts: ["~/.ssh/authorized_keys", "~/.ssh/known_hosts", "~/.ssh/id_rsa", "~/.ssh/config"], correct: 0, hint: "Public keys are stored in authorized_keys for authentication.", cat: "Security", scored: true},
    
    {q: 27, text: "What does umask control?", opts: ["User masks", "Default file permissions", "Network masks", "Process masks"], correct: 1, hint: "umask sets default permissions for new files.", cat: "Security", scored: true},
    
    {q: 28, text: "Which command generates an SSH key pair?", opts: ["ssh-keygen", "ssh-createkey", "keygen", "ssh-newkey"], correct: 0, hint: "This command creates public and private SSH keys.", cat: "Security", scored: true},

    // Scripting, Containers, and Automation (19%)
    {q: 29, text: "What is the shebang line in a bash script?", opts: ["A comment", "The first line specifying the interpreter (#!/bin/bash)", "A variable declaration", "An error message"], correct: 1, hint: "The shebang tells the system which interpreter to use.", cat: "Scripting", scored: true},
    
    {q: 30, text: "How do you make a script executable?", opts: ["chmod +x script.sh", "execute script.sh", "make-exec script.sh", "run script.sh"], correct: 0, hint: "Add execute permission with chmod.", cat: "Scripting", scored: true},
    
    {q: 31, text: "What does $? represent in bash?", opts: ["The process ID", "The exit status of the last command", "The number of arguments", "The current directory"], correct: 1, hint: "0 typically means success, non-zero means error.", cat: "Scripting", scored: true},
    
    {q: 32, text: "Which loop structure iterates over a list of items in bash?", opts: ["while", "for", "until", "loop"], correct: 1, hint: "This loop is commonly used: for item in list; do...", cat: "Scripting", scored: true},
    
    {q: 33, text: "What does the test command (or [ ]) do in bash?", opts: ["Tests network connectivity", "Evaluates conditional expressions", "Tests file integrity", "Runs unit tests"], correct: 1, hint: "Used in if statements to test conditions.", cat: "Scripting", scored: true},
    
    {q: 34, text: "What is Docker?", opts: ["A virtualization platform", "A containerization platform", "A package manager", "A scripting language"], correct: 1, hint: "Docker runs applications in isolated containers.", cat: "Containers", scored: true},
    
    {q: 35, text: "Which command lists running Docker containers?", opts: ["docker list", "docker ps", "docker show", "docker containers"], correct: 1, hint: "ps stands for process status.", cat: "Containers", scored: false},
    
    {q: 36, text: "What is a Dockerfile?", opts: ["A log file", "A configuration file defining how to build a container image", "A data file", "A backup file"], correct: 1, hint: "Dockerfiles contain instructions for building images.", cat: "Containers", scored: true},
    
    {q: 37, text: "Which command builds a Docker image from a Dockerfile?", opts: ["docker create", "docker build", "docker make", "docker construct"], correct: 1, hint: "Use -t to tag the image with a name.", cat: "Containers", scored: true},
    
    {q: 38, text: "What is Ansible?", opts: ["A container platform", "An automation and configuration management tool", "A monitoring tool", "A programming language"], correct: 1, hint: "Ansible automates IT tasks using playbooks.", cat: "Automation", scored: true},
    
    {q: 39, text: "What format are Ansible playbooks written in?", opts: ["JSON", "XML", "YAML", "INI"], correct: 2, hint: "YAML is human-readable and commonly used for configuration.", cat: "Automation", scored: true},

    // Troubleshooting (28%)
    {q: 40, text: "Which command shows running processes?", opts: ["ps", "proc", "processes", "tasks"], correct: 0, hint: "ps displays process status information.", cat: "Troubleshooting", scored: true},
    
    {q: 41, text: "What does the top command display?", opts: ["The top directory", "Real-time system resource usage and processes", "Top users", "Top files"], correct: 1, hint: "top provides a dynamic view of system performance.", cat: "Troubleshooting", scored: true},
    
    {q: 42, text: "Which command terminates a process by PID?", opts: ["stop", "kill", "terminate", "end"], correct: 1, hint: "kill sends signals to processes, default is SIGTERM.", cat: "Troubleshooting", scored: true},
    
    {q: 43, text: "What signal does kill -9 send?", opts: ["SIGTERM", "SIGKILL", "SIGHUP", "SIGSTOP"], correct: 1, hint: "SIGKILL (9) forcefully terminates a process.", cat: "Troubleshooting", scored: true},
    
    {q: 44, text: "Which command shows disk space usage?", opts: ["du", "df", "disk", "space"], correct: 1, hint: "df shows disk free space on file systems.", cat: "Troubleshooting", scored: true},
    
    {q: 45, text: "What does the du command show?", opts: ["Disk usage of files and directories", "Disk uptime", "Duplicate files", "Disk units"], correct: 0, hint: "du estimates file space usage.", cat: "Troubleshooting", scored: true},
    
    {q: 46, text: "Which command displays memory usage?", opts: ["mem", "memory", "free", "ram"], correct: 2, hint: "free shows used and available memory.", cat: "Troubleshooting", scored: true},
    
    {q: 47, text: "What does the vmstat command display?", opts: ["Virtual machines", "Virtual memory statistics", "VM status", "Version management stats"], correct: 1, hint: "vmstat reports information about processes, memory, paging, and CPU.", cat: "Troubleshooting", scored: false},
    
    {q: 48, text: "Which command shows network interface information?", opts: ["ifconfig", "ip addr", "netstat", "Both A and B"], correct: 3, hint: "Both ifconfig (legacy) and ip addr show interface details.", cat: "Troubleshooting", scored: true},
    
    {q: 49, text: "What does netstat display?", opts: ["Network statistics and connections", "Network start time", "Network storage", "Network status only"], correct: 0, hint: "netstat shows network connections, routing tables, and statistics.", cat: "Troubleshooting", scored: true},
    
    {q: 50, text: "Which command tests network connectivity to a host?", opts: ["test", "connect", "ping", "reach"], correct: 2, hint: "ping sends ICMP echo requests.", cat: "Troubleshooting", scored: true},
    
    {q: 51, text: "What does the traceroute command do?", opts: ["Traces files", "Shows the path packets take to a destination", "Traces users", "Traces processes"], correct: 1, hint: "traceroute displays each hop along the network path.", cat: "Troubleshooting", scored: true},
    
    {q: 52, text: "Which command displays the routing table?", opts: ["route", "ip route", "netstat -r", "All of the above"], correct: 3, hint: "Multiple commands can display routing information.", cat: "Troubleshooting", scored: true},
    
    {q: 53, text: "What does the lsof command do?", opts: ["Lists open files and the processes using them", "Lists system files", "Lists offline files", "Lists old files"], correct: 0, hint: "lsof shows which files are opened by which processes.", cat: "Troubleshooting", scored: true},
    
    {q: 54, text: "Which command shows system uptime?", opts: ["time", "uptime", "sysinfo", "runtime"], correct: 1, hint: "uptime shows how long the system has been running.", cat: "Troubleshooting", scored: true},
    
    {q: 55, text: "What is the purpose of journalctl?", opts: ["To view systemd journal logs", "To manage journals", "To create journals", "To delete journals"], correct: 0, hint: "journalctl queries the systemd journal.", cat: "Troubleshooting", scored: true},

    // Storage Management
    {q: 56, text: "Which command creates a new file system on a partition?", opts: ["mkfs", "createfs", "newfs", "format"], correct: 0, hint: "mkfs creates file systems like ext4, xfs, etc.", cat: "Storage Management", scored: true},
    
    {q: 57, text: "What does the mount command do?", opts: ["Mounts removable media", "Attaches a file system to the directory tree", "Creates directories", "Formats disks"], correct: 1, hint: "mount makes file systems accessible at mount points.", cat: "Storage Management", scored: true},
    
    {q: 58, text: "Which file contains permanent mount configurations?", opts: ["/etc/mounts", "/etc/fstab", "/etc/filesystems", "/var/mounts"], correct: 1, hint: "fstab defines file systems mounted at boot.", cat: "Storage Management", scored: true},
    
    {q: 59, text: "What is LVM?", opts: ["Linux Virtual Machine", "Logical Volume Manager", "Linux Volume Mount", "Local Volume Manager"], correct: 1, hint: "LVM provides flexible disk management with logical volumes.", cat: "Storage Management", scored: true},
    
    {q: 60, text: "Which command displays information about block devices?", opts: ["blkinfo", "lsblk", "blockdev", "showblk"], correct: 1, hint: "lsblk lists block devices in a tree format.", cat: "Storage Management", scored: true},
    
    {q: 61, text: "What does RAID stand for?", opts: ["Redundant Array of Independent Disks", "Rapid Access Internal Drive", "Reliable Array Interface Drive", "Random Array of Internal Disks"], correct: 0, hint: "RAID combines multiple disks for redundancy or performance.", cat: "Storage Management", scored: false},
    
    {q: 62, text: "Which RAID level provides mirroring?", opts: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"], correct: 1, hint: "RAID 1 duplicates data across drives.", cat: "Storage Management", scored: true},
    
    {q: 63, text: "What is a swap partition used for?", opts: ["Swapping users", "Virtual memory when RAM is full", "Temporary file storage", "Backup storage"], correct: 1, hint: "Swap extends available memory using disk space.", cat: "Storage Management", scored: true},

    // Networking
    {q: 64, text: "Which file typically contains DNS server addresses?", opts: ["/etc/hosts", "/etc/resolv.conf", "/etc/dns.conf", "/etc/network/dns"], correct: 1, hint: "resolv.conf specifies name servers.", cat: "Networking", scored: true},
    
    {q: 65, text: "What is the purpose of /etc/hosts?", opts: ["To store host configurations", "To map hostnames to IP addresses locally", "To list all network hosts", "To configure host security"], correct: 1, hint: "hosts provides static hostname-to-IP mappings.", cat: "Networking", scored: true},
    
    {q: 66, text: "Which command assigns an IP address to an interface?", opts: ["ifconfig eth0 192.168.1.10", "ip addr add 192.168.1.10/24 dev eth0", "setip eth0 192.168.1.10", "Both A and B"], correct: 3, hint: "Both legacy (ifconfig) and modern (ip) commands work.", cat: "Networking", scored: true},
    
    {q: 67, text: "What protocol does SSH use?", opts: ["UDP", "TCP", "ICMP", "HTTP"], correct: 1, hint: "SSH uses TCP for reliable communication.", cat: "Networking", scored: true},
    
    {q: 68, text: "What is the default SSH port?", opts: ["21", "22", "23", "25"], correct: 1, hint: "Port 22 is the standard SSH port.", cat: "Networking", scored: true},
    
    {q: 69, text: "Which command downloads files from the web?", opts: ["download", "wget", "geturl", "fetch"], correct: 1, hint: "wget and curl are common tools for downloading.", cat: "Networking", scored: true},
    
    {q: 70, text: "What does the hostname command do?", opts: ["Sets the host name", "Displays the system's hostname", "Changes DNS settings", "Both A and B"], correct: 3, hint: "hostname can display or set the system hostname.", cat: "Networking", scored: true},

    // Package Management
    {q: 71, text: "Which command installs packages on Debian-based systems?", opts: ["yum install", "apt install", "rpm -i", "dnf install"], correct: 1, hint: "apt is used on Debian, Ubuntu, and derivatives.", cat: "Package Management", scored: true},
    
    {q: 72, text: "Which command installs packages on Red Hat-based systems?", opts: ["apt install", "yum install", "dpkg -i", "pacman -S"], correct: 1, hint: "yum or dnf are used on RHEL, CentOS, Fedora.", cat: "Package Management", scored: true},
    
    {q: 73, text: "What does apt update do?", opts: ["Updates all packages", "Updates the package list from repositories", "Updates the kernel", "Updates apt itself"], correct: 1, hint: "apt update refreshes the package index.", cat: "Package Management", scored: true},
    
    {q: 74, text: "Which command removes a package on Debian systems?", opts: ["apt remove", "apt delete", "apt uninstall", "apt erase"], correct: 0, hint: "apt remove uninstalls packages.", cat: "Package Management", scored: false},
    
    {q: 75, text: "What is the difference between apt remove and apt purge?", opts: ["No difference", "purge also removes configuration files", "remove is faster", "purge requires root"], correct: 1, hint: "purge completely removes packages and configs.", cat: "Package Management", scored: true},
    
    {q: 76, text: "Which command searches for packages in repositories?", opts: ["apt find", "apt search", "apt query", "apt locate"], correct: 1, hint: "apt search finds packages by name or description.", cat: "Package Management", scored: true},
    
    {q: 77, text: "What does rpm stand for?", opts: ["Red Hat Package Manager", "Remote Package Manager", "Reliable Package Method", "Recursive Package Module"], correct: 0, hint: "RPM is the package format for Red Hat-based systems.", cat: "Package Management", scored: true},

    // File Management
    {q: 78, text: "Which command copies files?", opts: ["copy", "cp", "mv", "duplicate"], correct: 1, hint: "cp creates a copy of files or directories.", cat: "File Management", scored: true},
    
    {q: 79, text: "What does the mv command do?", opts: ["Creates files", "Moves or renames files", "Removes files", "Views files"], correct: 1, hint: "mv moves or renames files and directories.", cat: "File Management", scored: true},
    
    {q: 80, text: "Which command removes files?", opts: ["delete", "remove", "rm", "del"], correct: 2, hint: "rm removes files and directories.", cat: "File Management", scored: true},
    
    {q: 81, text: "What does the find command do?", opts: ["Finds text in files", "Searches for files in a directory hierarchy", "Finds packages", "Finds users"], correct: 1, hint: "find locates files based on criteria like name, size, type.", cat: "File Management", scored: true},
    
    {q: 82, text: "Which command searches for text within files?", opts: ["search", "find", "grep", "locate"], correct: 2, hint: "grep finds lines matching a pattern.", cat: "File Management", scored: true},
    
    {q: 83, text: "What does the tar command do?", opts: ["Tars files together", "Creates and extracts archive files", "Compresses files", "Deletes files"], correct: 1, hint: "tar bundles files into archives.", cat: "File Management", scored: true},
    
    {q: 84, text: "Which tar option creates an archive?", opts: ["-x", "-c", "-t", "-v"], correct: 1, hint: "-c stands for create.", cat: "File Management", scored: true},
    
    {q: 85, text: "Which tar option extracts an archive?", opts: ["-c", "-x", "-t", "-v"], correct: 1, hint: "-x stands for extract.", cat: "File Management", scored: false},
    
    {q: 86, text: "What does the ln command create?", opts: ["New files", "Links (shortcuts) to files", "New directories", "New users"], correct: 1, hint: "ln creates hard or symbolic links.", cat: "File Management", scored: true},
    
    {q: 87, text: "What is the difference between hard links and symbolic links?", opts: ["No difference", "Hard links point to inode; symbolic links point to path", "Symbolic links are faster", "Hard links can cross file systems"], correct: 1, hint: "Hard links share the same inode; symlinks are pointers.", cat: "File Management", scored: true},

    // User Management
    {q: 88, text: "Which command adds a new user?", opts: ["adduser", "useradd", "newuser", "Both A and B"], correct: 3, hint: "Both adduser and useradd create users.", cat: "User Management", scored: true},
    
    {q: 89, text: "Which file stores user account information?", opts: ["/etc/shadow", "/etc/passwd", "/etc/users", "/etc/accounts"], correct: 1, hint: "passwd contains user account details.", cat: "User Management", scored: true},
    
    {q: 90, text: "Which file stores encrypted passwords?", opts: ["/etc/passwd", "/etc/shadow", "/etc/secure", "/etc/passwords"], correct: 1, hint: "shadow stores password hashes securely.", cat: "User Management", scored: true}
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
    const passed = score.scaled >= 720; // 720/900 passing

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
            Passing Score: 720/900 | You answered {score.correct} out of {score.total} questions correctly ({score.percentage.toFixed(1)}%)
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

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-green-900">📚 Study Resources</h3>
          <p className="mb-4 text-green-800">
            {passed 
              ? "Great job! Review these resources to reinforce your knowledge before the real exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• <a href="https://www.comptia.org/training/books/linux-xk0-005-study-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600 font-medium">CompTIA Linux+ Study Guide</a> (Official)</li>
            <li>• <a href="https://www.comptia.org/training/certmaster-learn/linux" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600 font-medium">CompTIA CertMaster Learn for Linux+</a></li>
            <li>• <a href="https://www.linux.org/forums/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600 font-medium">Linux.org Forums</a></li>
            <li>• <a href="https://www.udemy.com/topic/comptia-linux/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600 font-medium">Udemy CompTIA Linux+ Courses</a></li>
            <li>• <a href="https://www.linkedin.com/learning/topics/linux" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600 font-medium">LinkedIn Learning Linux Courses</a></li>
          </ul>

          {!passed && weakAreas.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded border border-green-300">
              <h4 className="font-bold mb-2 text-green-900">🎯 Focus Areas:</h4>
              <ul className="text-sm space-y-1">
                {weakAreas.filter(a => a.percentage < 70).map((area, idx) => (
                  <li key={idx} className="text-green-800">
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
          className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium"
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
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">CompTIA Linux+ Practice Exam (XK0-005)</h1>
        <p className="text-green-100">90 Questions | 90 Minutes | Passing Score: 720/900</p>
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
          className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
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
                  ? 'border-green-600 bg-green-50 font-medium'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-green-600 bg-green-600'
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
                  ? 'bg-green-600 text-white'
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
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>💡 Tip: Focus on command-line operations and system administration tasks</p>
        <p className="mt-2">⏰ You have 1 minute per question on average</p>
      </div>
    </div>
  );
}