import { useLayoutEffect, useRef, useState,useEffect} from 'react';
import AnimatedNumber from './animated-numbers-mod'; 
import { OrgChartComponent } from './OrgChart';
import { DATA } from '../assets/data/ftreeData';

// Ancestor Detail displaying information about currently selected Ancesetor

const AncestorCard = (props) => {


    return(
        <div className = "row d-flex justify-content-center">

            <div className  = 'ancestor-detail col-12 col-lg-6'>

                <h1>
                    {props.ancestor.name}            
                </h1>

                <p>{props.ancestor.lifeSpan}</p>

                <p>
                    {props.ancestor.shortDescription}
                </p>

            </div>
        

        </div>
    )
}
// ==========================Ancestor Family Tree Component==============================


const AncestorFamilyTree = (props)=>{

    const [ancestor, setAncestor] = useState(DATA[0]) ;
    // const [ancestor, setAncestor] = useState(props.ancestor) ;  
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [translateAmount, setTranslate] = useState(0);

    const timeLineContainer = useRef(null) ; 
    const centerLine = useRef(null);

    // ===============================================================

    useEffect(() => {

        // update screenWidth state on mount:
        setScreenWidth(window.innerWidth); 
        console.log(props.ancestor.descendants)

    }, []);

    //=================================================================
    // handle resize events 

    useEffect( ()=>{        
        // handle resize needs to be inside the useEfffect or else 
        // it will use "stale" state comparisons between window.innerWidth and screenwidth2

        const handleResize=()=>{
            // handle changes in screen width

            var resizeTimeout;
            clearTimeout(resizeTimeout);

            // Set a new timeout to delay the execution by 100ms
            resizeTimeout = setTimeout(() => {
                // Only execute this block if no resize events have occurred in the last 100ms

                if (window.innerWidth !== screenWidth) {

                    // Only update state when screen width changes
                    setScreenWidth(window.innerWidth);
                }
            }, 100); // 100ms delay
        };

        // add resize event listener, call handleResize whene event triggers; 
        window.addEventListener("resize",handleResize)  
            
        // clean up: remove event listener on unmount
        return ()=>{window.removeEventListener("resize",handleResize)}

        }
    ,[])

    // ===================================================================
    // update translate amount for Animated number line on mount
    
    useLayoutEffect( ()=>{

        // calculation performed before first paint       

        if(timeLineContainer.current!=null && centerLine.current!=null){

            let firstDif = ancestor.year - 1800 ; 

            const newTranslateAmount =  - firstDif *17.6 
                                        + centerLine.current.offsetLeft 
                                        - timeLineContainer.current.offsetLeft;

            setTranslate(newTranslateAmount);

        }

    },[ancestor])

    // useEffect( ()=> {console.log("translate amount has changed" , translateAmount)},[translateAmount])


    // ==================================================================
    // side effect when screen width changes.
    // update translate amount for animated number line when screen width changes

    useEffect( ()=>{

        let firstDif = ancestor.year - 1800 ; 
        // the differneces between the current ancestor's birth year and 1800 (the begining of our number line)

        const newTranslateAmount =  - firstDif *17.6                        // number of years times pixels (pixels/year)
                                    + centerLine.current.offsetLeft         // number of pixels from left of screen
                                    - timeLineContainer.current.offsetLeft; // number of pixels from left of screen
        
        // formula explanation: 
        // 17.6
        // the number line is made of segments called "time-line-connectors".
        // each timeline connector is 176px, this span represents 10 years. 
        // there for one year is 17.6px 

        // centerLine.current.offsetLeft:
        // the distance in the x direction from the left of the screen to the 
        // center where we need the number line to move 

        // timeLineContainer.current.offsetLeft:
        // the distance in the x diection from the left of the screen to the current timeline container  
    
    
        setTranslate(newTranslateAmount)
         
        }
    ,[screenWidth])

    // =============================================================================
    // creating array of years for animated number line

    let events=  [] ;

    for(let years = 1800 ; years < 2030 ; years+=10){

        events.push(years)
    }

    return(

        <div className = 'container ancestor-page'>
            {/* ----------------- Title of Page  ----------------------*/}

            <h1>{props.ancestor.name} Family Tree </h1>
      

            {/*-------------------- d3-org-chart --------------------*/}
          
                <OrgChartComponent 
                    data = {props.ancestor.descendants}
                    setAncestor = {setAncestor}
                    ancestor = {ancestor} 
                />
          
            {/*
            -------------------- ancestor information to be displayed -----------------------
            ---------------------when user clicks on chart node---------------------
            */}

            <div className = 'row d-flex justify-content-center'>                      

                <AncestorCard ancestor = {ancestor} />

            </div>

            {/* 
            --------------------animated numbers for ancestor age and timeline--------------
            ------------------------------------------------------------------------------------ 
            -----------------https://www.npmjs.com/package/react-animated-numbers
            */}

             <div className='animated-numbers'>

                    <AnimatedNumber        
                    transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.15
                    })}
                    animateToNumber={ancestor.year}
                    fontStyle={{
                    fontSize: 40,
                    color: "red",
                    }}
                    />  
                    
            </div>        
                 
            {/* ======================== Animated number time line ======================*/}

            <div ref = {timeLineContainer} className = "timeline-container">

                <div  className = "view-box"

                    style = {{transform:`translateX(${translateAmount}px)`}}
                    
                    >
                        
                {events.map((year,index)=>{
                        return(
                            <div key = {index}>

                            <div>{year}</div>

                            <div key = {year} className = "year-marker"/>
                            {
                                index=== events.length-1
                                ?
                                null
                                :
                                <div className = "timeline-connector"/>
                            }                                        

                            </div>
                        
                        )
                    })
                }   
                            
                </div>
                
            </div>
            {/*============================ Marker for current year of ancestor's birth ====================== */}

            <div className = "d-flex justify-content-center">
                <div ref = {centerLine} className = "center-line"/>
            </div>    
            
        </div>

    );
}
export default AncestorFamilyTree