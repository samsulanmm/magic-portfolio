import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schema'

// Set of actions allowed for singletons
const singletonActions = new Set(["publish", "discardChanges", "restore"])
// Types that should be treated as singletons
const singletonTypes = new Set(["profile", "themeSettings"])

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gwffi5sr', // Your real project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Magic Portfolio CMS',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton profile
            S.listItem()
              .title("Profile (Home & About)")
              .id("global-profile")
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId("global-profile")
              ),
            // Singleton theme settings
            S.listItem()
              .title("Theme Settings")
              .id("global-theme")
              .child(
                S.document()
                  .schemaType("themeSettings")
                  .documentId("global-theme")
              ),
            S.divider(),
            // Regular document types
            S.documentTypeListItem("post").title("Blog"),
            S.documentTypeListItem("project").title("Work"),
            S.documentTypeListItem("gallery").title("Gallery"),
          ]),
    }),
  ],
  schema: {
    types: schema,
    // Filter singletons from the global 'new document' options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Restrict actions for singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
