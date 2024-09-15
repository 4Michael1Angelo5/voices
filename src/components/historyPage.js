import { useState, useEffect ,useRef, createRef} from "react";
import {useInView} from "framer-motion";
import clouds_7 from '../assets/clouds_7.png'; 
import birds_1 from '../assets/birds_1.png'; 

// history page for website 

const HistoryPage =(props)=>{

    const [opacity,setOpacity] = useState(0);
    const [scrollY, setScrollY] = useState(0)
    const [screenHeight, setScreenHeight] = useState(800); 

    // set events to props.events so that I don't have to write props.events everytime
    const events = props.events;    
    
    // create array of images for each historical event
    const events_images =  events.map( (e)=> e.image); 
    
    // create array of references for each image
    const events_images_references = useRef(events_images.map(() => createRef())); 
   
    // =============================================================================
    //  I can't figure out a better way to do this so here it goes: 
    // you will have to create a new varibale each time you want to add a new historical event

    // gota do this step everytime i want to add an event !!!!!!!!!!!!!!!!!!!!!!

    const event1isInView = useInView(events_images_references.current[0], {once:true,amount:0.5});
    const event2isInView = useInView(events_images_references.current[1], {once:true,amount:0.5});
    const event3isInView = useInView(events_images_references.current[2], {once:true,amount:0.5});
    const event4isInView  = useInView(events_images_references.current[3], {once:true,amount:0.5});
    const event5isInView = useInView(events_images_references.current[4], {once:true,amount:0.5});
    
     
    // create array of boolean values for each element being viewable or not
    const eventRefsIsInView = [event1isInView,event2isInView,event3isInView,event4isInView,event5isInView];
 
    // scroll handler
    const handleScroll=()=>{

        setScrollY(window.scrollY);
    }
    
    // set opacity and screen height on mount 
    useEffect(()=>{      
        
        // set opacity to 1 on mount
        setOpacity(1);

        // set Screen height on mount
        setScreenHeight(window.innerHeight);     

        // set opacity to 0 on unmount
        return ()=>setOpacity(0);

    },[])
    
    // add scroll event listeners and link to handleScroll 
    useEffect(()=>{

        window.addEventListener("scroll",handleScroll);
        
        // remove event listeners on unmount
        return ()=>window.removeEventListener("scroll",handleScroll)

    },[])
    
    // call handleScroll when user scroll posiiton changes
    useEffect(()=>{
        
        handleScroll()

    },[scrollY])
    
    // handles parallax animations based on user scroll posiiton
    const getTranslation = (scrollPosition,idx) =>{
        //  calculate translate amount in Y direction 
        //  relative to scroll posiiton 
    
        return (scrollPosition)/((5-idx))*(-1)**(idx) 
    
        // odd index values will create negative translate values 
        // even index values will create positive translate values
        // as index increases the divisor shrinks causing elements to move 
        // more quickly in relation to scroll posiiton. 
    
       };


    return(

        <div className = "history-page"
            style = {{
                opacity:opacity,
                backgroundPosition: `center ${1.5*scrollY}px`,
                minHeight:screenHeight
            }}
            >

            <div className="container">

              
            <>  

{
    // title images for each chapter
    events.map((el,idx)=>{

    return(
    <>

        {/*====================================================paralax=================================================================  */}

        <div className= {idx%2===0? "row d-flex  firstRow-container-for-parallax" : "row d-flex flex-row-reverse firstRow-container-for-parallax"}>

            <div className = 'col-6'>
            <div className= {"first-left-col-parralax-container col-12  d-flex align-items-start justify-content-start"}>
                     
                    <img 
                    // bird images for parallax effect to add texture/ layers 
                        className = "birds first_layer-parrallax-image"
                        src={idx%2===0?clouds_7:birds_1}
                        width={"40%"}
                        alt = "parralax effect backgound"
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
                        src={idx%2===0?birds_1:clouds_7}
                        alt ="parralax effect backgound"
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

        {/* ===================================end parallax================================================== */}
    
    {/* Begin historical event image and decription section: alternate  between left right pattern on larger devices  
                                   */}
    <div className= {idx%2===1? 'section d-flex row flex-row-reverse':'section d-flex row'}  //   creates this pattern:
        style={{                                                                            //   o x   o = text x =images
            minHeight:screenHeight  // AVOID PITFALLS OF VH units on mobile                 //   x o
        }}                                                                                  //   0 x
        >

        <div className = "mt-2 col-12 col-lg-6 d-flex justify-content-center image-for-chapter" >  
            {/* ====================================images for chapters ====================================== */}
                                                           
            <img   
            // chapter's main image  
            ref = {events_images_references.current[idx]}                                    
            className = 'chapters-main-image'
            src = {el.image} 
            alt = {"historical event number " + idx}
            width = "100%"    
            style = {{
                // chaptRefsIsInView is an array of boolean values for each isInView() of every chapter                                                                       
                opacity:eventRefsIsInView[idx]?1:0,
                //  move up 200px and scale from half the image size to full size once half the image is with-in the viewport
                transform:eventRefsIsInView[idx]? ` translateY(0px) scale(1)`:"  translateY(200px) scale(.5)",
            }}                                  
            /> 
        </div>

        <div className = 'chapter-description-container mt-2 col-12 col-lg-6'>
            
            <div
            className = "events-description"
            style={{
                
                // slide is from left or right depending on whether idx is even or odd
                transform:eventRefsIsInView[idx]? "translateX(0px)": `translateX(${400*(-1)**(idx)}px)`,                                                                                                                
                transition: "1s ease-in-out"

            }}
            >
                {<h2>{el.title}</h2>}
                <p>
                {el.description}
                </p>
        
            </div>


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
                src = {idx%2==0?clouds_7:birds_1}
                width="20%"
                alt = "secondary parallax background"
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
                src = {idx%2==0?birds_1:clouds_7}
                alt = "secondary parallax background"
                width="20%"
                style ={{
                    objectFit: "cover",
                    position:"relative",
                    transform: `translateY(${getTranslation(scrollY,idx)}px)`,
                }}
            />

        </div>

    </div>
    <div className = "buffer"/>
    {/* buffer for more space inbetween chapters */}
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

export default HistoryPage