import { useSearchParams } from "react-router-dom"
import {useState, useEffect} from 'react'; 

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
        <div className="container">
            {/* <h1>Hello</h1> */}
            {meals && meals.map((meal) => (
                <p>{meal.strMeal}</p>
            ))}
        </div>
    )
}