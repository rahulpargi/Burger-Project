import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const  burger = (props)=> {
    //converting object to  array keys() extract key from array and converts into arraty

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
               return  <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[]);
        //reduce allows to turn array to something else
        console.log(transformedIngredients)

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};

export  default burger;