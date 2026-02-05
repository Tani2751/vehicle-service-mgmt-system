import { Resend } from 'resend';
import PasswordResetEmail  from '../emails/InviteUserEmail';
import ForgotPasswordEmail_Invite  from '../emails/ForgotPasswordEmail'

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "onboarding@resend.dev";

export async function InviteUserEmail({
  to,
  username,
  resetLink,
}) {
  
  await resend.emails.send({
    from: FROM_EMAIL,
    to: "tanish2751@gmail.com",
    subject: "Reset your password",
    react: PasswordResetEmail({
      username,
      resetLink,
    }),
  });
  console.log("email sent");  
}


export async function ForgotPasswordEmail({
  to,
  username,
  resetLink,
}) {
  
  await resend.emails.send({
    from: FROM_EMAIL,
    to: "tanish2751@gmail.com",
    subject: "Reset your password",
    react: ForgotPasswordEmail_Invite({
      username,
      resetLink,
    }),
  });
  console.log("email sent - ForgotPasswordEmail");  
}