import './hamburger.scss';
import './App.scss';
import './book.css' ;
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import './styles/headerStyles.scss' ; 
import './styles/arrow.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landingPage';
import AncestorPage from './components/ancestorPage';
import BurgerMenu from './components/burgerMenuComponent';
import Header from './components/headerComponent';
import AncestorFamilyTree from './components/ancestorFamilyTreePage';
import ANCESTORS from './assets/data/ansestors';
import AuthorPage from './components/authorPage';


// const ancestors = ANCESTORS ; 

function App() {

  const [ancestors] = useState(ANCESTORS)
  
  return (
    <div className="App">
      <BrowserRouter>
        <BurgerMenu />
        <Header />
        <Routes>
          <Route path='/voices/' element={<LandingPage />} />
          <Route path='/family-tree-index' element={<AncestorPage ancestors = {ancestors}/>} />
          {
            ancestors.map((ancestor, index) => {

              return (

                <Route
                  key={index}
                  path={"/family-tree-index/" + ancestor.name.replace(/\s/g, '')}
                  element={<AncestorFamilyTree ancestor={ancestor}  />
                  }
                />

              );

            })

          }
          <Route path = '/voices/author' element={<AuthorPage/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
