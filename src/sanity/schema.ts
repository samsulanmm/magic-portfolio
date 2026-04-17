export const post = {
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};

export const project = {
  name: 'project',
  title: 'Work',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'link', title: 'URL Link', type: 'url' },
    { name: 'tools', title: 'Tools', type: 'array', of: [{ type: 'string' }] },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ]
};

export const experience = {
  name: 'experience',
  title: 'Experience',
  type: 'object',
  fields: [
    { name: 'company', title: 'Company / Organization', type: 'string' },
    { name: 'role', title: 'Role / Job Title', type: 'string' },
    { name: 'timeframe', title: 'Timeframe (e.g. 2022 - Present)', type: 'string' },
    { 
      name: 'achievements', 
      title: 'Achievements / Responsibilities', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
  ]
};

export const education = {
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    { name: 'institution', title: 'Institution / University', type: 'string' },
    { name: 'degree', title: 'Degree / Course', type: 'string' },
    { name: 'year', title: 'Year (e.g. 2018 - 2022)', type: 'string' },
  ]
};

export const socialLink = {
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Email', value: 'email' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Website', value: 'website' },
        ],
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
};

export const profile = {
  name: 'profile',
  title: 'Profile (Home & About)',
  type: 'document',
  fields: [
    { name: 'name', title: 'Your Name', type: 'string' },
    { name: 'role', title: 'Your Role / Tagline', type: 'string' },
    { name: 'bio', title: 'Short Bio (Home)', type: 'text' },
    { name: 'about', title: 'Full About Story', type: 'array', of: [{ type: 'block' }] },
    { name: 'avatar', title: 'Avatar Image', type: 'image', options: { hotspot: true } },
    { name: 'location', title: 'Location (e.g. Jakarta, Indonesia)', type: 'string' },
    { name: 'resumeUrl', title: 'Resume Link', type: 'url' },
    { name: 'contactUrl', title: 'Contact Me Link (e.g. mailto: or wa.me)', type: 'string' },
    { name: 'skills', title: 'All Skills (Deprecated - use technical/soft)', type: 'array', of: [{ type: 'string' }] },
    { name: 'technicalSkills', title: 'Technical Stack (e.g. React, Next.js)', type: 'array', of: [{ type: 'string' }] },
    { name: 'softSkills', title: 'Soft Skills (e.g. Leadership, Brainstorming)', type: 'array', of: [{ type: 'string' }] },
    { name: 'socialLinks', title: 'Social Media Links', type: 'array', of: [{ type: 'socialLink' }] },
    { name: 'education', title: 'Education', type: 'array', of: [{ type: 'education' }] },
    { name: 'experiences', title: 'Work Experiences', type: 'array', of: [{ type: 'experience' }] },
  ]
};

export const gallery = {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title / Caption', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'date', title: 'Date Captured', type: 'date' },
  ]
};

import { themeSettings } from './theme';

export const schema = [profile, post, project, gallery, experience, education, socialLink, themeSettings];
