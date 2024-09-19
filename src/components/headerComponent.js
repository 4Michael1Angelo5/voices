import { useLocation } from "react-router-dom";
import LandingHeader from "./headers/landingHeader";
import AncestorHeader from "./headers/ancestorHeader";
import AuthorHeader from "./headers/authorHeader";
import ChaptersHeader from "./headers/chaptersHeader";
import HistoryHeader from "./headers/historyHeader";
import { useEffect } from "react";

const Header = ()=>{

    let location = useLocation()    
    // note that this value will change once youv'e changed the 
    // basename prop of <BrowserRouter> to get spa working on gh-pages
    // ex: location.pathname will change to /author instead of /voices/author

    // useEffect(()=>{

    //    console.log(location.pathname)
    //    console.log(location.pathname.substring(0,9))

    // },[location.pathname])
   
   

    return (

            <div>
                <LandingHeader active = {location.pathname ===('/') ?true:false}/>
                <AncestorHeader active = {location.pathname.substring(0,9) === '/ancestor'? true:false}/>
                {/* <FamilyTreeHeader active ={location.pathname.substring(1,7) === 'family'? true:false}/> */}
                <AuthorHeader active = {location.pathname ==='/author'?true:false}/>
                <ChaptersHeader active = {location.pathname ==='/chapters'? true: false}/>
                <HistoryHeader active = {location.pathname ==='/history'?true:false}/>
            </div>
        
    );
}

export default Header

