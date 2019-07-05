import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class ReceipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
        console.log("Selected Recipe ",this.selectedRecipe);
      }
    )
  }

}