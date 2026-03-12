import { post } from './post'
import { author } from './author'
import { category } from './category'
import { glossaryTerm } from './glossary-term'
import { blockContent } from './block-content'
import { siteSettings } from './site-settings'

export const schemaTypes = [
  post,
  author,
  category,
  glossaryTerm,
  blockContent,
  siteSettings,
]
