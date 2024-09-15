import { useState, useEffect ,useRef, createRef} from "react"; 
import railRoadWorkers from '../assets/railRoadWorkers.jpg'
import {useInView} from "framer-motion";
import birds from '../assets/birds.png';
import hammer from '../assets/hammer.png';
import clouds_9 from '../assets/clouds_9.png'; 

const CHAPTER_IMAGES = [hammer,railRoadWorkers,hammer,railRoadWorkers,hammer,railRoadWorkers];

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
    const chaptRefsIsInView = [Chap1IsInView,Chap2IsInView,Chap3IsInView,Chap4IsInView,Chap5IsInView,Chap6IsInView];

    // opacity and height of entire page below header

    useEffect( ()=>{

        // set opacity of body on mount 
        setOpacity(1);
        // set height to viewport inner height on mount
        setScreenHeight(window.innerHeight)
        // set opacity of body on unmount (clean up)
        return ()=>setOpacity(0);
       
    }
    ,[])


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

    return (scrollPosition)/((10-idx))*(-1)**(idx) 

    // odd index values will create negative translate values 
    // even index values will create positive translate values
    // as index increases the divisor shrinks causing elements to move 
    // more quickly in relation to scroll posiiton. 

   };

   const handleClick = (e, ref,idx) => {
    e.preventDefault();

    if (ref && ref.current) {
        // make sure ref is available
        
        const element = ref.current;
        const scrollY = element.getBoundingClientRect().top + window.scrollY;
        console.log(scrollY); // Log the exact scroll position
        
        console.log(chaptRefsIsInView[5])

        if(chaptRefsIsInView[idx]){

            element.scrollIntoView({
               
                 behavior: 'smooth', // Enables smooth scrolling
                 block: 'start'
            });
            

        }else{
            // if the element is not inview we need to adjust

            window.scrollTo({

                // adjustment needed because of animations performed to the 
                // element once it's in view

                top: scrollY-300, // Scroll to the element
                behavior: "smooth", // Add smooth scrolling effect

            })
        }

   
    }
};

   


    return(


        <div className = "chapters-page"            
            style= {{
                opacity:opacity,
                backgroundPosition: `center ${(scrollY*2)}px`, 
                //background image of train tracks move twice the speeed of the user scrolling
                minHeight: screenHeight, 
            }}           
            >                
                <div className = 'container '>  

                    <div className ="row chapters-table-of-contents">                    <h1>Contents</h1>
    
                    <p><strong>Acknowledgments</strong> 9</p>
                    <p><strong>Introduction</strong> 11</p>
                    <p>Sue Lee</p>

                    <ol>
                        {/* chapter 1 */}
                        <li>
                            <strong>Discovering My Great-Grandfather Moy Jin Mun</strong> 17  <br/>  Montgomery Hom
                        </li>
                        {/* chapter 2 */}
                        <li>
                            <strong>Chin Lin Sou: Colorado Pioneer</strong> 27 <br/> Carolyn G. Kuhn
                        </li>
                        {/* chapter 3 */}
                        <li>
                            <strong>Jim King, Foreman of the Central Pacific</strong> 33 <br/> Gene O. Chan, with Connie Young Yu
                        </li>
                        {/* chapter 4 */}
                        <li>
                            <strong>Family History of Lum Ah Chew</strong> 39 <br/> Paulette Liang
                        </li>
                        {/* chapter 5 */}
                        <li>
                            <strong>Mock Chuck: A Golden Treasure</strong> 47 <br/> Vicki Tong Young
                        </li>
                        {/* chapter 6 */}
                        <li>
                            <strong>The Pioneering Legacy of my Great-Grandfather, Hung Lai Woh</strong> 55 <br/> Russell N. Low
                        </li>
                        {/* chapter 7 */}
                        <li onClick={(e)=>handleClick(e,chapterRefernces.current[3],3)}>
                            <strong>Lim Lip Hong: An Indomitable Pioneer</strong> 63 <br/> Andrea Yee
                        </li>
                        {/* chapter 8 */}
                        <li onClick={(e)=>handleClick(e,chapterRefernces.current[4],4)}>
                            <strong>Lee Ling & Lee Yik Gim: My Roots as a Railroad Worker Descendant</strong> 71 <br/> Sandra K. Lee
                        </li>
                        {/* chapter 9 */}
                        <li onClick={(e)=>handleClick(e,chapterRefernces.current[5],5)}>
                             
                            <strong>Lee Wong Sang, Laying Tracks to Follow</strong>    77  <br/> 
                            Connie Young Yu <strong> Afterword</strong> 91              <br/>
                            Connie Youn Yu <strong> About the Contributors </strong> 94
                        </li>
                    </ol>
                     
                    </div>

                                   
                    <>  

                    {
                        // title images for each chapter
                        CHAPTER_IMAGES.map((el,idx)=>{

                        return(
                        <>
                            <div className= {idx%2===0? "row d-flex  firstRow-container-for-parallax" : "row d-flex flex-row-reverse firstRow-container-for-parallax"}>

                                <div className = 'col-6'>
                                <div className= {"first-left-col-parralax-container col-12  d-flex align-items-start justify-content-start"}>
                                         
                                        <img 
                                        // bird images for parallax effect to add texture/ layers 
                                            className = "birds first_layer-parrallax-image"
                                            src={idx%2===0?clouds_9:birds}
                                            alt = {"parallax effect background"}
                                            width={"40%"}
                                            style = {{
                                                // see getTranslation() function for description
                                                transform: `translateY(${getTranslation(scrollY,idx)}px)`,
                                                zIndex: 1
                                            }} 
                                        />
                                       
                                    </div>
                                    <div className="first-right-col-parralax-container col-12  d-flex align-items-baseline justify-content-end" >
                                    <img 
                                        // bird images for parallax effect to add texture/ layers 
                                            className = "birds first_layer-parrallax-image"
                                            src={idx%2===0?birds:clouds_9}
                                            alt = {"parallax effect background"}
                                            width={"40%"}
                                            style = {{
                                                // see getTranslation() function for description
                                                transform: `translateY(${getTranslation(scrollY,-idx)}px)`,
                                                zIndex: 1
                                            }} 
                                        />

                                    </div>

                                </div>
                                <div className = 'col-6'>
                                    
                                </div>  
                            </div>
                        
                        {/* // alternate  between left right pattern on larger devices                                 */}
                        <div className= {idx%2===1? 'section d-flex row flex-row-reverse':'section d-flex row'}  //   creates this pattern:
                            style={{                                                                            //   o x   o = text x =images
                                minHeight:screenHeight  // AVOID PITFALLS OF VH units on mobile                 //   x o
                            }}                                                                                  //   0 x
                            >

                            <div className = "mt-2 col-12 col-lg-6 d-flex justify-content-center image-for-chapter" >  
                                {/* ====================================images for chapters ====================================== */}
                                                                               
                                <img   
                                // chapter's main image  
                                ref = {chapterRefernces.current[idx]}                                    
                                className = 'chapters-main-image'
                                src = {el} 
                                alt = {"chatper " + idx+ " image"}
                                width = "100%"    
                                style = {{
                                    // chaptRefsIsInView is an array of boolean values for each isInView() of every chapter                                                                       
                                    opacity:chaptRefsIsInView[idx]?1:0,
                                    //  move up 200px and scale from half the image size to full size once half the image is with-in the viewport
                                    transform:chaptRefsIsInView[idx]? ` translateY(0px) scale(1)`:"  translateY(200px) scale(.5)",
                                }}                                  
                                /> 
                            </div>

                            <div className = 'chapter-description-container mt-2 col-12 col-lg-6'>
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
                                // height:"200px",
                                
                            }}
                            >
                            <div className = "second-left-col-parralax-container col-6  d-flex justify-content-start align-items-baseline ">
                                <img    
                                    className="secondary-parallax-image"
                                    src = {idx%2===0?clouds_9:birds} //alternate between pictures of clouds and birds
                                    alt = {"parallax effect background"}
                                    width="20%"
                                    style ={{
                                        objectFit: "cover",
                                        position:"relative",
                                        transform: `translateY(${getTranslation(scrollY,idx)}px)`,
                                    }}                                      
                                />
                                
                            </div>
                            <div className="second-right-col-parralax-container col-6 d-flex justify-content-end align-items-start">
                                <img    
                                    className="secondary-parallax-image"
                                    src = {idx%2===0?birds:clouds_9} //alternate between pictures of clouds and birds
                                    alt = {"parallax effect background"}
                                    width="20%"
                                    style ={{
                                        objectFit: "cover",
                                        position:"relative",
                                        transform: `translateY(${getTranslation(scrollY,idx+1)}px)`,
                                    }}
                                />

                            </div>

                        </div>
                        <div className = "buffer"/>
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