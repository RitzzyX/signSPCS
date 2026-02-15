
import { Project, Lead, AuthState } from '../types.ts';
import { INITIAL_PROJECTS } from '../constants.tsx';

const KEYS = {
  PROJECTS: 'sig_spaces_projects',
  LEADS: 'sig_spaces_leads',
  AUTH: 'sig_spaces_auth',
  ENQUIRED: 'sig_spaces_enquired'
};

export const storageService = {
  getProjects: (): Project[] => {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  },
  saveProjects: (projects: Project[]) => {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  },
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },
  addLead: (lead: Lead) => {
    const leads = storageService.getLeads();
    leads.unshift(lead);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  },
  getAuth: (): AuthState => {
    const data = localStorage.getItem(KEYS.AUTH);
    return data ? JSON.parse(data) : { isAuthenticated: false, username: null };
  },
  setAuth: (auth: AuthState) => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(auth));
  },
  markEnquired: (id: string) => {
    const items = storageService.getEnquired();
    if (!items.includes(id)) {
      items.push(id);
      localStorage.setItem(KEYS.ENQUIRED, JSON.stringify(items));
    }
  },
  getEnquired: (): string[] => {
    const data = localStorage.getItem(KEYS.ENQUIRED);
    return data ? JSON.parse(data) : [];
  },
  hasEnquired: (id: string): boolean => {
    return storageService.getEnquired().includes(id);
  }
};
