import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

/**
 * A persistent template component.
 * 
 * Every other component gets rendered inside `NavigationComponent`.
 * 
 * Observes screen size to dynamically toggle the side navigation menu.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  sidenavDynamic = false;
  loggedIn = false;

  isSmallScreen$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map(result => {
        this.sidenavDynamic = result.matches;
        return result.matches;
      })
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.startsWith('/login')) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }

  handleUserButton() {

  }

  toggleSidenav() {
    if (this.sidenavDynamic)
      this.sidenav.toggle();
  }

}
