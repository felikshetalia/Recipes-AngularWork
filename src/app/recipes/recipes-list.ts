import { DatePipe } from "@angular/common";
import { TimeCustomPipe } from "../shared/time-custom-pipe";

export type Recipe = {
    id: string;
    name: string;
    preparationTimeInMins: number | TimeCustomPipe; // takes hour and minutes in number
    ingredients: string[];
}

// just dummy data for now
export const recipesList = [
    {
        id: 'r1',
        name: 'Spaghetti Carbonara',
        preparationTimeInMins: 90, // 1 hour and 30 minutes
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper']
    },
    {
        id: 'r2',
        name: 'Spaghetti Carbonara',
        preparationTimeInMins: 90, // 1 hour and 30 minutes
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper']
    },
    {
        id: 'r3',
        name: 'Spaghetti Carbonara',
        preparationTimeInMins: 90, // 1 hour and 30 minutes
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper']
    }
]