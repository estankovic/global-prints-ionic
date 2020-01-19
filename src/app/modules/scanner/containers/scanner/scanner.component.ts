import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import QrScanner from 'qr-scanner';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gp-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', { static: false }) videoElement: ElementRef<
    HTMLVideoElement
  >;

  qrScanner: QrScanner;

  destroyed$ = new Subject();

  scannedValueSubject = new Subject<string>();
  scannedValue$ = this.scannedValueSubject.asObservable().pipe(
    distinctUntilChanged(),
    filter(v => !!v),
  );

  canScan$ = new BehaviorSubject(true);

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(e => {
      if (e instanceof ActivationEnd) {
        this.canScan$.next(!this.router.url.includes('/products/'));
      }
    });

    this.scannedValue$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.scannedValueSubject.next(null);

      const id = this.extractId(value);
      if (id) {
        this.router.navigate(['scanner', 'products', id]);
      }
    });
  }

  ngAfterViewInit(): void {
    this.qrScanner = new QrScanner(this.videoElement.nativeElement, result => {
      this.scannedValueSubject.next(result);
    });

    this.canScan$.pipe(takeUntil(this.destroyed$)).subscribe(canScan => {
      if (canScan) {
        this.qrScanner.start();
      } else {
        this.qrScanner.pause();
      }
    });
  }

  extractId(code: string): string | null {
    const segments = code.split(':');

    console.log(segments)

    return segments[1] && segments[0] === 'gp' ? segments[1] : null;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    this.qrScanner.stop();
    this.qrScanner.destroy();
  }
}
