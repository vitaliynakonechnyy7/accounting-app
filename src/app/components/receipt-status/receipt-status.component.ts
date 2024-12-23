import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receipt-status',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  template: `
    <div class="checkboxes">
      <mat-checkbox [(ngModel)]="hasOriginal" 
                   (ngModelChange)="updateStatus()"
                   [class.incomplete]="hasOriginal && !hasCopy"
                   [class.complete]="hasOriginal && hasCopy">
        Оригинал
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="hasCopy" 
                   (ngModelChange)="updateStatus()"
                   [class.incomplete]="hasCopy && !hasOriginal"
                   [class.complete]="hasOriginal && hasCopy">
        Копия
      </mat-checkbox>
    </div>
  `,
  styles: [`
    .checkboxes {
      display: flex;
      gap: 16px;
    }
    
    ::ng-deep {
      .mat-mdc-checkbox.incomplete .mdc-checkbox .mdc-checkbox__background {
        border-color: var(--error-color) !important;
        background-color: var(--error-color) !important;
      }
      
      .mat-mdc-checkbox.complete .mdc-checkbox .mdc-checkbox__background {
        border-color: var(--success-color) !important;
        background-color: var(--success-color) !important;
      }
      
      .mat-mdc-checkbox.incomplete .mdc-form-field,
      .mat-mdc-checkbox.incomplete .mdc-checkbox__ripple {
        color: var(--error-color);
      }
      
      .mat-mdc-checkbox.complete .mdc-form-field,
      .mat-mdc-checkbox.complete .mdc-checkbox__ripple {
        color: var(--success-color);
      }
    }
  `]
})
export class ReceiptStatusComponent {
  @Input() hasOriginal = false;
  @Input() hasCopy = false;
  @Output() originalChange = new EventEmitter<boolean>();
  @Output() copyChange = new EventEmitter<boolean>();

  updateStatus() {
    this.originalChange.emit(this.hasOriginal);
    this.copyChange.emit(this.hasCopy);
  }
}