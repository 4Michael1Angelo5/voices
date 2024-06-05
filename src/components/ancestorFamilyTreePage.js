
import { useLayoutEffect, useRef, useState, } from 'react';
import AnimatedNumbers from "react-animated-numbers";
import { DATA } from './ftreeData';
import { OrgChartComponent } from './OrgChart';


// Ancestor Detail displaying information about currently selected Ancesetor

const AncestorCard = (props) => {

    // console.log(props.ancestor)

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
    const treeContainer = useRef(null) ;


    useLayoutEffect(() => {
        // Handler to call on window resize
        function handleOrientation() {
            // Set window width/height to state

            let clientWidth = window.innerWidth ; 
            let clientHeight = window.innerHeight ; 

            if(clientWidth>clientHeight){
                setOrientation("landscape")
            }
            else setOrientation("portrait")
          
        }
        // Add event listener
        window.addEventListener("resize", handleOrientation);
        // Call handler right away so state gets updated with initial window size
        handleOrientation();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleOrientation);
    }, []); // Empty array ensures that effect is only run on mount

    useLayoutEffect( ()=>{
        
        console.log(ancestor.year)
        let dif = ancestor.year - num ; 
        console.log(dif)
        setNum(dif+num)

    },[ancestor])
    


    let events=  [] ;

    for(let years = 1890 ; years < 2020 ; years+=10){

        events.push(years)
    }


    return(

        <div className = 'container ancestor-page'>
            {/* ----------------- Title of Page  ----------------------*/}

            <h1>{props.ancestor.name} Family Tree </h1>
      

            {/*-------------------- d3-org-chart --------------------*/}

            <div className = "tree-container"
                ref = {treeContainer}
                >
                <OrgChartComponent
                    obj = {treeContainer}
                    data = {DATA}
                    orientation = {orientation}
                    setAncestor = {setAncestor}
                    ancestor = {ancestor}


                />
            </div>

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
            -----------------https://www.npmjs.com/package/react-animated-numbers-----------
            */}

             <div className='animated-numbers'>
                <AnimatedNumbers
                    ancestor = {ancestor}
                    className=""
                    transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.15,
                     
                    })}
                    animateToNumber={num}
                    fontStyle={{
                    fontSize: 40,
                    color: "red",
                    }}
                />
            </div>
            <div className = "timeline-container">
            {events.map((year,index)=>{
                    return(
                        <div className = ''>

                        <div>{year}</div>
                        <div className = "year-marker"/>
                        {
                            index=== events.length-1
                            ?
                            null
                            :
                            <div key = {index} className = "timeline-connector"/>
                        }
                        

                        </div>
                    
                    )
                })
            }
            </div>
        </div>

    );
}
export default AncestorFamilyTree