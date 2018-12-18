import React from 'react';
import Auxx from '../../hoc/auxx'
import classes from './Layout.css'
import ToolBar from '../Navigation/ToolBar/ToolBar'
const layout = (props) =>(
    <Auxx>

        <div>
            <ToolBar/> SideDrawer, Backgrop
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxx>
);


export default layout;