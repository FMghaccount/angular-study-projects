import { RecipeDetailGuard } from './shared/guards/recipe-detail.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RecipesResolverService } from './shared/resolvers/recipes-resolver.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesFormComponent } from './recipes/recipes-form/recipes-form.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesFormComponent },
      { path: ':id', component: RecipesDetailComponent, canActivate: [RecipeDetailGuard], resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipesFormComponent, canActivate: [RecipeDetailGuard] }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
