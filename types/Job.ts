// Job interface - structure of job data from API
export interface Job {
  id: string; // Generated using UUID since API doesn't provide IDs
  title: string;
  company: string;
  location: string;
  logo?: string; // Company logo URL
  salary?: string;
  description?: string;
  type?: string; // Full-time, Part-time, Contract, etc.
  posted?: string; // Date posted
  requirements?: string[];
  benefits?: string[];
  
  // For saved jobs tracking
  isSaved?: boolean;
  savedAt?: string; // Timestamp when saved
}

// API Response type (before adding UUID)
export interface JobApiResponse {
  title: string;
  company: string;
  location: string;
  logo?: string;
  salary?: string;
  description?: string;
  type?: string;
  posted?: string;
  requirements?: string[];
  benefits?: string[];
}

// Application form data
export interface JobApplication {
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  whyHireYou: string;
  appliedAt: string;
}