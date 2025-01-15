import type { IncomingMessage, ServerResponse } from 'http'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    return res.writeHead(405).end('Method not allowed')
  }

  try {
    // Parse URL parameters
    const url = new URL(req.url || '', `http://${req.headers.host}`)
    const name = url.searchParams.get('name')

    if (!name) {
      throw new Error('Name is required parameter')
    }

    const response = await fetch(`https://certificates.filiphric.com/api/certificate?name=${encodeURIComponent(name)}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch certificate: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="certificate.png"',
      'Content-Length': Buffer.byteLength(Buffer.from(imageBuffer))
    })

    res.end(Buffer.from(imageBuffer))
  } catch (error) {
    console.error('Error fetching certificate:', error)
    res.writeHead(500).end(JSON.stringify({ 
      error: 'Failed to fetch certificate',
      message: error instanceof Error ? error.message : 'Unknown error'
    }))
  }
}