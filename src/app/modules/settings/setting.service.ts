import { PrivacyPage } from "./setting.model";

const html=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - AI Baseball Fitness</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        header {
            background: linear-gradient(135deg, #1a365d 0%, #2d5016 100%);
            color: white;
            padding: 2rem 0;
            position: relative;
            overflow: hidden;
        }

        header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            opacity: 0.5;
        }

        .header-content {
            position: relative;
            z-index: 1;
        }



        .header-content h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #fff, #a0d911);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .last-updated {
            opacity: 0.9;
            font-size: 1rem;
        }

        /* Main Content */
        main {
            background: white;
            margin: -3rem auto 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
        }

        .content {
            padding: 3rem;
        }



        /* Sections */
        .section {
            margin-bottom: 3rem;
            scroll-margin-top: 2rem;
        }

        .section h2 {
            color: #1a365d;
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #a0d911;
            position: relative;
        }

        .section h3 {
            color: #2d5016;
            font-size: 1.3rem;
            margin: 2rem 0 1rem 0;
        }

        .section p, .section li {
            margin-bottom: 1rem;
            color: #4a5568;
            line-height: 1.7;
        }

        .section ul, .section ol {
            margin-left: 2rem;
            margin-bottom: 1.5rem;
        }

        .section li {
            margin-bottom: 0.5rem;
        }

        /* Highlight boxes */
        .highlight-box {
            background: linear-gradient(135deg, #fff7e6 0%, #f6ffed 100%);
            border: 1px solid #ffd666;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
            position: relative;
        }

        .highlight-box::before {
            content: "⚠️";
            position: absolute;
            top: -10px;
            left: 20px;
            background: white;
            padding: 0 10px;
            font-size: 1.2rem;
        }

        .highlight-box.info::before {
            content: "ℹ️";
        }

        .highlight-box.ai::before {
            content: "🤖";
        }

        /* Contact Info */
        .contact-info {
            background: linear-gradient(135deg, #1a365d 0%, #2d5016 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            margin-top: 3rem;
            text-align: center;
        }

        .contact-info h3 {
            color: #a0d911;
            margin-bottom: 1rem;
        }

        .contact-info a {
            color: #a0d911;
            text-decoration: none;
        }

        .contact-info a:hover {
            text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 0 15px;
            }

            .header-content h1 {
                font-size: 2rem;
            }

            .content {
                padding: 2rem 1.5rem;
            }



            .section h2 {
                font-size: 1.5rem;
            }

            main {
                margin-top: -2rem;
            }
        }





        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: #a0d911;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #52c41a;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">

                <h1>Privacy Policy</h1>
                <p class="last-updated">Last updated: August 4, 2025</p>
            </div>
        </div>
    </header>

    <div class="container">
        <main>
            <div class="content">


                <section id="introduction" class="section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to AI Baseball Fitness ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the secure handling of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered baseball fitness platform and services.</p>
                    
                    <div class="highlight-box info">
                        <p><strong>Key Point:</strong> Our platform uses artificial intelligence to provide personalized baseball training recommendations. This policy specifically addresses how we handle data in AI processing contexts.</p>
                    </div>
                </section>

                <section id="information-collection" class="section">
                    <h2>2. Information We Collect</h2>
                    
                    <h3>Personal Information</h3>
                    <ul>
                        <li>Name, email address, phone number</li>
                        <li>Age, height, weight, and fitness level</li>
                        <li>Baseball experience and skill level</li>
                        <li>Training goals and preferences</li>
                        <li>Payment and billing information</li>
                    </ul>

                    <h3>Training Data</h3>
                    <ul>
                        <li>Workout history and performance metrics</li>
                        <li>Video recordings of training sessions (with consent)</li>
                        <li>Biometric data from connected devices</li>
                        <li>Progress tracking and achievement data</li>
                    </ul>

                    <h3>Technical Information</h3>
                    <ul>
                        <li>Device information and operating system</li>
                        <li>IP address and location data</li>
                        <li>App usage patterns and preferences</li>
                        <li>Crash reports and performance data</li>
                    </ul>
                </section>

                <section id="ai-data-processing" class="section">
                    <h2>3. AI Data Processing</h2>
                    
                    <div class="highlight-box ai">
                        <p><strong>AI-Powered Features:</strong> Our platform uses machine learning algorithms to analyze your training data and provide personalized recommendations.</p>
                    </div>

                    <h3>How Our AI Works</h3>
                    <p>Our artificial intelligence systems process your training data to:</p>
                    <ul>
                        <li>Generate personalized workout plans</li>
                        <li>Analyze movement patterns and technique</li>
                        <li>Predict injury risk and suggest preventive measures</li>
                        <li>Recommend optimal training schedules</li>
                        <li>Provide real-time form corrections</li>
                    </ul>

                    <h3>Data Minimization</h3>
                    <p>We only process the minimum amount of data necessary for our AI systems to function effectively. Personal identifiers are separated from training data whenever possible through anonymization and pseudonymization techniques.</p>

                    <h3>Model Training</h3>
                    <p>Your data may be used to improve our AI models, but only in aggregated, anonymized forms. Individual user data is never used to train models that serve other users without explicit consent.</p>
                </section>

                <section id="data-usage" class="section">
                    <h2>4. How We Use Your Data</h2>
                    
                    <h3>Service Provision</h3>
                    <ul>
                        <li>Deliver personalized training programs</li>
                        <li>Track your progress and achievements</li>
                        <li>Provide customer support</li>
                        <li>Process payments and subscriptions</li>
                    </ul>

                    <h3>Platform Improvement</h3>
                    <ul>
                        <li>Enhance AI algorithm accuracy</li>
                        <li>Develop new features and services</li>
                        <li>Conduct research and analytics</li>
                        <li>Optimize user experience</li>
                    </ul>

                    <h3>Communication</h3>
                    <ul>
                        <li>Send service updates and notifications</li>
                        <li>Share training tips and educational content</li>
                        <li>Respond to inquiries and support requests</li>
                        <li>Marketing communications (with consent)</li>
                    </ul>
                </section>

                <section id="data-sharing" class="section">
                    <h2>5. Data Sharing</h2>
                    
                    <p>We do not sell your personal information. We may share your data in the following limited circumstances:</p>

                    <h3>Service Providers</h3>
                    <p>We work with trusted third-party service providers who assist us in operating our platform, including cloud hosting, payment processing, and analytics services. These providers are contractually bound to protect your data.</p>

                    <h3>Legal Requirements</h3>
                    <p>We may disclose information when required by law, to protect our rights, or to ensure user safety.</p>

                    <h3>Business Transfers</h3>
                    <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</p>

                    <div class="highlight-box">
                        <p><strong>Coach Integration:</strong> If you choose to work with a certified coach through our platform, we will share relevant training data with your assigned coach to provide personalized guidance.</p>
                    </div>
                </section>

                <section id="data-security" class="section">
                    <h2>6. Data Security</h2>
                    
                    <p>We implement industry-standard security measures to protect your information:</p>
                    
                    <ul>
                        <li><strong>Encryption:</strong> Data is encrypted in transit and at rest using AES-256 encryption</li>
                        <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                        <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                        <li><strong>Data Backup:</strong> Secure, encrypted backups with geographic distribution</li>
                        <li><strong>Incident Response:</strong> Comprehensive breach response procedures</li>
                    </ul>

                    <p>While we take extensive precautions, no method of transmission over the internet is 100% secure. We continuously monitor and update our security practices.</p>
                </section>

                <section id="user-rights" class="section">
                    <h2>7. Your Rights</h2>
                    
                    <p>You have the following rights regarding your personal data:</p>

                    <h3>Access and Portability</h3>
                    <ul>
                        <li>Request a copy of your personal data</li>
                        <li>Export your training data in common formats</li>
                        <li>Access AI-generated insights about your performance</li>
                    </ul>

                    <h3>Correction and Updates</h3>
                    <ul>
                        <li>Update your profile information</li>
                        <li>Correct inaccurate data</li>
                        <li>Modify your training preferences</li>
                    </ul>

                    <h3>Deletion and Restriction</h3>
                    <ul>
                        <li>Delete your account and associated data</li>
                        <li>Restrict processing of specific data types</li>
                        <li>Opt-out of AI model training</li>
                    </ul>

                    <h3>Objection</h3>
                    <ul>
                        <li>Object to marketing communications</li>
                        <li>Opt-out of certain data processing activities</li>
                        <li>Withdraw consent for optional features</li>
                    </ul>
                </section>

                <section id="cookies" class="section">
                    <h2>8. Cookies & Tracking</h2>
                    
                    <p>We use cookies and similar tracking technologies to enhance your experience:</p>

                    <h3>Essential Cookies</h3>
                    <p>Required for basic platform functionality, authentication, and security.</p>

                    <h3>Analytics Cookies</h3>
                    <p>Help us understand how users interact with our platform to improve performance.</p>

                    <h3>Preference Cookies</h3>
                    <p>Remember your settings and preferences for a personalized experience.</p>

                    <p>You can control cookie preferences through your browser settings or our cookie management tool.</p>
                </section>

                <section id="children-privacy" class="section">
                    <h2>9. Children's Privacy</h2>
                    
                    <p>Our service is not intended for children under 13 years of age. For users aged 13-17, we require parental consent and implement additional privacy protections:</p>
                    
                    <ul>
                        <li>Limited data collection</li>
                        <li>Enhanced consent mechanisms</li>
                        <li>Restricted data sharing</li>
                        <li>Parental access rights</li>
                    </ul>

                    <p>If we discover we have collected information from a child under 13 without proper consent, we will delete it immediately.</p>
                </section>

                <section id="international-transfers" class="section">
                    <h2>10. International Data Transfers</h2>
                    
                    <p>Your data may be processed in countries other than your residence. We ensure adequate protection through:</p>
                    
                    <ul>
                        <li>Standard Contractual Clauses (SCCs)</li>
                        <li>Adequacy decisions by regulatory authorities</li>
                        <li>Certification programs and codes of conduct</li>
                        <li>Binding corporate rules</li>
                    </ul>
                </section>

                <section id="policy-changes" class="section">
                    <h2>11. Policy Changes</h2>
                    
                    <p>We may update this Privacy Policy periodically. Significant changes will be communicated through:</p>
                    
                    <ul>
                        <li>Email notifications to registered users</li>
                        <li>In-app notifications</li>
                        <li>Website announcements</li>
                        <li>Updated "Last Modified" date</li>
                    </ul>

                    <p>Continued use of our services after policy changes constitutes acceptance of the updated terms.</p>
                </section>

                <div class="contact-info">
                    <h3>12. Contact Information</h3>
                    <p>For privacy-related questions or to exercise your rights, contact us:</p>
                    <p><strong>Email:</strong> <a href="mailto:privacy@aibaseballfitness.com">privacy@aibaseballfitness.com</a></p>
                    <p><strong>Phone:</strong> 1-800-BASEBALL</p>
                    <p><strong>Address:</strong> 123 Baseball Ave, Sports City, SC 12345</p>
                    <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@aibaseballfitness.com">dpo@aibaseballfitness.com</a></p>
                </div>
            </div>
        </main>
    </div>


</body>
</html>`


const getPrivacyPage = async () => {
//   const privacyPage = await PrivacyPage.findOne();
  const privacyPage = html;
  







  return privacyPage;
};
export const SettingServices = {
  getPrivacyPage,
};
