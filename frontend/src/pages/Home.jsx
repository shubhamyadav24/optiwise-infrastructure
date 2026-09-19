import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import WhyUs from '../components/WhyUs';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import TrustedClients from "../components/TrustedClients";
const Home = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <WhyUs />
      <TrustedClients />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default Home;
