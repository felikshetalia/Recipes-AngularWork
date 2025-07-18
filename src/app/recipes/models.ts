export interface Recipe {
    _id?: string;
    name: string;
    preparationTimeInMins: number;
    ingredients: string[];
    description: string;
}

export interface Ingredient {
    _id?: string;
    name: string;
    quantity: string;
}

