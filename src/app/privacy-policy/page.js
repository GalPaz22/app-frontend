// pages/privacy-policy.js

import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Privacy Policy - Free ChatPDF</title>
        <meta name="description" content="Read our privacy policy to understand how Free ChatPDF handles your personal information and data." />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <div className="max-w-3xl mx-auto prose lg:prose-xl">
        <p>At Free ChatPDF, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p>We may collect personal information from you when you visit our website, register for an account, use our services, or communicate with us. This information may include:</p>
        <ul className="list-disc list-inside">
          <li>Name, email address, and contact information.</li>
          <li>Usage data, such as your interactions with our website and services.</li>
          <li>Technical data, including IP address, browser type, and device information.</li>
          <li className='font-bold'>We do not collecting any of your PDF data whatsoever.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside">
          <li>Provide and improve our services.</li>
          <li>Personalize your user experience.</li>
          <li>Communicate with you, including responding to inquiries and providing support.</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy or as required by law.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Security of Your Information</h2>
        <p>We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@freechatpdf.com" className="text-blue-600 hover:underline">support@freechatpdf.com</a>.</p>

        <p className="mt-4">Thank you for trusting Free ChatPDF with your personal information. We are committed to protecting your privacy and providing you with a secure experience.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
