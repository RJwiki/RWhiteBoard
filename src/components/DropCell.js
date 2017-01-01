import React, { Component, PropTypes } from 'react'

class DropCell extends Component{
    onDrop(e) {
        console.log('onDrop:' + this.props.rowId + ", " +  this.props.colId);
        console.log(e);
    }
    render(){ 
        const { rowId, colId, children } = this.props; 
        const onDrop = this.onDrop;
        return (<td><Droppable className="rj-droppable" types={['ticket']} onDrop={ onDrop } >{children}</Droppable></td>);
    }
}

DropCell.propTypes = { 
    rowId: React.PropTypes.string.isRequired,
    colId: React.PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
} 

 
export default DropCell; 
