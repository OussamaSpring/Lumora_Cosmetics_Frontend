// Definition.js
import React from 'react';
import './definition.css';

const Definition = ({ image, title, subtitle, description, tags, reverse = false }) => {
  return (
    <div className={`definition-component ${reverse ? 'reverse' : ''}`}>
      <div className="definition-content">
        <h2>
          <span className="definition-subtitle">{subtitle}</span>
          {title}
        </h2>
        <p className="definition-description">{description}</p>
        
        <div className="definition-tags">
          {tags.map((tag, index) => (
            <a key={index} href="#" className="definition-tag">{tag}</a>
          ))}
        </div>

        <div className="definition-buttons">
          <a href="#" className="definition-button primary">Join now</a>
          <a href="#" className="definition-button secondary">
            Explore More <i className='bx bx-right-arrow-alt'></i>
          </a>
        </div>
      </div>

      <div className="definition-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default Definition;