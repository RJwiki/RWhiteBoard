import React, { Component, PropTypes } from 'react'
import { Droppable } from 'react-drag-and-drop'
import { deleteItem } from '../actions/board'
import i18n from '../i18n'

class DropDelete extends Component{
    constructor(){ 
		super(); 
        this.onDrop = this.onDrop.bind(this);
	}
    onDrop(e) {
        const from = JSON.parse(e.ticket);
        deleteItem({ from: from, itemId: from.itemId });
        this.onDrop = this.onDrop.bind(this);
    }
    render(){ 
        const { container, children } = this.props; 
        const onDrop = this.onDrop;
        return (
                <table className="table table-bordered">
					{
						<thead>
							<tr>
                                <th>{ i18n.delete }</th>
							</tr>
						</thead>
					}
                    <tbody>
                        <tr className="rj-droppable-tr">
                            <td className="rj-droppable-td"><Droppable className="rj-droppable" types={['ticket']} onDrop={ onDrop } ></Droppable></td>
                        </tr>
                    </tbody>
                </table>
            
            );
    }
}

export default DropDelete; 
