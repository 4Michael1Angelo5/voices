import './hamburger.scss';
import './App.scss';
import './book.css'
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css"
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landingPage';
import TreeIndexPage from './components/treeIndex';
import BurgerMenu from './components/burgerMenuComponent';
import Header from './components/headerComponent';
import AncestorFamilyTree from './components/ancestorFamilyTreePage';
import ANCESTORS from './assets/ansestors';

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
          <Route path='/family-tree-index' element={<TreeIndexPage ancestors = {ancestors}/>} />
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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
