import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { createBoard } from '../actions/board'
import { browserHistory, Link } from 'react-router'
import { IMPORT_TICKET_JSON_URL } from '../constants'
import { getBaseUrl, isBlankString } from '../utils'

const BASE_URL = getBaseUrl(true);

class TicketImport extends Component{
    constructor(){ 
		super(); 
        this.onImportClick = this.onImportClick.bind(this);
	}
	componentDidMount(){
        const { dispatch } = this.props;
	}
    onImportClick(){
        const { dispatch, formValue } = this.props;

    }

    render(){ 
        const { list, rowFix, columnFix } = this.props; 
        return (
            <div>
                <div className="form-group">
                    <label>{ i18n.name }:</label>
                    <Field name="name" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.itemType }:</label>
                    <div>
                        <label><Field name="type" component="input" type="radio" value="0"/> { i18n.ticket }</label>&nbsp;&nbsp;
                        <label><Field name="type" component="input" type="radio" value="1"/> { i18n.person }</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>{ i18n.row }:</label>
                    <p><label><Field name="rowShowHeader" component="input" type="checkbox" />{ i18n.showRowHeader }</label></p>
                    <p><label><Field name="rowFix" component="input" type="checkbox" />{ i18n.fixRow }</label></p>
                    {(rowFix) && <Field name="rowNum" component="input" type="number" className="form-control" />}
                </div>
                <div className="form-group">
                    <label>{ i18n.column }:</label>
                    <p><label><Field name="columnShowHeader" component="input" type="checkbox" />{ i18n.showColumnHeader }</label></p>
                    <p><label><Field name="columnFix" component="input" type="checkbox"/>{ i18n.fixColumn }</label></p>
                    {(columnFix) && <Field name="columnNum" component="input" type="number" className="form-control" />}
                </div>
                <div className="form-group">
                    <label>{ i18n.numOfExtraContainers }:</label>
                    <Field name="containerNum" component="input" type="number" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.addRowLabel }:</label>
                    <Field name="addRowLabel" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.addColumnLabel }:</label>
                    <Field name="addColumnLabel" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.addItemLabel }:</label>
                    <Field name="addItemLabel" component="input" type="text" className="form-control" />
                </div>
                <button onClick={ this.onImportClick } className="btn btn-default">{ i18n.add }</button>
            </div>
        );
    }
}

TicketImport = reduxForm({
    form: 'TicketImport'
})(TicketImport)

const selector = formValueSelector('TicketImport')

export default connect(
  state => ({
       formValue: selector(state, 'name', 'type', 'rowShowHeader', 'rowFix', 'rowNum', 'columnShowHeader', 'columnFix', 'columnNum', 'containerNum', 'addRowLabel', 'addColumnLabel', 'addItemLabel'),
       rowFix: selector(state, 'rowFix'),
       columnFix: selector(state, 'columnFix')
    })
)(TicketImport)
