
export interface ProjectConfig {
  id: string;
  type: string; // e.g., "Signature 3BHK", "Royal Penthouse"
  size: string; // e.g., "2400 sq.ft"
  price: string; // e.g., "$2.5M"
  description?: string; // e.g., "Sea Facing with Private Pool"
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  mainImage: string;
  coverType: 'image' | 'video';
  videoUrl?: string; // For the cinematic walkthrough section
  gallery: string[];
  status: 'Pre-Launch' | 'Under Construction' | 'Ready to Move';
  configurations: ProjectConfig[];
  amenities: string[];
  createdAt: number;
}

export interface Lead {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}
