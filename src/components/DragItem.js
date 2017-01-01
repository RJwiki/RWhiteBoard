import React, { Component, PropTypes } from 'react'
import { Draggable } from 'react-drag-and-drop'

class DragItem extends Component{
    constructor(){ 
		super(); 
	}
	componentDidMount(){ 

	}
    onDrop(e) {
        console.log('onDrop:' + this.props.rowId + ", " +  this.props.colId);
        console.log(e);
    }
    render(){ 
        const { rowId, colId, itemId, item } = this.props; 
        const onDrop = this.onDrop;
        const data = JSON.stringify({rowId, colId, itemId });
        return (
            <Draggable type="ticket" data={ data }>
                <div className="card card-inverse card-primary" >
                    <div className="card-block">
                        { (item.ticketNum) && <h4 className="card-title">{ item.ticketNum }</h4> }
                        { (item.name) && <p className="card-text">{ item.name }</p> }
                        { (item.storyPoint) && <p className="card-text">{ item.storyPoint }</p> }
                    </div>
                </div>
            </Draggable>
        );
    }
}

DragItem.propTypes = { 
    rowId: PropTypes.string.isRequired,
    colId: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
} 

 
export default DragItem; 
