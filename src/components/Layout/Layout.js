import React from 'react';
import Auxx from '../../hoc/auxx'
import classes from './Layout.css'
const layout = (props) =>(
    <Auxx>
        <div>
            Toolbar, SideDrawer, Backgrop
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxx>
);


export default layout;