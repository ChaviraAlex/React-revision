import { useEffect, useState } from "react"
export const App = ()=>{
    
    const [pokemonKey,setPokemonKey] = useState([]);
    
    useEffect(() => {
        (async( ) => {
            const pokemones = await PokemonGet()
            setPokemonKey(pokemones);
          })();
        
    }, [])


    const PokemonGet = async() =>{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20");
        const {results} = await response.json();
        const pokemonName = results.map (pokemon => {return pokemon.name});
    
    
    let pokemonArray = [];
    const FetchPokeInfoByName = async (pokeName) => {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
        const {sprites:back_default, base_experience, stats, name} = await pokemonResponse.json();
            //   const  res = await pokemonResponse.json();

        pokemonArray.push({back_default, base_experience, stats, name});
        // pokemonArray.push(res);
    } 
    
    Promise.allSettled(pokemonName.map(FetchPokeInfoByName));
        return pokemonArray;
    }


    console.log(pokemonKey)

      return (
        <>
        <header>
            <h1>Pokemon API</h1>
        </header>
        <section>
            <div>
                {pokemonKey.map((poke,id) =>(
                    <div key={id}>
                        <img src="{poke.back_default}" alt="{}" />
                        <p>{poke.name}</p>
                </div>
                ))}
            </div>
        </section>
        </>
        )};



    
  


