import { useLocation } from "react-router-dom";
import LandingHeader from "./landingHeader";
import TreeIndexHeader from "./treeIndexHeader";
import FamilyTreeHeader from "./familyTreeHeader";

const Header = ()=>{

    let location = useLocation()    
   
   

    return (
    <div>

        <LandingHeader active = {location.pathname ==='/voices/'?true:false}/>
        <TreeIndexHeader active = {location.pathname.substring(1,7) === 'family'? true:false}/>
        {/* <FamilyTreeHeader active ={location.pathname.substring(1,7) === 'family'? true:false}/> */}

    </div>

    );
}

export default Header

