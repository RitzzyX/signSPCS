
import { Project } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Ivory Waterfront',
    tagline: 'A Landmark of Pure Sovereignty',
    description: 'A masterpiece of architectural brilliance perched on the edge of the blue. Signature Waterfront offers a life defined by elegance, privacy, and panoramic coastal views.',
    location: 'Billionaire\'s Row, Monaco',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    coverType: 'image',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'Ready to Move',
    configurations: [
      { id: 'c1', type: 'Garden Villa', size: '4,500 sq.ft', price: '$8,500,000', description: 'Private Infinity Garden' },
      { id: 'c2', type: 'Sky Mansion', size: '8,200 sq.ft', price: '$18,000,000', description: '360 Degree Ocean Views' }
    ],
    amenities: ['Private Yacht Berth', '24/7 Butler Service', 'Molecular Kitchen', 'Cryotherapy Spa'],
    createdAt: Date.now()
  }
];

export const APP_THEME = {
  colors: {
    primary: 'bg-white',
    signatureBlue: '#0F172A',
    signatureGold: '#C5A059',
    textMuted: 'text-slate-400',
    deep: 'text-slate-900',
  }
};
