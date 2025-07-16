export interface Recipe {
    _id?: string;
    name: string;
    preparationTimeInMins: number; // takes hour and minutes in number
    ingredients: string[];
}
