import { Component, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent {
  @Input('title') title: string;
  @Input('fabButton') fabButton: boolean;
  @Output() fabButtonOnClick: EventEmitter<any> = new EventEmitter();
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // if (matches) {
      //   return [
      //     { title: 'Card 1', cols: 2, rows: 2 }
      //   ];
      // }

      return [
        { title: 'Card 1', cols: 2, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  handleFabButtonOnClick() {
    this.fabButtonOnClick.emit({}); // TODO
  }

}
