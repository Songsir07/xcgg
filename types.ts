import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

export interface NavItem {
  label: string;
  href: string; // Can be a section ID (#...) or a route key
  isPage?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  content?: string;
}

export interface GuestMoment {
  id: string;
  image: string;
  caption: string;
  author: string;
  location: string;
  timestamp: number;
}

export enum SectionId {
  HERO = 'hero',
  TECH = 'tech',
  CONCEPT = 'concept',
  IMPACT = 'impact',
  ACCOMMODATION = 'accommodation',
  BENTO = 'bento',
  SERVICES = 'services',
  GITHUB = 'github',
  CONTACT = 'contact'
}

export type Page = 'home' | 'news' | 'auth' | 'vault' | 'hall-of-fame';

export interface UserPass {
  id: string; // The Unique SVP-ID
  name: string;
  email: string;
  password: string; // Stored for demo purposes
  createdAt: string;
  avatar: string;
}