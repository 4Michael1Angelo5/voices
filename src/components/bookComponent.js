import React from "react";

import page1 from "../assets/book_scans/page1.png";
import page2 from "../assets/book_scans/page2.png";
import page3 from "../assets/book_scans/page3.png";
import page4 from "../assets/book_scans/page4.png";
import page5 from "../assets/book_scans/page5.png";
import page6 from "../assets/book_scans/page6.png";
import page7 from "../assets/book_scans/page7.png";
import page8 from "../assets/book_scans/page8.png";
import page9 from "../assets/book_scans/page9.png";
import page10 from "../assets/book_scans/page10.png";

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
    };
    this.flipInterval = null;
  }

    componentDidMount(){

        document.querySelectorAll(".book").forEach(flipBook);
        const elBook = document.querySelector(".book");
        const pages = elBook.querySelectorAll(".page");
    const totalPages = pages.length;

    // Initialize the flipBook
    // this.flipBook(elBook, pages);

    // Start the automatic page flipping
    this.flipInterval = setInterval(() => {
      this.flipPages(elBook, totalPages);
    }, 300); // Flip every 1.5 seconds, adjust as needed
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
            <div>
              <div className="book">

                  <div className="page">
                    <div className="front cover">
                    </div>
                    <div className="back">
                      <img src = {page1}/>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <img src = {page2}/>
                      
                    </div>
                    <div className="back">
                      <img src= {page3} alt="Img 1"/>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <img src = {page4}/>
                  </div>

                  <div className="back">
                      <img src = {page5}/>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <img src = {page6} />
                    </div>
                    <div className="back">
                      <img src = {page7}/>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                       <img src = {page8} alt = "page 9 from book"/>
                    </div>
                    <div className="back">
                      <img src = {page9} />
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <img src={page10} alt="Img 2"/>
                    </div>
                  <div className="back cover"/>
                  </div>
          </div>
        </div>

        );
      }        
  }

export default Book