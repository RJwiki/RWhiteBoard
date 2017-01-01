import React, { Component, PropTypes } from 'react'
import { Droppable } from 'react-drag-and-drop'
import { moveItem } from '../actions/board'

class DropCell extends Component{
    onDrop(e) {
        //const { rowId, colId, children } = this.props; 
        //console.log('onDrop:' + rowId + ", " + colId);
        const { rowId, colId } = this.props; 
        //console.log('target: '+ rowId + ' , ' + colId);
        //console.log(e);
        //console.log(JSON.parse(e.ticket));
        const from = JSON.parse(e.ticket);
        moveItem({ from: from, to: { rowId, colId }, itemId: from.itemId });

    }
    render(){ 
        const { rowId, colId, children } = this.props; 
        const onDrop = this.onDrop;
        console.log('children');
        console.log(children);
        console.log(this.props);
        return (<td><Droppable className="rj-droppable" types={['ticket']} onDrop={ onDrop.bind(this) } >{children}</Droppable></td>);
    }
}

DropCell.propTypes = { 
    rowId: React.PropTypes.string.isRequired,
    colId: React.PropTypes.string.isRequired
} 

 
export default DropCell; 
