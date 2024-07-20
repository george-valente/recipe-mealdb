import '../styles/components/MealCard.scss'; 
import { Link } from 'react-router-dom'; 

export function MealCard({meal}){
    return(
        <div className = "meal-card">
            <img src={meal.strMealThumb} alt="" />
            <p>{meal.strMeal}</p>
            <Link to = {`/meal/${meal.idMeal}`} id = "navlink">View recipe</Link>
        </div>
    )
}