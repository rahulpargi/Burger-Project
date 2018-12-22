import React from 'react';

import Auxx from '../../../hoc/Auxx/auxx';
import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component{

    componentWillUpdate(){
        console.log('[Order Summary will update] ordersummary.js')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey=>{
            return <li key={igKey}>
           
                    
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>
        });
        return(
            <Auxx>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxx>
        );
    }
}

export default  OrderSummary;