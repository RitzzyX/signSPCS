
import { Project, Lead, AuthState } from '../types';
import { INITIAL_PROJECTS } from '../constants';

const KEYS = {
  PROJECTS: 'azure_estates_projects',
  LEADS: 'azure_estates_leads',
  AUTH: 'azure_estates_auth',
  ENQUIRED_PROJECTS: 'azure_estates_enquired'
};

export const storageService = {
  // Projects
  getProjects: (): Project[] => {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  },
  saveProjects: (projects: Project[]) => {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  },
  
  // Leads
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },
  addLead: (lead: Lead) => {
    const leads = storageService.getLeads();
    leads.unshift(lead);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  },

  // Auth (Mock)
  getAuth: (): AuthState => {
    const data = localStorage.getItem(KEYS.AUTH);
    return data ? JSON.parse(data) : { isAuthenticated: false, username: null };
  },
  setAuth: (auth: AuthState) => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(auth));
  },

  // Enquiries tracking (User side)
  markEnquired: (projectId: string) => {
    const enquired = storageService.getEnquired();
    if (!enquired.includes(projectId)) {
      enquired.push(projectId);
      localStorage.setItem(KEYS.ENQUIRED_PROJECTS, JSON.stringify(enquired));
    }
  },
  getEnquired: (): string[] => {
    const data = localStorage.getItem(KEYS.ENQUIRED_PROJECTS);
    return data ? JSON.parse(data) : [];
  },
  hasEnquired: (projectId: string): boolean => {
    return storageService.getEnquired().includes(projectId);
  }
};
