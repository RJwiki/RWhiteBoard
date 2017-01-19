import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { createBoard } from '../actions/board'
import { browserHistory, Link } from 'react-router'

import { getBaseUrl, isBlankString } from '../utils'

const BASE_URL = getBaseUrl(true);

class AddBoardForm extends Component{
    constructor(){ 
		super(); 
        this.onAddClick = this.onAddClick.bind(this);
	}
	componentDidMount(){
        const { dispatch } = this.props;
        dispatch(change('AddBoardForm', 'type', "0"));
        dispatch(change('AddBoardForm', 'rowShowHeader', true));
        dispatch(change('AddBoardForm', 'columnShowHeader', true));
	}
    onAddClick(){
        const { dispatch, formValue } = this.props;
        let data = {
            type: (formValue.type === "1") ? 1 : 0,
            rowShowHeader: (formValue.rowShowHeader === true),
            columnShowHeader: (formValue.columnShowHeader === true),
            containerNum: (formValue.containerNum && formValue.containerNum > 0) ? formValue.containerNum : 0
        };

        if (isBlankString(formValue.name)) {
            toastr.warning(i18n.warn_msg_name_empty); 
            return;
        }else {
            data.name = formValue.name;
        }

        if (formValue.rowFix){
            if (formValue.rowNum > 0) {
                data.rowFix = formValue.rowNum;
            }else{
                toastr.warning(i18n.warn_msg_row_num_lessthan1); 
                return;
            }
        }else{
            data.rowFix = -1;
        }

        if (formValue.columnFix){
            if (formValue.columnNum > 0) {
                data.columnFix = formValue.columnNum;
            }else{
                toastr.warning(i18n.warn_msg_column_num_lessthan1); 
                return;
            }
        }else{
            data.columnFix = -1;
        }

        if (!isBlankString(formValue.addRowLabel)) {
            data.addRowLabel = formValue.addRowLabel;
        }
        if (!isBlankString(formValue.addColumnLabel)) {
            data.addColumnLabel = formValue.addColumnLabel;
        }
        if (!isBlankString(formValue.addItemLabel)) {
            data.addItemLabel = formValue.addItemLabel;
        }


        createBoard(data);
        toastr.success(i18n.msg_board_created);
        browserHistory.push(BASE_URL + '/');
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
                <button onClick={ this.onAddClick } className="btn btn-default">{ i18n.add }</button>
            </div>
        );
    }
}

AddBoardForm = reduxForm({
    form: 'AddBoardForm'
})(AddBoardForm)

const selector = formValueSelector('AddBoardForm')

export default connect(
  state => ({
       formValue: selector(state, 'name', 'type', 'rowShowHeader', 'rowFix', 'rowNum', 'columnShowHeader', 'columnFix', 'columnNum', 'containerNum', 'addRowLabel', 'addColumnLabel', 'addItemLabel'),
       rowFix: selector(state, 'rowFix'),
       columnFix: selector(state, 'columnFix')
    })
)(AddBoardForm)
