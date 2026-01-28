import { NextResponse } from 'next/server';

// API route: send support email
// Behavior:
// - If SENDGRID_API_KEY is set, use SendGrid HTTP API
// - Otherwise dynamically import nodemailer and send via SMTP (SMTP_* env vars)

export async function POST(request: Request) {
  try {
    const { fromEmail, subject, body } = await request.json();

    const supportTo = process.env.SUPPORT_TO_EMAIL || process.env.SMTP_USER || process.env.SENDGRID_FROM;

    // Try SendGrid first
    const sendgridKey = process.env.SENDGRID_API_KEY;
    if (sendgridKey) {
      const payload = {
        personalizations: [
          {
            to: [{ email: supportTo }],
            subject: subject || 'Ondersteuning aanvraag',
          },
        ],
        from: { email: fromEmail || process.env.SENDGRID_FROM || supportTo },
        content: [{ type: 'text/plain', value: body || '' }],
      };

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        return NextResponse.json({ error: 'SendGrid error: ' + txt }, { status: 502 });
      }

      return NextResponse.json({ ok: true, via: 'sendgrid' });
    }
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'No email provider configured (set SENDGRID_API_KEY or SMTP_* env vars)' }, { status: 500 });
    }

    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: fromEmail || smtpUser,
      to: supportTo,
      subject: subject || 'Ondersteuning aanvraag',
      text: body || '',
    });

    return NextResponse.json({ ok: true, via: 'smtp', messageId: info.messageId });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
