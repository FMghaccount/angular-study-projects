import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // selectedFeature = 'recipe';
  // onNavigate(feature) {
  //   this.selectedFeature = feature
  // }

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
