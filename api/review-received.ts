import { Resend } from 'resend';
import { getServiceSupabase } from '../utils/supabase';

const handler = async (req: any, res: any) => {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate webhook secret
    if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
      console.log("route secret was not correct");
      return res.status(401).send("You are not authorized to call this API");
    }

    // Validate required fields
    if (!req.body?.record?.user_id || !req.body?.record?.course_id) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ error: 'Missing required fields: user_id or course_id' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get user and course details from Supabase
    const supabase = getServiceSupabase;
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', req.body.record.user_id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('title')
      .eq('id', req.body.record.course_id)
      .single();

    if (courseError) {
      console.error('Error fetching course:', courseError);
      return res.status(500).json({ error: 'Failed to fetch course details' });
    }

    // Send email notification
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Course reviews <filip@filiphric.com>',
        to: ['filip@filiphric.com'],
        subject: `New Course Review from ${profile.full_name || profile.email} - ${course.title}`,
        html: `
          <h2>New Review Received</h2>
          <p><strong>Course:</strong> ${course.title}</p>
          <p><strong>Student:</strong> ${profile.full_name || 'Anonymous'}</p>
          <p><strong>Email:</strong> ${profile.email}</p>
          <p><strong>Rating:</strong> ${req.body.record.rating}/5</p>
          ${req.body.record.review_text ? `<p><strong>Review:</strong> ${req.body.record.review_text}</p>` : ''}
          <p><strong>Anonymous Review:</strong> ${req.body.record.is_anonymous ? 'Yes' : 'No'}</p>
        `
      });

      if (emailError) {
        throw emailError;
      }

      return res.status(200).json({ 
        message: 'Review notification sent successfully',
        data: emailData
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