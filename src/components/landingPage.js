import Book from "./bookComponent";
import LinkBtnComponent from "./linkBtnComponent";
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
                        <Book/>
                    </div>
                    <div className="row">
                        <div className="col-9 col-lg-6 frame about-the-author">
                            <h1>About the Author</h1>
                            <p>
                                During her tenure as Executive Director of the Chinese 
                                Historical Society of America (2004-2017), Sue Lee co-edited
                                “Voices from the Railroads” with Connie Young Yu. “Voices”
                                is a compilation of accounts of Chinese railroad workers
                                on the first Transcontinental Railroad completed in 1869.
                                The book was envisioned to launch a new chapter of the
                                American historical narrative
                            </p>
                            <LinkBtnComponent text = {'Learn More'} pathName = '/voices/author'/>
                        </div>
                        <div className='col-3 col-lg-6 d-flex justify-content-center align-items-center flex-column '>
                            
                                    <label className ="btn-label text-center">Family Tree </label>

                                    <Link to = '/voices/ancestors'className='icon-set family-tree'></Link>
                             
                                    <label className ="btn-label text-center">The Authors </label>                                
                                    <Link  to = '/voices/author'className='icon-set author'></Link>
                               
                                    <label className ="btn-label text-center"> Chapters </label>
                                    <Link  to = '/voices/chapters' className='icon-set chapters-link'></Link>
                             
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
                        {/* <h1 className = "ml-2">Context</h1> */}
                        <div className="col-10 col-lg-8">
                            
                                <h1> About The Book</h1>
                                <p>
                                    For years after the completion of the First Transcontinental Railroad (TCCR), 
                                    Chinese workers were nameless.  We would learn that the Chinese helped build the 
                                    railroad, but we weren’t told who they were or what they did. In preparation to 
                                    celebrate the 150th anniversary of the completion of the TCRR in 2019,  many organizations 
                                    and individuals worked to research and identify Chinese workers.  Their efforts resulted in 
                                    more than a dozen descendants of families coming forward with stories about their railroad 
                                    ancestors. 
                              
                                </p>
                                <p>
                                    Some were inspired to share family heirlooms and photographs, 
                                    conduct more research, and interview far-flung family members. 
                                    Their accounts are the foundation of a new chapter in the American 
                                    historical narrative — the Chinese in America.
                                </p>
                           
                        </div>
                    </div>

                    </div>
                    
                
            </div>

        </div>

    );
}

export default LandingPage