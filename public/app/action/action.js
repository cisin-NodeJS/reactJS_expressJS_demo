import  dispatcher from "../dispatcher/dispatcher.js";
import request from 'superagent';

export function  createTodo(text){
    dispatcher.dispatch({
      type: "CREATE_TODO",
      text,
      id:Date.now(),
    });
    request.post('/addData')
    .send({
      text,
      id:Date.now(),
      status:'incomplete'
    })
    .end((res)=>{
      console.log("data posted")
    })

  }

  export function  completedTodo(id,text){
    
    dispatcher.dispatch({
      type: "DELETE_TODO",
      id,
    });

    request
  .del('removeCompleted')
  .send({id})
  .end(function(err, res){

  });

  request.post('/completed')
    .send({
      text,
      id
    })
    .end((res)=>{
      console.log("data completed inserted")
    })


  }

