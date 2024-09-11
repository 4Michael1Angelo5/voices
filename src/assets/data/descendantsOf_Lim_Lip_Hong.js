// descendants of Lim Lip Hong data for family tree graph 

// handle descendants without image (placeholder image):  
import woman_descendant from "../icons/woman_descendant.png";
import man_descendant from "../icons/man_descendant.png";


//root ancestor
import Lim_Lip_Hong_profile_pic from "../ancestors/Lim_Lip_Hong_profile_pic.jpg" ;

// art lym son of root
import Art_Lym_profile_pic from "../ancestors/lim_lip_hong_descendants/Art_Lym_profile_pic.jpg";
import Art_Lym_image from "../ancestors/lim_lip_hong_descendants/Art_Lym_image.jpg";





export const DESCENDANTS_OF_LIM_LIP_HONG_DATA = 
[
    {
      name: "Lim Lip Hong",
      id: "O-6066",
      parentId: "",
      imageUrl: Lim_Lip_Hong_profile_pic,
      year:1843,
      lifeSpan: "1843 - 1920",
      shortDescription:"Sailed across the Pacific at age 12. Arrived in California. \
      Worked in a wide range of manual labor jobs all over California. He was one \
      of the first Chinese hired by the Central Pacific Railroad in 1864. He spoke \
      English and was pivotal to organizing laborers.",
     
    },
    {
      name: "Lim Sing",
      imageUrl: man_descendant,
      profileUrl: man_descendant,
      id: "O-6067",
      parentId: "O-6066",
      year:1884,
      lifeSpan: "1884 - 1948",
      relationship: "Eldest son of Lim Lip Hong",
      shortDescription:"I'm baby cronut kale chips fingerstache, \
      activated charcoal YOLO four dollar toast lumbersexual \
      flexitarian cred praxis. Butcher vaporware beard tattooed \
      gochujang. Post-ironic mukbang cloud bread ramps bitters actually.",     
    },
    // first generation 
    {
      name: "Siu Young",
      imageUrl: woman_descendant, 
      profileUrl: woman_descendant,
      relationship: "Daughter of Lim Lip Hong",
      id: "O-6068",
      parentId: "O-6066",
      year:1883,
      lifeSpan: "1883 - 1972",
      shortDescription:"She became the “Gambling Queen”",
    },
    {
      name: "Robert Lym",
      imageUrl: man_descendant,
      profileUrl: man_descendant,
      relationship: "Second son of Lim Lip Hong",
      id: "O-6069",
      parentId: "O-6066",
      year:1980,
      lifeSpan: "1888 - 1970",
      shortDescription:"I'm baby cronut kale chips fingerstache, \
      activated charcoal YOLO four dollar toast lumbersexual \
      flexitarian cred praxis. Butcher vaporware beard tattooed \
      gochujang. Post-ironic mukbang cloud bread ramps bitters actually.",
     
    },
    {
      name: "Art Lym",
      imageUrl: Art_Lym_profile_pic,
      profileUrl: Art_Lym_image,     
      relationship: "Third son of Lim Lip Hong",
      id: "O-6070",
      parentId: "O-6066",
      year:1890,
      lifeSpan: "1890 - 1962",
      shortDescription:"I'm baby cronut kale chips fingerstache, \
      activated charcoal YOLO four dollar toast lumbersexual \
      flexitarian cred praxis. Butcher vaporware beard tattooed \
      gochujang. Post-ironic mukbang cloud bread ramps bitters actually.",
    },
    // second generation
    {
      name: "Worly Wong",
      imageUrl: man_descendant,
      profileUrl: man_descendant,
      realtionship: "Son of Siu Young",
      id: "O-6071",
      parentId: "O-6068",
      year:1912,
      lifeSpan: "1912 - 1985",
      shortDescription:"He was an Architect. I'm baby cronut kale chips fingerstache, \
      activated charcoal YOLO four dollar toast lumbersexual \
      flexitarian cred praxis. Butcher vaporware beard tattooed \
      gochujang. Post-ironic mukbang cloud bread ramps bitters actually.",
    }
    
  

  ]