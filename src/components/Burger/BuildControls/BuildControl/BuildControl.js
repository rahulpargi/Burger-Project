import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.Label}</div>
        <button className={classes.Less} 
            onClick={props.removed}
            disabled={props.disabledd}>-</button>
        <button className={classes.More} onClick={props.added}>+</button>
        
    </div>
);

export default buildControl;