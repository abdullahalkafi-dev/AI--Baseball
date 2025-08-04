import { PrivacyPage } from "./setting.model";

const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy - AI Baseball App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0 16px;
      background: #f9f9f9;
      color: #222;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    h1 {
      font-size: 1.6em;
      margin-top: 24px;
      text-align: center;
    }
    h2 {
      font-size: 1.2em;
      margin-top: 24px;
      margin-bottom: 8px;
      color: #1877f2;
    }
    p, ul {
      font-size: 1em;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    ul {
      padding-left: 18px;
    }
    @media (max-width: 500px) {
      body {
        padding: 0 8px;
      }
    }
  </style>
</head>
<body>
  <h1>Privacy Policy</h1>
  <p>
    Welcome to our AI Baseball App! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
  </p>
  
  <h2>Information We Collect</h2>
  <ul>
    <li><strong>Personal Information:</strong> We may collect your name, email address, or other info if you sign up or contact us.</li>
    <li><strong>Usage Data:</strong> We collect anonymous usage statistics to improve app performance.</li>
  </ul>

  <h2>How We Use Your Information</h2>
  <ul>
    <li>To provide and improve our services</li>
    <li>To respond to your requests or support needs</li>
    <li>To send important updates (only if you agree)</li>
  </ul>

  <h2>Data Sharing</h2>
  <p>
    We do not sell or share your personal information with third parties, except as required by law.
  </p>
  
  <h2>Security</h2>
  <p>
    We use reasonable measures to protect your information, but please remember no app can be 100% secure.
  </p>

  <h2>Children's Privacy</h2>
  <p>
    Our app is not directed at children under 13. We do not knowingly collect data from children.
  </p>

  <h2>Changes to This Policy</h2>
  <p>
    We may update this policy. If we make major changes, we’ll notify you in the app.
  </p>

  <h2>Contact Us</h2>
  <p>
    If you have questions, please contact us at <a href="mailto:support@aibaseballapp.com">support@aibaseballapp.com</a>.
  </p>

  <p style="text-align:center; color:#888; font-size:0.9em; margin-top:32px;">
    Last updated: August 2025
  </p>
</body>
</html>
`



const getPrivacyPage = async () => {
//   const privacyPage = await PrivacyPage.findOne();
  const privacyPage = html;
  







  return privacyPage;
};
export const SettingServices = {
  getPrivacyPage,
};
