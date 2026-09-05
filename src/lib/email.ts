import nodemailer from 'nodemailer';

// Configure the SMTP transporter using environment variables.
// In development without real credentials, you can use ethereal.email or just console.log the email.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

export async function sendPasswordResetEmail(to: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Equipe ClickServiço" <${process.env.SMTP_FROM || 'no-reply@clickservico.com'}>`,
    to,
    subject: 'Redefinição de Senha - ClickServiço',
    text: `Você solicitou a redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetLink} \n\nSe você não solicitou essa alteração, ignore este e-mail.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição de senha da sua conta no <strong>ClickServiço</strong>.</p>
        <p>Clique no botão abaixo para criar uma nova senha:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #f7941d; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Redefinir Minha Senha</a>
        <p>Se o botão não funcionar, copie e cole o link abaixo no seu navegador:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <br />
        <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] E-mail de redefinição enviado para:', to);
    if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_USER) {
      console.log('[Email] Ethereal preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (error) {
    console.error('[Email] Erro ao enviar e-mail:', error);
    // If SMTP is not configured properly, we log the link instead of failing entirely 
    // so we can test the token locally
    console.log(`[Email-Fallback] Reset link gerado para ${to}: ${resetLink}`);
    return false;
  }
}
