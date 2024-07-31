import { useSearchParams } from "react-router-dom"
import {useState, useEffect} from 'react'; 
import { Link } from "react-router-dom";

import '../styles/components/Search.scss'

const searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

 export function Search(){
    const [searchParams] = useSearchParams(); 
    const [meals, setMeals] = useState([]);
    
    const query = searchParams.get("q"); 

    const getSearchedMeals = async(url) => {
        try{
            const res = await fetch(url); 
            const data = await res.json(); 

            setMeals(data.meals); 
        }catch(err){
            console.log(err.message); 
        }

    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}${query}`

        getSearchedMeals(searchWithQueryURL); 
    },[query])


    return(
        <div className="search">
            {meals && meals.map((meal) => (
                <div className="search-details">
                    <div className="img-container">
                        <img src={meal.strMealThumb} alt="" />
                    </div>
                    <h1>{meal.strMeal}</h1>
                    <Link to = {`/meal/${meal.idMeal}`} id = "navlink">View recipe</Link>
                </div>
            ))}
        </div>
    )
}