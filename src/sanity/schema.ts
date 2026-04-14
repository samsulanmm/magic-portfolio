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
    { name: 'resumeUrl', title: 'Resume Link', type: 'url' },
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

export const schema = [profile, post, project, gallery, experience, themeSettings];
