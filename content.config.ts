import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        description: z.string(),
        keywords: z.string(),
        stacks: z.array(z.any()).optional(),
        browsers: z.array(z.any()).optional(),
      })
    })
  }
})