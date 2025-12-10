import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  upgrades?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export enum BonkState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}