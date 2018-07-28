/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input } from "@angular/core";
import { FormControl, } from "@angular/forms";
/**
 * @abstract
 */
export class AbstractValueAccessor {
    constructor() {
        this.disabled = false;
        this._value = "";
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = value;
        // warning: comment below if only want to emit on user intervention
        this.onChange(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return null;
    }
}
AbstractValueAccessor.propDecorators = {
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    placeholder: [{ type: Input }],
    formControlItem: [{ type: Input }],
    formControlName: [{ type: Input }]
};
function AbstractValueAccessor_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractValueAccessor.prototype.disabled;
    /** @type {?} */
    AbstractValueAccessor.prototype.required;
    /** @type {?} */
    AbstractValueAccessor.prototype.placeholder;
    /** @type {?} */
    AbstractValueAccessor.prototype.formControlItem;
    /** @type {?} */
    AbstractValueAccessor.prototype.formControlName;
    /** @type {?} */
    AbstractValueAccessor.prototype._value;
    /** @type {?} */
    AbstractValueAccessor.prototype.onChange;
    /** @type {?} */
    AbstractValueAccessor.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Admd1bGVhZXYvZHluYW1pYy1hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJzcmMvYXBwL2F1dG9jb21wbGV0ZS9hYnN0cmFjdC12YWx1ZS1hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBSUwsV0FBVyxHQUlaLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFeEIsTUFBTTs7d0JBRTBCLEtBQUs7c0JBTWIsRUFBRTt3QkFrQk4sQ0FBQyxDQUFNLEVBQUUsRUFBRSxJQUFHO3lCQUNiLEdBQUcsRUFBRSxJQUFHOzs7OztJQWpCM0IsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0tBQ0Y7Ozs7O0lBRU0sVUFBVSxDQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUtoQixnQkFBZ0IsQ0FBQyxFQUFvQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBRWQsaUJBQWlCLENBQUMsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBR2YsUUFBUSxDQUFDLENBQWtCO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7dUJBbENiLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOR19WQUxJREFUT1JTLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFZhbGlkYXRvcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuXHJcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sSXRlbT86IEZvcm1Db250cm9sO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZT86IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IFwiXCI7XHJcblxyXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIC8vIHdhcm5pbmc6IGNvbW1lbnQgYmVsb3cgaWYgb25seSB3YW50IHRvIGVtaXQgb24gdXNlciBpbnRlcnZlbnRpb25cclxuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U/KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG4iXX0=