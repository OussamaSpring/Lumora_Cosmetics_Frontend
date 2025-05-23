// OtherComponent.js
import React from 'react';
import Definition, { DefinitionComponent } from './Definition';
import image1 from './photo/definition.png';
import image2 from './photo/definition2.png';
const div_motion = () => {
  // You can use the constant object
//   console.log(Definition);
  
//   // Example using the Definition component with default props
//   const myDefinition = {
//     ...Definition.defaultProps,
//     title: "Custom Title",
//     image: "/path/to/image.jpg"
//   };
  
  return (
    <div>
     
      
     <Definition
           image={image1}
           subtitle="Lumora"
           title="Grow Your Beauty Business"
           description="Join Algeria’s premier cosmetics marketplace and expand your reach. With secure payments, effortless order management, and a trusted platform, Lumora helps you connect with more customers and boost your sales. Sign up today and take your beauty brand to the next level!"
           tags={["Lamura", "All_in_one", "marketplace", "management"]}
      />

     <Definition
       image={image2}
       subtitle="Lumora"
         title="All in One"
       description="Shop from trusted cosmetic brands in Algeria, enjoy secure payments, easy order tracking, and real customer reviews. Find everything you need for your beauty routine—all in one place!"
        tags={["Lamura", "trusted", "Algeria"]}
       reverse
    />
    </div>
  );
};

export default div_motion;