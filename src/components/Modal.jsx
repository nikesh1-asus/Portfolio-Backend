import React from "react";

const Modal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>✖</span>
        <h2>{service.title}</h2>
        <ul>
          {service.items.map((item, index) => (
            <li key={index}>✔ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;