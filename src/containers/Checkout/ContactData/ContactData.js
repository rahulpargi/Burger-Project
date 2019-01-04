import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import  classes from './ContactData.css';
import axios  from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state={
       orderForm:{
      
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your  Name'
                },
                value:''
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:''
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:''
            },
       },
        loading:false
    }
    
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'pags',
                address:{
                    street: 'Test Street',
                    zipCode: '784',
                    country: 'USA'
                },
                email: 'rest2@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/')
            
        })
        .catch(error=>{
            this.setState({loading:false});
        });
    }

    inputChangedHandler=(event)=>{
        console.log(event.target.value)
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form >
           
            {formElementsArray.map(formElement=>(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={this.inputChangedHandler}
                    />
            ))}
            
            <Button inputtype="input" btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Information</h4>
               {form}
            </div>
        );
    }
}

export default ContactData;