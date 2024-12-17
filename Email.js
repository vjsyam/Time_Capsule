const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const schedule = require('node-schedule'); // Import node-schedule
const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vjsyam17@gmail.com',
    pass: 'mbvw stka ktcc fkda',
  },
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing email fields: to, subject, or text' });
  }

  const mailOptions = {
    from: 'vjsyam17@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).json({ message: 'Email sent successfully!', info: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Schedule email sending
app.post('/schedule-email', (req, res) => {
  const { to, subject, text, dateTime } = req.body;

  if (!to || !subject || !text || !dateTime) {
    return res.status(400).json({ message: 'Missing fields: to, subject, text, or dateTime' });
  }

  const job = schedule.scheduleJob(new Date(dateTime), async () => {
    try {
      const info = await transporter.sendMail({ from: 'vjsyam17@gmail.com', to, subject, text });
      console.log('Scheduled email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending scheduled email:', error);
    }
  });

  res.status(200).json({ message: 'Email scheduled successfully!' });
});

app.listen(port, () => {
  console.log(`Email server running on http://localhost:${port}`);
});
