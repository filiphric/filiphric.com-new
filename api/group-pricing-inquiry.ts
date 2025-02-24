import { Resend } from 'resend';

const handler = async (req: any, res: any) => {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate required fields
    const { name, email, company, licenses, message, finalPrice } = req.body;
    if (!name || !email || !company || !licenses) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Group Pricing Inquiries <filip@filiphric.com>',
        to: ['filip@filiphric.com'],
        subject: `Group Pricing Inquiry from ${company}`,
        html: `
          <h2>New Group Pricing Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Number of Licenses:</strong> ${licenses}</p>
          ${message ? `<p><strong>Additional Message:</strong> ${message}</p>` : ''}
          <p><strong>Calculated Price:</strong> ${licenses * 99}€ (${finalPrice}€ after discounts)</p>
        `
      });

      if (emailError) {
        throw emailError;
      }

      return res.status(200).json({ 
        message: 'Inquiry sent successfully'
      });

    } catch (sendError: any) {
      console.error('Error sending email:', sendError);
      return res.status(500).json({ error: 'Failed to send email notification' });
    }

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

export default handler; 