import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute : ActivatedRoute, private recipeService: RecipesService, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(this.id != null){
          this.editMode = true;
          console.log("Edit Mode ",this.id);
        }
        else{
          console.log("New Mode ");
        }
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImageURL = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^-?(0|[1-9]\d*)?$/)
            ])
          }));
        }
      }
      console.log(recipe);
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageURL, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients']
    );
    if(this.editMode){
      console.log("Inside Edit Recipe");
      this.recipeService.updateRecipe(this.id, recipe);
    }
    else{ 
      console.log("Inside Add Recipe");
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  // To get the ingredient controls via ts code
  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
    // Template Code in View
    //getControls() 
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,  
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ])
      })
    )
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  onDeleteIngredient(index: number){
    console.log(index);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
