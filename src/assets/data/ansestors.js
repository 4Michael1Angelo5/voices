// overview of all the ancestors to be covered (only doing 3 for now)
// pattern: 
//         import image
//         import their descendant data

// jow kee descendants data
import Jow_Kee_profile_pic from "../ancestors/Jow_Kee_profile_pic.jpg";
import { DESCENDANTS_OF_JOW_KEE_DATA } from './descendantsOf_Jow_Kee'  


// lim lip hong descendants data
import Lim_Lip_Hong_profile_pic from "../ancestors/Lim_Lip_Hong_profile_pic.jpg"
import { DESCENDANTS_OF_LIM_LIP_HONG_DATA } from './descendantsOf_Lim_Lip_Hong.js';

// Hong Lai Woh descendants data
import { DESCENDANTS_OF_HONG_LAI_WOH } from "./descendantsOf_Hong_Lai_Woh.js";
 
// Lum Ah Chew
import Lum_Ah_Chew_profile_pic from "../ancestors/Lum_Ah_Chew_profile_pic.jpg";
const ANCESTORS = [
    {
    name: "Lim Lip Hong",
    year:1843,
    lifeSpan: "1843 - 1920",
    image:Lim_Lip_Hong_profile_pic,
    descendants: DESCENDANTS_OF_LIM_LIP_HONG_DATA,  
    shortDescription:"Sailed across the Pacific at age 12. Arrived in California. \
    Worked in a wide range of manual labor jobs all over California. He was one of \
    the first Chinese hired by the Central Pacific Railroad in 1864. He spoke English \
    and was pivotal to organizing laborers." ,
    },
    {
    name:"JOW KEE (JIM KING)",
    year:1840,
    lifeSpan: "1840-1898",
    image:Jow_Kee_profile_pic,
    descendants: DESCENDANTS_OF_JOW_KEE_DATA,
    shortDescription:"Born in 1840, arrived in California at age 15. \
    Worked as a miner, learned to speak English, and became a labor \
    contractor. He was hired by the Central Pacific Railroad in 1865 \
    to bring on workers.  Afterward, he became a tenant farmer in Courtland.",    
    },
    {
    name: "Hong Lai Woh",
    year: 1850,
    lifeSpan: "1850-1905",
    descendants: DESCENDANTS_OF_HONG_LAI_WOH,
    shortDescription:"railroad worker, cigarmaker",
    },
    {
    name:"Lum Ah Chew ",
    year:1840,
    lifeSpan: "1840-1906",
    image:Lum_Ah_Chew_profile_pic,
    descendants: DESCENDANTS_OF_JOW_KEE_DATA,
    shortDescription:"worked as a cook at the Summit Tunnel; became a farmer in Delta after"
    },

]

export default ANCESTORS