import React, { Component, PropTypes } from 'react'
import { Draggable } from 'react-drag-and-drop'
import Ticket from './Ticket'

class DragItem extends Component{
    constructor() { 
		super(); 
	}
    render() { 
        const { rowId, colId, container, itemId, item } = this.props; 
        const data = JSON.stringify({rowId, colId, itemId, container });
        return (
            <Draggable type="ticket" data={ data }>
                <Ticket itemId={ itemId } item={ item } />
            </Draggable>
        );
    }
}

DragItem.propTypes = { 
    itemId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
} 

 
export default DragItem; 
