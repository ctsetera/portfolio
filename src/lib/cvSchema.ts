import { z } from 'zod';

export const socialSchema = z.object({
    plattform: z.string(),
    url: z.url(),
    username: z.string().optional(),
})

export const profileSchema = z.object ({
    name: z.string(),
    title: z.string(), // Job title
    email: z.email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(), // City, Country
    website: z.url().optional(), // Personal website
    avatar: z.string().default("/avatar.png"), // Path or URL to the avatar image
    bio: z.string().optional(), // About me
    socials: z.array(socialSchema).default([]),
})

export const experienceSchema = z.object({
    title: z.string(),
    role: z.string().optional(),
    location: z.string().optional().optional(),
    startDate: z.string(), // exp. '2020-01-01 or 'Jan 2022'
    endDate: z.string().nullish(), // Present if not provided / null
    current: z.boolean().default(false),
    description: z.string().optional(), // Job description
    highlights: z.array(z.string()).default([]), // exp. ['Built a custom CMS', 'Implemented responsive design']
    technologies: z.array(z.string()).default([]), // exp. ['React', 'Node.js', 'MongoDB']
})

// Personal activities deliberately have no date fields.
export const personalExperienceSchema = z.object({
    title: z.string(),
    role: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
});

export const skillCategorySchema = z.object({
    category: z.string(), // exp. 'Language', 'Framework'
    skills: z.array(z.string()), // exp. ['JavaScript', 'React', 'Node.js']
})

export const projectItemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.url().optional(),
    technologies: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
})

export const certificationsSchema = z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    url: z.url().optional(),
})

export const cvSchema = z.object({
    profile: profileSchema,
    experience: z.array(experienceSchema).default([]),
    personalExperience: z.array(personalExperienceSchema).default([]),
    skills: z.array(skillCategorySchema).default([]),
    projects: z.array(projectItemSchema).default([]),
    certifications: z.array(certificationsSchema).default([]),
});

export type CVData = z.infer<typeof cvSchema>;