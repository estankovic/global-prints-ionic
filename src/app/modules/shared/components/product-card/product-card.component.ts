import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, } from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'gp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() product: ProductModel;

  public image = new Image();

  private readonly aspectRatio = 4 / 3;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const width = this.el.nativeElement.clientWidth;
    if (width) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'height',
        `${width * this.aspectRatio}px`,
      );
    }

    this.preloadImage(this.product.image);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  private preloadImage(url: string) {
    this.image.onload = event => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-image',
        `url('${this.image.src}')`,
      );

      if (this.image.width > this.image.height) {
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-size',
          'contain',
        );
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-repeat',
          'no-repeat',
        );
      } else {
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-size',
          'cover',
        );
      }
    };
    this.image.src = url;
  }
}
