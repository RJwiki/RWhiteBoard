import React, { Component, PropTypes } from 'react'
import NavBar from '../components/NavBar'

class addBoard extends Component{
    render(){ 
        return (<div>
            <NavBar />
            <div className="container">
                <p>
                    In Progress
                </p>
            </div>
        </div>
        );
    }
}
 
export default addBoard; 
