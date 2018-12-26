import React,{Component} from 'react';
import classes from './Modal.css';
import Auxx from '../../../hoc/Auxx/auxx';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component{
    
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show ||nextProps.children!== this.props.children;
        
       
    }
    componentWillUpdate(){
        console.log('modal')
    }
    render(){
        return(
            <Auxx>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
    <div 
        className={classes.Modal}
        style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity:this.props.show ? '1':'0'
        }}>
        {this.props.children}
    </div>
    </Auxx>
        );
    }
};


export default Modal;