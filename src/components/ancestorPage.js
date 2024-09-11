import React from "react";
import person from '../assets/icons/person.png'
import { Link } from "react-router-dom";



const AncestorPage = (props) => {
 

    return (

        <React.Fragment>

            <div className="family-tree-index-page pb-5">

                <h1> FAMILY TREE PAGE</h1>

                <div className='container'>

                    {
                        props.ancestors.map((ancestor, index) => {

                            return (
                                <div key={index} className={index % 2 == 0 ? ' d-flex flex-row-reverse  row pt-2 pb-2 projects-row-container' : 'row pt-2 pb-2 projects-row-container'}>


                                    <div className=' col-lg-6 col-sm-12 pb-2' >

                                        <Link
                                            
                                            to={ "/ancestors/" + ancestor.name.replace(/\s/g, '') } 
                                            
                                            >

                                            <div className=' ancestor-card'>
                                                
                                                <div className='m-1'>
                                                    {ancestor.name}
                                                </div>

                                                <div className="row d-flex justify-content-center">

                                                    <div className='person-container'>

                                                        {
                                                            //if the ancestor has an image associted with
                                                            ancestor.image                                                             
                                                            ?
                                                            // then return it's image
                                                            <img  src={ancestor.image}
                                                            style={{ width: '100%', borderRadius:"100%"}}
                                                            />
                                                            :
                                                            // otherwise use placeholder
                                                            <img  src={person}
                                                            style={{ width: '100%' }}
                                                            />
                                                        
                                                        }
                                                      

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

export default AncestorPage