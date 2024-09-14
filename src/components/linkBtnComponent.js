import { Link } from "react-router-dom";

// link button for landing page for user to navigate to author page

const LinkBtnComponent =(props)=>{
    return (

        <div className = 'container d-flex justify-content-center mr-2'>

        <ul>
            <li>
            < Link to = {props.pathName}  className='animated-arrow' href='https://4michael1angelo5.github.io/voices/author'>
                <span className='the-arrow -left'>
                <span className='shaft'></span>
                </span>
                <span className='main'>
                <span className='text'>                    
                    {props.text}
                </span>
                <span className='the-arrow -right'>
                    <span className='shaft'></span>
                </span>
                </span>
            </Link>
            </li>
        </ul>
        </div>

    );
}

export default LinkBtnComponent