import { forwardRef, Input } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

export abstract class AbstractValueAccessor implements ControlValueAccessor, Validator {

  @Input() disabled?: boolean = false;
  @Input() required?: boolean;
  @Input() placeholder?: string;
  @Input() formControlItem?: FormControl;
  @Input() formControlName?: string;

  private _value: any = "";

  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  public writeValue(value: any) {
    this._value = value;
    // warning: comment below if only want to emit on user intervention
    this.onChange(value);
  }

  public onChange = (_: any) => {};
  public onTouched = () => {};
  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public validate(c: AbstractControl): { [key: string]: any } | null {
    return null;
  }
  public registerOnValidatorChange?(fn: () => void): void;
}

export function MakeValueProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}

export function MakeValidatorsProvider(type: any) {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
