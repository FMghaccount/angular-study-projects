import { DataStorageService } from './../shared/services/data-storage.service';
// import { Component, EventEmitter, Output } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @Output() selectedFeature = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.selectedFeature.emit(feature);
  // }
  // onClick( {

  // })

  constructor(private dataStorageService: DataStorageService) { }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
