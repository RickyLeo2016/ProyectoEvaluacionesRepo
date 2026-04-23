// // Angular Import
import { Component, Input, inject, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Project import
import { NavigationItem } from 'src/app/theme/layouts/admin-layout/navigation/navigation';
import { MenuService } from 'src/app/services/menu/menu';

interface titleType {
  url: any;
  title: string;
  breadcrumbs: unknown;
  type: string;
  link?: string;
  description?: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  private router = inject(Router);
  private titleService = inject(Title);
  private menuService = inject(MenuService);

  @Input() type: string = 'theme1';
  dashboard = input(true);
  Component = input(false);

  // 🔥 IMPORTANTE: inicializar como array
  navigations: NavigationItem[] = [];

  breadcrumbList: Array<string> = [];
  navigationList: titleType[] = [];

  constructor() {

    // 🔥 escuchar menú dinámico (signals)
    effect(() => {
      this.navigations = this.menuService.menus$() || [];
    });

    this.setBreadcrumb();
  }

  // =========================
  // ESCUCHAR CAMBIOS DE RUTA
  // =========================
  setBreadcrumb() {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {

        // 🔥 limpiar query params
        const activeLink = event.urlAfterRedirects.split('?')[0];

        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);

        this.navigationList = breadcrumbList;

        const title =
          breadcrumbList.length > 0
            ? breadcrumbList[breadcrumbList.length - 1].title
            : 'Inicio';

        this.titleService.setTitle(`${title} | Sistema`);
      }
    });
  }

  // =========================
  // FILTRAR NAVEGACIÓN
  // =========================
  filterNavigation(
    navItems: NavigationItem[] = [],
    activeLink: string
  ): titleType[] {

    if (!Array.isArray(navItems) || navItems.length === 0) {
      return [];
    }

    for (const navItem of navItems) {

      // 🔹 ITEM FINAL
      if (navItem.type === 'item' && navItem.url === activeLink) {
        return [
          {
            url: navItem.url,
            title: navItem.title,
            link: navItem.link,
            description: navItem.description,
            path: navItem.path,
            breadcrumbs: navItem.breadcrumbs ?? true,
            type: navItem.type
          }
        ];
      }

      // 🔹 PADRE (GROUP / COLLAPSE)
      if (
        (navItem.type === 'group' || navItem.type === 'collapse') &&
        navItem.children
      ) {

        const childrenResult = this.filterNavigation(
          navItem.children,
          activeLink
        );

        if (childrenResult.length > 0) {

          childrenResult.unshift({
            url: navItem.url ?? false,
            title: navItem.title,
            link: navItem.link,
            path: navItem.path,
            description: navItem.description,
            breadcrumbs: navItem.breadcrumbs ?? true,
            type: navItem.type
          });

          return childrenResult;
        }
      }
    }

    return [];
  }
}
