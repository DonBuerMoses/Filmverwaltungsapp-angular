import { Component, OnInit } from '@angular/core';
import {NavigationPathEnum} from '../../enums/navigation-path.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
/**
 * Die Navbar-Komponente Enthält den Seitennamen und die Verlinkungen zu den anderen Seiten der Applikation.
 */
export class NavbarComponent implements OnInit {
  public navigationPathEnum = NavigationPathEnum;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Leitet zu einer anderen Seite weiter, abhängig vom mitgegebenen Pfad.
   * @param navigationPath
   */
  public navigateTo(navigationPath: NavigationPathEnum) {
    this.router.navigate([navigationPath]);
  }

}
