export type UserType = {
    name: string,
    category: string,
    savedRecipes: string[],
    updatedRecipes: string[]
}

export type UserContextType = {
    user:UserType | null,
    setUser: (user:UserType) =>void,
    updateUser: string;
}

export type RecipeType = {
    strCategory: string,
    strMeal : string,
    idMeal : string,
    strMealThumb : string
    strArea? : string,
    strInstructions? : string
}

