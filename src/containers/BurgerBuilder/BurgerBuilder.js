import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Auxx from '../../hoc/Auxx/auxx'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import axios  from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENTS_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1,
    bacon:0.6
}


class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        totalPrice: 4,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error: false
    }

    componentDidMount(){
        axios.get('https://burgerproject-666a3.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
            //console.log(response.data)
        })
        .catch(error=>{
            this.setState({error:true})
        })
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
        // alert('You Continue:')
        this.setState({loading:true});
        const order = {
            ingredients:this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'pags',
                address:{
                    street: 'Test Street',
                    zipCode: '784',
                    country: 'USA'
                },
                email: 'rest@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false,purchasing:false});
            
        })
        .catch(error=>{
            this.setState({loading:false,purchasing:false});
        });

    }
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
           // console.log(disabledInfo[key])
        }
        let orderSummary = null;
        
        
     
        let burger =this.state.error?<p>Ingredients Cant  be added</p>:<Spinner/>;

        if(this.state.ingredients){
             burger=(
                <Auxx>
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
            orderSummary=  <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.state.totalPrice} />
        }
        if(this.state.loading){
            orderSummary = <Spinner/>;

        }
        
        return(
           <Auxx>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
              
               </Modal>
               {burger}
               
           </Auxx>
        );
    }
}

export default  WithErrorHandler(BurgerBuilder,axios);