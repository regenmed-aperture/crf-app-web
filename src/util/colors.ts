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

// RGB values for Tailwind 400 colors (used for backgrounds and glows)
const COLOR_RGB_VALUES: Record<string, string> = {
  red: "248, 113, 113",
  orange: "251, 146, 60",
  amber: "251, 191, 36",
  lime: "163, 230, 53",
  green: "74, 222, 128",
  emerald: "52, 211, 153",
  teal: "45, 212, 191",
  cyan: "34, 211, 238",
  sky: "56, 189, 248",
  blue: "96, 165, 250",
  indigo: "129, 140, 248",
  violet: "167, 139, 250",
  purple: "192, 132, 252",
  fuchsia: "232, 121, 249",
  pink: "244, 114, 182",
  rose: "251, 113, 133",
};

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

export function getGlowShadowStyle(color: string): string {
  const rgb = COLOR_RGB_VALUES[color] || "156, 163, 175";
  return `0 0 30px rgba(${rgb}, 0.2), 0 0 60px rgba(${rgb}, 0.1)`;
}

