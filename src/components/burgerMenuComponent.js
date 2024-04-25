import React  from "react"; ; 

const Menu = (props)=>{

    console.log(props)
   

    return(
        <div id={"menu"}onClick={e=>props.toggle(e)}className= {props.isOpen? "menu menu-open " :"menu"} >
            <a>Hello World!</a>
            <a>Hello World!</a>
            <a>Hello World!</a>
            <a>Hello World!</a>
            
        </div>
    );
}
 




class BurgerMenu extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle=(e)=>{
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
        console.log(this.state.isOpen)
    }

    render(){
        return(
            <React.Fragment>

             <Menu  isOpen = {this.state.isOpen} toggle = {this.toggle}/> 
                           
            <div>
            <div onClick={e=>this.toggle(e)} id = "burger"className = {this.state.isOpen? "burger-menu open" : "burger-menu"}>
             <span className="bar"/>
             <span className="bar"/>
             <span className="bar"/>
             </div>   
            </div>
            

            </React.Fragment>
        )
    }

}

export default BurgerMenu