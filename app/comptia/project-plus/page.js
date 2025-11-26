'use client';

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function ProjectPlusExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = [
    // Domain 1: Project Basics (33%)
    {q: 1, text: "A project manager is beginning a new project and needs to identify all relevant parties. Which document should be created first?", opts: ["Project charter", "Stakeholder register", "Communication plan", "RACI matrix"], correct: 1, hint: "This document identifies and analyzes all project stakeholders.", cat: "Project Basics", scored: true},
    
    {q: 2, text: "Which project management methodology is characterized by iterative development with regular feedback cycles called sprints?", opts: ["Waterfall", "Agile", "PRINCE2", "Critical Path Method"], correct: 1, hint: "This methodology emphasizes flexibility and customer collaboration.", cat: "Project Basics", scored: true},
    
    {q: 3, text: "A project sponsor has requested a document that formally authorizes the project and grants the project manager authority to allocate resources. Which document is needed?", opts: ["Statement of Work (SOW)", "Project charter", "Business case", "Project scope statement"], correct: 1, hint: "This high-level document is signed by the sponsor and gives the PM authority.", cat: "Project Basics", scored: true},
    
    {q: 4, text: "During project planning, the team identifies that User Story #42 depends on the completion of User Story #15. What type of dependency is this?", opts: ["External dependency", "Mandatory dependency", "Internal dependency", "Discretionary dependency"], correct: 2, hint: "The dependency is between tasks within the same project.", cat: "Project Basics", scored: true},
    
    {q: 5, text: "A project manager needs to break down the project deliverables into smaller, manageable components. Which tool should be used?", opts: ["Gantt chart", "Work Breakdown Structure (WBS)", "Network diagram", "Fishbone diagram"], correct: 1, hint: "This hierarchical decomposition tool shows deliverables broken into work packages.", cat: "Project Basics", scored: true},
    
    {q: 6, text: "What is the primary purpose of a project kickoff meeting?", opts: ["To assign individual tasks to team members", "To align stakeholders on project objectives and expectations", "To perform risk assessment", "To close out completed phases"], correct: 1, hint: "This meeting happens at the beginning to establish common understanding.", cat: "Project Basics", scored: true},
    
    {q: 7, text: "Which document defines the features, functions, and characteristics of a project deliverable?", opts: ["Requirements traceability matrix", "Requirements documentation", "Scope statement", "Product backlog"], correct: 1, hint: "This document captures what stakeholders need from the project.", cat: "Project Basics", scored: true},
    
    {q: 8, text: "A project manager is working on a software development project using two-week iterations with daily standup meetings. Which methodology is being used?", opts: ["Waterfall", "Scrum", "Kanban", "Lean"], correct: 1, hint: "This Agile framework uses fixed-length sprints and daily standups.", cat: "Project Basics", scored: true},
    
    {q: 9, text: "What is the term for work that is not included in the project scope and should not be performed?", opts: ["Out-of-scope work", "Scope creep", "Gold plating", "Deferred work"], correct: 0, hint: "This work is explicitly excluded from the project boundaries.", cat: "Project Basics", scored: false},
    
    {q: 10, text: "Which role is responsible for removing impediments and facilitating the Scrum process?", opts: ["Product Owner", "Scrum Master", "Project Manager", "Team Lead"], correct: 1, hint: "This servant-leader role protects the team from distractions.", cat: "Project Basics", scored: true},
    
    {q: 11, text: "A project manager needs to show task dependencies and the critical path. Which tool is most appropriate?", opts: ["Gantt chart", "Pareto chart", "Histogram", "Scatter diagram"], correct: 0, hint: "This bar chart shows task timelines and can display dependencies.", cat: "Project Basics", scored: true},
    
    {q: 12, text: "What does the acronym RACI stand for in a RACI matrix?", opts: ["Responsible, Accountable, Consulted, Informed", "Resources, Actions, Costs, Issues", "Roles, Activities, Controls, Investments", "Review, Approve, Complete, Initiate"], correct: 0, hint: "This matrix clarifies roles and responsibilities for project activities.", cat: "Project Basics", scored: true},
    
    {q: 13, text: "Which project phase involves obtaining formal acceptance of deliverables?", opts: ["Initiation", "Planning", "Execution", "Closing"], correct: 3, hint: "This final phase includes handoff and formal sign-off.", cat: "Project Basics", scored: true},
    
    {q: 14, text: "A company is building a bridge. The construction cannot begin until environmental permits are approved by the government. What type of dependency is this?", opts: ["Internal dependency", "External dependency", "Discretionary dependency", "Mandatory dependency"], correct: 1, hint: "The dependency involves an entity outside the project team.", cat: "Project Basics", scored: false},
    
    {q: 15, text: "What is the purpose of a lessons learned session?", opts: ["To assign blame for project failures", "To document what went well and what could be improved", "To create the project schedule", "To estimate project costs"], correct: 1, hint: "This retrospective activity captures knowledge for future projects.", cat: "Project Basics", scored: true},
    
    {q: 16, text: "Which estimating technique uses historical data from similar projects?", opts: ["Parametric estimating", "Analogous estimating", "Bottom-up estimating", "Three-point estimating"], correct: 1, hint: "This top-down approach compares to analogous past projects.", cat: "Project Basics", scored: true},
    
    {q: 17, text: "In Agile methodology, what is a product backlog?", opts: ["A list of defects found during testing", "A prioritized list of features and requirements", "A schedule of upcoming sprints", "A repository of completed user stories"], correct: 1, hint: "The Product Owner maintains this prioritized list of work.", cat: "Project Basics", scored: true},
    
    {q: 18, text: "What is the term for the person or group that provides financial resources for the project?", opts: ["Project manager", "Stakeholder", "Project sponsor", "Customer"], correct: 2, hint: "This person champions the project and has financial authority.", cat: "Project Basics", scored: true},
    
    {q: 19, text: "A project manager is tracking work completion using a visual board with columns for To Do, In Progress, and Done. Which methodology is being used?", opts: ["Waterfall", "Scrum", "Kanban", "PRINCE2"], correct: 2, hint: "This Agile approach uses visualization and limits work in progress.", cat: "Project Basics", scored: false},
    
    {q: 20, text: "Which document provides a high-level overview of the project timeline showing major milestones?", opts: ["Gantt chart", "Milestone chart", "Network diagram", "Resource histogram"], correct: 1, hint: "This simplified schedule shows key events without detailed tasks.", cat: "Project Basics", scored: true},
    
    {q: 21, text: "What is the primary benefit of creating a Work Breakdown Structure (WBS)?", opts: ["It shows task dependencies", "It breaks down work into manageable pieces", "It assigns resources to tasks", "It creates the project budget"], correct: 1, hint: "The WBS hierarchically decomposes deliverables into smaller components.", cat: "Project Basics", scored: true},
    
    {q: 22, text: "A project manager needs to ensure that all requirements are tracked from origin to deliverable. Which tool should be used?", opts: ["Gantt chart", "Requirements traceability matrix", "RACI matrix", "Issue log"], correct: 1, hint: "This tool links requirements to their source and final deliverable.", cat: "Project Basics", scored: true},
    
    {q: 23, text: "In Scrum, what is the time-boxed event where the team plans the work for the upcoming sprint?", opts: ["Daily standup", "Sprint planning", "Sprint review", "Sprint retrospective"], correct: 1, hint: "This meeting happens at the beginning of each sprint.", cat: "Project Basics", scored: false},
    
    {q: 24, text: "Which process group involves coordinating people and resources to execute the project plan?", opts: ["Initiating", "Planning", "Executing", "Monitoring and Controlling"], correct: 2, hint: "This process group is where the actual work gets done.", cat: "Project Basics", scored: true},
    
    {q: 25, text: "A project manager discovers that a team member has added features that were not requested by the customer. What is this called?", opts: ["Scope creep", "Gold plating", "Value engineering", "Fast tracking"], correct: 1, hint: "This occurs when extras are added without authorization.", cat: "Project Basics", scored: true},
    
    {q: 26, text: "What is the term for the longest path through a project network diagram?", opts: ["Critical path", "Fast track", "Baseline", "Milestone path"], correct: 0, hint: "This path determines the minimum project duration.", cat: "Project Basics", scored: true},
    
    {q: 27, text: "Which document formally documents how project scope will be defined, validated, and controlled?", opts: ["Project charter", "Scope management plan", "Requirements documentation", "WBS dictionary"], correct: 1, hint: "This plan is a component of the project management plan.", cat: "Project Basics", scored: true},
    
    {q: 28, text: "A project manager is estimating task duration using optimistic, most likely, and pessimistic values. Which technique is being used?", opts: ["Analogous estimating", "Parametric estimating", "Three-point estimating", "Bottom-up estimating"], correct: 2, hint: "This technique uses PERT (Program Evaluation and Review Technique).", cat: "Project Basics", scored: false},
    
    {q: 29, text: "What is the primary purpose of a project status report?", opts: ["To assign tasks to team members", "To communicate project progress to stakeholders", "To document lessons learned", "To create the project schedule"], correct: 1, hint: "This regular report keeps stakeholders informed of project health.", cat: "Project Basics", scored: true},
    
    {q: 30, text: "In Agile, what is the term for a potentially shippable product increment delivered at the end of each sprint?", opts: ["Minimum viable product", "Sprint deliverable", "Product increment", "Release candidate"], correct: 2, hint: "This represents working software delivered each iteration.", cat: "Project Basics", scored: true},

    // Domain 2: Project Constraints (27%)
    {q: 31, text: "A project is running behind schedule. The project manager decides to add more resources to critical path activities. What technique is being used?", opts: ["Fast tracking", "Crashing", "Resource leveling", "Schedule compression"], correct: 1, hint: "This technique adds resources (typically increasing cost) to shorten duration.", cat: "Project Constraints", scored: true},
    
    {q: 32, text: "What are the three traditional constraints of the project management triangle?", opts: ["Time, cost, quality", "Scope, time, cost", "Quality, resources, risk", "Scope, quality, resources"], correct: 1, hint: "These three form the classic triple constraint.", cat: "Project Constraints", scored: true},
    
    {q: 33, text: "A project manager needs to optimize resource allocation when resources are over-allocated. Which technique should be used?", opts: ["Resource leveling", "Crashing", "Fast tracking", "Resource loading"], correct: 0, hint: "This technique smooths out resource usage over time.", cat: "Project Constraints", scored: true},
    
    {q: 34, text: "The project budget is $500,000 and the project is expected to generate $750,000 in revenue. What is the expected profit?", opts: ["$250,000", "$500,000", "$750,000", "$1,250,000"], correct: 0, hint: "Profit equals revenue minus costs.", cat: "Project Constraints", scored: true},
    
    {q: 35, text: "A project has an EV of $50,000, AC of $55,000, and PV of $45,000. What is the Cost Performance Index (CPI)?", opts: ["0.82", "0.91", "1.10", "1.22"], correct: 1, hint: "CPI = EV / AC. A value less than 1.0 means over budget.", cat: "Project Constraints", scored: true},
    
    {q: 36, text: "Which earned value metric indicates whether the project is ahead or behind schedule?", opts: ["Cost Variance (CV)", "Schedule Variance (SV)", "Cost Performance Index (CPI)", "Budget at Completion (BAC)"], correct: 1, hint: "This variance compares earned value to planned value.", cat: "Project Constraints", scored: true},
    
    {q: 37, text: "A project manager wants to run two tasks in parallel that were originally planned to run sequentially. What technique is this?", opts: ["Crashing", "Fast tracking", "Resource leveling", "Lead time"], correct: 1, hint: "This technique overlaps activities to compress the schedule.", cat: "Project Constraints", scored: false},
    
    {q: 38, text: "What does a Schedule Performance Index (SPI) of 1.2 indicate?", opts: ["The project is 20% over budget", "The project is 20% under budget", "The project is ahead of schedule", "The project is behind schedule"], correct: 2, hint: "SPI = EV / PV. Greater than 1.0 means ahead of schedule.", cat: "Project Constraints", scored: true},
    
    {q: 39, text: "A project has a BAC of $100,000 and is 40% complete. The actual costs to date are $45,000. What is the Earned Value (EV)?", opts: ["$40,000", "$45,000", "$55,000", "$100,000"], correct: 0, hint: "EV = BAC × % Complete", cat: "Project Constraints", scored: true},
    
    {q: 40, text: "Which estimating technique multiplies a parameter by a cost per unit?", opts: ["Analogous estimating", "Parametric estimating", "Bottom-up estimating", "Three-point estimating"], correct: 1, hint: "This technique uses statistical relationships (e.g., $50 per square foot).", cat: "Project Constraints", scored: true},
    
    {q: 41, text: "A project's critical path is 120 days. A non-critical task has 10 days of float. What is the maximum delay this task can have without impacting the project end date?", opts: ["0 days", "10 days", "110 days", "120 days"], correct: 1, hint: "Float (slack) is the amount of time a task can be delayed without affecting the project.", cat: "Project Constraints", scored: true},
    
    {q: 42, text: "What is the term for the approved version of the project schedule?", opts: ["Baseline", "Milestone", "Work plan", "Critical path"], correct: 0, hint: "This serves as a reference point for measuring performance.", cat: "Project Constraints", scored: false},
    
    {q: 43, text: "A project manager is creating a budget by estimating costs for each work package and then rolling them up. Which technique is being used?", opts: ["Analogous estimating", "Parametric estimating", "Bottom-up estimating", "Top-down estimating"], correct: 2, hint: "This detailed approach starts at the lowest level and aggregates upward.", cat: "Project Constraints", scored: true},
    
    {q: 44, text: "A project has a CPI of 0.8 and an SPI of 1.1. What does this indicate?", opts: ["Over budget and behind schedule", "Under budget and ahead of schedule", "Over budget and ahead of schedule", "Under budget and behind schedule"], correct: 2, hint: "CPI < 1.0 means over budget; SPI > 1.0 means ahead of schedule.", cat: "Project Constraints", scored: true},
    
    {q: 45, text: "What is the formula for Cost Variance (CV)?", opts: ["EV - PV", "EV - AC", "AC - EV", "PV - EV"], correct: 1, hint: "Variance shows the difference between earned and actual costs.", cat: "Project Constraints", scored: true},
    
    {q: 46, text: "A project manager needs to account for uncertainty in the budget. Which type of reserve should be added?", opts: ["Management reserve", "Contingency reserve", "Cost baseline", "Quality reserve"], correct: 1, hint: "This reserve covers known risks (known unknowns).", cat: "Project Constraints", scored: true},
    
    {q: 47, text: "Which constraint is most affected when gold plating occurs?", opts: ["Time", "Cost", "Scope", "Quality"], correct: 1, hint: "Adding unrequested features increases project costs.", cat: "Project Constraints", scored: true},
    
    {q: 48, text: "A project has EV = $80,000, AC = $75,000, and BAC = $200,000. What is the Estimate at Completion (EAC) if current performance continues?", opts: ["$187,500", "$200,000", "$213,333", "$225,000"], correct: 0, hint: "EAC = BAC / CPI. First calculate CPI = EV/AC = 1.067, then BAC/CPI.", cat: "Project Constraints", scored: false},
    
    {q: 49, text: "What does 'float' or 'slack' represent in project scheduling?", opts: ["The critical path duration", "The amount of time an activity can be delayed without delaying the project", "The number of resources assigned to a task", "The duration of the longest task"], correct: 1, hint: "This represents schedule flexibility for non-critical tasks.", cat: "Project Constraints", scored: true},
    
    {q: 50, text: "A project is using 80% of the budget but has only completed 60% of the work. What is the likely issue?", opts: ["The project is ahead of schedule", "The project is over budget", "The project has positive cost variance", "The project is under budget"], correct: 1, hint: "Spending more than you've earned indicates cost overrun.", cat: "Project Constraints", scored: true},
    
    {q: 51, text: "Which technique involves adjusting activities to optimize resource utilization across the project?", opts: ["Resource leveling", "Crashing", "Fast tracking", "Scope reduction"], correct: 0, hint: "This technique may extend the project duration to balance resources.", cat: "Project Constraints", scored: true},
    
    {q: 52, text: "What is the primary purpose of a project budget?", opts: ["To determine project scope", "To authorize and control project costs", "To assign resources to tasks", "To measure quality"], correct: 1, hint: "The budget establishes the financial baseline for the project.", cat: "Project Constraints", scored: true},
    
    {q: 53, text: "A task on the critical path is delayed by 5 days. What is the impact on the project end date?", opts: ["No impact", "Delayed by 5 days", "Delayed by 10 days", "It depends on the float"], correct: 1, hint: "Critical path tasks have zero float; any delay impacts the project.", cat: "Project Constraints", scored: true},
    
    {q: 54, text: "What is the formula for Schedule Performance Index (SPI)?", opts: ["EV / AC", "EV / PV", "AC / EV", "PV / EV"], correct: 1, hint: "This index compares earned value to planned value.", cat: "Project Constraints", scored: false},
    
    {q: 55, text: "A project manager needs to determine which activities must finish before another activity can start. What should be analyzed?", opts: ["Resource availability", "Task dependencies", "Budget constraints", "Quality metrics"], correct: 1, hint: "Dependencies define the sequence and relationships between tasks.", cat: "Project Constraints", scored: true},
    
    {q: 56, text: "What type of cost occurs regularly throughout the project life cycle?", opts: ["Fixed costs", "Variable costs", "Sunk costs", "Recurring costs"], correct: 3, hint: "These costs repeat on a regular basis (e.g., monthly subscriptions).", cat: "Project Constraints", scored: true},
    
    {q: 57, text: "A project has a negative Schedule Variance (SV). What does this indicate?", opts: ["The project is ahead of schedule", "The project is behind schedule", "The project is over budget", "The project is under budget"], correct: 1, hint: "Negative SV means earned value is less than planned value.", cat: "Project Constraints", scored: true},

    // Domain 3: Communication and Change Management (19%)
    {q: 58, text: "Which communication method is best for complex information that requires detailed documentation?", opts: ["Verbal communication", "Written communication", "Informal meetings", "Status board"], correct: 1, hint: "This method provides a permanent record and allows for detailed explanation.", cat: "Communication and Change Management", scored: true},
    
    {q: 59, text: "A stakeholder requests a change to add a new feature. What is the first step the project manager should take?", opts: ["Implement the change immediately", "Submit a change request", "Reject the change", "Update the project schedule"], correct: 1, hint: "Changes must be formally documented and evaluated.", cat: "Communication and Change Management", scored: true},
    
    {q: 60, text: "Who is responsible for approving or rejecting change requests?", opts: ["Project manager", "Project sponsor", "Change control board", "Team members"], correct: 2, hint: "This group evaluates the impact of changes before approval.", cat: "Communication and Change Management", scored: true},
    
    {q: 61, text: "What is the primary purpose of a communication plan?", opts: ["To create the project schedule", "To define how information will be distributed to stakeholders", "To assign roles and responsibilities", "To manage project risks"], correct: 1, hint: "This plan identifies who needs what information, when, and how.", cat: "Communication and Change Management", scored: false},
    
    {q: 62, text: "A team member is concerned about a potential project issue but hasn't formally documented it yet. What should be created?", opts: ["Risk register entry", "Change request", "Issue log entry", "Status report"], correct: 2, hint: "Current problems should be tracked in this document.", cat: "Communication and Change Management", scored: true},
    
    {q: 63, text: "Which stakeholder has the highest power and interest in the project according to a power/interest grid?", opts: ["Monitor closely", "Keep satisfied", "Keep informed", "Manage closely"], correct: 3, hint: "High power and high interest stakeholders require the most attention.", cat: "Communication and Change Management", scored: true},
    
    {q: 64, text: "What is the difference between an issue and a risk?", opts: ["An issue is current; a risk is potential", "An issue is potential; a risk is current", "There is no difference", "Issues are external; risks are internal"], correct: 0, hint: "Issues have already occurred; risks might occur in the future.", cat: "Communication and Change Management", scored: true},
    
    {q: 65, text: "A project manager notices that two team members are in conflict. What should be done first?", opts: ["Ignore the conflict", "Remove one team member", "Address the conflict directly with both parties", "Report to senior management"], correct: 2, hint: "Conflicts should be addressed promptly and directly.", cat: "Communication and Change Management", scored: true},
    
    {q: 66, text: "Which document tracks who needs to be notified about project changes?", opts: ["RACI matrix", "Communication plan", "Change log", "Stakeholder register"], correct: 1, hint: "This plan defines communication protocols for the project.", cat: "Communication and Change Management", scored: true},
    
    {q: 67, text: "What is the purpose of a change control process?", opts: ["To prevent all changes to the project", "To ensure changes are evaluated and approved before implementation", "To speed up project delivery", "To reduce project costs"], correct: 1, hint: "This process manages changes in a systematic way.", cat: "Communication and Change Management", scored: true},
    
    {q: 68, text: "A stakeholder is unhappy with the project progress. What should the project manager do first?", opts: ["Ignore the stakeholder", "Schedule a meeting to discuss concerns", "Change the project scope", "Request more budget"], correct: 1, hint: "Communication and active listening are key to stakeholder management.", cat: "Communication and Change Management", scored: false},
    
    {q: 69, text: "Which communication style is most effective when delivering bad news to stakeholders?", opts: ["Verbal and informal", "Written only", "Face-to-face when possible", "Through a third party"], correct: 2, hint: "Difficult conversations are best handled in person.", cat: "Communication and Change Management", scored: true},
    
    {q: 70, text: "What should be documented when a change request is approved?", opts: ["Only the change description", "The change and its impact on scope, time, cost, and quality", "Just the cost impact", "Only who approved it"], correct: 1, hint: "All impacts should be documented for proper change control.", cat: "Communication and Change Management", scored: true},
    
    {q: 71, text: "A project has 10 team members. Using the formula n(n-1)/2, how many potential communication channels exist?", opts: ["10", "20", "45", "90"], correct: 2, hint: "Communication channels = n(n-1)/2 where n is the number of people.", cat: "Communication and Change Management", scored: true},
    
    {q: 72, text: "What is the best method to resolve a conflict between team members?", opts: ["Forcing", "Avoiding", "Collaborating", "Competing"], correct: 2, hint: "This win-win approach seeks a solution that satisfies all parties.", cat: "Communication and Change Management", scored: true},
    
    {q: 73, text: "Which document should be updated when organizational changes affect the project?", opts: ["Risk register", "Communication plan", "Project charter", "All of the above"], correct: 3, hint: "Organizational changes can impact multiple project documents.", cat: "Communication and Change Management", scored: false},
    
    {q: 74, text: "A project manager needs to inform stakeholders of a major schedule delay. Which communication method is most appropriate?", opts: ["Email only", "Project status report", "Face-to-face meeting followed by written confirmation", "Text message"], correct: 2, hint: "Significant issues require direct communication plus documentation.", cat: "Communication and Change Management", scored: true},
    
    {q: 75, text: "What is the purpose of a lessons learned repository?", opts: ["To assign blame for failures", "To share knowledge for future projects", "To document team member performance", "To create project schedules"], correct: 1, hint: "This knowledge base helps improve future project performance.", cat: "Communication and Change Management", scored: true},

    // Domain 4: Risk, Quality, and Resource Management (21%)
    {q: 76, text: "What is the first step in the risk management process?", opts: ["Risk response planning", "Qualitative risk analysis", "Risk identification", "Risk monitoring"], correct: 2, hint: "You must identify risks before you can analyze or respond to them.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 77, text: "Which risk response strategy involves transferring risk to a third party?", opts: ["Accept", "Avoid", "Mitigate", "Transfer"], correct: 3, hint: "Insurance is a common example of this strategy.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 78, text: "A project manager identifies a risk with high probability and high impact. Which risk response is most appropriate?", opts: ["Accept", "Avoid or Mitigate", "Transfer", "Ignore"], correct: 1, hint: "High probability and high impact risks need active management.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 79, text: "What is the purpose of a risk register?", opts: ["To document all identified risks and response strategies", "To assign resources to tasks", "To create the project schedule", "To track project costs"], correct: 0, hint: "This living document tracks all risk information throughout the project.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 80, text: "Which quality management principle states that prevention is better than inspection?", opts: ["Quality assurance", "Quality control", "Plan quality management", "Continuous improvement"], correct: 0, hint: "This proactive approach builds quality into processes.", cat: "Risk, Quality, and Resource Management", scored: false},
    
    {q: 81, text: "A project manager notices that defects are occurring in the manufacturing process. Which quality tool can identify the root cause?", opts: ["Control chart", "Fishbone diagram", "Pareto chart", "Histogram"], correct: 1, hint: "This cause-and-effect diagram is also called an Ishikawa diagram.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 82, text: "What does the 80/20 rule (Pareto Principle) state?", opts: ["80% of effects come from 20% of causes", "80% of the project is complete when 20% of time remains", "80% of costs occur in 20% of activities", "80% of quality issues are found in 20% of inspections"], correct: 0, hint: "This principle helps prioritize where to focus improvement efforts.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 83, text: "Which risk response strategy accepts the consequences of a risk occurring?", opts: ["Avoid", "Mitigate", "Transfer", "Accept"], correct: 3, hint: "This passive strategy is appropriate for low-impact risks.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 84, text: "A project manager wants to determine if a process is within acceptable control limits. Which tool should be used?", opts: ["Gantt chart", "Control chart", "Scatter diagram", "Flowchart"], correct: 1, hint: "This quality tool shows process variation over time with upper and lower control limits.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 85, text: "What is the purpose of quality assurance (QA)?", opts: ["To inspect deliverables for defects", "To ensure processes are followed correctly", "To create quality metrics", "To test final products"], correct: 1, hint: "QA is process-oriented and focuses on preventing defects.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 86, text: "A team member identifies a positive risk that could benefit the project. What type of risk is this?", opts: ["Threat", "Opportunity", "Issue", "Constraint"], correct: 1, hint: "Not all risks are negative; some can have positive impacts.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 87, text: "Which response strategy should be used for an opportunity (positive risk)?", opts: ["Exploit", "Avoid", "Transfer", "Mitigate"], correct: 0, hint: "This strategy ensures the opportunity definitely happens.", cat: "Risk, Quality, and Resource Management", scored: false},
    
    {q: 88, text: "What is the purpose of a resource histogram?", opts: ["To show task dependencies", "To display resource allocation over time", "To track project costs", "To identify risks"], correct: 1, hint: "This bar chart shows resource usage across time periods.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 89, text: "A project manager wants to understand the relationship between two variables. Which quality tool is most appropriate?", opts: ["Pareto chart", "Scatter diagram", "Flowchart", "Check sheet"], correct: 1, hint: "This tool plots paired data points to show correlation.", cat: "Risk, Quality, and Resource Management", scored: true},
    
    {q: 90, text: "What is the difference between quality assurance and quality control?", opts: ["QA is process-focused; QC is product-focused", "QA is product-focused; QC is process-focused", "There is no difference", "QA happens after QC"], correct: 0, hint: "QA prevents defects through process; QC finds defects through inspection.", cat: "Risk, Quality, and Resource Management", scored: true}
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

    // CompTIA scoring: 710 is passing (approximately 70%)
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
    const passed = score.scaled >= 710;

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
            Passing Score: 710/900 | You answered {score.correct} out of {score.total} scored questions correctly ({score.percentage.toFixed(1)}%)
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
            <li>• <a href="https://www.comptia.org/training/books/project-pk0-005-study-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">CompTIA Project+ Study Guide</a> (Official)</li>
            <li>• <a href="https://www.comptia.org/training/certmaster-learn/project" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">CompTIA CertMaster Learn for Project+</a></li>
            <li>• <a href="https://www.professormesser.com/project-plus/pk0-005/pk0-005-video/pk0-005-training-course/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Professor Messer's Project+ Course</a> (Free)</li>
            <li>• <a href="https://www.udemy.com/topic/comptia-project/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Udemy CompTIA Project+ Courses</a></li>
            <li>• <a href="https://quizlet.com/subject/comptia-project/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">Quizlet Project+ Flashcards</a></li>
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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">CompTIA Project+ Practice Exam</h1>
        <p className="text-purple-100">90 Questions | 90 Minutes | Passing Score: 710/900</p>
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
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
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
        <p>💡 Tip: You can jump to any question using the number buttons above</p>
        <p className="mt-2">⏰ Make sure to pace yourself - that's about 1 minute per question</p>
      </div>
    </div>
  );
}