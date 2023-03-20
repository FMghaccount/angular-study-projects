import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { RecipeDetailGuard } from '../shared/guards/recipe-detail.guard';
import { RecipesResolverService } from '../shared/resolvers/recipes-resolver.service';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesFormComponent },
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService], canActivate: [RecipeDetailGuard] },
      { path: ':id/edit', component: RecipesFormComponent, resolve: [RecipesResolverService], canActivate: [RecipeDetailGuard] }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }