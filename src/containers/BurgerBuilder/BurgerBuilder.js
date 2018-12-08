import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Auxx from '../../hoc/auxx'


class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            cheese:0,
            bacon:0,
            meat:0,
        }
    }
    
    render(){
        return(
           <Auxx>
               <Burger ingredients={this.state.ingredients}/>
               <div>Build control</div>
           </Auxx>
        );
    }
}

export default  BurgerBuilder;