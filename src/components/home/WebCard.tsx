import { Card } from '@/components/shared/Card'
import { formatDate } from '@/lib/formatDate'
import { type BlogType } from '@/lib/blogs'
// import type { WebItemType } from '../../lib/webs' // <-- Adjust the import path as needed
import type { WebItemType } from '../../config/projects' // <-- Adjust the import path as needed

export function WebCard({ web, titleAs }: { web: WebItemType, titleAs?: keyof JSX.IntrinsicElements }) {
  const as = titleAs ?? 'h2'
  return (
    <Card as="article">
      <Card.Title as={as} href={web.link.href}>
        {web.name}
      </Card.Title>
      {/* Remove or replace the date display if WebItemType does not have a date property */}
      <Card.Description>{web.description}</Card.Description>
      <Card.Cta>Read blog</Card.Cta>
    </Card>
  )
}
