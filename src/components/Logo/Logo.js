import React from 'react';
import classes from './Logo.css'

import Image from '../../assets/images/burger-logo.png'

const logo = (props) =>(
    <div className={classes.Logo}>
        <img src={Image} alt="images"/>
    </div>
);


export default logo;