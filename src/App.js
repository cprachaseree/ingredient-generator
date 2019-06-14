import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Recipe from './components/Recipe';


const App = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  console.log(APP_ID + APP_KEY);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const fetchApi = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async() => {
    const response = await fetch(fetchApi);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  return (
    <div className="App">
      <Form search={search} setSearch={setSearch} query={query} setQuery={setQuery}/>
      <div className="recipes">
        { recipes.map(recipe => 
          <Recipe
            key={ recipe.recipe.label } 
            title={ recipe.recipe.label }
            calories={ recipe.recipe.calories }
            image={ recipe.recipe.image }
            ingredients={ recipe.recipe.ingredients }
          />
        )}
      </div>
    </div>
  );
};

export default App;
