import axios from 'axios';
import { Job, JobApiResponse } from '../types/Job';

const API_BASE_URL = 'https://empllo.com/api/v1';

// Generate a stable ID based on job content
const generateStableId = (job: any): string => {
  // Create a unique string from job data
  const uniqueString = `${job.title}-${job.companyName}-${job.locations?.[0] || ''}-${job.pubDate || ''}`;
  
  // Simple hash function to convert string to consistent ID
  let hash = 0;
  for (let i = 0; i < uniqueString.length; i++) {
    const char = uniqueString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to hex and make it look like a UUID
  const hashHex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hashHex}-${hashHex}-${hashHex}-${hashHex}-${hashHex}${hashHex}`;
};

// Extract sections (description / requirements / benefits) from a single HTML description field
const extractSectionsFromHtml = (html?: string) => {
  if (!html) {
    return {
      description: undefined as string | undefined,
      requirements: undefined as string[] | undefined,
      benefits: undefined as string[] | undefined,
    };
  }

  const headingRegex = /<h3[^>]*>(.*?)<\/h3>/gi;
  const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
  const stripTags = (value: string) => value.replace(/<[^>]*>/g, '').trim();

  const sections: { title: string; start: number; end: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    sections.push({
      title: stripTags(match[1] || ''),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  // Attach end indexes (start of next section or end of string)
  for (let i = 0; i < sections.length; i++) {
    const next = sections[i + 1];
    sections[i].end = next ? next.start : html.length;
  }

  let descriptionHtml: string | undefined;
  let requirements: string[] | undefined;
  let benefits: string[] | undefined;

  sections.forEach((section) => {
    const body = html.slice(section.start, section.end);
    const titleLower = section.title.toLowerCase();

    if (titleLower.includes('requirement')) {
      const items: string[] = [];
      let liMatch: RegExpExecArray | null;
      while ((liMatch = liRegex.exec(body)) !== null) {
        const text = stripTags(liMatch[1] || '');
        if (text) items.push(text);
      }
      if (items.length > 0) {
        requirements = items;
      }
    } else if (titleLower.includes('benefit') || titleLower.includes('perk')) {
      const items: string[] = [];
      let liMatch: RegExpExecArray | null;
      while ((liMatch = liRegex.exec(body)) !== null) {
        const text = stripTags(liMatch[1] || '');
        if (text) items.push(text);
      }
      if (items.length > 0) {
        benefits = items;
      }
    } else if (
      titleLower.includes('description') ||
      titleLower.includes('about') ||
      titleLower.includes('role')
    ) {
      descriptionHtml = body;
    }
  });

  return {
    description: descriptionHtml || html,
    requirements,
    benefits,
  };
};

// Fetch all jobs from the API
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    // Try different possible endpoints
    let response;
    
    try {
      // Try /jobs endpoint first
      response = await axios.get(`${API_BASE_URL}/jobs`, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      // If /jobs doesn't work, try base URL
      response = await axios.get(API_BASE_URL, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        },
      });
    }

    // Handle response data - could be array or object with jobs property
    let jobsData = response.data;
    
    if (!Array.isArray(jobsData)) {
      // If response is an object, try to find the jobs array
      jobsData = jobsData.jobs || jobsData.data || [];
    }

    // Map jobs with STABLE IDs
    const jobs: Job[] = jobsData.map((job: any) => {
      // Format salary from minSalary, maxSalary, currency
      let salary = undefined;
      if (job.minSalary && job.maxSalary && job.currency) {
        const formatCurrency = (amount: number, currency: string) => {
          if (currency === 'USD') {
            return `$${(amount / 1000).toFixed(0)}k`;
          } else if (currency === 'EUR') {
            return `€${(amount / 1000).toFixed(0)}k`;
          } else if (currency === 'GBP') {
            return `£${(amount / 1000).toFixed(0)}k`;
          }
          return `${currency} ${amount.toLocaleString()}`;
        };
        salary = `${formatCurrency(job.minSalary, job.currency)} - ${formatCurrency(job.maxSalary, job.currency)}`;
      } else if (job.minSalary && job.currency) {
        // Only min salary
        const formatCurrency = (amount: number, currency: string) => {
          if (currency === 'USD') return `$${(amount / 1000).toFixed(0)}k`;
          if (currency === 'EUR') return `€${(amount / 1000).toFixed(0)}k`;
          if (currency === 'GBP') return `£${(amount / 1000).toFixed(0)}k`;
          return `${currency} ${amount.toLocaleString()}`;
        };
        salary = `${formatCurrency(job.minSalary, job.currency)}+`;
      } else if (job.salary || job.salary_range || job.compensation) {
        salary = job.salary || job.salary_range || job.compensation;
      }

      // Try to extract description/requirements/benefits from a single HTML field when arrays are missing
      const rawDescription: string | undefined =
        job.description || job.job_description || job.details || undefined;

      const parsedSections = extractSectionsFromHtml(rawDescription);

      const requirementsFromDescription = parsedSections.requirements;
      const benefitsFromDescription = parsedSections.benefits;

      const description = parsedSections.description;
      const requirements =
        job.requirements ||
        job.qualifications ||
        job.required_skills ||
        requirementsFromDescription ||
        undefined;

      const benefits =
        job.benefits ||
        job.perks ||
        job.advantages ||
        benefitsFromDescription ||
        undefined;

      return {
        id: generateStableId(job),
        title: job.title || job.job_title || 'Untitled Position',
        company: job.companyName || job.company || job.company_name || 'Company Name',
        companyLogo: job.companyLogo || job.company_logo || job.logo || undefined,
        location: job.locations?.[0] || job.location || job.city || job.address || job.job_location || undefined,
        salary: salary,
        description,
        type: job.jobType || job.type || job.job_type || job.employment_type || job.position_type || undefined,
        posted: job.pubDate || job.posted || job.date_posted || job.created_at || job.post_date || undefined,
        requirements,
        benefits,
        isSaved: false,
      };
    });

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your internet connection.');
      }
      if (error.response) {
        throw new Error(`API Error: ${error.response.status}`);
      }
      if (error.request) {
        throw new Error('No response from server. Please check your internet connection.');
      }
    }
    
    throw new Error('Failed to fetch jobs. Please try again later.');
  }
};

// Search/filter jobs by query
export const searchJobs = (jobs: Job[], query: string): Job[] => {
  if (!query.trim()) {
    return jobs;
  }

  const searchLower = query.toLowerCase().trim();

  return jobs.filter((job) => {
    const titleMatch = job.title?.toLowerCase().includes(searchLower);
    const companyMatch = job.company?.toLowerCase().includes(searchLower);
    const locationMatch = job.location?.toLowerCase().includes(searchLower);
    const typeMatch = job.type?.toLowerCase().includes(searchLower);

    return titleMatch || companyMatch || locationMatch || typeMatch;
  });
};