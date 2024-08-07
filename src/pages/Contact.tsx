import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import contactContent from '../data.json';

const Contact: React.FC = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactContent.contactInfo.email}`;
  };

  const handleMapToggle = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <div className="contact-page-wrapper flex flex-col items-center justify-center pt-8">
      <div className="text-center mt-8 mb-8">
        <h1 className="text-4xl text-liberty font-lora pb-2 mb-4">Contact Us</h1>
        <p className="text-base font-inter text-taupe-gray">
          We would love to hear from you. Here are the ways you can reach us.
        </p>
      </div>

      <div className="contact-info max-w-lg mx-auto p-4 bg-white mb-8">
        <div className="flex items-center mb-4">
          <FaPhone className="text-wild-blue-yonder mr-2" />
          <span className="text-gray-700">{contactContent.contactInfo.phone}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-wild-blue-yonder mr-2" />
          <span className="text-gray-700">{contactContent.contactInfo.email}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-wild-blue-yonder mr-2" />
          <span className="text-gray-700">{contactContent.contactInfo.address}</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleEmailClick}
            className="bg-wild-blue-yonder hover:bg-midnight-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Click to send Email
          </button>
          <button
            onClick={handleMapToggle}
            className="bg-wild-blue-yonder hover:bg-midnight-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isMapVisible ? 'Hide Map' : 'Show location on map'}
          </button>
        </div>
      </div>

      {isMapVisible && (
        <div className="map mb-8 w-full max-w-lg mx-auto">
          <iframe
            src={contactContent.mapEmbedUrl}
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      )}
      <div className='bg-almond w-full mt-8'>
      <div className="faqs max-w-lg mx-auto p-4 bg-baby-powder shadow-md rounded-lg mt-8 mb-8">
        <h2 className="text-2xl text-liberty font-lorafont-bold pt-4 mb-4">Frequently Asked Questions</h2>
        {contactContent.faqs.map((faq, index) => (
          <div className="faq-item mb-4" key={index}>
            <h3 className="text-xl font-lora text-charcoal font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Contact;
