import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOverflowCheck]',
  standalone: true
})
export class OverflowCheckDirective {

  constructor(public el: ElementRef) { }

}
