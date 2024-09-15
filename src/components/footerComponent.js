import { redirect, useLocation } from "react-router-dom"
import { useState , useEffect} from "react"
import logo_cc from "../assets/icons/logo_cc.png"

const Footer =()=>{

    const [color,setColor] = useState("red")
    const location = useLocation()

    const determineColor = (location)=>{

        console.log(location)
        console.log(location.substring(0,9))

        
        if (location === "/") {
            setColor("rgba(0, 0, 245, 1)");  // blue
        }
        if (location.substring(0, 9) === "/ancestor") {
            setColor("rgb(33 36 44)");  // #263144
        }
        if (location === "/author") {
            setColor("rgba(9, 30, 37, 1)");  // #091e2f
        }
        if (location === "/history") {
            setColor("rgba(186, 186, 200, 1)");  // #babad2
        }
        if (location === "/chapters") {
            setColor("rgba(29, 30, 26, 1)");  // #1d1e24
        }
    } 

    useEffect( ()=>{

        determineColor(location.pathname)

    },[location.pathname])


    

    return(

    <>
        {/* <div className="custom-shape-divider-bottom-1726354547"
            style ={{backgroundColor:color,
                transform: "translateY(-1px)"
            }}
        >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,
            31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="shape-fill">
        </path>
        </svg>
        </div> */}
        <div className="footer"
        style ={{background:color}}
            >
            <div className="container">

                <div className = "row pt-2">
                    <div className = "col-6">

                    </div>
                    <div className="col-6 give-myself-credit">
                        <p>
                            Website Design by Chris Chun
                        </p>
                        <a href="https://chrischun.dev">
                            <img src = {logo_cc} width={"50px"} height={"50px"}/>

                        </a>
                        

                    </div>
                </div>
           
            </div>
            
        </div>
    </>

    )

}

export default Footer