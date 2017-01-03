import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n' 
import { updateRow } from '../actions/board'

class RowHeader extends Component{
    constructor(){ 
		super(); 
        // Set up initial state
        this.state = {
            isEdit: false
        };

        this.onEditClick = this.onEditClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onOKClick = this.onOKClick.bind(this);
	}
    onEditClick(){
        const { rowId, item, dispatch } = this.props; 

        dispatch(change('RowHeader', 'rowId', rowId));
        dispatch(change('RowHeader', 'name', item.name));
        dispatch(change('RowHeader', 'hours', item.hours));

        this.setState({ isEdit: true });
    }
    onCancelClick(){
        this.setState({ isEdit: false });
    }
    onOKClick(){
        const { formValue, rowId } = this.props; 
        updateRow(Object.assign({}, formValue, { rowId: rowId})); 
        this.setState({ isEdit: false });
    }
	componentDidMount(){
	}
    render(){ 
        const { rowId, item, children } = this.props; 
        const { onEditClick, onOKClick, onCancelClick } = this;
        return (<td className="rj-row-header-td">
                {
                    (this.state.isEdit) ? 
						<div className="rj-row-header">        
							<div className="form-group">
								<label>{ i18n.name }</label>
								<Field name="name" component="input" type="text" className="form-control" />
							</div>
							<div className="form-group">
								<label>{ i18n.hours }</label>
								<Field name="hours" component="input" type="number" className="form-control" />
							</div>
							<p className="rj-row-header-btn"><a href = "#" onClick = {onOKClick}>OK</a>&nbsp;&nbsp;<a href = "#" onClick = {onCancelClick} >Cancel</a></p>
						</div>
                     : 
						<div className="rj-row-header">                    
                            
							{ (item.name) && <p className="rj-row-header-title"><span className="glyphicon glyphicon-user rj-icon-user" />&nbsp;&nbsp;{ item.name }</p> }
							{ (item.hours) && <p className="rj-row-header-text">{ item.hours } hours</p> }
							<p className="rj-row-header-btn"><a href = "#" onClick = {onEditClick}>Edit</a></p>
						</div>
                }
        </td>);
    }
}

RowHeader.propTypes = { 
    rowId: PropTypes.string.isRequired
} 

RowHeader = reduxForm({
    form: 'RowHeader'
})(RowHeader)


const selector = formValueSelector('RowHeader')

export default connect(
  state => ({
       formValue: selector(state, 'rowId', 'name', 'hours')
    })
)(RowHeader)
