import type { CVData } from "./cvSchema";

export interface ActivityEntry {
  heading: string;
  subtitle?: string;
  location?: string;
  period?: string;
  description?: string;
  highlights: string[];
  technologies: string[];
}

export interface ActivitySection {
  key: "experience" | "personalExperience";
  entries: ActivityEntry[];
}

// Normalize both kinds of activity for the same section markup.
export function getActivitySections(data: CVData, present: string): ActivitySection[] {
  return [
    {
      key: "experience",
      entries: data.experience.map(item => ({
        heading: item.role,
        subtitle: item.title,
        location: item.location,
        period: `${item.startDate} – ${item.current ? present : item.endDate || ""}`,
        description: item.description,
        highlights: item.highlights,
        technologies: item.technologies,
      })),
    },
    {
      key: "personalExperience",
      entries: data.personalExperience.map(item => ({
        heading: item.title,
        subtitle: item.role,
        description: item.description,
        highlights: item.highlights,
        technologies: item.technologies,
      })),
    },
  ];
}
