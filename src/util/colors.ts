const SECTION_COLORS = [
  'red',
  'orange',
  'amber',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type SectionColor = typeof SECTION_COLORS[number];

export function getSectionColor(sectionId: number): SectionColor {
  const index = sectionId % SECTION_COLORS.length;
  return SECTION_COLORS[index];
}

export function getSectionBorderTWClass(color: string): string {
  const colorMap: Record<string, string> = {
    'red': 'border-l-red-400',
    'orange': 'border-l-orange-400',
    'amber': 'border-l-amber-400',
    'lime': 'border-l-lime-400',
    'green': 'border-l-green-400',
    'emerald': 'border-l-emerald-400',
    'teal': 'border-l-teal-400',
    'cyan': 'border-l-cyan-400',
    'sky': 'border-l-sky-400',
    'blue': 'border-l-blue-400',
    'indigo': 'border-l-indigo-400',
    'violet': 'border-l-violet-400',
    'purple': 'border-l-purple-400',
    'fuchsia': 'border-l-fuchsia-400',
    'pink': 'border-l-pink-400',
    'rose': 'border-l-rose-400',
  };

  return colorMap[color] || 'border-l-gray-400';
}

export function getBgColorTWClass(color: string): string {
  const colorMap: Record<string, string> = {
    red: "bg-red-400",
    orange: "bg-orange-400",
    amber: "bg-amber-400",
    lime: "bg-lime-400",
    green: "bg-green-400",
    emerald: "bg-emerald-400",
    teal: "bg-teal-400",
    cyan: "bg-cyan-400",
    sky: "bg-sky-400",
    blue: "bg-blue-400",
    indigo: "bg-indigo-400",
    violet: "bg-violet-400",
    purple: "bg-purple-400",
    fuchsia: "bg-fuchsia-400",
    pink: "bg-pink-400",
    rose: "bg-rose-400",
  };

  return colorMap[color] || "bg-gray-400";
}

