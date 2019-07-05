import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  id : number;
  recipeSelected: Recipe;

  constructor(private recipesService: RecipesService, private activeRoute: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
      this.activeRoute.params.subscribe(
        (params: Params) => {
        console.log("Params ",params);
        this.id = +params['id'];
          this.recipeSelected = this.recipesService.getRecipe(this.id);
          console.log(this.recipeSelected);
        }
      );
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.recipesService.onAddIngredientsToShoppingList(ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo : this.activeRoute});
    //this.router.navigate(['../',this.id,'edit'], {relativeTo : this.activeRoute});
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}