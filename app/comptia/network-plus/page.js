'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function NetworkPlusExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Domain 1: Networking Fundamentals (24%)
    {q: 1, text: "Which OSI model layer is responsible for establishing, managing, and terminating connections between applications?", opts: ["Transport", "Session", "Presentation", "Application"], correct: 1, hint: "This layer manages the dialog between two devices.", cat: "Networking Fundamentals", scored: true},
    
    {q: 2, text: "What is the maximum cable length for a 1000BASE-T Ethernet connection?", opts: ["100 meters", "200 meters", "500 meters", "1000 meters"], correct: 0, hint: "This is the standard maximum length for twisted pair copper cabling.", cat: "Networking Fundamentals", scored: true},
    
    {q: 3, text: "Which IP address class does 172.16.0.0 belong to?", opts: ["Class A", "Class B", "Class C", "Class D"], correct: 1, hint: "Class B addresses range from 128.0.0.0 to 191.255.255.255.", cat: "Networking Fundamentals", scored: true},
    
    {q: 4, text: "What is the default subnet mask for a Class C network?", opts: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], correct: 2, hint: "Class C uses the first three octets for the network portion.", cat: "Networking Fundamentals", scored: true},
    
    {q: 5, text: "Which protocol operates at the Network layer of the OSI model and is responsible for logical addressing?", opts: ["TCP", "UDP", "IP", "HTTP"], correct: 2, hint: "This protocol handles routing and logical IP addresses.", cat: "Networking Fundamentals", scored: true},
    
    {q: 6, text: "What type of cable uses light pulses to transmit data?", opts: ["Coaxial cable", "Twisted pair cable", "Fiber optic cable", "Serial cable"], correct: 2, hint: "This cable type is immune to electromagnetic interference.", cat: "Networking Fundamentals", scored: true},
    
    {q: 7, text: "Which topology connects all devices to a central hub or switch?", opts: ["Bus", "Ring", "Star", "Mesh"], correct: 2, hint: "This is the most common topology in modern networks.", cat: "Networking Fundamentals", scored: false},
    
    {q: 8, text: "What is the purpose of the ARP protocol?", opts: ["To resolve domain names to IP addresses", "To resolve IP addresses to MAC addresses", "To assign IP addresses dynamically", "To route packets between networks"], correct: 1, hint: "ARP stands for Address Resolution Protocol.", cat: "Networking Fundamentals", scored: true},
    
    {q: 9, text: "Which port number does HTTP use by default?", opts: ["21", "23", "80", "443"], correct: 2, hint: "This is the standard port for unencrypted web traffic.", cat: "Networking Fundamentals", scored: true},
    
    {q: 10, text: "What is the maximum transmission speed of a Fast Ethernet connection?", opts: ["10 Mbps", "100 Mbps", "1000 Mbps", "10 Gbps"], correct: 1, hint: "Fast Ethernet is also known as 100BASE-T.", cat: "Networking Fundamentals", scored: true},
    
    {q: 11, text: "Which device operates at Layer 2 of the OSI model and uses MAC addresses to forward frames?", opts: ["Router", "Hub", "Switch", "Firewall"], correct: 2, hint: "This device creates separate collision domains for each port.", cat: "Networking Fundamentals", scored: true},
    
    {q: 12, text: "What is the IPv6 loopback address?", opts: ["127.0.0.1", "::1", "0.0.0.0", "FF02::1"], correct: 1, hint: "IPv6 uses a condensed notation for the loopback.", cat: "Networking Fundamentals", scored: true},
    
    {q: 13, text: "Which cable standard is used for a crossover cable connection?", opts: ["T568A to T568A", "T568B to T568B", "T568A to T568B", "Straight-through"], correct: 2, hint: "Crossover cables use different standards on each end.", cat: "Networking Fundamentals", scored: true},
    
    {q: 14, text: "What does CSMA/CD stand for?", opts: ["Carrier Sense Multiple Access with Collision Detection", "Circuit Switching Multiple Access with Collision Detection", "Carrier Signal Multiple Access with Collision Domain", "Circuit Sense Multiple Access with Collision Domain"], correct: 0, hint: "This is the access method used in traditional Ethernet.", cat: "Networking Fundamentals", scored: false},
    
    {q: 15, text: "Which protocol is connectionless and operates at the Transport layer?", opts: ["TCP", "UDP", "IP", "ICMP"], correct: 1, hint: "This protocol does not guarantee delivery of packets.", cat: "Networking Fundamentals", scored: true},
    
    {q: 16, text: "What is the purpose of a VLAN?", opts: ["To increase network speed", "To segment a network logically", "To provide wireless access", "To encrypt network traffic"], correct: 1, hint: "VLANs create separate broadcast domains within a switch.", cat: "Networking Fundamentals", scored: true},
    
    {q: 17, text: "Which type of DNS record maps a hostname to an IPv4 address?", opts: ["A record", "AAAA record", "CNAME record", "MX record"], correct: 0, hint: "This record type is for IPv4 addresses.", cat: "Networking Fundamentals", scored: true},
    
    {q: 18, text: "What is the network address for the IP 192.168.5.130/26?", opts: ["192.168.5.0", "192.168.5.64", "192.168.5.128", "192.168.5.192"], correct: 2, hint: "/26 means 26 bits for network, leaving 6 bits for hosts. Subnets occur every 64 addresses.", cat: "Networking Fundamentals", scored: true},
    
    {q: 19, text: "Which technology allows multiple devices to share a single public IP address?", opts: ["DHCP", "NAT", "DNS", "VLAN"], correct: 1, hint: "This technology translates private IP addresses to public ones.", cat: "Networking Fundamentals", scored: true},
    
    {q: 20, text: "What is the maximum number of usable host addresses in a /28 subnet?", opts: ["14", "16", "30", "32"], correct: 0, hint: "/28 leaves 4 bits for hosts. 2^4 - 2 (network and broadcast) = 14.", cat: "Networking Fundamentals", scored: false},
    
    {q: 21, text: "Which protocol is used to automatically assign IP addresses to devices on a network?", opts: ["DNS", "DHCP", "ARP", "FTP"], correct: 1, hint: "This protocol dynamically configures IP settings.", cat: "Networking Fundamentals", scored: true},
    
    {q: 22, text: "What is the purpose of the subnet mask?", opts: ["To identify the network portion of an IP address", "To encrypt network traffic", "To resolve domain names", "To assign IP addresses"], correct: 0, hint: "The subnet mask separates the network and host portions.", cat: "Networking Fundamentals", scored: true},

    // Domain 2: Network Implementations (19%)
    {q: 23, text: "Which routing protocol is considered a distance-vector protocol?", opts: ["OSPF", "RIP", "BGP", "IS-IS"], correct: 1, hint: "This protocol uses hop count as its metric.", cat: "Network Implementations", scored: true},
    
    {q: 24, text: "What is the purpose of a default gateway?", opts: ["To assign IP addresses", "To route traffic to other networks", "To filter network traffic", "To provide DNS resolution"], correct: 1, hint: "This device forwards traffic destined for networks outside the local subnet.", cat: "Network Implementations", scored: true},
    
    {q: 25, text: "Which wireless standard operates at 5 GHz and provides speeds up to 54 Mbps?", opts: ["802.11b", "802.11g", "802.11a", "802.11n"], correct: 2, hint: "This was one of the first 5 GHz standards.", cat: "Network Implementations", scored: true},
    
    {q: 26, text: "What is the maximum speed of 802.11ac wireless standard?", opts: ["54 Mbps", "150 Mbps", "600 Mbps", "1.3 Gbps"], correct: 3, hint: "This is the gigabit wireless standard.", cat: "Network Implementations", scored: true},
    
    {q: 27, text: "Which protocol is used to manage and monitor network devices?", opts: ["SMTP", "SNMP", "FTP", "HTTP"], correct: 1, hint: "This protocol stands for Simple Network Management Protocol.", cat: "Network Implementations", scored: true},
    
    {q: 28, text: "What is the purpose of QoS (Quality of Service)?", opts: ["To encrypt traffic", "To prioritize network traffic", "To assign IP addresses", "To authenticate users"], correct: 1, hint: "QoS ensures important traffic gets priority over less critical traffic.", cat: "Network Implementations", scored: false},
    
    {q: 29, text: "Which routing protocol is classified as a link-state protocol?", opts: ["RIP", "RIPv2", "OSPF", "EIGRP"], correct: 2, hint: "This protocol builds a complete map of the network topology.", cat: "Network Implementations", scored: true},
    
    {q: 30, text: "What type of network spans a large geographic area, such as multiple cities or countries?", opts: ["LAN", "WAN", "MAN", "PAN"], correct: 1, hint: "Wide Area Networks cover the largest geographic areas.", cat: "Network Implementations", scored: true},
    
    {q: 31, text: "Which technology allows multiple VLANs to traverse a single network link?", opts: ["Trunking", "Spanning Tree", "Port Security", "EtherChannel"], correct: 0, hint: "This carries traffic for multiple VLANs on one connection.", cat: "Network Implementations", scored: true},
    
    {q: 32, text: "What is the purpose of the Spanning Tree Protocol (STP)?", opts: ["To encrypt traffic", "To prevent switching loops", "To route traffic between VLANs", "To assign VLANs to ports"], correct: 1, hint: "STP prevents broadcast storms in redundant network topologies.", cat: "Network Implementations", scored: true},
    
    {q: 33, text: "Which wireless encryption standard is the most secure?", opts: ["WEP", "WPA", "WPA2", "WPA3"], correct: 3, hint: "The newest standard provides the best security.", cat: "Network Implementations", scored: true},
    
    {q: 34, text: "What is the maximum distance for a 10GBASE-SR fiber connection?", opts: ["100 meters", "300 meters", "10 kilometers", "40 kilometers"], correct: 1, hint: "SR stands for Short Range.", cat: "Network Implementations", scored: false},
    
    {q: 35, text: "Which device operates at Layer 3 and connects different networks?", opts: ["Hub", "Switch", "Router", "Bridge"], correct: 2, hint: "This device makes forwarding decisions based on IP addresses.", cat: "Network Implementations", scored: true},
    
    {q: 36, text: "What is the purpose of a DMZ in network design?", opts: ["To separate internal and external networks with a buffer zone", "To encrypt all network traffic", "To provide wireless access", "To assign IP addresses"], correct: 0, hint: "DMZ is a Demilitarized Zone that isolates public-facing services.", cat: "Network Implementations", scored: true},
    
    {q: 37, text: "Which load balancing method distributes traffic evenly across all servers?", opts: ["Round robin", "Least connections", "IP hash", "Weighted distribution"], correct: 0, hint: "This method simply rotates through available servers in order.", cat: "Network Implementations", scored: true},
    
    {q: 38, text: "What does PoE stand for in networking?", opts: ["Power over Ethernet", "Protocol over Ethernet", "Port on Ethernet", "Processing over Ethernet"], correct: 0, hint: "This technology delivers electrical power through network cables.", cat: "Network Implementations", scored: true},
    
    {q: 39, text: "Which protocol is used for secure remote access to network devices?", opts: ["Telnet", "SSH", "FTP", "HTTP"], correct: 1, hint: "This protocol encrypts the connection for secure management.", cat: "Network Implementations", scored: true},

    // Domain 3: Network Operations (16%)
    {q: 40, text: "Which command is used to test connectivity to a remote host?", opts: ["ipconfig", "ping", "tracert", "nslookup"], correct: 1, hint: "This command sends ICMP echo requests.", cat: "Network Operations", scored: true},
    
    {q: 41, text: "What does the traceroute command do?", opts: ["Tests DNS resolution", "Shows the path packets take to a destination", "Displays IP configuration", "Tests bandwidth"], correct: 1, hint: "This command shows each hop along the route to a destination.", cat: "Network Operations", scored: true},
    
    {q: 42, text: "Which tool would you use to capture and analyze network packets?", opts: ["ping", "ipconfig", "Wireshark", "nslookup"], correct: 2, hint: "This is a popular packet analyzer tool.", cat: "Network Operations", scored: false},
    
    {q: 43, text: "What information does the 'ipconfig /all' command display?", opts: ["Only IP address", "IP configuration and MAC address", "Only subnet mask", "Only default gateway"], correct: 1, hint: "The /all parameter shows detailed network configuration.", cat: "Network Operations", scored: true},
    
    {q: 44, text: "Which SNMP component is installed on network devices being monitored?", opts: ["Manager", "Agent", "MIB", "Trap"], correct: 1, hint: "This component collects and reports device information.", cat: "Network Operations", scored: true},
    
    {q: 45, text: "What is the purpose of network documentation?", opts: ["To slow down troubleshooting", "To provide a reference for network configuration and topology", "To increase network costs", "To complicate network changes"], correct: 1, hint: "Documentation helps with troubleshooting and planning.", cat: "Network Operations", scored: true},
    
    {q: 46, text: "Which log type records unsuccessful login attempts?", opts: ["System log", "Security log", "Application log", "Event log"], correct: 1, hint: "This log tracks authentication and authorization events.", cat: "Network Operations", scored: true},
    
    {q: 47, text: "What is a baseline in network performance monitoring?", opts: ["The minimum acceptable performance", "The maximum possible performance", "Normal network performance under typical conditions", "Performance during peak hours only"], correct: 2, hint: "A baseline establishes what 'normal' looks like for comparison.", cat: "Network Operations", scored: true},
    
    {q: 48, text: "Which backup type only backs up files that have changed since the last backup?", opts: ["Full backup", "Incremental backup", "Differential backup", "Mirror backup"], correct: 1, hint: "This backup type is the fastest but requires all previous backups to restore.", cat: "Network Operations", scored: true},
    
    {q: 49, text: "What does the acronym RTO stand for in disaster recovery?", opts: ["Recovery Time Objective", "Rapid Transfer Operation", "Remote Terminal Operation", "Restore Time Option"], correct: 0, hint: "This defines how quickly systems must be restored.", cat: "Network Operations", scored: false},
    
    {q: 50, text: "Which command displays the routing table on a Windows computer?", opts: ["route print", "ipconfig", "netstat", "tracert"], correct: 0, hint: "This command shows all configured routes.", cat: "Network Operations", scored: true},
    
    {q: 51, text: "What is the purpose of change management?", opts: ["To prevent any network changes", "To document and control network changes systematically", "To speed up network changes without review", "To eliminate network documentation"], correct: 1, hint: "Change management ensures changes are planned and tracked.", cat: "Network Operations", scored: true},
    
    {q: 52, text: "Which monitoring approach involves testing specific network paths?", opts: ["Active monitoring", "Passive monitoring", "SNMP polling", "Log analysis"], correct: 0, hint: "This approach actively sends test traffic to measure performance.", cat: "Network Operations", scored: true},
    
    {q: 53, text: "What does MTU stand for?", opts: ["Maximum Transmission Unit", "Minimum Transfer Unit", "Maximum Transfer Upload", "Minimum Transmission Upload"], correct: 0, hint: "This defines the largest packet size that can be transmitted.", cat: "Network Operations", scored: true},

    // Domain 4: Network Security (19%)
    {q: 54, text: "Which security device inspects incoming and outgoing traffic based on predetermined rules?", opts: ["Router", "Switch", "Firewall", "Hub"], correct: 2, hint: "This device controls traffic based on security policies.", cat: "Network Security", scored: true},
    
    {q: 55, text: "What type of attack floods a system with traffic to make it unavailable?", opts: ["Phishing", "Man-in-the-middle", "Denial of Service (DoS)", "SQL injection"], correct: 2, hint: "This attack attempts to overwhelm resources.", cat: "Network Security", scored: true},
    
    {q: 56, text: "Which protocol provides secure, encrypted email transmission?", opts: ["SMTP", "POP3", "IMAP", "TLS/SSL"], correct: 3, hint: "This protocol layer encrypts email in transit.", cat: "Network Security", scored: true},
    
    {q: 57, text: "What is the purpose of port security on a switch?", opts: ["To limit the number of MAC addresses on a port", "To encrypt traffic", "To assign VLANs", "To enable trunking"], correct: 0, hint: "This feature prevents unauthorized devices from connecting.", cat: "Network Security", scored: false},
    
    {q: 58, text: "Which authentication protocol uses a three-way handshake?", opts: ["PAP", "CHAP", "EAP", "Kerberos"], correct: 1, hint: "Challenge Handshake Authentication Protocol uses this method.", cat: "Network Security", scored: true},
    
    {q: 59, text: "What does the principle of least privilege mean?", opts: ["Users get all available permissions", "Users get only the minimum permissions needed", "Administrators get limited access", "All users share the same permissions"], correct: 1, hint: "This security principle limits access to only what's necessary.", cat: "Network Security", scored: true},
    
    {q: 60, text: "Which type of malware disguises itself as legitimate software?", opts: ["Virus", "Worm", "Trojan horse", "Ransomware"], correct: 2, hint: "This malware is named after a Greek legend.", cat: "Network Security", scored: true},
    
    {q: 61, text: "What is the purpose of a VPN?", opts: ["To increase network speed", "To create a secure encrypted tunnel over a public network", "To assign IP addresses", "To filter web content"], correct: 1, hint: "VPN stands for Virtual Private Network.", cat: "Network Security", scored: true},
    
    {q: 62, text: "Which wireless security protocol was the first and is now considered insecure?", opts: ["WEP", "WPA", "WPA2", "WPA3"], correct: 0, hint: "Wired Equivalent Privacy was the original wireless security.", cat: "Network Security", scored: true},
    
    {q: 63, text: "What type of attack intercepts communication between two parties?", opts: ["Phishing", "Man-in-the-middle", "DDoS", "Brute force"], correct: 1, hint: "The attacker positions themselves between two communicating parties.", cat: "Network Security", scored: true},
    
    {q: 64, text: "Which port does HTTPS use by default?", opts: ["80", "443", "8080", "22"], correct: 1, hint: "This port is for secure HTTP traffic.", cat: "Network Security", scored: false},
    
    {q: 65, text: "What is the purpose of network segmentation?", opts: ["To increase broadcast traffic", "To isolate network resources for security and performance", "To reduce available IP addresses", "To eliminate the need for routers"], correct: 1, hint: "Segmentation divides networks into smaller, isolated sections.", cat: "Network Security", scored: true},
    
    {q: 66, text: "Which authentication factor is 'something you have'?", opts: ["Password", "Smart card", "Fingerprint", "PIN"], correct: 1, hint: "This is a physical object used for authentication.", cat: "Network Security", scored: true},
    
    {q: 67, text: "What does AAA stand for in network security?", opts: ["Authentication, Authorization, and Accounting", "Access, Authentication, and Auditing", "Authorization, Auditing, and Access", "Authentication, Access, and Auditing"], correct: 0, hint: "These three functions control and track network access.", cat: "Network Security", scored: true},
    
    {q: 68, text: "Which security control involves installing software updates?", opts: ["Physical security", "Patch management", "Access control", "Encryption"], correct: 1, hint: "This process keeps systems up to date with security fixes.", cat: "Network Security", scored: true},
    
    {q: 69, text: "What is social engineering?", opts: ["Engineering network protocols", "Manipulating people to divulge confidential information", "Designing network topology", "Configuring social media"], correct: 1, hint: "This attack targets human psychology rather than technology.", cat: "Network Security", scored: true},

    // Domain 5: Network Troubleshooting (22%)
    {q: 70, text: "Which troubleshooting methodology step comes first?", opts: ["Test the theory", "Establish a theory", "Identify the problem", "Implement the solution"], correct: 2, hint: "You must understand what's wrong before theorizing.", cat: "Network Troubleshooting", scored: true},
    
    {q: 71, text: "A user cannot access the internet but can access local resources. What is the most likely issue?", opts: ["Bad NIC", "Default gateway misconfiguration", "DNS failure", "Switch failure"], correct: 1, hint: "Local access works, but external access doesn't - think routing.", cat: "Network Troubleshooting", scored: true},
    
    {q: 72, text: "What does a solid link light on a network adapter indicate?", opts: ["High traffic", "Physical connection established", "Data transmission", "Network error"], correct: 1, hint: "A solid light typically means the physical layer is working.", cat: "Network Troubleshooting", scored: true},
    
    {q: 73, text: "Users report slow network performance. Which tool would help identify bandwidth usage?", opts: ["ping", "ipconfig", "Protocol analyzer", "nslookup"], correct: 2, hint: "This tool captures and analyzes network traffic patterns.", cat: "Network Troubleshooting", scored: false},
    
    {q: 74, text: "What does an APIPA address indicate?", opts: ["Valid DHCP configuration", "DHCP server unreachable", "Static IP assignment", "DNS failure"], correct: 1, hint: "APIPA addresses (169.254.x.x) are self-assigned when DHCP fails.", cat: "Network Troubleshooting", scored: true},
    
    {q: 75, text: "A user can ping by IP address but not by hostname. What is likely the problem?", opts: ["Bad cable", "Switch failure", "DNS issue", "DHCP failure"], correct: 2, hint: "Name resolution is failing, but IP connectivity works.", cat: "Network Troubleshooting", scored: true},
    
    {q: 76, text: "What should you do after implementing a solution?", opts: ["Close the ticket immediately", "Document findings and verify full functionality", "Move to the next problem", "Reboot all devices"], correct: 1, hint: "Always verify the fix works and document what was done.", cat: "Network Troubleshooting", scored: true},
    
    {q: 77, text: "Which layer of the OSI model should you check first when troubleshooting connectivity?", opts: ["Application", "Physical", "Transport", "Network"], correct: 1, hint: "Start at the bottom - check cables and connections first.", cat: "Network Troubleshooting", scored: true},
    
    {q: 78, text: "What does a flashing link light typically indicate?", opts: ["No connection", "Data transmission occurring", "Hardware failure", "Configuration error"], correct: 1, hint: "Blinking usually means active data transfer.", cat: "Network Troubleshooting", scored: true},
    
    {q: 79, text: "A cable tester shows 'open' on pin 3. What does this mean?", opts: ["The cable is fine", "Pin 3 is not connected", "The cable is too long", "There's a short circuit"], correct: 1, hint: "Open means the circuit is not complete on that pin.", cat: "Network Troubleshooting", scored: true},
    
    {q: 80, text: "Users in one VLAN cannot access resources in another VLAN. What is needed?", opts: ["A hub", "A Layer 2 switch", "A Layer 3 device or inter-VLAN routing", "A repeater"], correct: 2, hint: "VLANs are separate broadcast domains that need routing between them.", cat: "Network Troubleshooting", scored: false},
    
    {q: 81, text: "What command would you use to clear the DNS cache on a Windows computer?", opts: ["ipconfig /release", "ipconfig /flushdns", "ipconfig /renew", "ipconfig /all"], correct: 1, hint: "This command removes stored DNS resolution information.", cat: "Network Troubleshooting", scored: true},
    
    {q: 82, text: "A wireless client has intermittent connectivity. What is a likely cause?", opts: ["Wrong SSID", "Weak signal or interference", "Incorrect subnet mask", "DHCP server down"], correct: 1, hint: "Intermittent wireless issues often relate to signal quality.", cat: "Network Troubleshooting", scored: true},
    
    {q: 83, text: "What does a 'destination host unreachable' message indicate?", opts: ["DNS failure", "No route to the destination", "Wrong subnet mask", "DHCP failure"], correct: 1, hint: "The network cannot find a path to reach the destination.", cat: "Network Troubleshooting", scored: true},
    
    {q: 84, text: "Which issue would cause high collision rates on a network?", opts: ["Too many devices on a hub", "Misconfigured VLAN", "DNS failure", "Incorrect default gateway"], correct: 0, hint: "Hubs create one large collision domain.", cat: "Network Troubleshooting", scored: true},
    
    {q: 85, text: "What does crosstalk in cabling cause?", opts: ["Increased speed", "Signal interference between wire pairs", "Better performance", "Lower latency"], correct: 1, hint: "Crosstalk is electromagnetic interference between adjacent wires.", cat: "Network Troubleshooting", scored: true},
    
    {q: 86, text: "A switch port is in err-disabled state. What could cause this?", opts: ["Port security violation", "Normal operation", "High traffic", "Low traffic"], correct: 0, hint: "This typically results from a security policy violation.", cat: "Network Troubleshooting", scored: true},
    
    {q: 87, text: "What does high latency indicate?", opts: ["Fast network", "Delays in packet transmission", "Good bandwidth", "Strong signal"], correct: 1, hint: "Latency measures the delay in data transmission.", cat: "Network Troubleshooting", scored: true},
    
    {q: 88, text: "Which tool measures cable length and can locate breaks?", opts: ["Multimeter", "Cable tester", "TDR (Time Domain Reflectometer)", "Tone generator"], correct: 2, hint: "This tool sends signals and measures the time they take to return.", cat: "Network Troubleshooting", scored: false},
    
    {q: 89, text: "A network has duplicate IP addresses. What will occur?", opts: ["Faster performance", "IP address conflicts", "Better connectivity", "Increased bandwidth"], correct: 1, hint: "Two devices cannot have the same IP on the same network.", cat: "Network Troubleshooting", scored: true},
    
    {q: 90, text: "What is the purpose of loopback testing?", opts: ["To test network speed", "To verify NIC functionality", "To test wireless signals", "To configure VLANs"], correct: 1, hint: "Loopback tests the network interface itself.", cat: "Network Troubleshooting", scored: true}
  ];

  // Randomly select 15 questions to be unscored
  useEffect(() => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const unscoredIndices = shuffled.slice(0, 15).map(q => q.q - 1);
    questions.forEach((q, idx) => {
      q.scored = !unscoredIndices.includes(idx);
    });
  }, []);

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

    // CompTIA scoring: 720 is passing (approximately 72%)
    const rawScore = (correct / scoredQuestions) * 100;
    const scaledScore = Math.round(100 + (rawScore / 100) * 800); // Scale to 100-900
    
    return { correct, total: scoredQuestions, percentage: rawScore, scaled: scaledScore };
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
    const passed = score.scaled >= 720;

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
            Passing Score: 720/900 | You answered {score.correct} out of {score.total} scored questions correctly ({score.percentage.toFixed(1)}%)
          </div>
          <div className="text-center text-sm text-gray-500">
            Note: 15 questions were unscored (pretest questions) and not counted toward your final score
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
              ? "Great job! Review these resources to reinforce your knowledge before taking the real exam." 
              : "Focus on your weak areas with these recommended resources:"}
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <a href="https://www.comptia.org/training/books/network-n10-008-study-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">CompTIA Network+ Study Guide</a> (Official)</li>
            <li>• <a href="https://www.comptia.org/training/certmaster-learn/network" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">CompTIA CertMaster Learn for Network+</a></li>
            <li>• <a href="https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Professor Messer's Network+ Course</a> (Free)</li>
            <li>• <a href="https://www.udemy.com/topic/comptia-network/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Udemy CompTIA Network+ Courses</a></li>
            <li>• <a href="https://quizlet.com/subject/comptia-network/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Quizlet Network+ Flashcards</a></li>
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
            setTimeRemaining(90 * 60);
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
        <h1 className="text-3xl font-bold mb-2">CompTIA Network+ Practice Exam</h1>
        <p className="text-blue-100">90 Questions | 90 Minutes | Passing Score: 720/900</p>
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
        <p>💡 Tip: You can jump to any question using the number buttons above</p>
        <p className="mt-2">⏰ Make sure to pace yourself - that's about 1 minute per question</p>
      </div>
    </div>
  );
}