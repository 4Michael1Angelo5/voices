import { useLocation } from "react-router-dom";
import LandingHeader from "./headers/landingHeader";
import AncestorHeader from "./headers/ancestorHeader";
import AuthorHeader from "./headers/authorHeader";

const Header = ()=>{

    let location = useLocation()    
   
   

    return (

            <div>
                <LandingHeader active = {location.pathname ===('/voices/') ?true:false}/>
                <AncestorHeader active = {location.pathname.substring(1,7) === 'family'? true:false}/>
                {/* <FamilyTreeHeader active ={location.pathname.substring(1,7) === 'family'? true:false}/> */}
                <AuthorHeader active = {location.pathname ==='/voices/author'?true:false}/>
            </div>
        
    );
}

export default Header

