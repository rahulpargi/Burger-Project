import React from 'react';
import classes from './Logo.css'

import Image from '../../assets/images/burger-logo.png'

const logo = (props) =>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={Image} alt="images"/>
    </div>
);


export default logo;