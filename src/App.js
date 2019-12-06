import React, { Component } from 'react';

//above you have brought in or imported two things
//1) the default functionality (export) from the React oackage and assigned that functionality to the name React
//2) The component class from the React package
//this is similar to using a statement in a C# controller
import { TodoBanner } from "./TodoBanner";
import { TodoRow } from "./TodoRow";
import { TodoCreator } from "./TodoCreator";
import { VisibilityControl } from "./VisibilityControl";
export default class App extends Component {
  //above we have created a class called App that extends the functionality 
  //of the component class inside of the React package.
  //The export keyword makes the class availabe for the use outside of the 
  //JS file where it is created
  //we are going to create state data for our component . To do that 
  //we need to create a ctor method. This method will get called when an 
  //object is created using this class. Said another way,
  //this method will be called when the component is initialized
  constructor(props) {
    super(props);
    //React components have a special property called state which is what will will use to 
    //define state data. Calling on super(props) sets
    //our component up from the Component class in the React library
    //to be stateful (hold its own data)
    this.state = {
      userName: "Aaron",
      todoItems: [
        {
          action: "Buy Flowers",
          done: false
        },
        {
          action: "Get shoes",
          done: false
        },
        {
          action: "Collect tickets",
          done: true
        },
        {
          action: "Call Joe",
          done: false
        }
      ],
      showCompleted: true
    }
  }


  //We now need a way to change the state data for our component. We will create a method that can be 
  //caled on a button click to change the value of the user name prop of the state data.
  //We will use fat arrow syntax  - this allows function sto be expressed concisely. 
  // In the background what is really be doine is an anonymous function which means function without a name
  //is being created
  //the functionalit to toggle user name was removed from our final app
  //THE FUNCTION BELOW IS NOT BEING USED
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Aaron" ? "Bob" : "Aaron"
      //the above is a ternary opertator that says if the state of userName equals Aaron then it is changed 
      //to bob. If it does not Equal Aaron, then it is changed back to Jenna.
    })
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
    //we use the setState() here becuase state data should not
    //be updated directly. When setState is called the components
    //state data is updated with new values and then the render()
    //is caleed (invoked) so that the UI will be updated.
  }
  createNewTodo = (task) => {
    if (!this.state.todoItems.find(x => x.action === task)) {
      //The above searches the existing todoItems for an action that mataches
      //the text that the users typed into the input and was captured
      //in the newitemtext state property. This allows use to prevent duplicate entries.
      this.setState({
        todoItems: [
          ...this.state.todoItems, {
            action: task,
            done: false
          }
        ]
      },
        () => localStorage.setItem("todos", JSON.stringify(this.state)));

      //The above uses the spread operator, it says add what was
      //already there in the array and then add on one more addtional
      //object that has new information.
    }
  }

  //we have been focusing on embedding JS expression in 
  //fragements of HTML. However, since JSX allows us to freely mix
  //HTML like syntax and JS , we can create methods that can return 
  //HTML content.

  //The map function below allows use to generate a sequence of html for eeaach todo
  //item in our state object
  //The key attribute in the <tr> tag allows React to keep track of which 
  //items are updated to avoid unnecessary re-rendering which causes
  //performance hits.
  todoTableRows = (doneValue) => this.state.todoItems
    .filter(item => item.done === doneValue)
    .map(item =>
      <TodoRow key={item.action} item={item}
        callback={this.toggleTodo} />
    );


  toggleTodo = (todo) => this.setState(
    {
      todoItems: this.state.todoItems.map(
        item => item.action === todo.action ?
          { ...item, done: !item.done } : item
      )
    },
    () => localStorage.setItem("todos", JSON.stringify(this.state))
  );
  //lifecycle event for a component that is triggered when the 
  //component is mounted to the DOM
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ?
      JSON.parse(data) :
      {
        userName: "Aaron",
        todoItems: [
          {
            action: "Buy Flowers",
            done: false
          },
          {
            action: "Get shoes",
            done: false
          },
          {
            action: "Collect tickets",
            done: true
          },
          {
            action: "Call Joe",
            done: false
          }
        ],
        showCompleted: true

      }
    )
  }




  //When you use the fat arrow syntax you do not have to use the return keyword or 
  //put curly braces around the body of the function.
  render = () =>

    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Done</th>
        </thead>
        <tbody>{this.todoTableRows(false)}</tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl description="Completed Tasks"
          isChecked={this.state.showCompleted}
          callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>
      {
        this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
        </table>
      }
    </div>
}

