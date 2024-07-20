import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/components/Recipe.scss'
import { CookBookIcon } from "hugeicons-react";
const recipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

export function Recipe(){
    const {idMeal} = useParams(); 
    const [meal, setMeal] = useState(null); 
    
    const getMeal = async(url) => {
        console.log(idMeal)
        try{
            const res = await fetch(url); 
            const data = await res.json(); 

            setMeal(data.meals[0])
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        const mealUrl = `${recipeUrl}${idMeal}`; 
        getMeal(mealUrl);

    },[idMeal])

    const extractIngredients = (meal) => {
        const ingredients = []; 

        for(let i = 0; i <=20; i++){
            const ingredient = meal[`strIngredient${i}`];

            if(ingredient){
                ingredients.push(ingredient); 
            }
        }
        return ingredients; 

    }

    const extractMeasures = (meal) =>{
        const measures = []; 

        for(let i = 0; i<=20; i++){
            const measure = meal[`strMeasure${i}`]; 

            if(measure){
                measures.push(measure);
            }
        }
        return measures;
    }

    /* const extractMeasuresAndIngredients = (meal) => {
        const measures = extractMeasures(meal); 
        const ingredients = extractIngredients(meal); 

        const combined = measures.map((measure, index) => `${measure} ${ingredients[index]}`);
        return combined; 
    } */



    const formatInstructions = (instructions) => {
        //const lines = instructions.split('\r\n'); -> é como se fosse isso. 
        //a cada tabulação estamos mapeando a linha e o índice da linha, para então retornar um parágrafo com o conteúdo de line e com o índice atual.

        /* ao usar um o método split em uma string, obtemos um array de substring. */
        /* line representa o elemento atual. */
        return instructions.split('\r\n').map((line, index) => (
            <p key = {index}>{line}</p>
        ))
    }

    return(
        <div className="recipe">
            {meal ? (<div className="recipe-details">
                <div className="img-container">
                    <img src = {meal.strMealThumb} alt="" />
                </div>
                <div className="details">
                    <h1>{meal.strMeal}</h1>
                    <div className="ingredients">
                        <div className="ingredients-title">
                            <CookBookIcon />
                            <h2>Ingredients</h2>  
                        </div>
                        <ul>
                            {extractIngredients(meal).map((ingredient,index) => (
                                <li key = {index}>{ingredient}</li>
                            ))
                            }
                            
                        </ul>
                    </div>
                    <h2>Method </h2>
                    <p>{formatInstructions(meal.strInstructions)}</p>
                </div>

            </div> ) : <p>loading...</p>} 
        </div>
    )
}