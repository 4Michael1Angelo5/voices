import russLow from '../assets/russLow.jpg'
import { useState , useEffect} from 'react';
import CarouselComponent from './carouselComponent';
import mom from '../assets/mom.jpg'
 


const AuthorPage = ()=>{

    const [opacity,setOpacity] = useState(0) ;

    useEffect( ()=>{

        setOpacity(1)

    }
    ,[])

    useEffect( ()=>{

        return ()=>setOpacity(0)

    }
    ,[])


    return(
        <div className = 'author-page'
            style={
                {opacity:opacity}
                 

            }>

            <div className = ' container'>

                <h1 className = ' text-center'>Author Page</h1>

                <h2>Sue Lee</h2>

                <div className = 'row d-flex justify-content-center'>
                    <div className = 'col-6 col-lg-4'>
                        
                        <img 
                            src={mom}
                            style = {{
                                width:"100%",
                                borderRadius:"10px",
                                border:'1px solid'
                            }}                            
                        />

                    </div>
                    <div className = 'col-12 col-lg-8'>

                        
                        
                        <p className = 'mt-4'>
                        Swing the lead gaff jolly boat draft keel Pirate Round black spot brigantine 
                        quarter maroon. Hail-shot six pounders rum jury mast coffer driver grog blossom 
                        bilge Letter of Marque cutlass. Topmast list mizzen trysail me quarterdeck marooned 
                        fire in the hole yardarm chandler.Galleon gun rum come about American Main weigh 
                        anchor crow's nest strike colors smartly yawl. Cackle fruit black jack rigging
                        plunder execution dock hang the jib jack dance the hempen jig Corsair bilge
                        water. Blimey Sea Legs loot Yellow Jack landlubber or just lubber American Main 
                        overhaul chase tackle belay.
                        </p>
                         


                    </div>

                    

                </div>

            </div>
            <CarouselComponent/>

        </div>

          
        
    )
}

export default AuthorPage ; 