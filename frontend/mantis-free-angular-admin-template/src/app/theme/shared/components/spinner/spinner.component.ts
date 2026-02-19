import {
  Component,
  OnDestroy,
  ViewEncapsulation,
  inject,
  input,
  effect
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Spinkit } from './spinkits';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [
    './spinner.component.scss',
    './spinkit-css/sk-line-material.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {

  /**
   * Si manual = true → el spinner se controla desde afuera
   * Si manual = false → el spinner se controla por navegación
   */
  manual = input<boolean>(false);

  /**
   * Visible solo cuando manual = true
   */
  visible = input<boolean>(false);

  isSpinnerVisible = false; // 🔥 IMPORTANTE: inicia oculto

  Spinkit = Spinkit;
  backgroundColor = input('#1890ff');
  spinner = input(Spinkit.skLine);

  private router = inject(Router);
  private document = inject<Document>(DOCUMENT);

  constructor() {

    // 👇 Control automático por navegación
    this.router.events.subscribe(event => {

      if (!this.manual()) {

        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      }
    });

    // 👇 Control manual reactivo
    effect(() => {
      if (this.manual()) {
        this.isSpinnerVisible = this.visible();
      }
    });
  }

  // API pública opcional
  show() {
    this.isSpinnerVisible = true;
  }

  hide() {
    this.isSpinnerVisible = false;
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
