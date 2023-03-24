// import { ShoppingListReducer } from './shared/store/shopping-list/reducer/shopping-list.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';

import { CoreModule } from './core.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './shared/store/app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
