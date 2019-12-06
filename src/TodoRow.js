import React, { Component } from 'react';

export class TodoRow extends Component{
    //below we define the value for the onChange event prop
    //as a call back function, this is how child components are able to 
    //communicate with parents. They cannont update the value of the props passed to them
    //from a parent component becuase  react only supports one way data flow
    //(from parent to child)
    //however the parent can provide a function property that children can call
    //when something important happens.

    //Two diiferent types of props
    //data props allows parents to pass data to children
    //function allows the child to communicate to the parent 

    render = () =>
    <tr>
        <td>{this.props.item.action}</td>
        <td>
            <input type="checkbox" checked={this.props.item.done}
            onChange={ () => this.props.callback(this.props.item)}/>
        </td>
    </tr>

}