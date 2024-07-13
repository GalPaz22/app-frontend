'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., sending the data to an API or email service
    console.log('Form submitted:', form);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us using the information below.</p>
      <h2>Email: <a href="mailto:codeit2210@gmail.com">codeit2210@gmail.com</a></h2>
      <h2>Contact Form:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label><br />
          <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Message:</label><br />
          <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
