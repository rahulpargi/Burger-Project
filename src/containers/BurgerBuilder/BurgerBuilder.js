import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Auxx from '../../hoc/auxx'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENTS_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1,
    bacon:0.6
}


class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            cheese:0,
            bacon:0,
            meat:0,
        },
        totalPrice: 4,
        purchaseable:false,
        purchasing:false,
    }

    updatePurchaseState (ingredients){
        
        const sum = Object.keys(ingredients)
                    .map(igKey =>{
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum + el;
                    },0);
        this.setState({purchaseable: sum > 0})
    }
    addIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);



    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        if( oldCount<=0){
            return ;
        }else{
        const priceSubtraction  = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        }
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{
        alert('You Continue:')
    }
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
           // console.log(disabledInfo[key])
        }
        return(
           <Auxx>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice} />
               </Modal>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls
                ingredientAdded={this.addIngredientsHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabledd={disabledInfo}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
                purchaseable={this.state.purchaseable}
               />
           </Auxx>
        );
    }
}

export default  BurgerBuilder;