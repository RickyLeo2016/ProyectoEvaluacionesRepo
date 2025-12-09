import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'mantis-free-version';

  ngAfterViewInit() {
    feather.replace();
  }
}
