import React , { useState,useRef} from "react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../styles/carouselStyles.scss';

import { Swiper, SwiperSlide , useSwiper} from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// books
import HakoneEstateAndGardens from "../assets/authors/HakoneEstateAndGardens.jpg"
import patchWorkHistroy from "../assets/authors/patchWorkHistroy.jpeg"
import ProfilesInExcellence from "../assets/authors/ProfilesInExcellence.jpg"
import MakingWaves from "../assets/authors/MakingWaves.jpg"
import voices from "../assets/book_scans/optimized/voices.webp"
import chinatownsanjose from "../assets/authors/chinatownsanjose.jpg"
import chineseInNappaValley from "../assets/authors/chineseInNappaValley.jpg"

const cards = [
  HakoneEstateAndGardens,
  voices, 
  ProfilesInExcellence,
  MakingWaves,
  patchWorkHistroy,
  chinatownsanjose,
  chineseInNappaValley  

]


const SwiperButtonPrev =()=>{
  const swiper = useSwiper();
  const [rightTranslate,setRightTranslate] = useState(0);
  const [animating,setAnimation] = useState(false);
  const arrowRight = useRef(null);

  const handleClick =()=>{
    setRightTranslate(-10);
    setAnimation(true);
    setTimeout(()=>setRightTranslate(0),300);
    setTimeout(()=>setAnimation(false),300);
    swiper.slidePrev();
  }

  const scale = animating? 1.5:1 ;
  return(
    <>
      <div  className= "arrowRight" 
          onClick = {handleClick}
            ref = {arrowRight}
          style = {{
            transform:`rotate(125deg) translate(${12}px , ${12+rightTranslate}px) scale(${scale})`,
            }}
          
        />
    </>
  )

}

const SwiperButtonNext = () => {
  const swiper = useSwiper()
  const [leftTranslate,setLeftTranslate] = useState(0 ); 
  const [animating,setAnimation] = useState(false);
  const arrow = useRef(null);  
  
  const handleClick=()=>{
    
    setLeftTranslate(-10);
    setAnimation(true);
    setTimeout(()=>setLeftTranslate(0),300);
    setTimeout(()=>setAnimation(false),300);
    swiper.slideNext();
 
  }

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

 <div className = "container carousel-container">
  
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
      
        {
          cards.map((item,index)=>{

           return ( 
           <SwiperSlide 
            key = {index}>
            <img 
              src={item} 
              alt={"book_by_connnie_yu_"+item}
            />
          
            <div
              className="reflection"
              style={{ '--image': `url(${item})` }}          
            />
            
          </SwiperSlide>)

          })
        }
     

          <SwiperButtonPrev/> 
          <SwiperButtonNext/>
          
      </Swiper>
    
  </div>
  
 
  )};

  export default CarouselComponent

// -----------------------------------------------------------------------
