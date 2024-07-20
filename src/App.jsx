import { useState, useEffect } from 'react'
import './styles/App.scss'
import './styles/components/MealCard.scss'
import { Header } from './components/Header'
import { MealCard } from './components/MealCard'
import  Logo  from './assets/logo.png'
import { Outlet } from 'react-router-dom'

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; 
const categoriesUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php'; 
const filterUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='

function App() {
  const [categories, setCategories] = useState([]); 
  const [selectedCategory,setSelectedCategory] = useState([]); 
  const [buttonActive,setButtonActive] = useState(''); 


  const getCategories = async () => {
    try{
      const res = await fetch(categoriesUrl); 
      const data = await res.json(); 

      setCategories(data.categories); 
      
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCategories(); 

  }, []); 

  useEffect(() => {
    console.log(selectedCategory); 
  },[selectedCategory])

  useEffect(() => {
    console.log(categories); 
  },[categories])

  const getSelectedCategory = async (categoryString) => {
    try{
      const res = await fetch(`${filterUrl}${categoryString}`); 
      const data = await res.json(); 

      setSelectedCategory(data.meals); 
    }catch(err){
      console.log(err.message); 
    }
  }

  const handleSelectedCategory = (category,e) => {
    setButtonActive(e.target.id);  
    const categoryString = category; 
    getSelectedCategory(categoryString); 

  }

  

  return (
    <div className="App">
      
      {/* <Header /> */}
      <div className = "recipes-categories">
        <h1>Learn, Cook & Eat your food</h1>
        <div className = "more-info">
          <div className="number">
            <h2>{categories && categories.length}</h2>
            <p>Categories</p>
          </div>
        </div>
      </div>
      <div className="categories-filter">
            <ul>
              {categories && categories.map((category) => (
                <li key = {category.idCategory}>
                  <button
                  id = {category.idCategory}
                  className = {buttonActive === category.idCategory ? "active" : ""} 
                  onClick = {(e) => handleSelectedCategory(category.strCategory,e)}>{category.strCategory}</button>
                </li>
              ))}
            </ul>
      </div>
      <div className="meals-container">
        {selectedCategory && selectedCategory.map((meal) => (
          <MealCard key = {meal.idMeal} meal = {meal} />
        ))}
      </div>
    

    </div>
  )
}

export default App
