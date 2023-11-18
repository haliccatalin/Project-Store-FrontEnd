import {Component} from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = environment.appName;
  logo: string = environment.appLogo;
  owner: string = environment.appOwner;

  items: Array<any> = [
    {
      title: 'Home',
      route: '/home',
    },
    {
      title: 'Admin',
      route: '/dashboard',
    },
    {
      title: 'Logout',
      route: '/auth',
    },
  ];

  imageSalesLeft: string = 'assets/sales_left.jpeg';
  imageSalesMiddle: string = 'assets/sales_middle.jpeg';
  imageSalesRight: string = 'assets/sales_right.jpeg';

  constructor(private router: Router) {
  }

  onChangePage(page: any) {
    console.log(page);
    this.router.navigateByUrl(page.route);
  }

  onLogout(): void {
    this.router.navigateByUrl('/auth')
  }
}
