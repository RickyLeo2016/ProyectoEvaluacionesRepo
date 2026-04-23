import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTouched]',
  standalone: true,
  exportAs: 'appTouched'
})
export class TouchedDirective {

  @Input() appTouched: any;

  private touched = false;

  @HostListener('blur')
  onBlur() {
    this.touched = true;
  }

  private isEmpty(): boolean {
    const val = this.appTouched;

    return val === null ||
           val === undefined ||
           val === '' ||
           (typeof val === 'string' && !val.trim());
  }

  isInvalid(): boolean {
    return this.touched && this.isEmpty();
  }

  isValid(): boolean {
    return this.touched && !this.isEmpty();
  }
}
