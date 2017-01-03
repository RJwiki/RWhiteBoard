import React, { Component, PropTypes } from 'react'
import { Droppable } from 'react-drag-and-drop'
import { moveItem } from '../actions/board'

class DropCell extends Component{
    constructor(){ 
		super(); 
        this.onDrop = this.onDrop.bind(this);
	}
    onDrop(e) {
        const { rowId, colId } = this.props; 
        const from = JSON.parse(e.ticket);
        moveItem({ from: from, to: { rowId, colId }, itemId: from.itemId });
        this.onDrop = this.onDrop.bind(this);
    }
    render(){ 
        const { rowId, colId, children } = this.props; 
        const onDrop = this.onDrop;
        return (<td className="rj-droppable-td"><Droppable className="rj-droppable" types={['ticket']} onDrop={ onDrop } >{children}</Droppable></td>);
    }
}

DropCell.propTypes = { 
    rowId: PropTypes.string.isRequired,
    colId: PropTypes.string.isRequired
} 

 
export default DropCell; 
