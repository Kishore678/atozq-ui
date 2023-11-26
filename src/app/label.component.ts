import { Component, Input } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-label',
  template: `
    <label [for]="for" class="block mb-2 text-sm font-medium text-gray-300">
      <ng-content></ng-content>
      <ng-container *ngIf="required"><span style='color:red'>*</span></ng-container>
    </label>
  `,
  styles: []
})
export class LabelComponent {
  @Input() for?: string;
  @Input() control!: AbstractControl;

  get required(): boolean {
    return this.control.hasValidator(Validators.required);
  }
}
