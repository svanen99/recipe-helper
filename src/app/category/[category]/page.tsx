'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryMealsPage = () => {
    const { category } = useParams();
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                if (!response.ok) {
                    throw new Error("Något gick fel vid hämtning av data");
                }
                const data = await response.json();
                setMeals(data.meals);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Ett okänt fel inträffade";
                setError(errorMessage);
                console.error(error);
            }
        };

        if (category) {
            fetchMeals();
        }
    }, [category]);

    return (
        <div>
            <h2 className="text-3xl p-6 text-[#8e8ec5] underline">{category} Meals</h2>
            {error ? (
                <p className="text-red-500 text-center font-semibold">{error}</p>
            ) : (
                <div className="flex flex-wrap p-4 justify-center">
                    {meals.map((meal) => (
                        <div key={meal.idMeal} className="m-4">
                            <Link href={`/food/${meal.idMeal}`}>
                                <img
                                    className="cursor-pointer w-full max-w-md mx-auto object-cover rounded-lg shadow-lg border-neutral-400 transition-transform transform hover:scale-105 hover:shadow-xl"
                                    src={meal.strMealThumb}
                                    height="auto"
                                    width="200px"
                                    alt={meal.strMeal}
                                />
                            </Link>
                            <p className="text-[#8e8ec5] font-light text-xl m-4 text-center">{meal.strMeal}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMealsPage;