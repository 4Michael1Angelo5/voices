
import { useLayoutEffect, useRef, useState,useEffect } from 'react';
import AnimatedNumbers from "react-animated-numbers";
import { DATA } from './ftreeData';
import { OrgChartComponent } from './OrgChart';


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
        

const AncestorFamilyTree = (props)=>{

   
    const [ orientation , setOrientation] = useState("portrait") ; 
    const [ancestor, setAncestor] = useState(props.ancestor) ; 
    const [num, setNum] = useState(ancestor.year);
    const [translateAmount,setTranslate] = useState(0) ; 
    const [firstDraw,setFirstDraw] = useState(true) ; 
    const [screenWidth, setScreenWidth] = useState(100);
    const timeLineContainer = useRef(null) ; 
    const centerLine = useRef(null);
    const [timeWarp,setTimeWarp] = useState(false) ; 
    

 
    useLayoutEffect(() => {
        // set Translate amount for animated number slider

        let dif = ancestor.year - num ; 


        if (firstDraw){

            let firstDif = ancestor.year - 1800 ; 

            setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
            setFirstDraw(false)

        }else{

            setTranslate(translateAmount - dif*17.6  )
            setFirstDraw(true)
           
        }

    }, [ancestor]); 

    useEffect( ()=>{

        // set number/year for animated numbers

       let dif = ancestor.year - num ; 

       setNum(dif + num)
        
    },[ancestor])

    // set inner Width of window
    useEffect( ()=>{

        setScreenWidth(window.innerWidth)

    }
    ,[])


    function handleOrientation() {

        // reposition the slider on window resize
        // reset the number/ year for animated number
       
        let firstDif = ancestor.year - 1800 ; 
        

        if(window.innerWidth != screenWidth){
            
            console.log("screen width changed")
            setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
            setScreenWidth(window.innerWidth)           
      
        }
        
        if (window.innerHeight<window.innerWidth){
            setOrientation("landscape")
        }else setOrientation("portrait")
       
         
    }

     
    function resizedw(){

        // Haven't resized in 100ms!
    
        if(window.innerWidth!= screenWidth){
            // only re-animate numbers if device width changes
            setFirstDraw(!firstDraw)
            setScreenWidth(window.innerWidth)
        }
    }   

    useLayoutEffect(()=>{
        
        // Add event listener
        window.addEventListener("resize", handleOrientation);
        // Call handler right away so state gets updated with initial window size
        handleOrientation();
        var doit;
        window.onresize = function(){
          clearTimeout(doit);
          doit = setTimeout(resizedw, 100);
        };


        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleOrientation);

    },[firstDraw,ancestor])

  



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
                    
                    data = {DATA}
                    // orientation = {orientation}
                    setTimeWarp = {setTimeWarp}
                    setAncestor = {setAncestor}
                    ancestor = {ancestor}


                />
          

            {/*
            -------------------- ancestor information to be displayed -----------------------
            ---------------------to be displayed when user click chart node---------------------
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
                {
                    
                    firstDraw 
                    ?
                    <AnimatedNumbers
                    // ancestor = {ancestor}
                    // className=""    
                    key = {123}               
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
                     
                    :
                    <AnimatedNumbers
                    // ancestor = {ancestor}
                    // className=""          
                    key = {124}       
                    transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.15 
                    })}
                    animateToNumber={num}
                    fontStyle={{
                    fontSize: 40,
                    color: "red",                    
                    }}                    
                    />
                    

                }
                
                
            </div>

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

        <div className = "d-flex justify-content-center">

           

            <div ref = {centerLine} className = "center-line"/>
            </div>
            <div className = {timeWarp? "loader" : "d-none"}
            
            /> 

            
        </div>

    );
}
export default AncestorFamilyTree