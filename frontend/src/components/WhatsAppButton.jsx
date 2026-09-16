import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919039345023';

const WhatsAppButton = () => {
  const message = encodeURIComponent(
    "Hi Optiwise Infrastructure, I'd like to know more about your services."
  );
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Optiwise Infrastructure on WhatsApp"
      className="whatsapp-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="whatsapp-fab__pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.68 4.6 1.86 6.48L4 29l7.68-1.83a11.94 11.94 0 0 0 4.33.82h.01c6.63 0 12.01-5.38 12.01-12.01C28.03 8.38 22.65 3 16.01 3Zm0 21.8h-.01a9.82 9.82 0 0 1-5-1.37l-.36-.21-4.55 1.08 1.09-4.44-.24-.37a9.8 9.8 0 0 1-1.52-5.27C5.42 9.53 10.14 4.8 16.02 4.8c2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.03c0 5.9-4.73 10.65-11 10.65Zm5.62-7.97c-.31-.15-1.82-.9-2.1-1s-.49-.15-.69.16-.79 1-.97 1.2-.36.23-.66.08a8.2 8.2 0 0 1-2.42-1.5 9.13 9.13 0 0 1-1.68-2.1c-.18-.31 0-.47.13-.62.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.21.05-.39-.03-.54-.08-.15-.69-1.67-.95-2.28-.25-.6-.5-.52-.69-.53h-.59a1.14 1.14 0 0 0-.82.38 3.47 3.47 0 0 0-1.08 2.58c0 1.52 1.11 2.99 1.26 3.2s2.18 3.33 5.28 4.67c.74.32 1.31.51 1.76.66.74.23 1.41.2 1.94.12.59-.09 1.82-.74 2.08-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.21-.59-.36Z"
        />
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;
