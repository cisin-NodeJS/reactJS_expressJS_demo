import React from 'react';
import EventEmitor from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import request from 'superagent';

class TodoStore extends EventEmitor{
	constructor(){
		super();
		this.state={
		todos:[{
			id:1,
			text:"buy milk"
		},{
			id:2,
			text:"go"
		}],
		deletedTodo:[]}
	}
	
	createTodo(text){
		this.state.todos.push({
			id:Date.now(),
			text
		})
		this.emit('change');
	}
	
	handleActions(action){
		switch(action.type){
			case "CREATE_TODO":{
				this.createTodo(action.text)
				break;
			};
			case "DELETE_TODO":{

						// this.completedTodo(action.id)
				};
			}
			
		}
	}


const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.todoStore = todoStore;
window.dispatcher = dispatcher;
export default todoStore;

