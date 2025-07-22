export interface Recipe {
    _id?: string;
    name: string;
    preparationTimeInMins: number;
    ingredients: Ingredient[];
    description: string;
}

export interface Ingredient {
    _id?: string;
    name: string;
    quantity: string;
}

