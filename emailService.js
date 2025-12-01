import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendLoginEmail(email, code) {
    await sgMail.send({
        to: email,
        from: "yourapp@gmail.com",
        subject: "Your Login Code",
        text: `Your code is: ${code}`,
    });
}
