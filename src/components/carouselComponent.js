import Cover_A_Willow_Tree_Became_a_Forest from "../assets/Cover_A_Willow_Tree_Became_a_Forest.jpg";
import Avengers_Wildcats_and_Crickets from "../assets/Avengers_Wildcats_and_Crickets.png";
import Cover_Iron_Road_and_Steam_Breathing_Dragon_Smaller from '../assets/Cover_Iron_Road_and_Steam_Breathing_Dragon_Smaller.jpg' ; 
import Cover_Three_Coins_2nd_Edition from '../assets/Cover_Three_Coins_2nd_Edition.jpg';
import The_All_Amrerican_Crew_Cover from '../assets/The_All_Amrerican_Crew_Cover.webp';
import Three_Coins_Illustrated_Book_Cover from '../assets/Three_Coins_Illustrated_Book_Cover.png';
import React , { useState, useRef,useEffect } from "react";


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../styles/carouselStyles.scss';
import { Swiper, SwiperSlide , useSwiper} from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { motion, useScroll } from "framer-motion"
import Book from "./bookComponent";
 


const cards = [
  Cover_A_Willow_Tree_Became_a_Forest,
  Avengers_Wildcats_and_Crickets,
  Cover_Iron_Road_and_Steam_Breathing_Dragon_Smaller,
  Cover_Three_Coins_2nd_Edition,
  The_All_Amrerican_Crew_Cover,
  Three_Coins_Illustrated_Book_Cover

]

const SwiperButtonNext = ({ children }) => {
  const swiper = useSwiper();
  return( <button 
    className = 'swiper-right-btn'
    onClick={() => swiper.slideNext()}
    > {children}
    </button>
);
};

const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  const [leftTranslate,setLeftTranslate] = useState(0 ); 
  const [animating,setAnimation] = useState(false);
  const arrow = useState(null);

 
  
  
  const handleClick=()=>{

    // const swiper = useSwiper();
    
    setLeftTranslate(-10);
    setAnimation(true);
    setTimeout(()=>setLeftTranslate(0),300);
    setTimeout(()=>setAnimation(false),300);
    swiper.slidePrev();

 
  }
  const color = animating?'blue':'red'
  const transform = animating?'rotate(0deg) scale(1.4)' :'rotate(0deg) scale(1)';

  const scale = animating? 1.5:1 ;

  return(  
      <>
         <div  className= "arrow" 
              onClick = {handleClick}
               ref = {arrow}
              style = {{
                transform:`rotate(-55deg) translate(${leftTranslate}px , ${leftTranslate}px) scale(${scale})`,
                 
       
              }}
              
          />
          </>
  );
};





const CarouselComponent = () => {
  
  return(

 <div className = "container">
  
  <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
         
        coverflowEffect={{
          rotate: 40,
          stretch: 10,
          depth: 300,
          modifier: 1,
          
          slideShadows: true,
          loop:true
        }}

        keyboard={{ 
          enabled: true,
          onlyInViewport: false,

        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <div className = 'container d-flex justify-content-center'>
         
         
         {/* <SwiperButtonNext> next slide</SwiperButtonNext> */}
         
         </div>
        {
          cards.map((item,index)=>{

           return ( 
           <SwiperSlide 
            key = {index}>
            <img src={item} />
          
            <div
              className="reflection"
              style={{ '--image': `url(${item})` }}
          
            />
            
          </SwiperSlide>)

          })
        }
     

          <SwiperButtonPrev
          /> 
          
      </Swiper>
    
  </div>
  
 
  )};

  export default CarouselComponent

// -----------------------------------------------------------------------
