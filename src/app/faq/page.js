// pages/faq.js

import Head from 'next/head';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>FAQ - Free ChatPDF</title>
        <meta name="description" content="Frequently Asked Questions about Free ChatPDF. Find answers to common inquiries about our services, features, and more." />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto prose lg:prose-xl">
        <h2 className="text-2xl font-bold mt-8 mb-4">What is Free ChatPDF?</h2>
        <p>Free ChatPDF is a free online platform that offers tools for PDF conversion, editing, and interaction. It allows users to convert various file formats to PDF, edit PDFs directly in their browser, and enhance PDFs with interactive elements.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Is Free ChatPDF really free?</h2>
        <p>Yes, Free ChatPDF is 100% free to use. There are no hidden fees or subscriptions required. All our tools and features are accessible without any cost.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Do I need to register to use Free ChatPDF?</h2>
        <p>No, Free ChatPDF does not require registration. You can use our services anonymously without creating an account or providing any personal information.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What types of files can I convert to PDF?</h2>
        <p>You can convert various file formats, including documents (like Word, Excel, PowerPoint), images (JPEG, PNG), and more to PDF using Free ChatPDF.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How secure is Free ChatPDF?</h2>
        <p>Free ChatPDF takes security seriously. We implement industry-standard security measures to protect your data and ensure secure transactions.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Can I edit PDFs on Free ChatPDF?</h2>
        <p>Yes, you can edit PDFs directly within your browser using Free ChatPDF. Add text, images, annotations, and signatures to your PDF documents without additional software.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How can I contact Free ChatPDF support?</h2>
        <p>You can reach our support team at <a href="mailto:support@freechatpdf.com" className="text-blue-600 hover:underline">support@freechatpdf.com</a> for any questions or assistance you may need.</p>

        <p className="mt-4">If you have any other questions or need further clarification, please feel free to contact us. We're here to help!</p>
      </div>
    </div>
  );
};

export default FAQ;
