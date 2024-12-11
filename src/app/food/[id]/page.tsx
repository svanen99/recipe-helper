'use client'
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";

const RecipePage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { user, updateUser } = useUserContext() as UserContextType;
    const [recipe, setRecipe] = useState<RecipeType | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                if (id) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await response.json();
                    console.log(data.meals[0]);
                    setRecipe(data.meals[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipe();
    }, [id]);

    const toggleFavourite = (recipe: RecipeType) => {
        if (user) {
            const isFavourite = user.savedRecipes.some(fav => fav.idMeal === recipe.idMeal);
            if (isFavourite) {
                const updatedRecipes = user.savedRecipes.filter(fav => fav.idMeal !== recipe.idMeal);
                updateUser({ ...user, savedRecipes: updatedRecipes });
            } else {
                updateUser({ ...user, savedRecipes: [...user.savedRecipes, recipe] });
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F6F2] flex flex-col items-center p-8">
            {recipe ? (
                <div className="max-w-4xl bg-[#F9F6F2] shadow-lg rounded-lg p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">{recipe.strMeal}</h1>
                    <img
                        className="rounded-lg mb-6 w-full max-w-md mx-auto object-cover shadow-md transition-transform duration-300 transform hover:scale-105"
                        src={recipe?.strMealThumb}
                        alt={recipe.strMeal}
                    />
                    <div className="text-gray-700 text-lg leading-8">
                        <p><strong>Category:</strong> {recipe.strCategory}</p>
                        <p><strong>Area:</strong> {recipe.strArea}</p>
                        <p className="mt-4 text-left"><strong>Instructions:</strong> {recipe.strInstructions}</p>
                    </div>
                    <button
                        onClick={() => toggleFavourite(recipe)}
                        className={`mt-4 text-sm ${user?.savedRecipes.some(fav => fav.idMeal === recipe.idMeal) ? 'text-red-500' : 'text-green-600'}`}
                    >
                        {user?.savedRecipes.some(fav => fav.idMeal === recipe.idMeal) ? 'Unfavourite' : 'Favourite'}
                    </button>
                </div>
            ) : (
                <p className="text-xl font-semibold text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default RecipePage;