
import './book.css' ;
import './landingPage.scss'
import './hamburger.scss';
import './App.scss';
import './styles/headerStyles.scss' ; 
import './styles/arrow.scss';

import { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BurgerMenu from './components/burgerMenuComponent';

// Contains all the differnt headers for each section
// @TODO make this more efficent by making the things that change props/ parameters 
// so that I'm not rewriting code so much
import Header from './components/headerComponent';  
import AncestorFamilyTree from './components/ancestorFamilyTreePage';

// Array of obects containing data on historical events 
import HISTORY from './assets/data/history';  

// Array of obects containing data on ancestors   
import ANCESTORS from './assets/data/ansestors';

// pages for the website
import LandingPage from './components/landingPage';
import AncestorPage from './components/ancestorPage';
import AuthorPage from './components/authorPage';
import ChaptersPage from './components/chaptersComponent';
import HistoryPage from './components/historyPage';
import SplashPage from './components/splashPage';

// images for book 
import page1 from "./assets/book_scans/optimized/page1.webp";
import page2 from "./assets/book_scans/optimized/page2.webp";
import page3 from "./assets/book_scans/optimized/page3.webp";
import page4 from "./assets/book_scans/optimized/page4.webp";
import page5 from "./assets/book_scans/optimized/page5.webp";
import page6 from "./assets/book_scans/optimized/page6.webp";
import page7 from "./assets/book_scans/optimized/page7.webp";
import page8 from "./assets/book_scans/optimized/page8.webp";
import page9 from "./assets/book_scans/optimized/page9.webp";
import page10 from "./assets/book_scans/optimized/page10.webp";

const pages = [page1,page2,page3,page4,page5,page6,page7,page8,page9,page10];


function App() {

  const [ancestors] = useState(ANCESTORS)
  const [events] = useState(HISTORY)
  const [loading,setLoading] = useState(true);
  const [messageComplete, setMessageComplete] = useState(false);

  const BASENAME ="/voices"

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(pages.map(loadImage));
        console.log("loading images")
         setTimeout(()=>{setLoading(false)},15000) 
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false); // Set to false even if some images fail to load
      }
    };

    loadImages();
  }, []);

  return (
    <div className="App">
      {
        !messageComplete
        ? 
        <SplashPage setMessageComplete = {setMessageComplete}/>
        :
      <BrowserRouter basename={BASENAME}>
        <BurgerMenu />
        <Header/>
        <Routes>
          <Route path='/' element={<LandingPage />} />   

          {/* ==========================>  pass ancestors as props to AncestorPage */}   
          {/* this is the page with all the rail road ancestors */}
          <Route  path='/ancestors' element={<AncestorPage ancestors = {ancestors}/>} /> 

          {
            // dynamically create routes based on data from ancestors
            ancestors.map((ancestor, index) => {

              return (

                <Route
                  key={index}
                  path={"/ancestors/" + ancestor.name.replace(/\s/g, '')}
                  // =======================> pass ancestor as prop to ancestor page
                  // this page shows a graph of a specif ancestor and their descendents
                  element={<AncestorFamilyTree ancestor={ancestor}  />
                  }
                />

              );

            })
          }

          <Route path = '/author'   element = {<AuthorPage/>}/>
          <Route path = '/chapters' element = {<ChaptersPage/>}/>

          {/* ==========================>  pass historical events as props to HistoryPage */}
          <Route path = '/history'  element = {<HistoryPage events = {events} />}/>

        </Routes> 
      </BrowserRouter>
      }
      

    </div>
  );
}

export default App;
