import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext.jsx";
import { create, getAll } from "../services/recipeServices.js";

export const RecipeContext = createContext();

export function RecipeProvider({children}) {
    const [recipes, setRecipes] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        getAll().then(setRecipes);
    }, []);

    const createRecipe = async (data) => {
        const newRecipe = await create(data, user.accessToken);
        setRecipes(state => [...state, newRecipe]);
    }

    return (
        <RecipeContext.Provider value={
            {
                recipes, createRecipe,
            }
        }>
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipes = () => useContext(RecipeContext);