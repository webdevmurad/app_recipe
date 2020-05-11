import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import {Cube} from 'styled-loaders-react';

import './App.css';

const App = ({loading}) => {

  const APP_ID = '9f9cf840';
  const APP_KEY = '3df0ebe0dc6d0f024ecdc1f84478e35a';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json()
    setRecipes(data.hits);
    setIsLoading(true)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {
          !isLoading ? <Cube/> : recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App;
