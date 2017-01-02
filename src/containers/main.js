import React, { Component, PropTypes } from 'react'
import WhiteBoard from '../components/WhiteBoard'
import NavBar from '../components/NavBar'

class main extends Component{
    render(){ 
        return (<div>
            <NavBar />
            <WhiteBoard />
        </div>
            );
    }
}
 
export default main; 
