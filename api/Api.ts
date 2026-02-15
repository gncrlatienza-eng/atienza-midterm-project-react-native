import axios from 'axios';
import uuid from 'react-native-uuid';
import { Job, JobApiResponse } from '../types/Job';

const API_BASE_URL = 'https://empllo.com/api/v1';

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

    // The API returns jobs without unique IDs, so we add them using UUID
    const jobs: Job[] = jobsData.map((job: any) => {
      // Handle locations array - join multiple locations or take first one
      let locationString = undefined;
      if (job.locations && Array.isArray(job.locations) && job.locations.length > 0) {
        // If multiple locations, join them with comma, otherwise just use the first one
        locationString = job.locations.length > 1 
          ? job.locations.join(', ') 
          : job.locations[0];
      } else if (job.location) {
        // Fallback to singular location field
        locationString = job.location;
      } else if (job.city) {
        locationString = job.city;
      } else if (job.address) {
        locationString = job.address;
      }

      // Handle salary - combine min and max if available
      let salaryString = undefined;
      if (job.minSalary && job.maxSalary && job.currency) {
        salaryString = `$${(job.minSalary / 1000).toFixed(0)}k - $${(job.maxSalary / 1000).toFixed(0)}k ${job.currency}`;
      } else if (job.salary) {
        salaryString = job.salary;
      } else if (job.salary_range) {
        salaryString = job.salary_range;
      } else if (job.compensation) {
        salaryString = job.compensation;
      }

      return {
        id: uuid.v4() as string, // Generate unique ID for each job
        title: job.title || job.job_title || 'Untitled Position',
        company: job.companyName || job.company || job.company_name || 'Company Name',
        location: locationString,
        logo: job.companyLogo || job.logo || job.company_logo || job.companyLogo || job.image || job.company_image || undefined,
        salary: salaryString,
        description: job.description || job.job_description || job.details || undefined,
        type: job.jobType || job.workModel || job.type || job.job_type || job.employment_type || job.position_type || undefined,
        posted: job.posted || job.date_posted || job.created_at || job.post_date || undefined,
        requirements: job.requirements || job.qualifications || job.required_skills || undefined,
        benefits: job.benefits || job.perks || job.advantages || undefined,
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