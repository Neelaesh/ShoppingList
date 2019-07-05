import { Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from "rxjs/Subject";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{
    
    private ingredients: Ingredient[] = [
        new Ingredient('Tomatoes',5),
        new Ingredient('Onion',10)
    ];

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientToEdit = new Subject<number>();

    constructor() { }
    
    getIngredient(index: number){
        return this.ingredients[index];
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(newIngredient : Ingredient){
        this.ingredients.push(newIngredient);
        console.log("Final Ingredients ",this.ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        console.log("Final Ingredients ",this.ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}