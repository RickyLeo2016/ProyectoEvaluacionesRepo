// Angular imports
import { Component, OnDestroy, ViewEncapsulation, inject, input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Spinkit } from './spinkits';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  
  // Permite activar/desactivar spinner desde afuera
  manual = input<boolean>(false);

  // Props existentes
  isSpinnerVisible = true;
  Spinkit = Spinkit;
  backgroundColor = input('#1890ff');
  spinner = input(Spinkit.skLine);

  private router = inject(Router);
  private document = inject<Document>(DOCUMENT);

  constructor() {

    this.router.events.subscribe(event => {
      if (!this.manual()) {   // 👉 Si el control NO es manual, funciona como antes
        if (event instanceof NavigationStart) this.isSpinnerVisible = true;
        else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
          this.isSpinnerVisible = false;
      }
    });

  }

  // Public API: funciones para activar/desactivar spinner
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
