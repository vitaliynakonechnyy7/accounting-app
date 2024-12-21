import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receipt-status',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  template: `
    <div class="checkboxes" [ngClass]="statusClass">
      <mat-checkbox [(ngModel)]="hasOriginal" 
                   (ngModelChange)="updateStatus()"
                   color="primary">
        Оригинал
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="hasCopy" 
                   (ngModelChange)="updateStatus()"
                   color="primary">
        Копия
      </mat-checkbox>
    </div>
  `,
  styles: [`
    .checkboxes {
      display: flex;
      gap: 16px;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    .incomplete {
      background-color: rgba(244, 67, 54, 0.1);
    }
    .complete {
      background-color: rgba(76, 175, 80, 0.1);
    }
  `]
})
export class ReceiptStatusComponent {
  @Input() hasOriginal = false;
  @Input() hasCopy = false;
  @Output() originalChange = new EventEmitter<boolean>();
  @Output() copyChange = new EventEmitter<boolean>();

  get statusClass(): string {
    if (!this.hasOriginal && !this.hasCopy) return '';
    return (this.hasOriginal && this.hasCopy) ? 'complete' : 'incomplete';
  }

  updateStatus() {
    this.originalChange.emit(this.hasOriginal);
    this.copyChange.emit(this.hasCopy);
  }
}