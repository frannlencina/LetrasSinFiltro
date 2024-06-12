import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "medicencinkii@gmail.com",
      pass: "etyw jwqi qybg ziaz",
    },
});

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "✨ Confirmación de email LetrasSinFiltro ✨",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #004AAD;">Hola, ${name}!</h2>
        <p>¡Estas a solo un paso de registrarte en nuestra web!</p>
        <a href="https://letrassinfiltro.vercel.app/activate/verification_email?token=${token}" style="color: #004AAD; text-decoration: none;">Confirmar email</a>
        <hr/>
        <p>Si necesitas asistencia inmediata, no dudes en contactarnos directamente.</p>
        <p style="margin-top: 20px;">Saludos cordiales,</p>
        <p>El equipo de LetrasSinFiltro</p>
        <div style="margin-top: 20px; font-size: 0.9em; color: #777;">
          <p>© 2024 LetrasSinFiltro. Todos los derechos reservados.</p>
          <p><a href="https://letrassinfiltro.vercel.app/politica-privacidad" style="color: #004AAD; text-decoration: none;">Política de privacidad</a> | <a href="https://letrassinfiltro.vercel.app/terminos-servicio" style="color: #004AAD; text-decoration: none;">Términos de servicio</a></p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};