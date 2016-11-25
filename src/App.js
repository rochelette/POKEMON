import React from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent';


var PokemonDetails=React.createClass(
{ 
  render (){
    return(
      <div className="Pokemon-Details">
         <p> POKEMON ID:{this.props.id}</p>
      <p> NAME:{this.props.name}</p>
      <img src={this.props.pic}/>
        <p> BASE EXPERIENCE:{this.props.base_experience}</p>
       <p> HEIGHT:{this.props.height}</p>
        <p> WEIGHT:{this.props.weight}</p>
      </div>);

  }

});

var App = React.createClass({
  getInitialState(){
    return{name:"",
          stat:"",
          pic:"",
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
        pic:response.body.pic
    });


});  },

 render() {

    return (
      
      <div className="App">

        <div className="App-header"> 
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>WELCOME TO POKEMON!!!</h1>
               </div>
  <div className = "Search">
      <input value = {this.state.name} onChange = {this.Input} type = "text"/>
      <button onClick = {this.clickSearch}> Search</button> 
      <PokemonDetails name={this.state.stat} height={this.state.height} weight={this.state.weight} id={this.state.id}  base_experience={this.state.base_experience}pic={this.state.pic}  />
      </div>
      </div>
      
    );
  }
});

export default App;