import React from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent';

var PokemonDetails=React.createClass(
{ 
  render (){
    return(
      <div className="Pokemon-Details">
        <hr/>
       <img src={this.props.sprite}/>
        <hr/>
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
    return{name:"",
          stat:"",
          sprite:"",
          experience:"",
          id:"",
          weight:"",
          height:""}
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


});  },

 render() {

    return (
      
      <div className="App">

        <div className="App-header"> 
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>WELCOME TO OUR POKEMON WEBSITE!!!</h1>
               </div>
  <div className="Search">
      <input placeholder = "Search Pokemon" value = {this.state.name} onChange = {this.Input} type = "text"/>
      <button onClick = {this.clickSearch}> Search</button> 
      <PokemonDetails sprite={this.state.sprite} name={this.state.stat} height={this.state.height} weight={this.state.weight} id={this.state.id}  base_experience={this.state.base_experience}pic={this.state.pic}  />
     
      </div>

        <div className="comment">
      <textarea  className="radius" placeholder = " Leave Comment Here...." rows="3" cols="90">
     </textarea><br/>
       <button  className="btn btn-primary" type="button">OK</button></div>
       <div className=" scroll-size scroll">COMMENTS</div>

      </div>

   
    );
  }
});

export default App;