import { useState, useEffect, useRef, createRef } from "react"; 
import { useInView } from "framer-motion";
import birds from '../assets/birds.png'; 
import clouds_9 from '../assets/clouds_9.png';

import React from "react";

 
const ChaptersPage = (props) => {

    const [opacity, setOpacity] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [screenHeight, setScreenHeight] = useState(800); 
   

    const lastExecutionRef = useRef(Date.now);
    const throttleDelay = 100; // Time in milliseconds for throttling


    // ref for handling scrolling animations 
    const requestId = useRef();

    // create array of images for each chapter to create refs 
    const chapters = props.chapters;

    const chapter_images = []
    const chapter_titles =[]

    chapters.forEach((chapter, index) => {
        
        // there are 12 images so far 
        // each chapter can have differnt amount of images
        chapter_images.push(...chapter.content.map((item, idx) => { return item.image }))

        //there are 5 chapters right now
        chapter_titles.push(chapter.title) 
        


    })
    // console.log(chapter_images)

    const chapter_titleReferences = useRef(chapter_titles.map(() => createRef()));

    
 
    // create ref shortcut isntead of having to manually write it out for each one
    const chapter_Refernces = useRef(chapter_images.map(() => createRef()));
    
    // there are 12 images total remember that if you want to add another image you'll have to add it here: 

    // photos for sue lee intro
    const photo1IsInView = useInView(chapter_Refernces.current[0], { once: true, amount: 0.4 });
    const photo2IsInView = useInView(chapter_Refernces.current[1], { once: true, amount: 0.4 });

    // photos for lum ahh chew
    const photo3IsInView = useInView(chapter_Refernces.current[2], { once: true, amount: 0.4 });
    const photo4IsInView = useInView(chapter_Refernces.current[3], { once: true, amount: 0.4 });
    const photo5IsInView = useInView(chapter_Refernces.current[4], { once: true, amount: 0.4 });
    const photo6IsInView = useInView(chapter_Refernces.current[5], { once: true, amount: 0.4 });
    const photo7IsInView = useInView(chapter_Refernces.current[6], { once: true, amount: 0.4 });
    const photo8IsInView = useInView(chapter_Refernces.current[7], { once: true, amount: 0.4 });
    const photo9IsInView = useInView(chapter_Refernces.current[8], { once: true, amount: 0.4 });
    // photos for lim lip hong
    const photo10IsInView = useInView(chapter_Refernces.current[9], { once: true, amount: 0.4 });
    const photo11IsInView = useInView(chapter_Refernces.current[10], { once: true, amount: 0.4 });
    const photo12IsInView = useInView(chapter_Refernces.current[11], { once: true, amount: 0.4 });
    const photo13IsInView = useInView(chapter_Refernces.current[12], { once: true, amount: 0.4 });
    // photos for connie  
    const photo14IsInView = useInView(chapter_Refernces.current[13], { once: true, amount: 0.4 });
    const photo15IsInView = useInView(chapter_Refernces.current[14], { once: true, amount: 0.4 });

    // create array of boolean values for each element being viewable or not.
    const chaptRefs_Is_Iniew =
        [
            photo1IsInView, photo2IsInView,
            photo3IsInView, photo4IsInView,
            photo5IsInView, photo6IsInView,
            photo7IsInView, photo8IsInView,
            photo9IsInView, photo10IsInView,
            photo11IsInView, photo12IsInView,
            photo13IsInView, photo14IsInView,
            photo15IsInView
        ]


    // opacity and height of entire page below header
    useEffect(() => {

        console.log(chapters)

        console.log(chapter_images.length)
        // set opacity of body on mount 
        // setOpacity(1);
        // set height to viewport inner height on mount
        setScreenHeight(window.innerHeight)
        // set opacity of body on unmount (clean up)
        return () => setOpacity(0);

    }, [])


    // scroll handler
    const handleScroll = () => {

        // throttle the execution of handleScroll
        // to the screens refreshrate (ie 60fps)        
        requestId.current = requestAnimationFrame(handleScroll);

        setScrollY(window.scrollY);

    }

 
 
 
    useEffect(() => {

        // add event listener on mount
        window.addEventListener("scroll", handleScroll);
         

        return () => {
            // clean up on unmount
            cancelAnimationFrame(requestId.current);
            window.removeEventListener("scroll", handleScroll);
        }

    }, [])

    // call handle scroll when window scroll posiiton changes
    useEffect(() => {

        handleScroll();
    }
        , [scrollY])

    // respoonsible for parrallax image positions
    const getTranslation = (scrollPosition, idx) => {

        //  calculate translate amount in Y direction 
        //  relative to scroll posiiton 

        
        
        
        return (scrollPosition) / ((4 - Math.cos(idx))) * (-1) ** (idx)
        

        // odd index values will create negative translate values 
        // even index values will create positive translate values
        // as index increases the divisor shrinks causing elements to move 
        // more quickly in relation to scroll posiiton. 

    };

    const calculateTime = (distance) => {

        // speed = distance / time 
        // time * speed = distance 
        // distance/speed = time

        const speed = 5.5;  //adjust as needed

        return (distance / speed);


    }

    const handleClick = (ref, idx) => {

        // responsible for navigating by scrolling user to correct chapter when they click
        // on a link from the table of contents

        const element = ref.current;

        let elementRect = element.getBoundingClientRect();

        // distance of dom object relative to the top of the viewport
        let distnaceToScroll = elementRect.top + scrollY

        let time = calculateTime(distnaceToScroll)


        // if(idx ===  4){
        //     // connie yu (longest distance)
        //     smoothScrollTo(distnaceToScroll,7000)
        // }else if(idx === 3){
        //     // lim lip hong (second longest distance)
        //     smoothScrollTo(distnaceToScroll,590)
        // }else if( idx === 2){
        //     // mock chuck 
        //     smoothScrollTo(distnaceToScroll,600)
        // }else

        smoothScrollTo(distnaceToScroll,time)

    };

    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = scrollY
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        // Optimized easing function to reduce thrashing
        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        
        // this is really easeOutQuad 
        // but got lazy
        // const easeInOutQuad = (distance)=> {

        //     return 1 - Math.pow(1 - distance, 2); 
          
        //   }

        const scrollStep = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
            const easeProgress = easeInOutQuad(progress); // Smooth progress using easing function

            window.scrollTo(0, startPosition + (distance * easeProgress)); // Set scroll position

            if (progress < 1) {
                requestAnimationFrame(scrollStep); // Continue scrolling if not complete
            }
        };

        requestAnimationFrame(scrollStep); // Start animation
    };

    const handleBackToTop =()=>{
        const distnaceToScroll = scrollY

        const time  = calculateTime(distnaceToScroll)
        smoothScrollTo(0,time)
    }


    let chaptIndex = -1; 


    return (

        <>


        <div className="chapters-page"
            style={{
                // opacity: opacity,
                backgroundPosition: `center ${(scrollY * .75)}px`,
                //background image of train tracks move 75% the speeed of the user scrolling
                minHeight: screenHeight,
            }}
        >

            <div className='container '>

             

                <div className="row chapters-table-of-contents">
                    <h1>Table of Contents</h1>

                    <ul>
                        <li onClick={()=>handleClick(chapter_titleReferences.current[0],0)}>
                            <strong>Introduction</strong>
                            <br />
                            Sue Lee

                        </li>

                    </ul>
                    <h2>Chapters</h2>
                    <ol>
                        {/* chapter 1 */}
                        <li>
                            <strong>Discovering My Great-Grandfather Moy Jin Mun</strong>   <br />  Montgomery Hom
                        </li>
                        {/* chapter 2 */}
                        <li>
                            <strong>Chin Lin Sou: Colorado Pioneer</strong>  <br /> Carolyn G. Kuhn
                        </li>
                        {/* chapter 3 */}
                        <li>
                            <strong>Jim King, Foreman of the Central Pacific</strong>  <br /> Gene O. Chan, with Connie Young Yu
                        </li>
                        {/* chapter 4 */}
                        <li onClick={()=>handleClick(chapter_titleReferences.current[2],2)}>
                            <strong>Family History of Lum Ah Chew</strong>  <br /> Paulette Liang
                        </li>
                        {/* chapter 5 */}
                        <li onClick={()=>handleClick(chapter_titleReferences.current[1],1)}>
                            <strong>Mock Chuck: A Golden Treasure</strong>  <br /> Vicki Tong Young
                        </li>
                        {/* chapter 6 */}
                        <li>
                            <strong>The Pioneering Legacy of my Great-Grandfather, Hung Lai Woh</strong> 55 <br /> Russell N. Low
                        </li>
                        {/* chapter 7 */}
                        <li onClick={()=>handleClick(chapter_titleReferences.current[3],3)}>
                            <strong>Lim Lip Hong: An Indomitable Pioneer</strong>  <br /> Andrea Yee
                        </li>
                        {/* chapter 8 */}
                        <li>
                            <strong>Lee Ling & Lee Yik Gim: My Roots as a Railroad Worker Descendant</strong> 71 <br /> Sandra K. Lee
                        </li>
                        {/* chapter 9 */}
                        <li>

                            <strong>Lee Wong Sang, Laying Tracks to Follow</strong>      <br />
                            Connie Young Yu <strong> Afterword</strong>               <br />
                            Connie Young Yu <strong> About the Contributors </strong>
                        </li>
                    </ol>

                    <ul>
                        <li onClick={()=>handleClick(chapter_titleReferences.current[4],4)}>
                            <strong>Afterword</strong>
                            <br />
                            Connie Young Yu

                        </li>

                    </ul>

                </div>

                <>
                    {
                        chapters.map((chapter, i) => {

                            return (
                                <div key={i}>
                                    <h1 ref={chapter_titleReferences.current[i]}
                                        style={{
                                        color:"blanchedAlmond", 
                                        fontSize:"3em",
                                        position:"relative",
                                        zIndex:"100"
                                    }}>
                                        {chapter.title}
                                    </h1>
                                    <h3 style ={{
                                        color:"blanchedalmond",
                                        position:"relative",
                                        zIndex:"100"
                                    }}>
                                        {chapter.author}
                                    </h3>
                                    {
                                        chapter.content.map((content, j) => {
                                            chaptIndex++

                                            return (

                                                <React.Fragment key={chaptIndex}>
                                                    <div
                                                        className={chaptIndex % 2 === 0 ? "row d-flex  firstRow-container-for-parallax" : "row d-flex flex-row-reverse firstRow-container-for-parallax"}>

                                                        <div className='col-6'>
                                                            <div className={"first-left-col-parralax-container col-12  d-flex align-items-start justify-content-start"}>

                                                                <img
                                                                    // bird images for parallax effect to add texture/ layers 
                                                                    className="birds first_layer-parrallax-image"
                                                                    src={j % 2 === 0 ? clouds_9 : birds}
                                                                    alt={"parallax effect background"}
                                                                    width={"40%"}
                                                                    style={{
                                                                        // see getTranslation() function for description
                                                                        transform: `translateY(${getTranslation(scrollY, chaptIndex)}px)`,
                                                                        zIndex: 1
                                                                    }}
                                                                />

                                                            </div>
                                                            <div className="first-right-col-parralax-container col-12  d-flex align-items-baseline justify-content-end" >
                                                                <img
                                                                    // bird images for parallax effect to add texture/ layers 
                                                                    className="birds first_layer-parrallax-image"
                                                                    src={chaptIndex % 2 === 0 ? birds : clouds_9}
                                                                    alt={"parallax effect background"}
                                                                    width={"40%"}
                                                                    style={{
                                                                        // see getTranslation() function for description
                                                                        transform: `translateY(${getTranslation(scrollY, -chaptIndex)}px)`,
                                                                        zIndex: 1
                                                                    }}
                                                                />

                                                            </div>

                                                        </div>
                                                        <div className='col-6'>

                                                        </div>
                                                    </div>

                                                    {/* // alternate  between left right pattern on larger devices                                 */}
                                                    <div
                                                        className={chaptIndex % 2 === 1 ? 'section d-flex row flex-row-reverse' : 'section d-flex row'}  //   creates this pattern:
                                                        // style={{                                                                            //   o x   o = text x =images
                                                        //     minHeight: screenHeight,  // AVOID PITFALLS OF VH units on mobile                 //   x o
                                                         
                                                        // }}                                                                                  //   0 x
                                                    >

                                                        <div className="mt-2 col-12 col-lg-6 d-flex image-for-chapter"
                                                            style={{flexDirection:"column"}} >
                                                            {/* ====================================images for chapters ====================================== */}

                                                            <img
                                                                // chapter's main image  
                                                                ref={chapter_Refernces.current[chaptIndex]}
                                                                className='chapters-main-image'
                                                                src={content.image}
                                                                alt={"chatper " + chaptIndex + " image"}
                                                                // loading="lazy"
                                                                width="100%"
                                                                style={{
                                                                    // chaptRefsIsInView is an array of boolean values for each isInView() of every chapter                                                                       
                                                                    opacity: chaptRefs_Is_Iniew[chaptIndex] ? 1 : 0,
                                                                    //  move up 200px and scale from half the image size to full size once half the image is with-in the viewport
                                                                    transform: chaptRefs_Is_Iniew[chaptIndex] ? ` translateY(0px) scale(1)` : "  translateY(200px) scale(.5)",
                                                                }}
                                                            />
                                                            <div className ="row">
                                                                <div className = "col-lg-6 col-12 d-flex">
                                                                {
                                                                content.photoCredit
                                                                ? 
                                                                <div 
                                                                    style={{
                                                                        color:"#b6b2ab"
                                                                    }}
                                                                    className = "history-page-photo-title">
                                                                        Photo Credit: { content.photoCredit}
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                    
                                                            </div>
                                                            <div className ="col-lg-6 col-12">
                                                            {
                                                                content.photoTitle
                                                                ? 
                                                                <div 
                                                                    style={{
                                                                        color:"blanchedalmond",
                                                                        textAlign:"right"
                                                                    }}
                                                                    className = "history-page-photo-title">
                                                                        {content.photoTitle}
                                                                </div>
                                                                :
                                                                null
                                                            }
                                         
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <div className='chapter-description-container mt-2 col-12 col-lg-6'
                                                            style={{

                                                                // slide is from left or right depending on whether idx is even or odd
                                                                transform: chaptRefs_Is_Iniew[chaptIndex] ? "translateX(0px)" : `translateX(${400 * (-1) ** (chaptIndex)}px)`,
                                                                transition: "1s ease-in-out"

                                                            }}>
                                                                {
                                                                    content.subheading
                                                                    ?
                                                                    <h3>{content.subheading}</h3>
                                                                    :
                                                                    null
                                                                }

                                                            {content.description.map((paragraph, k) => {

                                                                return (
                                                                    
                                                                    <p
                                                                        key={k}
                                                                        className="chapters-description"
                                                                        >

                                                                        {paragraph}



                                                                    </p>
                                                                )
                                                            })

                                                            }



                                                        </div>

                                                    </div>

                                                    {/*=============================  additonal parallax affect images=========================================== */}
                                                    <div
                                                        className='parallax-row-container row d-flex'
                                                        style={{
                                                            position: "relative",
                                                        }}
                                                    >
                                                        <div className="second-left-col-parralax-container col-6  d-flex justify-content-start align-items-baseline ">
                                                            <img
                                                                className="secondary-parallax-image"
                                                                src={j % 2 === 0 ? clouds_9 : birds} //alternate between pictures of clouds and birds
                                                                alt={"parallax effect background"}
                                                                width="20%"
                                                                style={{
                                                                    objectFit: "cover",
                                                                    position: "relative",
                                                                    transform: `translateY(${getTranslation(scrollY, j)}px)`,
                                                                }}
                                                            />

                                                        </div>
                                                        <div className="second-right-col-parralax-container col-6 d-flex justify-content-end align-items-start">
                                                            <img
                                                                className="secondary-parallax-image"
                                                                src={j % 2 === 0 ? birds : clouds_9} //alternate between pictures of clouds and birds
                                                                alt={"parallax effect background"}
                                                                width="20%"
                                                                style={{
                                                                    objectFit: "cover",
                                                                    position: "relative",
                                                                    transform: `translateY(${getTranslation(scrollY, j + 1)}px)`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                    
                                                    {/* =========================================================================================================== */}

                                                </React.Fragment>


                                            )
                                        
                                        })
                                    }
                                    <div className="buffer"/>
                                </div>
                            )

                        })
                    }
                </>


                
            </div>
            
            

        </div>

        <button 
            className="icon-set"
            style={{
                opacity: scrollY<1500?"0":"1",
                zIndex: scrollY<1500? -10:1000,
                transition:"opacity 1s ease-out",
                position:"fixed",
                bottom:"10px",
                right:"10px"
            }}
            onClick={()=>handleBackToTop()}
            >
            <div className="arrow-up"/>
        </button>

        </>

    );
}

export default ChaptersPage;