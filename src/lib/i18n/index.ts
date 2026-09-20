export type SupportedLocale = "en" | "de" | "ja";

export const translations = {
  en: {
    aboutMe: "About Me",
    experience: "Personal Technical Experience",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    contact: "Contact",
    downloadAtsPdf: "📄 ATS PDF",
    downloadDesignPdf: "🎨 Design PDF",
  },
  de: {
    aboutMe: "Über mich",
    experience: "Persönliche technische Erfahrung",
    skills: "Fähigkeiten",
    projects: "Projekte",
    certifications: "Zertifikate",
    contact: "Kontakt",
    downloadAtsPdf: "📄 ATS PDF",
    downloadDesignPdf: "🎨 Design PDF",
  },
  ja: {
    aboutMe: "自己紹介",
    experience: "個人での技術経験",
    skills: "スキル",
    projects: "制作実績",
    certifications: "資格",
    contact: "連絡先",
    downloadAtsPdf: "📄 採用システム向けPDF",
    downloadDesignPdf: "🎨 デザインPDF",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslations(locale: string = "en") {
  const dictionary =
    translations[locale as SupportedLocale] ?? translations.en;

  return (key: TranslationKey): string => {
    return dictionary[key] ?? translations.en[key] ?? key;
  };
}
