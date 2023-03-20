import { NgModule } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingComponent } from './loading/loading.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
@NgModule({
  declarations: [
    DropdownDirective,
    AuthComponent,
    LoadingComponent,
    PlaceholderDirective,
    AlertComponent
  ],
  exports: [
    DropdownDirective,
    AuthComponent,
    LoadingComponent,
    PlaceholderDirective,
    AlertComponent
  ]
})
export class SharedModule { }