// icons when no image available
import man_descendant from "../icons/man_descendant.png"
import woman_descendant from "../icons/woman_descendant.png"

// images for descendants
import Russ_Low_profile_pic from "../ancestors/hong_lai_woh_descendants/Russ_Low_profile_pic.jpg"



// descendants of Hong Lai Wo data for family tree graph 
export const DESCENDANTS_OF_HONG_LAI_WOH = 
[
    {
      name: "Hong Lai Woh",  
      id: "O-6066",
      parentId: "",    
      relationship: "",      
      imageUrl: man_descendant,
      profileUrl: man_descendant,
      year:1850,
      lifeSpan: "1850 - 1905",
      shortDescription:" railroad worker, cigarmaker"
    },
    {
      name: "Ah Kee (Kay) Low", //daughter
      id: "O-6067",
      parentId: "O-6066",
      relationship:"Daughter of Hong Lai Woh",
      imageUrl: woman_descendant,
      profileUrl: woman_descendant,      
      year:1890,
      lifeSpan: "1890 - ?",
      shortDescription:"homemaker, mother of 10",
     
    },
    {
      name: "Loren Low",
      id: "O-6068",
      parentId: "O-6067",
      relationship: "Grandson of Hong Lai Woh, son of Kay Low",
      imageUrl: man_descendant ,
      profileUrl:man_descendant ,      
      year:1923,
      lifeSpan: " 1923-1987",
      shortDescription:"WWII Silver Star recipient"
    },
    {
      name: "Russell Low",
      id: "O-6069",
      parentId: "O-6068",
      relationship: "Great-grandson of Hong Lai Woh, grandson of Kay Low, son of Loren Low",
      imageUrl: Russ_Low_profile_pic, 
      profileUrl: Russ_Low_profile_pic,      
      year:1952,
      lifeSpan: " 1952 -",
      shortDescription:"retired physician, family historian, author"
    }
   


  ]