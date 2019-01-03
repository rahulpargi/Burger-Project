import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom'

const  burger = (props)=> {
   // console.log(props)
    //converting object to  array keys() extract key from array and converts into arraty

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
               return  <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[]);
        if(transformedIngredients.length ===  0){
            transformedIngredients= <p>Please Start adding Ingredients</p>
        }
        //reduce allows to turn array to something else
        

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};

export  default withRouter(burger);