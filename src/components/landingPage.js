import Book from "./bookComponent";
import { Link} from 'react-router-dom';


const LandingPage = () => {
   
    return (
        <div className="landing-page">
            <div className="first-section">
                <div className="container-fluid"
                    style={{
                        position: "relative"
                        , top: "-120px"
                    }}>
                    <div className="row">
                        <Book />
                    </div>
                    <div className="row">
                        <div className="col-8 col-lg-6 frame about-the-author">
                            <h1>About the Author</h1>
                            <p>'m baby intelligentsia organic thundercats
                                raclette yr pop-up tonx church-key gastropub
                                authentic fit ethical vape meggings. Palo
                                santo kombucha single-origin coffee gatekeep
                                heirloom copper mug health goth readymade
                                chambray
                            </p>
                        </div>
                        <div className='col-4 col-lg-6 d-flex justify-content-center align-items-center flex-column '>
                            
                                    <label className ="text-center">Family Tree </label>

                                    <Link to = '/family-tree-index'className='icon-set family-tree'></Link>
                             
                                    <label className ="text-center">About the Author </label>                                
                                    <Link className='icon-set author'></Link>
                               
                                    <label className ="text-center"> Chapters </label>
                                    <Link className='icon-set chapters-link'></Link>
                             
                        </div>
                    </div>

                </div>

            </div>

            {/* new section begin transcontinental rail-road history */}
            <div className="rail-road-history-section">
               

                    <div className="custom-shape-divider-bottom-1714357161">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                            250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                            3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill">                                
                            </path>
                        </svg>
                    </div>

                    <div className ="container">

                    
                   
                    
                    <div className="row d-flex justify-content-center">
                        <h1 className = "ml-2">Context</h1>
                        <div className="col-10 col-lg-8">
                            
                                <h1> The Transcontinental Rail Road</h1>
                                <p>
                                Hexagon lomo VHS quinoa helvetica, 3 wolf moon DIY actually 
                                sartorial mukbang hammock waistcoat selvage slow-carb tousled. 
                                Pop-up neutral milk hotel ethical iPhone tattooed typewriter 
                                air plant, glossier slow-carb vice adaptogen distillery af. 
                                Big mood forage DIY, green juice fam iceland chillwave +1 
                                brunch gochujang paleo jianbing thundercats. Tofu af four 
                                loko, readymade artisan brunch taxidermy subway tile irony 
                                PBR&B chartreuse. Food truck iceland whatever copper mug 
                                enamel pin ethical bicycle rights squid raw denim. 
                                Thundercats craft beer dreamcatcher typewriter organic occupy.
                                </p>
                           
                        </div>
                    </div>

                    </div>
                    
                
            </div>

        </div>

    );
}

export default LandingPage