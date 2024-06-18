import russLow from '../assets/russLow.jpg'
const AuthorPage = ()=>{

    return(
        <div className = 'author-page'>

            <div className = ' container'>

                <h1 className = ' text-center'>Author Page</h1>

                <h2>Russ N Low</h2>

                <div className = 'row d-flex justify-content-center'>
                    <div className = 'col-6'>
                        
                        <img 
                            src={russLow}
                            style = {{
                                width:"100%",
                                borderRadius:"10px",
                                border:'2px solid'
                            }}                            
                        />

                    </div>
                    <div className = 'col-12'>

                        
                        
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

        </div>

          
        
    )
}

export default AuthorPage ; 