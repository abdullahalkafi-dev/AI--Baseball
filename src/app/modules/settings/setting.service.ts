// import { PrivacyPage } from "./setting.model";

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy - AI Baseball App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 0;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      min-height: 100vh;
      line-height: 1.6;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      overflow: hidden;
      animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .header {
      background: linear-gradient(135deg, #2c3e50 0%, #4a6741 100%);
      color: white;
      padding: 32px 24px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.2em;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .header .subtitle {
      font-size: 1.1em;
      opacity: 0.9;
      margin-top: 8px;
      font-weight: 300;
    }
    
    .content {
      padding: 32px 24px;
    }
    
    .intro {
      background: #f8f9fa;
      border-left: 4px solid #4a6741;
      padding: 20px;
      margin-bottom: 32px;
      border-radius: 0 8px 8px 0;
      font-size: 1.1em;
    }
    
    h2 {
      font-size: 1.4em;
      margin-top: 32px;
      margin-bottom: 16px;
      color: #2c3e50;
      font-weight: 600;
      padding-bottom: 8px;
      border-bottom: 2px solid #e9ecef;
    }
    
    h2:first-of-type {
      margin-top: 0;
    }
    
    p {
      font-size: 1em;
      line-height: 1.7;
      margin-bottom: 16px;
      color: #495057;
    }
    
    ul {
      padding-left: 0;
      list-style: none;
    }
    
    li {
      padding: 12px 0;
      padding-left: 24px;
      position: relative;
      border-bottom: 1px solid #f1f3f4;
    }
    
    li:before {
      content: '⚾';
      position: absolute;
      left: 0;
      top: 12px;
      font-size: 16px;
    }
    
    li:last-child {
      border-bottom: none;
    }
    
    strong {
      color: #2c3e50;
      font-weight: 600;
    }
    
    a {
      color: #4a6741;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    a:hover {
      color: #2c3e50;
      text-decoration: underline;
    }
    
    .footer {
      background: #f8f9fa;
      text-align: center;
      padding: 24px;
      color: #6c757d;
      font-size: 0.9em;
      border-top: 1px solid #e9ecef;
    }
    
    .section {
      margin-bottom: 24px;
      padding: 20px;
      background: #fafbfc;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }
    
    .highlight {
      background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
      border-left: 4px solid #4a6741;
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
      body {
        padding: 8px;
      }
      
      .container {
        border-radius: 12px;
        margin: 0;
      }
      
      .header {
        padding: 24px 16px;
      }
      
      .header h1 {
        font-size: 1.8em;
      }
      
      .header .subtitle {
        font-size: 1em;
      }
      
      .content {
        padding: 24px 16px;
      }
      
      .intro {
        padding: 16px;
        font-size: 1em;
      }
      
      h2 {
        font-size: 1.3em;
        margin-top: 24px;
      }
      
      .section {
        padding: 16px;
        margin-bottom: 16px;
      }
      
      li {
        padding: 10px 0;
        padding-left: 20px;
      }
      
      .footer {
        padding: 20px 16px;
      }
    }
    
    @media (max-width: 480px) {
      .header h1 {
        font-size: 1.6em;
      }
      
      .header .subtitle {
        font-size: 0.95em;
      }
      
      .content {
        padding: 20px 12px;
      }
      
      h2 {
        font-size: 1.2em;
      }
      
      .intro {
        padding: 12px;
      }
      
      .section {
        padding: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Privacy Policy </h1>
      <div class="subtitle">AI Baseball App - Your Privacy Matters</div>
    </div>
    
    <div class="content">
      <div class="intro">
        Welcome to our AI Baseball App! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our baseball training and analytics application.
      </div>
      
      <div class="section">
        <h2>📊 Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> We collect your name, email address, and profile information when you create an account</li>
          <li><strong>Baseball Performance Data:</strong> Training logs, game statistics, performance metrics, and progress tracking</li>
          <li><strong>Usage Analytics:</strong> How you interact with the app, features used, and session duration to improve our services</li>
          <li><strong>Device Information:</strong> Device type, operating system, and app version for compatibility and support</li>
        </ul>
      </div>

      <div class="section">
        <h2>⚙️ How We Use Your Information</h2>
        <ul>
          <li>To provide personalized AI-powered baseball training recommendations</li>
          <li>To track and analyze your performance progress over time</li>
          <li>To improve our app features and user experience</li>
          <li>To send you important updates and notifications (with your consent)</li>
          <li>To provide customer support and respond to your inquiries</li>
          <li>To ensure app security and prevent fraudulent activity</li>
        </ul>
      </div>

      <div class="section">
        <h2>🔒 Data Security & Storage</h2>
        <p>We implement industry-standard security measures to protect your data:</p>
        <ul>
          <li>All data is encrypted in transit and at rest</li>
          <li>Secure cloud storage with regular backups</li>
          <li>Limited access to your data on a need-to-know basis</li>
          <li>Regular security audits and updates</li>
        </ul>
        <div class="highlight">
          <strong>Note:</strong> While we use reasonable measures to protect your information, no system can guarantee 100% security. We continuously work to improve our security practices.
        </div>
      </div>

      <div class="section">
        <h2>🤝 Data Sharing Policy</h2>
        <p>We respect your privacy and do not sell your personal information. We may share data only in these limited circumstances:</p>
        <ul>
          <li><strong>With Your Consent:</strong> When you explicitly agree to share data with coaches or teammates</li>
          <li><strong>Service Providers:</strong> Trusted third-party services that help us operate the app (under strict confidentiality)</li>
          <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and users' safety</li>
          <li><strong>Anonymous Analytics:</strong> Aggregated, anonymized data for research and app improvement</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>👶 Children's Privacy</h2>
        <p>Our app welcomes young baseball players but prioritizes their privacy:</p>
        <ul>
          <li>We do not knowingly collect personal data from children under 13 without parental consent</li>
          <li>Parents can review, modify, or delete their child's data by contacting us</li>
          <li>Special privacy protections apply to accounts created for minors</li>
        </ul>
      </div>

      <div class="section">
        <h2>⚾ Your Baseball Data Rights</h2>
        <p>You have full control over your baseball performance data:</p>
        <ul>
          <li><strong>Access:</strong> View all data we have about you and your performance</li>
          <li><strong>Update:</strong> Modify your personal information and preferences anytime</li>
          <li><strong>Export:</strong> Download your training logs and statistics</li>
          <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
          <li><strong>Portability:</strong> Transfer your data to other platforms when possible</li>
        </ul>
      </div>

      <div class="section">
        <h2>🔄 Policy Updates</h2>
        <p>We may update this privacy policy to reflect changes in our practices or legal requirements. When we make significant changes:</p>
        <ul>
          <li>We'll notify you through the app or email</li>
          <li>You'll have the opportunity to review changes before they take effect</li>
          <li>Continued use of the app indicates acceptance of updated terms</li>
        </ul>
      </div>

      <div class="section">
        <h2>📞 Contact Us</h2>
        <p>We're here to help with any privacy questions or concerns:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:privacy@aibaseballapp.com">privacy@aibaseballapp.com</a></li>
          <li><strong>Support:</strong> <a href="mailto:support@aibaseballapp.com">support@aibaseballapp.com</a></li>
          <li><strong>Data Requests:</strong> Use our in-app privacy settings or contact us directly</li>
        </ul>
        
        <div class="highlight">
          <strong>Response Time:</strong> We typically respond to privacy inquiries within 2-3 business days.
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>Last updated: August 2025 | Version 2.0</p>
      <p>© 2025 AI Baseball App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const getPrivacyPage = async () => {
//   const privacyPage = await PrivacyPage.findOne();
  const privacyPage = html;
  return privacyPage;
};

export const SettingServices = {
  getPrivacyPage,
};
