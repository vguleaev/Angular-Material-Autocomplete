import { ControlValueAccessor, FormControl, Validator, AbstractControl } from "@angular/forms";
export declare abstract class AbstractValueAccessor implements ControlValueAccessor, Validator {
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    formControlItem?: FormControl;
    formControlName?: string;
    private _value;
    value: any;
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    } | null;
    registerOnValidatorChange?(fn: () => void): void;
}
