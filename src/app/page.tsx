'use client'
import { useEffect, useState } from "react";
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";

export default function Home() {
  const { user, updateUser } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType[]>([]); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`);
          const data = await response.json();
          const topFiveRecipes = data.meals.slice(0, 5);
  
          console.log(topFiveRecipes);
          setRecipes(topFiveRecipes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [user]);
  

  const toggleFavourite = (meal: RecipeType) => {
    console.log(meal);
    if (user) {
      const isFavourite = user.savedRecipes.some(fav => fav.idMeal === meal.idMeal);
      if (isFavourite) {
        const updatedRecipes = user.savedRecipes.filter(fav => fav.idMeal !== meal.idMeal);
        updateUser({ ...user, savedRecipes: updatedRecipes });
      } else {
        updateUser({ ...user, savedRecipes: [...user.savedRecipes, meal] });
      }
    }
  };
  
  
  return (
    <>
      {user && (
        <div className="text-black font-light text-2xl m-10">
          The food category you have chosen is: {user.category}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
            {recipes.map((meal: RecipeType) => (
              <div className="group relative" key={meal.idMeal}>
                <Link href={`/food/${meal.idMeal}`}>
                  <img className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl" src={meal.strMealThumb} alt={meal.strMeal} height="auto" width="200px" />
                </Link>
                <p className="text-gray-600 text-lg font-light mt-4">{meal.strMeal}</p>
                <button onClick={() => toggleFavourite(meal)} 
                  className={`mt-2 text-sm ${user.savedRecipes.some(fav => fav.idMeal === meal.idMeal) ? 'text-red-500' : 'text-green-600'}`}>
                  {user.savedRecipes.some(fav => fav.idMeal === meal.idMeal) ? 'Unfavourite' : 'Favourite'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}