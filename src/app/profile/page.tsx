'use client'
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";

export default function Profile() {
  const { user, updateUser } = useUserContext() as UserContextType;

  const removeFavourite = (meal: RecipeType) => {
    if (user) {
      const updatedRecipes = user.savedRecipes.filter(fav => fav.idMeal !== meal.idMeal);
      updateUser({ ...user, savedRecipes: updatedRecipes });
    }
  };

  return (
    <>
      {user && (
        <div className="text-black font-light text-2xl m-10">
          <h2 className="mb-6">Your Saved Recipes:</h2>
          {user.savedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
              {user.savedRecipes.map((meal: RecipeType) => (
                <div className="group relative" key={meal.idMeal}>
                  <Link href={`/food/${meal.idMeal}`}>
                    <img
                      className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      height="auto"
                      width="200px"
                    />
                  </Link>
                  <p className="text-gray-600 text-lg font-light mt-4">{meal.strMeal}</p>
                  <button
                    onClick={() => removeFavourite(meal)}
                    className="mt-2 text-sm text-red-500"
                  >
                    Remove from Favourites
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg">You have no saved recipes yet.</p>
          )}
        </div>
      )}
    </>
  );
}