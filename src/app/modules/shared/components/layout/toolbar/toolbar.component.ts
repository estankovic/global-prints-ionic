import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input() title = 'Global Prints';

  @Input() hasBackBtn = true;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
  ) {}

  ngOnInit() {}

  onCart() {
    this.router.navigate(['cart']);
  }

  onBack() {
    this.location.back();
  }
}
