import { AuthService } from './../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/services/data-storage.service';
// import { Component, EventEmitter, Output } from "@angular/core";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription
  isAuthenticated: boolean = false;

  // @Output() selectedFeature = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.selectedFeature.emit(feature);
  // }
  // onClick( {

  // })

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
