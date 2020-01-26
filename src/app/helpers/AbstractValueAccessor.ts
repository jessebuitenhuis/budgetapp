import { ControlValueAccessor, NgControl } from "@angular/forms";
import { Self, Optional, Input, Directive } from "@angular/core";

let uniqueId = 0;

@Directive()
export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  @Input() readonly: boolean = false;

  private _onChange?: (val: T | undefined) => any;
  private _onTouched?: () => any;
  protected _value?: T;

  set value(val: T | undefined) {
    const hasChanged = val !== this._value;
    this._value = val;

    if (hasChanged && this._onChange) {
      this._onChange(val);
    }
  }
  get value(): T | undefined {
    return this._value;
  }

  isDisabled = false;
  id = uniqueId++;

  constructor(@Self() @Optional() public control: NgControl) {
    this._setValueAccessor();
  }

  writeValue(val: T | undefined): void {
    this._value = val;
  }

  registerOnChange(fn: (val: T | undefined) => any): void {
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
