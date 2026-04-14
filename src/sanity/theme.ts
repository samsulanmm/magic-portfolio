export const themeSettings = {
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  fields: [
    {
      name: 'backgroundColor',
      title: 'Background Color (Hex code, e.g., #0f172a)',
      type: 'string',
      initialValue: '#0f172a',
    },
    {
      name: 'foregroundColor',
      title: 'Foreground Text Color (Hex code, e.g., #f8fafc)',
      type: 'string',
      initialValue: '#f8fafc',
    },
    {
      name: 'primaryColor',
      title: 'Primary Color (Hex code, e.g., #8b5cf6)',
      type: 'string',
      initialValue: '#8b5cf6',
    },
    {
      name: 'secondaryColor',
      title: 'Secondary Color (Hex code, e.g., #3b82f6)',
      type: 'string',
      initialValue: '#3b82f6',
    },
    {
      name: 'fontFamily',
      title: 'Base Font Family',
      type: 'string',
      options: {
        list: [
          { title: 'Inter (Modern Sans)', value: 'Inter' },
          { title: 'Roboto Mono (Tech/Code)', value: 'Roboto Mono' },
          { title: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
          { title: 'Outfit (Geometric Sans)', value: 'Outfit' },
        ],
        layout: 'radio',
      },
      initialValue: 'Inter',
    },
  ],
};
