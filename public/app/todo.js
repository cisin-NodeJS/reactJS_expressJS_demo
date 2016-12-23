import React from 'react';
import ReactDOM from 'react-dom';
import TodoStore from './store/store.js'
import * as action from './action/action.js'
import request from 'superagent'
class Todo extends React.Component{
  constructor(){
    super();
    this.state={
      todos:[],
      comTodos:[]
    }
  }
  componentWillMount(){
// calling the Demo api using superagent
    var url="/data";
    request.get(url).then((response)=>{
      this.setState({
        todos:JSON.parse(response.text)
      })
    })
 
    var url2="/dataCompleted";
    request.get(url2).then((response)=>{
      this.setState({
        comTodos:JSON.parse(response.text)
      })
    })
  }

  createTodo(){
    action.createTodo(this.refs.name.value,"uncomplete")
    this.refs.name.value=""
    
    var url="/data";
    request.get(url).then((response)=>{
      this.setState({
        todos:JSON.parse(response.text)
      })
    })
  }

  completedTodo(t){

    
    action.completedTodo(t.target.id,t.target.value);
    this.getUpdates()
  }
  
  getUpdates(){
    var url="/data";
    request.get(url).then((response)=>{
      this.setState({
        todos:JSON.parse(response.text)
      })
    })

      var url2="/dataCompleted";
      request.get(url2).then((response)=>{
        this.setState({
          comTodos:JSON.parse(response.text)
        })
      })
  }

  deleteCompeted(e){
    var id=e.target.id
    var url="deleteCompeted";
    request
    .del('deleteCompeted')
    .send({id})
    .end(function(err, res){
    
    });

    var url2="/dataCompleted";
      request.get(url2).then((response)=>{
      this.setState({
        comTodos:JSON.parse(response.text)
      })
    })
  }


  render(){  
    var globalThis = this;
   
    this.todosData = this.state.todos.map(function(todo){
      return (<tr key={todo.id}><td>{todo.text}</td><td><input type="checkbox"  value={todo.text} id={todo.id}  onClick={globalThis.completedTodo.bind(globalThis)} /></td></tr>);
    });

    // Completed Todos todos
    this.completedTodos= this.state.comTodos.map(function(todo){
        return (<tr key={todo.id}><td>{todo.text}</td><td><a href="#"   id={todo.id} onClick={globalThis.deleteCompeted.bind(globalThis)} >|X|</a></td></tr>);
    });
    
    
    return(<div><h2>Todos Application</h2>
                  <h3>Add a new Todo</h3>
                  <input type="text" ref="name"/>
                  <button onClick={this.createTodo.bind(this)}>Add</button>
            <div>
              <table>
              <thead>
                <tr><th>Todos</th></tr>
              </thead>
              <tbody>
                {this.todosData}
              </tbody>
            </table>
            </div>
            <div>
            <h2>Completed Todos</h2>
              <table>
              <thead>
                <tr><th>Todos</th></tr>
              </thead>
              <tbody>
                {this.completedTodos}
              </tbody>
            </table>
            </div>

      </div>)
  }
}

export default Todo;