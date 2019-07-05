import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  indexToEdit: number;
  itemToEdit: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientToEdit.subscribe(
      (index: number) => {
        this.indexToEdit = index;
        this.editMode = true;
        this.itemToEdit = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.itemToEdit.name,
          amount : this.itemToEdit.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    let ingredient = new Ingredient(form.value.name, form.value.amount);
    console.log("Ingredient ",ingredient);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.indexToEdit, ingredient);
    }
    else{  
      this.shoppingListService.addIngredient(ingredient);
    }
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.indexToEdit);
    this.slForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
