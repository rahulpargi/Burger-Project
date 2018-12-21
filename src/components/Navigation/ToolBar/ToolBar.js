import React from 'react';
import classes from './ToolBar.css';
import Logo  from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props)=>(
    <header className={classes.ToolBar}>
        <div className={classes.DrawerToggle} onClick={props.open}>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div className={classes.Logo}><Logo /></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;