'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserContextType } from "@/utils/types";
import { useUserContext } from "@/utils/contexts";

const CategoryPage = () => {
  const { user, updateUser } = useUserContext() as UserContextType;
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: any) => {
    router.push(`/category/${category}`);
  };

  const handleClick = (newCategory: string): void => {
    if (user) {
      updateUser({ ...user, category: newCategory });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Explore Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-12">
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className={`rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${
              user?.category === category.strCategory ? "border-2 border-green-500" : ""
            }`}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <img
              className="w-full h-64 object-cover"
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-medium text-gray-700">{category.strCategory}</h3>
              <button
                className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  user?.category === category.strCategory
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(category.strCategory);
                }}
              >
                {user?.category === category.strCategory ? "✓ Selected" : "Set as Favourite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;