import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('owlAnimated') owlElements!: QueryList<ElementRef>;
  @ViewChildren('owlAnimated1') slide1!: QueryList<ElementRef>;
  @ViewChildren('owlAnimated2') slide2!: QueryList<ElementRef>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    center: true,
    autoHeight: true,
    navText: ['', ''],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      400: {
        items: 1,
        dots: false,
      },
      740: {
        items: 1,
        dots: false,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  onSlideTransition(data: SlidesOutputData) {
    this.owlElements.forEach((element) => {
      this.renderer.removeClass(element.nativeElement, 'is-transitioned');
    });

    const currentIndex = data.startPosition;
    if (currentIndex === 0) {
      this.slide1.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    } else {
      this.slide2.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    }
  }

  onCarouselInitialized(data: SlidesOutputData) {
    setTimeout(() => {
      this.slide1.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    }, 200);
  }
}
