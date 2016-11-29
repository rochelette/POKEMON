import React from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent';


var PokemonDetails=React.createClass(
{ 
  render (){
    return(
      <div className="Pokemon-Details">
        <hr/><hr/>
       <img src={this.props.sprite}/>
        <hr/><hr/>
         <p> Pokemon Id:{this.props.id}</p>
      <p> Name:{this.props.name}</p>
        <p> Base Experience:{this.props.base_experience}</p>
       <p> Height:{this.props.height}</p>
        <p> Weight:{this.props.weight}</p>
      </div>);

  }

});



var App = React.createClass({
  getInitialState(){
    return{id:"",
          name:"",
          stat:"",
          sprite:"",
          experience:"",
          weight:"",
          height:"",
          comment:"",
          data:""}
  },




  Input(name){
    this.setState({name:name.target.value});
  },

  clickSearch(){
    var url = "http://pokeapi.co/api/v2/pokemon/"+this.state.name;
     Request.get(url).then((response)=>{
    this.setState({
      id:response.body.id,
      stat:response.body.name,
      base_experience:response.body.base_experience,
       height:response.body.height,
        weight:response.body.weight,
        sprite:response.body.sprites.front_default

    });
    this.ViewComments();

});  },


handleCommentOnChange(e){
    this.setState({comment:e.target.value});
  },


handleComment(){

Request.post('http://localhost:3000/api/comments')
            .send({author:this.state.name,
            text: this.state.comment,
            })
            .end(alert('Sucessfully Save!'))               
     

},


ViewComments(){
  var url = "http://localhost:3000/api/comments";
   Request.post (url)
   .then((n)=>{
this.setState({
  data : n
})

   });
            

},



 render() {

  var comment;
 {this.state.data === ""? null :comment = this.state.data.body
                      .filter((data)=> {return data.author === this.state.name})
                      .map((n)=>{return <p>{n.text}</p>})}

    return (
      
      <div className="App">

        <div className="App-header"> 
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>WELCOME TO THE POKEMON WEBSITE!!</h1>
               </div>
  <div className="Search">
      <input  placeholder = "Search Pokemon" value = {this.state.name} onChange = {this.Input} type = "text"/>
      <button onClick = {this.clickSearch}> Search</button> 
      <PokemonDetails sprite={this.state.sprite} name={this.state.stat} height={this.state.height} weight={this.state.weight} id={this.state.id}  base_experience={this.state.base_experience}/>

      </div>

      <div  
      className="comment">

      <textarea  className="radius" placeholder = " Leave Comment Here...." rows="3" cols="67" onChange = {this.handleCommentOnChange} >
     </textarea><br/>
       <button  className="btn btn-primary" type="button" onClick = {this.handleComment} >OK</button></div>
       <div className=" scroll-size scroll"><hr/>Comments<hr/>{comment}</div>
   
      </div>


   
    );
  }
});


export default App;``