import React from "react";

import voices from "../assets/book_scans/optimized/voices.webp"; 
import page1 from "../assets/book_scans/optimized/page1.webp";
import page2 from "../assets/book_scans/optimized/page2.webp";
import page3 from "../assets/book_scans/optimized/page3.webp";
import page4 from "../assets/book_scans/optimized/page4.webp";
import page5 from "../assets/book_scans/optimized/page5.webp";
import page6 from "../assets/book_scans/optimized/page6.webp";
import page7 from "../assets/book_scans/optimized/page7.webp";
import page8 from "../assets/book_scans/optimized/page8.webp";
import page9 from "../assets/book_scans/optimized/page9.webp";
import page10 from "../assets/book_scans/optimized/page10.webp";

const pages = [ 
                [page2,page3] , 
                [page4,page5] , 
                [page6,page7] , 
                [page8,page9]                 
              ];

const flipBook = (elBook) => {
  elBook.style.setProperty("--c", 0); // Set current page
  elBook.querySelectorAll(".page").forEach((page, idx) => {
    page.style.setProperty("--i", idx);
    page.addEventListener("click", (evt) => {
      if (evt.target.closest("a")) return;
      const curr = evt.target.closest(".back") ? idx : idx + 1;
      elBook.style.setProperty("--c", curr);
    });
  });
};



class Book extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      forward: true,
      firstRender:true,
      // top:120,
    };
    this.flipInterval = null;
    this.book = React.createRef()
    // this.calculateTop = this.calculateTop.bind(this);
  }

  // calculateTop=()=>{
      
  //   const bookElement = this.book.current; 
 
  //   const bookElementDOMrect = bookElement.getBoundingClientRect(); 

  //   const  y = bookElementDOMrect.y
  //   const height = bookElementDOMrect.height;

  //   const screenHeight = window.innerHeight; 
    
  //   const top = 0
    
     

  //   console.log(top);

  //   this.setState({top:top})
    

  // }

    componentDidMount(){

        document.querySelectorAll(".book").forEach(flipBook);
        const elBook = document.querySelector(".book");
        const pages = elBook.querySelectorAll(".page");
        const totalPages = pages.length;

    // Initialize the flipBook 
    // Start the automatic page flipping

    // this.calculateTop()



    if(this.state.firstRender){
   
    this.flipInterval = setInterval(() => {
      this.flipPages(elBook, totalPages);
    }, 300); // Flip every .3 seconds, adjust as needed
    
    this.setState({ firstRender: false })
    }


    }

    componentWillUnmount() {
      // Clear the interval when the component is unmounted to avoid memory leaks
      clearInterval(this.flipInterval);
    }


    flipPages(elBook, totalPages) {
      const { currentPage, forward } = this.state;
  
      let nextPage = currentPage;
      let nextDirection = forward;
  
      if (forward) {
        nextPage = currentPage + 1;
        if (nextPage >= totalPages) {
          nextPage = totalPages - 1;
          nextDirection = false;
        }
      } else {
        nextPage = currentPage - 1;
        if (nextPage < 0) {
          // Stop the interval once the animation is complete
          clearInterval(this.flipInterval);
          return;
        }
      }
  
      this.setState({ currentPage: nextPage, forward: nextDirection });
      elBook.style.setProperty("--c", nextPage);
    }

    render()
      {    
          
        return (
          // front cover and first page
            <>
              <div ref = {this.book} className="book"
                style ={{
                  top:`${this.state.top}px`
                }}
                >
                  <div className="page">                    
                    <div className="front cover">
                      <img 
                        src = {voices}
                        alt ={"front cover of book"}

                      />
                    </div>
                    <div className="back">
                      <img src = {page1}
                           alt = {"page_1"}
                      />
                    </div>
                  </div>

                  {
                    // inside part of book                    

                    pages.map( (el,idx)=>{
                      return(

                        <div className="page" key ={idx}>
                        <div className="front">
                          <img 
                            src = {el[0]}
                            alt = {"page_"+idx+2}
                            loading="lazy"
                          />                      
                        </div>
                        <div className="back">
                          <img 
                            src= {el[1]} 
                            alt={"page_"+ idx+3}
                            loading= "lazy"
                          />
                        </div>
                        </div>
                      );
                    })
                  }

                  {/* last page and back cover */}

                  <div className="page">
                    <div className="front">
                      <img 
                        src={page10} 
                        alt="page_10"/>
                    </div>
                  <div className=" cover"/>  
                  <div className = "back">
                  <img 
                        src = {voices}
                        alt = "back cover of book"
                      />    
                      </div>              
                  </div>
          </div>
        </>

        );
      }        
  }

export default Book