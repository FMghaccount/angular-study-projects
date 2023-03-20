import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
// import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingComponent } from './loading/loading.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    // DropdownDirective,
    LoadingComponent,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // DropdownDirective,
    LoadingComponent,
    PlaceholderDirective,
    AlertComponent,
    CommonModule
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule { }