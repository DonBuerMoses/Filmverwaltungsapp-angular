import { Component, OnInit } from '@angular/core';
import {NavigationPathEnum} from '../../enums/navigation-path.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navigationPathEnum = NavigationPathEnum;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('NAVBAAAAAAAR');
  }

  public navigateTo(navigationPath: NavigationPathEnum) {
    this.router.navigate([navigationPath]);
  }

}
