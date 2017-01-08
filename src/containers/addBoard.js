import React, { Component, PropTypes } from 'react'
import NavBar from '../components/NavBar'
import AddBoardForm from '../components/AddBoardForm'

class addBoard extends Component{
    render(){ 
        return (<div>
            <NavBar />
            <div className="container">
                <AddBoardForm />
            </div>
        </div>
        );
    }
}
 
export default addBoard; 
