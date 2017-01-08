import React, { Component, PropTypes } from 'react'
import NavBar from '../components/NavBar'
import BoardList from '../components/BoardList'
import { Link } from 'react-router'
import { getBaseUrl } from '../utils'

const BASE_URL = getBaseUrl(true);

class list extends Component{
    render(){ 
        return (<div>
            <NavBar />
            
            <div className="container">
                <p>
                    <Link type="button" className="btn btn-default rj-btns" to={ BASE_URL + '/addBoard' }>Create New Board</Link>
                </p>
                <br />
                <BoardList />
            </div>
        </div>
        );
    }
}
 
export default list; 
