const express = require('express');
const pokemon = express.Router();
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (req,res,next)=>{

  return res.status(200).send(req.body);

});

pokemon.get('/', (req, res, next) =>{

  //console.log(pk);
  return res.status(200).send(pk);

});

pokemon.get('/:id([0-9]{1,3})', (req, res, next) =>{
  const id = req.params.id - 1;
  if(id >= 0 && id <= 150){
      return res.status(200).send(pk[req.params.id - 1]);

  }

    res.status(404).send("Pokémon no encontrado.");

});

pokemon.get('/:name([A-Za-z]+)', (req, res, next) =>{

  /*for (i=0; i<pokemon.length; i++){
    if(pokemon[i].name.toUpperCase() == name.toUpperCase()){

      return res.status(200).send(pokemon[i]);

    };

  };*/

  //Operador ternario if = condicion ? valor si verdadero : valor si falso

  const name = req.params.name;

  const pkmn = pk.filter((p) => {

    return (p.name.toUpperCase() == name.toUpperCase()) && p;

  });

  return (pkmn.length>0) ? res.status(200).send(pkmn) : res.status(404).send('Pokémon no encontrado');


});

module.exports = pokemon;
