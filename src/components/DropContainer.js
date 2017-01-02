import React, { Component, PropTypes } from 'react'
import { Droppable } from 'react-drag-and-drop'
import { moveItem } from '../actions/board'

class DropContainer extends Component{
    constructor(){ 
		super(); 
        this.onDrop = this.onDrop.bind(this);
	}
    onDrop(e) {
        const { container } = this.props; 
        const from = JSON.parse(e.ticket);
        moveItem({ from: from, to: { container }, itemId: from.itemId });
        this.onDrop = this.onDrop.bind(this);
    }
    render(){ 
        const { container, children } = this.props; 
        const onDrop = this.onDrop;
        return (<td className="rj-droppable-td"><Droppable className="rj-droppable" types={['ticket']} onDrop={ onDrop } >{children}</Droppable></td>);
    }
}

DropContainer.propTypes = { 
    container: PropTypes.string.isRequired
} 

 
export default DropContainer; 
