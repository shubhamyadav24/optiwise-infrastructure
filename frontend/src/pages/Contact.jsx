import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

const Contact = () => {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about your plot"
        lede="Reach us by phone, WhatsApp, or the form below — we usually respond within a day."
      />
      <ContactSection />
    </>
  );
};

export default Contact;
