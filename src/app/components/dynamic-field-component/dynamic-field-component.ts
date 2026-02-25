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

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onCheckboxChange(event: any) {
    this.value = event.target.checked;
    this.onChange(this.value);
    this.onTouched();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (this.field.multiple) {
      this.value = files;
    } else {
      this.value = files[0];
    }
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
}
