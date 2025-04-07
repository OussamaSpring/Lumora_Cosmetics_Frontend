import React from 'react'
import './man.css'
import man from './photo/man2.png'
import womne from './photo/women2.png'
import baby from './photo/bayb2.png'
import line from './photo/Line 1.png'
function Man_women() {
  return (
    
    <section className="man_women_baby">
    <div className="container">
      {/* Title with lines */}
      <div className="title">
        <img className="ligne" src={line} alt="decorative line" />
        <h3>Shop by Genre</h3>
        <img className="ligne" src={line} alt="decorative line" />
      </div>

      {/* Image grid */}
      <div className="photo">
        {/* Men's category */}
        <div className="men cat">
          <img 
            src={man} 
            alt="Men's collection" 
            className="men__img"
          />
        </div>

        {/* Women's category */}
        <div className="women cat">
          <img 
            src={womne}
            alt="Women's collection" 
            className="women__img"
          />
        </div>

        {/* Baby category */}
        <div className="baby cat">
          <img 
            src={baby} 
            alt="Baby collection" 
            className="baby__img"
          />
        </div>
      </div>
    </div>
  </section>
      
  );
}

export default Man_women;
