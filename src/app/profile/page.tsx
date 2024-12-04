'use client';
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from "@/utils/types";
import Link from 'next/link';

const Profile = () => {
  const { user } = useUserContext() as UserContextType;

  return (
    <>
      <h1 className="text-3xl p-6 text-[#8e8ec5] underline">Profile Page</h1>
      {user && Array.isArray(user.savedRecipes) && user.savedRecipes.length > 0 ? (
        <div>
          <h2 className="text-[#8e8ec5] text-xl p-4">Your Favourite Recipes:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
            {user.savedRecipes.map((meal: RecipeType) => (
              <div
                className="group flex flex-col items-center text-center"
                key={meal.idMeal}
              >
                <Link href={`/food/${meal.idMeal}`}>
                  <img
                    className="h-auto w-48 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                </Link>
                <p className="text-black font-light text-l p-4">{meal.strMeal}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[#8e8ec5] text-xl p-4">You do not have any saved recipes yet.</p>
      )}
    </>
  );
};

export default Profile;
