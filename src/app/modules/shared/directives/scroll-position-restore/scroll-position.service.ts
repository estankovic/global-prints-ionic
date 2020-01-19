import { Injectable } from '@angular/core';

@Injectable()
export class ScrollPositionService {
  private positions = new Map<string, number>();

  constructor() {}

  hasPosition(key: string) {
    return this.positions.has(key);
  }

  setPosition(key: string, top: number) {
    this.positions.set(key, top);
  }

  getPosition(key: string) {
    return this.positions.get(key);
  }
}
