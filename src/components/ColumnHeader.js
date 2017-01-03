import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n' 
import { updateColumn } from '../actions/board'

class ColumnHeader extends Component{
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
        const { colId, item, dispatch } = this.props; 

        dispatch(change('ColumnHeader', 'colId', colId));
        dispatch(change('ColumnHeader', 'name', item.name));

        this.setState({ isEdit: true });
    }
    onCancelClick(){
        this.setState({ isEdit: false });
    }
    onOKClick(){
        const { formValue, colId } = this.props; 
        updateColumn(Object.assign({}, formValue, { colId: colId})); 
        this.setState({ isEdit: false });
    }
	componentDidMount(){
	}
    render(){ 
        const { colId, item, children } = this.props; 
        const { onEditClick, onOKClick, onCancelClick } = this;
        return (<th className="rj-col-header-th">
                {
                    (this.state.isEdit) ? 
						<div className="rj-col-header">        
							<div className="form-group">
								<label>{ i18n.name }</label>
								<Field name="name" component="input" type="text" className="form-control" />
							</div>
							<p className="rj-col-header-btn"><a href = "#" onClick = {onOKClick}>OK</a>&nbsp;&nbsp;<a href = "#" onClick = {onCancelClick} >Cancel</a></p>
						</div>
                     : 
						<div className="rj-col-header">                        
							{ (item.name) && <div className="rj-col-header-title">{ item.name }</div> }
							<div className="rj-col-header-btn"><a href = "#" onClick = {onEditClick}>Edit</a></div>
						</div>
                }
        </th>);
    }
}

ColumnHeader.propTypes = { 
    colId: PropTypes.string.isRequired
} 

ColumnHeader = reduxForm({
    form: 'ColumnHeader'
})(ColumnHeader)


const selector = formValueSelector('ColumnHeader')

export default connect(
  state => ({
       formValue: selector(state, 'colId', 'name')
    })
)(ColumnHeader)
