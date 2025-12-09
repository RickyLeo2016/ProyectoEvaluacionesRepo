import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class Modal implements AfterViewInit, OnDestroy {
  @Input() title = 'Modal';
  @Input() visible = false;

  @Output() closed = new EventEmitter<void>();

  private element!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.element = this.el.nativeElement;
    document.body.appendChild(this.element);
  }

  ngOnDestroy(): void {
    if (this.element) {
      document.body.removeChild(this.element);
    }
  }

  close() {
    this.closed.emit();
  }
}
