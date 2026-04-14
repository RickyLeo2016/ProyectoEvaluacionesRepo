import { Component, inject, output, effect } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationItem } from '../navigation';
import { environment } from 'src/environments/environment';

import { NavGroupComponent } from './nav-group/nav-group.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconService } from '@ant-design/icons-angular';

import { MenuService } from 'src/app/services/menu/menu';

@Component({
  selector: 'app-nav-content',
  imports: [CommonModule, RouterModule, NavGroupComponent, NgScrollbarModule],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {

  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  private iconService = inject(IconService);
  private menuService = inject(MenuService);

  NavCollapsedMob = output();

  navigations: NavigationItem[] = [];

  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  windowWidth = window.innerWidth;

  constructor() {

    // 🔥 REACTIVIDAD DEL MENÚ (SIGNALS)
    effect(() => {
      this.navigations = this.menuService.menus$();
    });
  }

  ngOnInit() {
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement)
        .classList.add('menupos-static');
    }

    // 🔥 CARGAR MENÚ DESDE API (SI NO LO HICISTE EN LOGIN)
    this.menuService.ObtenerMenusPorUsuario().subscribe();
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();

    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);

    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;

      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger', 'active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger', 'active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger', 'active');
      }
    }
  }

  navMob() {
    const navbar = document.querySelector('app-navigation.coded-navbar');

    if (
      this.windowWidth < 1025 &&
      navbar?.classList.contains('mob-open')
    ) {
      this.NavCollapsedMob.emit();
    }
  }
}