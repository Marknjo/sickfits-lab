/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
import { env } from 'process';
import { createTransport, getTestMessageUrl } from 'nodemailer';

const host = env.MAIL_HOST;
const from = env.MAIL_FROM;
const user = env.MAIL_USER;
const pass = env.MAIL_PASS;
const portNo = env.MAIL_PORT;
const defaultMail = env.MAIL_DEFAULT_EMAIL;
const frontEndUrl = env.FRONTEND_URL;

if (
  !host ||
  !from ||
  !user ||
  !pass ||
  !defaultMail ||
  !portNo ||
  !frontEndUrl
) {
  throw new Error(
    'Email setup arguments incorrect, ensure you have set (MAIL_HOST | MAIL_FROM | MAIL_HOST | MAIL_PASS | MAIL_DEFAULT_EMAIL | MAIL_PORT | FRONTEND_URL) correctly'
  );
}

const transporter = createTransport({
  port: +portNo,
  host,
  auth: {
    user,
    pass,
  },
});

function makeNiceEmail(text: string, from: string) {
  return `
    <div
      style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px
      "
    >
      <h4>Hello There!</h4>
      <p>Here is your password reset token. Hurry, it will expire in the next 10mins</p>
      <p>
        Your Reset Token. Click <a 
          style="
            background-color: red;
            color: white;
            padding: 8px 15px;
          "
          href="${frontEndUrl}/password-reset/${text}" target="_blank"
        >Reset</a>
      </p>
      <p><small>PS: Ignore this message if you did not send the request.</small></p>
      <p>😘, ${from}</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const message = {
    from: `${from} <${defaultMail}>`,
    to,
    subject: 'Your Password Reset Token (Expires in 10min)',
    html: makeNiceEmail(resetToken, from!),
  };

  const info = await transporter.sendMail(message);

  if (user?.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
