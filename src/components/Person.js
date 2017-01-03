import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { updateItem } from '../actions/board'

class Person extends Component{
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
        const { itemId, item, dispatch } = this.props; 
        const getValueWithDefault = function(s, defaultValue = ''){
            return (s) ? s : defaultValue
        }
        dispatch(change('Person', 'itemId', itemId));
        dispatch(change('Person', 'type', item.type));
        dispatch(change('Person', 'name', getValueWithDefault(item.name)));
        dispatch(change('Person', 'departemt', getValueWithDefault(item.departemt)));
        this.setState({ isEdit: true });
    }
    onCancelClick(){
        this.setState({ isEdit: false });
    }
    onOKClick(){
        const { formValue, itemId } = this.props; 
        updateItem(Object.assign({}, formValue, { type: 1, itemId: itemId})); 
        this.setState({ isEdit: false });
    }
	componentDidMount(){
	}

    render(){ 
        const { itemId, item, selectedPersonType } = this.props; 
        const { onEditClick, onOKClick, onCancelClick } = this;

        const PersonClass = ((this.state.isEdit) ? 'rj-person-edit' : "card") +  " card-inverse rj-person";
        return (
                <div className={PersonClass} >
                        {
                            (this.state.isEdit) ? 
                            <div className="card-block">

                                <div className="form-group">
                                    <label>{ i18n.name }</label>
                                    <Field name="name" component="input" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>{ i18n.departemt }</label>
                                    <Field name="departemt" component="input" type="text" className="form-control" />
                                </div>
                                <p className="rj-person-btn"><a href = "#" onClick = {onOKClick}>OK</a>&nbsp;<a href = "#" onClick = {onCancelClick} >Cancel</a></p>
                            </div>
                             : 
                            <div className="card-block">
                                <p className="rj-text-center"><span className="glyphicon glyphicon-user rj-icon-user" /></p>                
                                { (item.name) && <p  className="card-title"><a className="card-title rj-person-title" href = { item.name } target="_blank">{ item.name }</a></p> }
                                { (item.departemt) && <p className="card-text">{ item.departemt }</p> }
                                <p className="rj-person-btn"><a href = "#" onClick = {onEditClick}>Edit</a></p>
                            </div>
                        }
                </div>
        );
    }
}

Person.propTypes = { 
    itemId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
} 

 //export default RAccountForm
//Convert to Redux-Form
Person = reduxForm({
    form: 'Person'
})(Person)


const selector = formValueSelector('Person')

export default connect(
  state => ({
       formValue: selector(state, 'name', 'departemt')
    })
)(Person)
