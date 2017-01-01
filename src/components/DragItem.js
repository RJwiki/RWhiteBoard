import React, { Component, PropTypes } from 'react'

class DragItem extends Component{
    onDrop(e) {
        console.log('onDrop:' + this.props.rowId + ", " +  this.props.colId);
        console.log(e);
    }
    render(){ 
        const { rowId, colId, children, item } = this.props; 
        const onDrop = this.onDrop;
        return (
            <Draggable type="ticket" data={ {rowId, colId, itemId } }>
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
