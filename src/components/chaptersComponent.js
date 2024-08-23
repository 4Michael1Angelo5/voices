import { useState, useEffect ,useRef, createRef} from "react";
import hammer from '../assets/hammer.webp';
import greenMountains from '../assets/greenMountains.png';
import railRoadWorkers from '../assets/railRoadWorkers.jpg'
import {useInView , inView } from "framer-motion";
import birds from '../assets/birds.png'
import  clounds_1 from '../assets/clouds_1.png' 


const CHAPTER_IMAGES = [hammer,railRoadWorkers,hammer,railRoadWorkers,hammer,railRoadWorkers]


  
const ChaptersPage = ()=>{

    const [opacity,setOpacity] = useState(0) ;
    const [scrollY, setScrollY] = useState(0);
    const [screenHeight, setScreenHeight] = useState(800);
    
    // create ref shortcut isntead of having to manually write it out for each one
    const chapterRefernces = useRef(CHAPTER_IMAGES.map(() => createRef()));    
    
    // create useInView() hook to have framer motion track whether or not each 
    // element is inside the viewport
    // @TODO figure out how to do below like above to reduce rewrting code 

    const Chap1IsInView = useInView(chapterRefernces.current[0], {once:true,amount:0.5});
    const Chap2IsInView = useInView(chapterRefernces.current[1], {once:true,amount:0.5});
    const Chap3IsInView = useInView(chapterRefernces.current[2], {once:true,amount:0.5});
    const Chap4IsInView = useInView(chapterRefernces.current[3], {once:true,amount:0.5});
    const Chap5IsInView = useInView(chapterRefernces.current[4], {once:true,amount:0.5});
    const Chap6IsInView = useInView(chapterRefernces.current[5], {once:true,amount:0.5});
    
    // create array of boolean values for each element being viewable or not.
    const chaptRefsIsInView = [Chap1IsInView,Chap2IsInView,Chap3IsInView,Chap4IsInView,Chap5IsInView,Chap6IsInView]

    // animations for exiting the page

    // opacity and height of entire page below header

    useEffect( ()=>{
        // set opacity of body on mount 
        setOpacity(1)

        // set height to viewport inner height on mount
        setScreenHeight(window.innerHeight)
        // set opacity of body on unmount (clean up)
        return ()=>setOpacity(0)
       
    }
    ,[])

    useEffect( ()=>{

        if(chapterRefernces.current[0]){

            console.log(chapterRefernces.current[0].style)

        }

    },[])

    const handleScroll =()=>{
        
        // set state variable to current scroll posiiton
        setScrollY(window.scrollY);


    }

    useEffect( ()=>{

        // add event listener on mount
        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }

    },[])

    useEffect( ()=>{        
        // call handle scroll when
        // window scroll posiiton changes
        handleScroll(); 

    }
    ,[scrollY])


   const getTranslation = (scrollPosition,idx) =>{
    //  calculate translate amount in Y direction 
    //  relative to scroll posiiton 

    // return (scrollPosition / (10 + idx)) * Math.sin(scrollY / 400) + idx * 20

    return (scrollPosition)/((10-idx))*(-1)**(idx) 

    // odd index values will create negative translate values 
    // even index values will create positive translate values
    // as index increases the divisor shrinks causing elements to move 
    // more quickly in relation to scroll posiiton. 

   };
   


    return(


        <div className = "chapters-page"            
            style= {{
                opacity:opacity,
                backgroundPosition: `center ${(scrollY*2)}px`, 
                //backgroun image of train tracks move twice the speeed of the user scrolling
                minHeight: screenHeight,
                // transition:"all 2s ease-in-out"

            }}           
            >                 

                <div className = 'container '>
                                   
                    <>  

                    {
                        // title images for each chapter
                        CHAPTER_IMAGES.map((el,idx)=>{

                        return(
                        <>
                        
                        {/* // alternate  between left right pattern on larger devices                                 */}
                        <div className= {idx%2==1? 'section d-flex row flex-row-reverse':'section d-flex row'}  //   creates this pattern:
                            style={{                                                                            //   o x   o = text x =images
                                minHeight:screenHeight  // AVOID PITFALLS OF VH units on mobile                 //   x o
                            }}                                                                                  //   0 x
                            >

                            <div className = "col-12 col-lg-6 d-flex justify-content-center image-for-chapter" >  
                                {/* ====================================images for chapters ====================================== */}
                                                                               
                                <img   
                                // chapter's main image  
                                ref = {chapterRefernces.current[idx]}                                    
                                className = 'chapters-main-image'
                                src = {el} 
                                width = "100%"    
                                style = {{
                                    // chaptRefsIsInView is an array of boolean values for each isInView() of every chapter                                                                       
                                    opacity:chaptRefsIsInView[idx]?1:0,
                                    //  move up 200px and scale from half the image size to full size once half the image is with-in the viewport
                                    transform:chaptRefsIsInView[idx]? ` translateY(0px) scale(1)`:"  translateY(200px) scale(.5)",
                                }}                                  
                                /> 

                                {/*======== background images container to add paralax effect ==============================================*/}

                                <div className= {idx/2==0? "firstRow-container-for-parallax d-flex row":"firstRow-container-for-parallax d-flex row flex-row-reverse"}
                                
                                    style = {{
                                        position:"absolute",
                                        height:"200px",
                                        width:"100%"
                                    }}
                                    >
                                    <div className= {"first-left-col-parralax-container col-6 col-lg-12 d-flex align-items-start justify-content-start"}>
                                        
                                        <img 
                                        // bird images for parallax effect to add texture/ layers 
                                            className = "birds first_layer-parrallax-image"
                                            src={idx/2==0?clounds_1:birds}
                                            width={"40%"}
                                            style = {{
                                                // position:"absolute",
                                                // see getTranslation() function for description
                                                transform: `translateY(${getTranslation(scrollY,idx)}px)`,
                                                zIndex: -1
                                            }} 
                                        />
                                       
                                    </div>
                                    <div className="first-right-col-parralax-container col-6 col-lg-12 d-flex align-items-baseline justify-content-end" >
                                    <img 
                                        // bird images for parallax effect to add texture/ layers 
                                            className = "birds first_layer-parrallax-image"
                                            src={idx/2==0?birds:clounds_1}
                                            width={"40%"}
                                            style = {{
                                                // position:"absolute",
                                                // see getTranslation() function for description
                                                transform: `translateY(${getTranslation(scrollY,-idx)}px)`,
                                                zIndex: -1
                                            }} 
                                        />

                                    </div>
                                </div>

                                {/* ============================================================================================= */}

                            </div>

                            <div className = 'chapter-description-container col-12 col-lg-6 d-flex align-items-center'>
                                <p
                                className = "chapters-description"
                                style={{
                                    
                                    // slide is from left or right depending on whether idx is even or odd
                                    transform:chaptRefsIsInView[idx]? "translateX(0px)": `translateX(${400*(-1)**(idx)}px)`,                                                                                                                
                                    transition: "1s ease-in-out"

                                }}
                                >

                                I'm baby adaptogen ascot waistcoat, cred tacos banh mi art party vape. 
                                Mlkshk vinyl drinking vinegar trust fund, umami cardigan tofu locavore 
                                green juice hexagon humblebrag +1 letterpress mumblecore tilde. Mixtape 
                                jawn selvage bespoke succulents banjo, semiotics tonx chicharrones 
                                vegan deep v godard. Taxidermy skateboard marfa chartreuse. Portland 
                                lomo stumptown yes plz vaporware woke lyft cred tacos flexitarian 
                                street art cray blue bottle shoreditch photo booth. Coloring book wolf
                                kinfolk, austin pabst literally taxidermy church-key copper mug 
                                asymmetrical.
                            
                                </p>


                            </div>

                        </div>

                        {/*=============================  additonal parallax affect images=========================================== */}
                        <div className = 'parallax-row-container row d-flex'
                            style ={{
                                position:"relative",
                                // width:"100vw",
                                height:"200px",
                            }}
                            >
                            <div className = "second-left-col-parralax-container col-6  d-flex justify-content-start align-items-baseline ">
                                <img    
                                    className="secondary-parallax-image"
                                    src = {idx/2==0?clounds_1:birds}
                                    width="20%"
                                    style ={{
                                        objectFit: "cover",
                                        position:"relative",
                                        transform: `translateY(${getTranslation(scrollY,idx)}px)`,
                                        transition: "transfrom .3s ease-in-out"
                                        // zIndex:-1
                                    }}                                      
                                />
                                
                            </div>
                            <div className="second-right-col-parralax-container col-6 d-flex justify-content-end align-items-start">
                                <img    
                                    className="secondary-parallax-image"
                                    src = {idx/2==0?birds:clounds_1}
                                    width="20%"
                                    style ={{
                                        objectFit: "cover",
                                        position:"relative",
                                        transform: `translateY(${getTranslation(scrollY,idx+1)}px)`,
                                        transition: "transfrom .3s ease-in-out"
                                        // zIndex:-1
                                    }}
                                />

                            </div>

                        </div>
                        {/* =========================================================================================================== */}

                        </>
                                
                        );                        
                        })                      
                                                



                    }

                    </>

                </div>

        </div>



    );
}

export default ChaptersPage;