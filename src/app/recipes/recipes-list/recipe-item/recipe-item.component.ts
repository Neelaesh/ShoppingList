import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input()
  recipe: Recipe;

  @Input()
  index: number;

  constructor(private recipesService: RecipesService, private router: Router, private activeRoute : ActivatedRoute) { 
  }

  ngOnInit() {
  }



}