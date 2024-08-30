
import { useLayoutEffect, useRef, useState,useEffect , useCallback} from 'react';
// import AnimatedNumbers from "react-animated-numbers";
import Enhanced from './animated-numbers-mod';
import { DATA } from '../assets/data/ftreeData';
import { OrgChartComponent } from './OrgChart';
import { useLocation } from 'react-router-dom';
import AnimatedNumber from './animated-numbers-mod';



// Ancestor Detail displaying information about currently selected Ancesetor

const AncestorCard = (props) => {


    return(
        <div className = "row d-flex justify-content-center">

<div className = "backdrop">
            
            </div>

        
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

const NumberLine = ()=>{
   return(
    <h1 className = "text-center">
    Hello World
</h1>
   )

}
        

const AncestorFamilyTree = (props)=>{

   
    const [ orientation , setOrientation] = useState("portrait") ; 
    const [ancestor, setAncestor] = useState(DATA[0]) ; 
    const [num, setNum] = useState(ancestor.year);
    const [translateAmount,setTranslate] = useState(0) ; 
    const [firstDraw,setFirstDraw] = useState(true) ; 
    const [screenWidth, setScreenWidth] = useState(100);
    const timeLineContainer = useRef(null) ; 
    const centerLine = useRef(null);
    const [timeWarp,setTimeWarp] = useState(false) ;  

    let location = useLocation();

    
    // ----------------------------------------------------------------

    // setTranslate Amount for animated number slider on first render

    useEffect( () =>{
        
    // ensure ref to timeLineContainer and CenteLine is not null
    if(firstDraw && timeLineContainer.current!=null && centerLine.current!=null){
        let dif = ancestor.year - num ; 
        let firstDif = ancestor.year - 1800 ; 
        console.log("on mount render")
        setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
        setFirstDraw(false)

        }
    }    
    ,[firstDraw])

    // ----------------------------------------------------------------

    // set inner Width of window on mount
    // useEffect( ()=>{
    //     setScreenWidth(window.innerWidth)
    //     }
    // ,[])
    
    // setTranslate Amount when ancestor or number changes 
    // AFTER first render for subsequent renders. 

    useEffect(()=>{
        
        if(!firstDraw){
            console.log("rerendering translate amount")
            let dif = ancestor.year - num ;   
            setTranslate(translateAmount - dif*17.6) }
           
    },[ancestor,num])

    // -----------------------------------------------------------

    // handle window resize events for slider 
    // But only when window width changes and not the window height
    //    @TODOS: remove resize event listeners!!

    useEffect( ()=>{

        // window.addEventListener('resize',handleResize); 
        // handleResize()
        var resized;
        window.onresize = function(){
                  clearTimeout(resized);
                  resized = setTimeout(resizedWindow, 100);
                };
        
    }
    ,[ancestor])

    // -------------------------------------------------

    // remove event Listeners


    useEffect( ()=>{

        if (location!== "/family-tree-index/" + props.ancestor.name.replace(/\s/g, '')){
            return () => window.removeEventListener("resize", resizedWindow,handleResize);

        }
    }
    ,[])
    
    // -------------------------------------------------

    // handle resize events to repostion the slider
    // only when window width changes

    const handleResize = ()=>{
        
        // only re-animate numbers if device width changes     
        
        if (screenWidth!==window.innerWidth && centerLine.current!=null &&timeLineContainer.current!=null ){
            setScreenWidth(window.innerWidth)
            // console.log("on resize error")
            let firstDif = ancestor.year - 1800 ; 
            setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )  
            setFirstDraw(true)
        
        }        
    }
    // ---------------------------------------------------

    // set number/year for animated numbers when ancestor changes

    useEffect( ()=>{        

       let dif = ancestor.year - num ; 
        
        console.log("change in number detected, number is ", num)
       handleNumber()
        
    },[ancestor,num])

    // -------------------------------------------------


    const handleNumber = ()=>{

        let dif = ancestor.year - num ;
        if (dif!==0){
            setNum(dif + num)
           } 
       }  

    // -------------------------------------------------

    // handle resize events
    
    function resizedWindow(){

    // Haven't resized in 100ms!

    console.log("resive EVENT BEING TRACKED")

        if(window.innerWidth!= screenWidth){
                   
            setNum(num)
            handleResize()
           
        }

    }   

    // -------------------------------------------------



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
                {/* {
                    
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
                } */}

                   <AnimatedNumber   
                    ancestor ={ancestor}         
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
             {/* <div className =  "loader"  
             style={{
                opacity: timeWarp?1:0
             }}
             />          */}

            
        </div>

    );
}
export default AncestorFamilyTree