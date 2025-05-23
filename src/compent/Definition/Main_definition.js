import React,{useRef,useEffect} from 'react'
import Definition from './Definition'
import image1 from './photo/definition.png'
import image2 from './photo/definition2.png'
import { motion, useInView, useAnimation } from 'framer-motion'


export default function Main_definition() {
  const ref=useRef(null);
  const inview=useInView(ref,{once:true});

  const controll=useAnimation();


  useEffect(()=>{
   if(inview){

    controll.start("visible");

   }
    


  },[inview])
  return (

    <div ref={ref}>
       <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={controll}
      transition={{ duration: 0.5, delay: 0.54 }}
    >
      <Definition
        image={image1}
        subtitle="Lumora"
        title="Grow Your Beauty Business"
        description="Join Algeria's premier cosmetics marketplace and expand your reach. With secure payments, effortless order management, and a trusted platform, Lumora helps you connect with more customers and boost your sales. Sign up today and take your beauty brand to the next level!"
        tags={["Lumora", "All_in_one", "marketplace", "management"]}
      />

      
    </motion.div>

    <motion.div
     variants={{
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 }
    }}
    initial="hidden"
    animate={controll}
    transition={{ duration: 0.5, delay: 0.5 }}
    >


        <Definition
        image={image2}
        subtitle="Lumora"
        title="All in One"
        description="Shop from trusted cosmetic brands in Algeria, enjoy secure payments, easy order tracking, and real customer reviews. Find everything you need for your beauty routine—all in one place!"
        tags={["Lumora", "trusted", "Algeria"]}
        reverse
        />
      
    </motion.div>

    </div>
   
  )
}