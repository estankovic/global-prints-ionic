import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { openSidenav } from '../../../store/actions/sidenav.actions';
import { SharedState } from '../../../store/states';

@Component({
  selector: 'gp-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly store: Store<SharedState>,
  ) {
  }

  ngOnInit() {
  }

  goToProducts() {
    this.router.navigate(['products']);
  }

  goToScanner() {
    this.router.navigate(['scanner']);
  }

  openSidenav() {
    this.store.dispatch(openSidenav());
  }
}
