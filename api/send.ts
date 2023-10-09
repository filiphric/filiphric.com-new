import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req: any, res: any) => {
  const { body } = req
  const data = await resend.emails.send({
    from: 'Filip Hric <filip@filiphric.com>',
    to: [body.attendeeEmail],
    cc: ['filip@filiphric.com'],
    subject: 'Hello world',
    html: `Hello ${body.attendeeFirstName}!
    Thanks for your registration to Cypress core workshop, I hope you are as excited as I am 🙂

You can expect an instructions email three days before the workshop, where I’ll tell you more about how to connect and what you need to do in preparation.

I’m really looking forward to meeting you! 👋

P.S. I am working out some stuff with my accountant, I will be sending the invoice for the workshop in few days. Please let me know if you prefer an invoice or an online card payment. In case of an invoice, please send me your billing details. The workshop price is: ${body.price}
`
  })

  return res.status(200).json(data)
}
