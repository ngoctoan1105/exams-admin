import { Component } from "@angular/core";
import { AuthService } from "@core/services/auth.service";
import { menu } from "../../constant/menu";

@Component({
  selector: 'ad-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent{
  open = true;
  user: any;
  menu = menu;
  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.UserObservable.subscribe(res => {
      this.user = res
    })
  }
  toggle() {
    this.open = !this.open;
  }
  logOut() {
  }
}
