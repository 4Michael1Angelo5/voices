
import './book.css' ;
import './landingPage.scss'
import './hamburger.scss';
import './App.scss';
import './styles/headerStyles.scss' ; 
import './styles/arrow.scss';

import { useState } from 'react';
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



function App() {

  const [ancestors] = useState(ANCESTORS)
  const [events] = useState(HISTORY)

  const BASENAME ="/voices"

  return (
    <div className="App">
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
      

    </div>
  );
}

export default App;
