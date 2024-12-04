export type UserType = {
    name: string;
    category: string;
    savedRecipes: RecipeType[]; 
    updatedRecipes: RecipeType[];
  };
  
  export type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    updateUser: (user: UserType) => void; 
  };
  
  export type RecipeType = {
    strCategory: string;
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
    strArea?: string;
    strInstructions?: string;
  };
  
  export type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
  };
  