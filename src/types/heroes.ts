// Типы данных для Overwatch 2 героев и контрпиков

export type HeroRole = 'Tank' | 'Damage' | 'Support';

export interface Hero {
  id: string;
  name: string;
  nameRu: string;
  role: HeroRole;
  portrait: string;
}

export interface CounterInfo {
  heroId: string;
  effectiveness: 1 | 2 | 3 | 4 | 5;
  reason: string;
}

export interface HeroCounters {
  heroId: string;
  counters: CounterInfo[];
}

// Хелпер-типы для UI
export interface HeroWithCounters extends Hero {
  counters: CounterInfo[];
}

export type EffectivenessLevel = {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  color: string;
};

export const EFFECTIVENESS_LEVELS: EffectivenessLevel[] = [
  { value: 5, label: 'Жёсткий контр', color: '#ff4444' },
  { value: 4, label: 'Сильный контр', color: '#ff8844' },
  { value: 3, label: 'Умеренный контр', color: '#ffcc44' },
  { value: 2, label: 'Слабый контр', color: '#88cc44' },
  { value: 1, label: 'Минимальный контр', color: '#44aa44' },
];

export const ROLE_LABELS: Record<HeroRole, string> = {
  Tank: 'Танк',
  Damage: 'Урон',
  Support: 'Поддержка',
};

export const ROLE_COLORS: Record<HeroRole, string> = {
  Tank: '#F0B429',
  Damage: '#E74C3C',
  Support: '#27AE60',
};

// Типы для синергий
export interface Synergy {
  partnerId: string;
  name: string;
  effectiveness: 1 | 2 | 3 | 4 | 5;
  reason: string;
  source: string;
}

export type HeroSynergies = Record<string, Synergy[]>;
