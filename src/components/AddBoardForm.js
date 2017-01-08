import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { loadList } from '../actions/list'
import { Link } from 'react-router'

import { getBaseUrl } from '../utils'

const BASE_URL = getBaseUrl(true);

class AddBoardForm extends Component{
    constructor(){ 
		super(); 
        this.onAddClick = this.onAddClick.bind(this);
	}
	componentDidMount(){
        const { dispatch } = this.props;
	}
    onAddClick(){

    }

    render(){ 
        const { list } = this.props; 
        return (
            <div>
                <div className="form-group">
                    <label>{ i18n.name }:</label>
                    <Field name="name" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.row }:</label>
                    <p><label><Field name="rowShowHeader" component="input" type="checkbox" />{ i18n.showRowHeader }</label></p>
                    <p><label><Field name="rowFix" component="input" type="checkbox" />{ i18n.fixRow }</label></p>
                    <Field name="rowNum" component="input" type="number" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.column }:</label>
                    <p><label><Field name="columnShowHeader" component="input" type="checkbox" />{ i18n.showColumnHeader }</label></p>
                    <p><label><Field name="columnFix" component="input" type="checkbox"/>{ i18n.fixColumn }</label></p>
                    <Field name="columnNum" component="input" type="number" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.numOfExtraContainers }:</label>
                    <Field name="containerNum" component="input" type="number" className="form-control" />
                </div>
                <button onClick={ this.onAddClick } className="btn btn-default">{ i18n.add }</button>
            </div>
        );
    }
}

AddBoardForm = reduxForm({
    form: 'AddBoardForm'
})(AddBoardForm)


export default connect(
  state => ({
       //list: state.list.list
    })
)(AddBoardForm)
