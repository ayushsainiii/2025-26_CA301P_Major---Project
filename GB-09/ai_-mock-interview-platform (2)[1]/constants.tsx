
import React from 'react';
import { JobRole, InterviewSession, Testimonial } from './types';

export const BrainIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5-2.5V2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5-2.5V2z" />
    <path d="M12 4.5a2.5 2.5 0 0 0-2.5-2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h2.5a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M12 4.5a2.5 2.5 0 0 1 2.5-2.5H17a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-2.5a2.5 2.5 0 0 1-2.5-2.5" />
  </svg>
);

export const ChatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const ChartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m18 9-5 5-4-4-3 3" />
    </svg>
);

export const JOB_ROLES: JobRole[] = [
  { id: 'swe', title: 'Software Engineer', description: 'Algorithms, data structures, system design.', icon: <BrainIcon className="w-8 h-8 text-cyan-400" /> },
  { id: 'pm', title: 'Product Manager', description: 'Product strategy, roadmapping, system design.', icon: <ChatIcon className="w-8 h-8 text-cyan-400" /> },
  { id: 'ds', title: 'Data Scientist', description: 'Product strategy, statistics, machine learning models.', icon: <ChartIcon className="w-8 h-8 text-cyan-400" /> },
  { id: 'ux', title: 'UX/UI Designer', description: 'User flows, design principles, mockups, prototypes.', icon: <BrainIcon className="w-8 h-8 text-cyan-400" /> },
  { id: 'marketing', title: 'Marketing Specialist', description: 'Campaigns, SEO, content strategy.', icon: <ChatIcon className="w-8 h-8 text-cyan-400" /> },
  { id: 'sales', title: 'Sales Executive', description: 'Lead generation, negotiation, closing deals.', icon: <ChartIcon className="w-8 h-8 text-cyan-400" /> },
];

export const MOCK_INTERVIEW_HISTORY: InterviewSession[] = [
  { id: '1', role: 'Software Engineer', date: '2024-10-26', score: 88, transcript: [] },
  { id: '2', role: 'Product Manager', date: '2024-10-25', score: 92, transcript: [] },
  { id: '3', role: 'Software Engineer', date: '2024-10-22', score: 78, transcript: [] },
  { id: '4', role: 'Data Scientist', date: '2024-10-20', score: 85, transcript: [] },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    avatar: 'https://picsum.photos/id/1/100/100',
    rating: 5,
    text: 'Talent AI helped me land an amazing job! The instant feedback was game-changer.'
  },
  {
    name: 'David Lee',
    role: 'Product Manager',
    avatar: 'https://picsum.photos/id/2/100/100',
    rating: 5,
    text: 'The questions were so realistic. It felt like a real interview, which boosted my confidence immensely.'
  },
  {
    name: 'Maria Garcia',
    role: 'UX Designer',
    avatar: 'https://picsum.photos/id/3/100/100',
    rating: 4,
    text: 'Highly recommend for anyone preparing for tech interviews. The data-driven insights are invaluable.'
  },
  {
    name: 'James Smith',
    role: 'Data Scientist',
    avatar: 'https://picsum.photos/id/4/100/100',
    rating: 5,
    text: 'The practice sessions were tough but fair. The AI report pointed out exactly where I needed to improve.'
  },
];

export const MOCK_FEEDBACK: any = {
    overallScore: 88,
    strengths: [
      "Strong understanding of data structures.",
      "Clear and concise communication.",
      "Good problem-solving approach to behavioral questions."
    ],
    areasForImprovement: [
      "Could provide more detail on system design tradeoffs.",
      "Practice STAR method for more structured answers."
    ],
    suggestedTopics: [
      "System Design: Scalability",
      "Behavioral: Conflict Resolution"
    ],
    questionBreakdown: [
      {
        question: "Tell me about a time you faced a difficult challenge. How did you handle it and what was the outcome?",
        answer: "The user described a situation where they had to refactor a legacy codebase under a tight deadline. They explained their process of prioritizing tasks, communicating with the team, and successfully deploying the new code.",
        feedback: "Excellent use of the STAR method. Your explanation was clear and demonstrated strong ownership and problem-solving skills. To improve, you could have quantified the impact of the refactor, e.g., 'improved performance by 15%'.",
        score: 90
      },
      {
        question: "How would you design a URL shortening service like TinyURL?",
        answer: "The user outlined a high-level design involving a hash function to generate short keys and a database to store the mapping between the short key and the original URL. They also mentioned the need for a load balancer.",
        feedback: "Good initial approach. You covered the core components. You could have delved deeper into the choice of database (SQL vs. NoSQL), handling hash collisions, and strategies for scaling the service to handle millions of requests.",
        score: 85
      }
    ]
};
