import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { FormField } from '../../models/data.models';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-field-component.html',
  styleUrls: ['./dynamic-field-component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFieldComponent),
      multi: true
    }
  ]
})
export class DynamicFieldComponent implements ControlValueAccessor {
  @Input() field!: FormField;
  @Input() fieldId!: number;

  value: any = '';
  disabled = false;

  // Set local pour gérer spécifiquement les cases à cocher de CE champ
  tempMultiResponses: Set<string> = new Set<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value || '';
    // Si c'est un champ multiple, on initialise le Set à partir de la chaîne CSV
    if (this.field && (this.field.type === 'CHECKBOX' || this.field.type === 'MULTI_SELECT')) {
      this.tempMultiResponses = new Set<string>(this.value ? this.value.split(',') : []);
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.value = this.field.multiple ? files : files[0];
    this.onChange(this.value);
    this.onTouched();
  }

  onRadioChange(value: string) {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  onSelectChange(value: string) {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  onCheckboxChange(event: any, optValue: string) {
    if (event.target.checked) {
      this.tempMultiResponses.add(optValue);
    } else {
      this.tempMultiResponses.delete(optValue);
    }
    // On convertit le Set en string CSV et on notifie Angular
    this.value = Array.from(this.tempMultiResponses).join(',');
    this.onChange(this.value);
    this.onTouched();
  }

  onMultiSelectChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions).map((o: any) => o.value);
    this.value = selectedOptions.join(',');
    this.onChange(this.value);
    this.onTouched();
  }
}
