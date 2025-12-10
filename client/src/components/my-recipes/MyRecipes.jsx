import { useRecipes } from "../../contexts/RecipeContext.jsx"
import { useUserContext } from "../../contexts/UserContext.jsx";
import RecipeCard from "../recipe-card/RecipeCard.jsx";

export default function MyRecipes() {

    const { recipes } = useRecipes();
    const { user } = useUserContext();

    const myRecipes = recipes.filter(recipe => recipe._ownerId === user?._id); 
    
    return (
        <div className="container">
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    My Recipes
                </h1>

                {myRecipes.length === 0 ? (
                    <div className="text-center text-gray-600 mt-16">
                        <h3 className="mt-2">Ooops!</h3>
                        <p className="text-lg mt-2">You haven`t added any recipes yet.</p>
                        <p className="mt-2">Start sharing your delicious ideas!</p>
                    </div>
                ) : (
                    <div className="recipes-container mt-10">
                        {myRecipes.map(recipe => (
                            <RecipeCard key={recipe._id} {...recipe} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}