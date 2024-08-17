import { Link

 } from "react-router-dom";
const LinkBtnComponent =(props)=>{
    return (

        <div className = 'container d-flex justify-content-center mr-2'>

        <ul>
            <li>
            < Link to = {props.pathName}  className='animated-arrow' href='https://google.com'>
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