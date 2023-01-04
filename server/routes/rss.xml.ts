import RSS from 'rss'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Filip Hric',
    site_url: 'https://filiphric.com',
    feed_url: 'https://filiphric.com/rss.xml'
  })

  const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
  const blogPosts = docs.filter(doc => doc?.published === true)

  for (const doc of blogPosts) {
    feed.item({
      title: doc.title ?? '-',
      url: `https://filiphric.com${doc._path}`,
      author: 'Filip Hric',
      date: doc.date,
      description: doc.description
    })
  }

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})
