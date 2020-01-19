import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gp-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() set count(value: number) {
    this.value = value;
  }

  @Output() countChanged = new EventEmitter<{ count: number }>();

  value = 0;

  constructor() {}

  ngOnInit() {}

  increase() {
    this.value++;
    this.emitChanges();
  }

  decrease() {
    this.value--;
    this.emitChanges();
  }

  onChange(event: number) {
    this.emitChanges();
  }

  emitChanges() {
    this.countChanged.emit({ count: this.value });
  }
}
