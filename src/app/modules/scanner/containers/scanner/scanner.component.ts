import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

// import QrScanner from 'qr-scanner';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'gp-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('video', { static: false }) videoElement: ElementRef<
  //   HTMLVideoElement
  // >;

  // qrScanner: QrScanner;

  destroyed$ = new Subject();

  scannedValueSubject = new Subject<string>();
  scannedValue$ = this.scannedValueSubject.asObservable().pipe(
    distinctUntilChanged(),
    filter(v => !!v),
  );

  canScan$ = new BehaviorSubject(true);

  constructor(private readonly router: Router, private qrScanner: QRScanner) {}

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
    // this.qrScanner = new QrScanner(this.videoElement.nativeElement, result => {
    //   this.scannedValueSubject.next(result);
    // });
    //
    // this.canScan$.pipe(takeUntil(this.destroyed$)).subscribe(canScan => {
    //   if (canScan) {
    //     this.qrScanner.start();
    //   } else {
    //     this.qrScanner.pause();
    //   }
    // });



    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          alert('baff');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

              // this.scannedValueSubject.next(text);


            alert(text);

            // this.qrScanner.hide(); // hide camera preview
            // scanSub.unsubscribe(); // stop scanning
          });

          this.qrScanner.show();

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  scan() {
    
  }

  extractId(code: string): string | null {
    const segments = code.split(':');

    console.log(segments);

    return segments[1] && segments[0] === 'gp' ? segments[1] : null;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    // this.qrScanner.stop();
    // this.qrScanner.destroy();
  }
}
