import React, { Component, useEffect, useState, setState } from "react";
import ANCESTORS from "../assets/ansestors";
import person from '../assets/icons/person.png'
import { Link } from "react-router-dom";




const TreeIndexPage = () => {

    // const [top, setTop] = useState(365);

    // const spacingTop = () => {

    //     var dividerPosition = document.getElementsByClassName('tree-divider')[0].getBoundingClientRect()
    //     // setTop({top:dividerPosition.height});
    //     console.log(dividerPosition)
    //     return dividerPosition.height
    // }

    // useEffect(() => {
    //     // Handler to call on window resize
    //     function handleResize() {
    //         // Set window width/height to state
    //         let TOP = spacingTop()
    //         setTop({
    //             top: TOP
    //         });
    //     }
    //     // Add event listener
    //     window.addEventListener("resize", handleResize);
    //     // Call handler right away so state gets updated with initial window size
    //     handleResize();
    //     // Remove event listener on cleanup
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []); // Empty array ensures that effect is only run on mount


    // let margin = top;


    return (

        <React.Fragment>

            <div className="family-tree-index-page pb-5"
                // style={{
                //     position: 'relative',
                //     top: `${margin.top}px`
                // }}
                >

                <h1> FAMILY TREE PAGE</h1>

                <div className='container'>



                    {
                        ANCESTORS.map((ancestor, index) => {

                            return (
                                <div key={index} className={index % 2 == 0 ? ' d-flex flex-row-reverse  row pt-2 pb-2 projects-row-container' : 'row pt-2 pb-2 projects-row-container'}>


                                    <div className=' col-lg-6 col-sm-12 pb-2' >

                                        <Link
                                            to={"/family-tree-index/" + ancestor.name.replace(/\s/g, '')} >

                                            <div className=' ancestor-card'>
                                                <div className='m-1'>
                                                    {ancestor.name}
                                                </div>

                                                <div className="row d-flex justify-content-center">
                                                    <div className='person-container'>


                                                        <img src={person}
                                                            style={{ width: '100%' }}
                                                        />

                                                    </div>
                                                </div>


                                            </div>
                                        </Link>
                                    </div>

                                    <div className=' col-lg-6 col-sm-12 pb-2 ancestor-short-desciption'>
                                        {ancestor.shortDescription}
                                    </div>
                                </div>
                            );
                        })
                    }




                </div>




            </div>

        </React.Fragment>

    );



};

export default TreeIndexPage