import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { loadList } from '../actions/list'
import { Link } from 'react-router'

import { getBaseUrl } from '../utils'

const BASE_URL = getBaseUrl(true);

class BoardList extends Component{
    constructor(){ 
		super(); 
        
	}
	componentDidMount(){
        const { dispatch } = this.props;

        dispatch(loadList());
	}

    render(){ 
        const { list } = this.props; 

        console.log(list);
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>{ i18n.whiteBoard }</th>
                    <th style={{width: "90px"}}></th>
                </tr>
                </thead>
                <tbody>
                {
                    (list) && Object.keys(list).map(function (boardId) {
                        return  <tr key={'lst_' + boardId}>
                            <td><Link to={ BASE_URL + '/boards/' + boardId }>{list[boardId]}</Link></td>
                            <td style={{width: "90px"}}><a href="#" onClick={ () =>{alert('in progress')} } >{ i18n.delete } </a></td>
                        </tr>;
                    }, this)
                }
                </tbody>
            </table>
        );
    }
}


export default connect(
  state => ({
       list: state.list.list
    })
)(BoardList)
