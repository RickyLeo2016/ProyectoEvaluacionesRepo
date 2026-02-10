import { Injectable } from '@angular/core';
import * as feather from 'feather-icons';

@Injectable({ providedIn: 'root' })
export class IconsFather {
  feather = feather;

  init() {
    this.feather.replace();
  }

  cleanup() {
    // Busca todos los svg con clase feather (que feather inserta)
    const svgs = document.querySelectorAll('svg.feather');
    svgs.forEach(svg => svg.remove());
  }
}
