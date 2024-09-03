import { useState , useEffect} from 'react';
import CarouselComponent from './carouselComponent';
import mom from '../assets/authors/mom.jpg';
import ConnieYu from '../assets/authors/ConnieYu.jpg'
 


const AuthorPage = ()=>{

    const [opacity,setOpacity] = useState(0) ;

    useEffect( ()=>{
        
        // set opacity to 1 on mount
        setOpacity(1)

        // set opacity to 0 on unmount
        return ()=>setOpacity(0)

    }
    ,[])


    return(
        <div className = 'author-page'
            style={
                {opacity:opacity}                

            }>


            <div className = ' container'>

                <h1 className = ' text-center'>Meet the Authors</h1>                

                <div className = 'row d-flex justify-content-center align-items-center'>
                <h2>Sue Lee</h2>
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
                            Sue Lee retired as Executive Director of the 
                            Chinese Historical Society of America (CHSA), 
                            the oldest organization in the country dedicated 
                            to the interpretation, promotion, and preservation 
                            of the social, cultural, and political history 
                            and contributions of the Chinese in America in 
                            June 2017.
                        </p>
                        <p>
                            During her tenure at CHSA, the museum thrived and expanded 
                            its audience with enhanced museum and traveling exhibits, 
                            public and educational programs, collections, and publications. 
                            In 2016, she acquired the New York Historical Society’s 
                            ground-breaking exhibition “Chinese American Exclusion/Inclusion.”

                        </p>
                        <p>
                            In 2014, she documented the US Department of Labor’s induction of 
                            Chinese Railroad Workers into the Hall of Honor, the first government 
                            recognition of Chinese contribution to building the Transcontinental 
                            Railroad. She also co-edited “Voices from the Railroad,” oral histories 
                            from descendants of three Central Pacific Railroad workers.
                        </p>
                        <p>
                            In 2010, she successfully recovered 8 of 12 long-lost paintings by artist Jake 
                            Lee depicting scenes of early Chinese labor in the West, commissioned by the 
                            famed Kan’s Restaurant in SF Chinatown, and curated the 2011 exhibit, “Finding Jake Lee.”
                        </p>
                        <p>
                            In 2007, she launched  “Remembering 1882-Fighting for Civil Rights in the 
                            Shadow of the Chinese Exclusion Act,” a traveling exhibit which served as the 
                            catalyst for the national advocacy effort which resulted in an apology for the 
                            Chinese Exclusion Act by Congress.
                        </p>
                        <p>
                            A third-generation San Franciscan (her paternal grandfather arrived in 1915), 
                            Sue has worked in both the nonprofit and government sectors.  She has more than 25 years 
                            of experience in local government – working for five Mayors, including Dianne Feinstein, 
                            Willie Brown and Gavin Newsom -- setting policy in business and economic development.  
                            She served as a member and President of the San Francisco Planning Commission.
                        </p>
                         


                    </div>

                    </div>
                    <div className = "row d-flex flex-row-reverse justify-content-center">
                    <h2>Connie Yu</h2>
                   
                    <div className ="col-6 col-lg-4">

                    <img 
                            src={ConnieYu}
                            style = {{
                                width:"100%",
                                borderRadius:"10px",
                                border:'1px solid'
                            }}                            
                        />

                    </div>
                    <div className = "col-12 col-lg-8 mt-4">
                        <p>
                            CONNIE YOUNG YU, a fourth-generation Chinese in California, is a descendant 
                            of railroad worker Lee Wong Sang.  A graduate of Mills College, 
                            she has written extensively on Asian American issues and is the author of 
                            Chinatown, San Jose, U.S.A. She was on the citizens committee that saved Angel 
                            Island Immigration Station detention barracks from demolition and a founding 
                            member of Asian Americans for Community Involvement.
                        </p>
                        

                    </div>

                    </div>

                    

                

            </div>

            <div className = "container mt-4">            

            <div className = "row">
                <h2>Explore more books by Connie Yu</h2>
            </div>

            </div>
            <CarouselComponent/>

        </div>

          
        
    )
}

export default AuthorPage ; 