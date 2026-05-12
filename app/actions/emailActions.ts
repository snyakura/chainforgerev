"use server";

import { Resend } from 'resend';

// This pulls the key safely from your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTransactionEmail(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const surname = formData.get('surname') as string;
  const mode = formData.get('mode') as string;
  const amount = formData.get('amount') as string;
  const gateway = formData.get('gateway') as string;
  const broker = formData.get('broker') as string;
  const txid = formData.get('txid') as string;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Chainforge Bridge <onboarding@resend.dev>', // Use this sender for testing
      to: ['snyakura22@gmail.com'],
      subject: `New ${mode.toUpperCase()} Request: ${firstName} ${surname}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #2563eb;">New Transaction Request</h2>
          <hr />
          <p><strong>Client:</strong> ${firstName} ${surname}</p>
          <p><strong>Mode:</strong> ${mode}</p>
          <p><strong>Broker:</strong> ${broker}</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Gateway:</strong> ${gateway}</p>
          <p><strong>TXID/Ref:</strong> ${txid || 'N/A'}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("System Error:", err);
    return { success: false, error: err };
  }
}