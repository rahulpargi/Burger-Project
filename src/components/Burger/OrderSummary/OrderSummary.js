import React from 'react';

import Auxx from '../../../hoc/auxx';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                    </li>
        })
  
    return (
        <Auxx>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxx>
    )
}

export default  orderSummary;