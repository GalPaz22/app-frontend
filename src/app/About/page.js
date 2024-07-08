// pages/about.js

import Head from 'next/head';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>About Free ChatPDF - The Only 100% Free Service Online</title>
        <meta name="description" content="Learn about Free ChatPDF, the only 100% free online service for PDF conversion and interaction. Discover our mission, services, and commitment to quality." />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">About Free ChatPDF</h1>

      <div className="max-w-3xl mx-auto prose lg:prose-xl">
        <p>Welcome to Free ChatPDF, your ultimate destination for seamless and free PDF conversion and interaction services. We take pride in being the only platform online that offers a comprehensive suite of PDF tools completely free of charge, without any hidden fees or subscriptions.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p>At Free ChatPDF, our mission is to empower users worldwide with easy-to-use tools for PDF conversion, editing, and interaction, all at no cost. We believe that access to essential digital tools should be universally available, enabling individuals and businesses alike to manage and manipulate PDF documents effortlessly.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside">
          <li><strong>PDF summaries:</strong> Get a summary of your PDFs in just a few clicks.</li>
          <li><strong>PDF Q&A:</strong> Ask questions about your PDFs in real-time.</li>
          <li><strong>PDF Data-Finding:</strong> Find relevant information in your PDFs, including tables, images, and specific text.</li>
          <li><strong>No Registration Required:</strong> Enjoy hassle-free access to all our tools without the need to create an account or provide personal information.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Quality</h2>
        <p>Quality and user satisfaction are at the heart of Free ChatPDF. We prioritize simplicity, functionality, and security in our tools, ensuring that every user experience is smooth and productive. Our platform is designed to handle your PDF needs efficiently, whether you're a student, professional, or small business owner.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Get Started</h2>
        <p>Join thousands of users who rely on Free ChatPDF for their PDF management needs. Start converting, editing, and enhancing your PDFs today—completely free of charge. Explore our user-friendly interface, discover our range of features, and experience the convenience of managing your PDF documents effortlessly.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you! Reach out to our dedicated support team at <a href="mailto:support@freechatpdf.com" className="text-blue-600 hover:underline">codeit2210@gmail.com</a> or connect with us through our social media channels. Your input helps us improve and enhance our services to better serve your needs.</p>

        <p className="mt-4">Thank you for choosing Free ChatPDF. We're committed to providing you with the best free PDF tools available online.</p>
      </div>
    </div>
  );
};

export default About;
