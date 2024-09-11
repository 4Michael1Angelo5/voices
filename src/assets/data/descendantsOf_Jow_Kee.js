// descendants of Jow Kee data for family tree graph 

// place holder images when no image available
import man_descendant from "../icons/man_descendant.png"

// Jow Kee
import Jow_Kee from '../ancestors/Jow_Kee.jpg' 
import Jow_Kee_profile_pic from "../ancestors/Jow_Kee_profile_pic.jpg";

// Gene O Chan
import Gene_O_Chan_profile_pic from "../ancestors/jow_kee_descendents/Gene_O_Chan_profile_pic.jpg"




export const DESCENDANTS_OF_JOW_KEE_DATA = 
[
    {
      name: "Jow Kee",
      id: "O-6066",
      parentId: "",
      relationship: "",
      imageUrl: Jow_Kee_profile_pic,
      profileUrl: Jow_Kee, 
      year:1840,
      lifeSpan: "1840-1898",
      shortDescription:" Born in 1840, arrived in California at age 15. \
      Worked as a miner, learned to speak English, and became a labor \
      contractor. He was hired by the Central Pacific Railroad in 1865 \
      to bring on workers.  Afterward, he became a tenant farmer in Courtland.",
     
    },
    {
      name: "Gene O. Chan",
      id: "O-6067",
      parentId: "O-6066",           
      relationship: "Son of Jow Kee",
      imageUrl: Gene_O_Chan_profile_pic,
      profileUrl: Gene_O_Chan_profile_pic,      
      year:1940,
      lifeSpan: "1940-2022",
      shortDescription:"Gene O. Chan, born in Locke, is the fourth generation \
      of his family in the Sacramento Delta. He had a successful career as a \
      rocket propulsion designer, retiring after 34 years at Aerojet. His quest \
      to document the history of his aviator uncle, William King, led to the \
      discovery that his great-grandfather, Jim King, worked on the \
      transcontinental railroad.",
     
    },


  ]