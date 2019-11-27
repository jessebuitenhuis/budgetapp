import { ControlValueAccessor, NgControl } from "@angular/forms";
import { Self, Optional, Input } from "@angular/core";

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  @Input() readonly: boolean = false;

  private _onChange?: (val: T | null) => any;
  private _onTouched?: () => any;
  private _value: T | null = null;

  set value(val: T | null) {
    const hasChanged = val !== this._value;
    this._value = val;

    if (hasChanged && this._onChange) {
      this._onChange(val);
    }
  }
  get value(): T | null {
    return this._value;
  }

  isDisabled = false;

  constructor(@Self() @Optional() public control: NgControl) {
    this._setValueAccessor();
  }

  writeValue(val: T | null) {
    this._value = val;
  }

  registerOnChange(fn: (val: T | null) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onTouched() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  private _setValueAccessor(): void {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }
}
