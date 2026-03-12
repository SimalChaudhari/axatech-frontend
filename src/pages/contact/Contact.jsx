import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ContactHero, ContactSuccess, ContactForm } from '../../components/contact';

export default function Contact() {
  const location = useLocation();
  const state = location.state || {};
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: state.enquiryType || 'contact',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: state.planName ? `Enquiry for: ${state.planName}` : '',
    product: state.product || undefined,
    service: state.service || undefined,
    licensePlan: state.licensePlan || undefined,
    cloudPlan: state.cloudPlan || undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.enquiry(form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <ContactSuccess
        title="Thank you"
        message="Your enquiry has been submitted. We will get back to you soon."
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact - Axatech</title>
        <meta name="description" content="Contact Axatech for Tally licenses, add-ons, cloud hosting and services." />
      </Helmet>

      <ContactHero
        title="Contact Us"
        subtitle="Send an enquiry for licenses, products, or services. We'll respond shortly."
      />

      <ContactForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </>
  );
}
