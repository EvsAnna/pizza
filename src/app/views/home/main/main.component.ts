import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {map, Observable, Subject, Subscription} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";
// // declare var bootstrap:any;
// import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private observable: Observable<number>;

  // private promise: Promise<string>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;


  constructor(public cartService: CartService,
              private modalService: NgbModal) {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++)
    }, 1000)
    const timeout1 = setTimeout(() => {
      this.subject.complete()
    }, 4000)
  }


  ngOnInit() {
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show()

    console.log(environment.production);

    this.subscription = this.subject.subscribe(
      {
        next: (params: number) => {
          console.log('subscriber 1: ', params)
        },
        complete: () => {
        },
        error: (error: string) => {
          console.log('ERROR!!! ' + error)
        }
      }
    );
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent

  ngAfterViewInit() {
    // this.popupComponent.open()

    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'Main component';

    // this.modalService.open(this.popup, {});
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map((number: number) => {
          return 'Число ' + number
        })
      )
      .subscribe((params: string) => {
        console.log('subscriber 2: ', params)
      })
  }

}
