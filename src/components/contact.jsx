import React from "react";
import contactData from "../data/contect.json";
import "../../public/style/contact.css";
import { FiMail, FiMapPin, FiCoffee } from "react-icons/fi";

const iconMap = {
  email: <FiMail className="contact-item-icon" />,
  location: <FiMapPin className="contact-item-icon" />,
  coffee: <FiCoffee className="contact-item-icon" />,
};

export default function Contact() {
  return (
    <section className="contact-section-root" id="contact">
      <h2 className="contact-title">Contact</h2>
      <div className="contact-subtitle">Get in touch with me</div>
      <div className="contact-list">
        {contactData.contact.map((item, idx) => (
          <div className="contact-item" key={idx}>
            <div className="contact-item-icon-col">
              {iconMap[item.icon]}
            </div>
            <div className="contact-item-content">
              <div className="contact-item-label">{item.label}</div>
              {item.link ? (
                <a
                  href={item.link}
                  className="contact-item-value"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </a>
              ) : (
                <div className="contact-item-value">{item.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
