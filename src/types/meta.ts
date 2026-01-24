// Типы данных для меты и патчей

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';

export interface TierInfo {
  label: string;
  description: string;
  color: string;
}

export interface HeroMeta {
  heroId: string;
  tier: Tier;
  pickRate: number;
  winRate: number;
  whyMeta: string;
}

export interface MetaData {
  season: number;
  patch: string;
  lastUpdated: string;
  tiers: Record<Tier, TierInfo>;
  heroes: HeroMeta[];
}

export type ChangeType = 'buff' | 'nerf' | 'rework';

export interface PatchChange {
  heroId: string;
  type: ChangeType;
  description: string;
}

export interface Patch {
  patchId: string;
  date: string;
  version: string;
  title: string;
  changes: PatchChange[];
}

// Константы для UI
export const TIER_ORDER: Tier[] = ['S', 'A', 'B', 'C', 'D'];

export const CHANGE_TYPE_LABELS: Record<ChangeType, { label: string; color: string; icon: string }> = {
  buff: { label: 'Бафф', color: '#27AE60', icon: '↑' },
  nerf: { label: 'Нерф', color: '#E74C3C', icon: '↓' },
  rework: { label: 'Реворк', color: '#9B59B6', icon: '⟳' },
};
