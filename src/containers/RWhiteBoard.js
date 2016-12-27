import React from 'react'

import { Draggable, Droppable } from 'react-drag-and-drop'

let DropCell = React.createClass({
    onDrop: function(e){
        console.log('onDrop');
        console.log(e);
    },
    render: function() {
        return (<td><Droppable className="rj-droppable" types={['ticket']} onDrop={ this.onDrop } >{this.props.children}</Droppable></td>);
    }
});

let DragItem = React.createClass({

    render: function() {
        return (
            <Draggable type="ticket" data={ this.props.name }>
                <div className="card card-inverse card-primary" >
                    <div className="card-block">
                        <h4 className="card-title">{ this.props.name }</h4>
                        <p className="card-text">Ticket Title</p>
                        <p className="card-text">3</p>
                    </div>
                </div>
            </Draggable>
        );
    }
});

let RWhiteBoard = React.createClass({
    onDrop: function(e){
        console.log('onDrop');
        console.log(e);
    },
	render: function() {
        return (
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Open</th>
                        <th>In Progress</th>
                        <th>Done</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <h4>RJ</h4>
                            <p>2h</p>
                        </td>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                    </tr>
                    <tr>
                        <td>
                            <h4>RJ #2</h4>
                            <p>5h</p>
                        </td>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                    </tr>
                    <tr>
                        <td>
                            <h4>RJ #3</h4>
                            <p>25h</p>
                        </td>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                        <DropCell></DropCell>
                    </tr>
                    </tbody>
                </table>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Released</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                        <DragItem name='di001' />
                        <DragItem name='di002' />
                        <DragItem name='di003' />
                         </td>
                        <td>
                        <DragItem name='di004' />
                        <DragItem name='di005' />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            );
	}
});



export default RWhiteBoard
