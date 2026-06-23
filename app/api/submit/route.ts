import { Resend } from 'resend';
import { generateEmailHtml } from '@/lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const businessName = formData.businessName || formData.fullName || 'New Project';
    const clientEmail = formData.email || '';

    const html = generateEmailHtml(formData);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.RECIPIENT_EMAIL!],
      reply_to: clientEmail || undefined,
      subject: `New Website Project — ${businessName}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Submit error:', error);
    return Response.json({ error: 'Submission failed' }, { status: 500 });
  }
}
