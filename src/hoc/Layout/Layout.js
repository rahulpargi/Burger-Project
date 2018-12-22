import React,{Component} from 'react';
import Auxx from '../Auxx/auxx'
import classes from './Layout.css'
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class  Layout  extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler =()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Auxx>

        
                <ToolBar open={this.sideDrawerClosedHandler}/> 
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

        
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Auxx>
        );
    }
}


export default Layout;