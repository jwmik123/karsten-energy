import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {service} from './documents/service'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {faqSection} from './objects/faqSection'
import {textImageSection} from './objects/textImageSection'
import {slogan} from './objects/slogan'
import {settings} from './singletons/settings'
import {homepageFaq} from './singletons/homepageFaq'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {heroSection} from './heroSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homepageFaq,
  // Documents
  page,
  post,
  person,
  service,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  heroSection,
  faqSection,
  textImageSection,
  slogan,
]
