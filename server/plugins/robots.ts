export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('render:response', (response: any, { event }: any) => {
    if (event.path === '/robots.txt') {
      response.body = `User-agent: *
Allow: /
Sitemap: https://filiphric.com/sitemap.xml

# Block access to admin paths
Disallow: /api/
`
    }
  })
}) 