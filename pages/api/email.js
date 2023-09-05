import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fs = require("fs");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
}


export default async (req, res) => {

  const { email, subject, message } = req.body

  let msg = {
    to: [{email: 'contact@art4biodiversity.org', name: 'Art 4 Biodiversity'}],
    from: {email: 'request@art4biodiversity.org', name:'Art 4 Biodiversity'},
    content: [{type:'text/plain', value: message.length > 0 ? message : " "}],
    subject: subject,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    // console.log(error.response.body.errors)
    res.status(500).json({ error: 'Error sending email' })
  }
}