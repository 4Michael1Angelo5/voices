
import { useLayoutEffect, useRef, useState,useEffect , useCallback} from 'react';
// import AnimatedNumbers from "react-animated-numbers";
import AnimatedNumber from './animated-numbers-mod';
import { DATA } from './ftreeData';
import { OrgChartComponent } from './OrgChart';
import { useLocation } from 'react-router-dom';



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



    // setTranslate Amount for animated number slider on first render

    useEffect( () =>{
        
    // ensure ref to timeLineContainer and CenteLine is not null
    if(firstDraw && timeLineContainer.current!=null && centerLine.current!=null){
        let dif = ancestor.year - num ; 
        let firstDif = ancestor.year - 1800 ; 
        console.log("on mount error")
        setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
        setFirstDraw(false)

        }
    }    
    ,[])

    // set inner Width of window on mount
    useEffect( ()=>{
        setScreenWidth(window.innerWidth)
        }
    ,[])
    
    // setTranslate Amount when ancestor or number changes 
    // AFTER first render for subsequent renders. 

    useEffect(()=>{

            let dif = ancestor.year - num ;   
            setTranslate(translateAmount - dif*17.6) 
           
    },[ancestor])

    // handle window resize events for slider 
    // But only when window width changes and not the window height

    useEffect( ()=>{

        // window.addEventListener('resize',handleResize); 
        // handleResize()
        var resized;
        window.onresize = function(){
                  clearTimeout(resized);
                  resized = setTimeout(resizedWindow, 100);
                };


//    @TODOS: remove resize event listeners!!

        
    }
    ,[ancestor])

    // useEffect( ()=>{

    //     if (location!== "/family-tree-index/" + props.ancestor.name.replace(/\s/g, '')){
    //         return () => window.removeEventListener("resize", resizedWindow,handleResize);

    //     }

    // }
    // ,[location])

    // handle resize events to repostion the slider
    // only when window width changes

    const handleResize = ()=>{
 
        
        if (screenWidth!==window.innerWidth && centerLine.current!=null &&timeLineContainer.current!=null ){
            setScreenWidth(window.innerWidth)
            console.log("on resize error")
            let firstDif = ancestor.year - 1800 ; 
            setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )  
        
        }        
    }
    useEffect( ()=>{

        // set number/year for animated numbers when ancestor changes

       let dif = ancestor.year - num ; 
        //    console.log(dif)
        console.log("change in number detected, number is ", num)
       handleNumber()
        
    },[ancestor,num])

    const handleNumber = ()=>{

        let dif = ancestor.year - num ;
        if (dif!==0){
            setNum(dif + num)
            console.log("setNum was called")
           }else console.log("set num was not called")
       }  
    
    function resizedWindow(){

    // Haven't resized in 100ms!

    console.log("resive EVENT BEING TRACKED")

        if(window.innerWidth!= screenWidth){
            // only re-animate numbers if device width changes            
            setNum(num)
            handleResize()
            // handleNumber()
        }

    }   
  

    // above is attempt at sorting side effects and fixxing bugs
    // bellow is old crap code
    

 
    // useLayoutEffect(() => {
    //     // set Translate amount for animated number slider

    //     let dif = ancestor.year - num ; 

    //     //  hack for getting animated numbers to render correctly
    //     // @TODOs this is a bull shit fix and really need to figure out why it is
    //     // not animating correctly 
    //     if (firstDraw){

    //         let firstDif = ancestor.year - 1800 ; 

    //         setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
    //         setFirstDraw(false)

    //     }else{

    //         setTranslate(translateAmount - dif*17.6  )
    //         setFirstDraw(true)
           
    //     }

    // }, [ancestor]); 


    // function handleOrientation() {

    //     // reposition the slider on window resize
    //     // reset the number/ year for animated number
       
    //     let firstDif = ancestor.year - 1800 ; 
        

    //     if(window.innerWidth != screenWidth){
            
    //         console.log("screen width changed")
    //         setTranslate(- firstDif *17.6 + centerLine.current.offsetLeft - timeLineContainer.current.offsetLeft )
    //         setScreenWidth(window.innerWidth)           
      
    //     }
        
    //     if (window.innerHeight<window.innerWidth){
    //         setOrientation("landscape")
    //     }else setOrientation("portrait")
       
         
    // }


    // useLayoutEffect(()=>{
        
    //     // Add event listener
    //     window.addEventListener("resize", handleOrientation);
    //     // Call handler right away so state gets updated with initial window size
    //     handleOrientation();
    //     var doit;
    //     window.onresize = function(){
    //       clearTimeout(doit);
    //       doit = setTimeout(resizedw, 100);
    //     };


    //     // Remove event listener on cleanup
    //     return () => window.removeEventListener("resize", handleOrientation);

    // },[firstDraw,ancestor])

  



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
                    // ancestor = {ancestor}
                    // className=""    
                    key = {123}               
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
             {/* <div className = {timeWarp? "loader" : " d-none loader"} />  */}        

            
        </div>

    );
}
export default AncestorFamilyTree