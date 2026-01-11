export interface Recipe { // Define recipe interface
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface FullRecipe extends Recipe {
    strInstructions: string;
    strArea: string;
    strCategory: string;
    strYoutube?: string;
    [key: string]: string | undefined; // For dynamic ingredients like strIngredient1
}

export const RecipeService = {
    // Find recipes by a single main ingredient
    async getRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
        try {
            // Clean the ingredient name (e.g. "Canned Tomatoes" -> "Tomato")
            // Simple heuristic: take the last word or first word? 
            // "Tomato Sauce" -> "Tomato", "Chicken Breast" -> "Chicken"
            const keyword = ingredient.split(' ')[0];

            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`
            );

            if (!response.ok) return [];

            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    },

    // Get full details for a specific recipe ID
    async getRecipeDetails(id: string): Promise<FullRecipe | null> {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            if (!response.ok) return null;
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            return null;
        }
    }
};
