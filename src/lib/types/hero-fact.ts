export const heroFactIcons = [
  'building-2',
  'graduation-cap',
  'map-pin',
  'stethoscope',
  'award',
  'users',
  'heart-pulse',
] as const;

export type HeroFactIcon = (typeof heroFactIcons)[number];

export interface HeroFact {
  icon: HeroFactIcon;
  title: string;
  subtitle: string;
}