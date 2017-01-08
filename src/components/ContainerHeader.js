import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n' 
import { updateContainer } from '../actions/board'

class ContainerHeader extends Component{
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
        const { containerId, item, dispatch } = this.props; 

        dispatch(change('ContainerHeader', 'containerId', containerId));
        dispatch(change('ContainerHeader', 'name', item.name));

        this.setState({ isEdit: true });
    }
    onCancelClick(){
        this.setState({ isEdit: false });
    }
    onOKClick(){
        const { formValue, containerId } = this.props; 
        updateContainer(Object.assign({}, formValue, { containerId: containerId})); 
        this.setState({ isEdit: false });
    }
	componentDidMount(){
	}
    render(){ 
        const { containerId, item, children } = this.props; 
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

ContainerHeader.propTypes = { 
    containerId: PropTypes.string.isRequired
} 

ContainerHeader = reduxForm({
    form: 'ContainerHeader'
})(ContainerHeader)


const selector = formValueSelector('ContainerHeader')

export default connect(
  state => ({
       formValue: selector(state, 'containerId', 'name')
    })
)(ContainerHeader)
