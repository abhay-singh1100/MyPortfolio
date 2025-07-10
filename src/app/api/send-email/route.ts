import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, to } = await request.json();

    // Using EmailJS or a similar service would be better for production
    // For now, we'll simulate sending an email
    const emailContent = `
      New message from your portfolio website:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
      
      Sent from: ${email}
    `;

    // In a real implementation, you would use a service like:
    // - EmailJS
    // - SendGrid
    // - Nodemailer with a service like Gmail
    // - Resend
    // - EmailOctopus
    
    console.log('Email would be sent to:', to);
    console.log('Email content:', emailContent);

    // For now, we'll just return success
    // You'll need to implement actual email sending
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 