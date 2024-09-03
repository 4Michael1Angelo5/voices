import React from "react";

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
                      <h2>Responsive</h2>
                      <p>Fully responsive CSS flip book, thanks to the <code>cqmin</code> unit.</p>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <p>Even more, the book height is dicated by the amount of content in the tallest page.
                        The only thing you need to take care of is how much text you put into a page.</p>
                    </div>
                    <div className="back">
                      <img src= {"https://picsum.photos/id/24/600/600"} alt="Img 1"/>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <h2>JS at its minimum</h2>
                      <p>JavaScript is at its minimum. Basically it's only used to set the initial
                        page index and assign click listeners to the pages. Modifies the CSS <b>Var</b>
                        for the <i>current</i> page, and the rest is handled entirely by CSS.</p>
                  </div>

                  <div className="back">
                      <p>Additionally JavaScript allows you to click on an anchor link in your
                        text — without turning the page. You can also have multiple independent
                        flip books in a single document. You're all covered.</p>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <h2>Crafting CSS magic</h2>
                      <p>The opened (<i>viewing</i>) pages of the flip book are always kept at the same elevation.
                      This is necessary if your book has no inclination (is top-down-view).
                      Have you noticed that you can also click on the pages edge? CSS will nicely animate the group
                        of pages to skip with a staggered animation.</p>
                    </div>
                    <div className="back">
                      <p>Like in this demo, you can change the perspective of the parent container and change the
                        X axis rotation of the book for extra effect.</p>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <p>The necessary FlipBook's CSS is barely 30 lines, there is no swipe, natural page flip angling,
                        complex shadows, etc. in order to keep it as simple as possible.</p>
                    </div>
                    <div className="back">
                      <p>Feel free to use and abuse this code. Drop me a line if you find it cool or useful, or just
                        want to say <i>hi</i>.</p>
                    </div>
                  </div>

                  <div className="page">
                    <div className="front">
                      <img src="https://picsum.photos/id/1073/600/600" alt="Img 2"/>
                    </div>
                  <div className="back cover"/>
                  </div>
          </div>
        </div>

        );
      }        
  }

export default Book