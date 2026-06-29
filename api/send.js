export default async function handler(req, res) {
  // Enable CORS for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'sisindri2006@gmail.com',
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.5;">
            <h2 style="color: #2563eb; border-b: 1px solid #e5e7eb; padding-bottom: 10px;">New Message from Portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 30px;">Sent via onboarding@resend.dev. Note: In free tier onboarding, you can only send to your verified Resend email address.</p>
          </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API response error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to send email via Resend' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Serverless function error forwarding mail request:', error);
    res.status(500).json({ error: 'Internal server error processing email dispatch' });
  }
}
