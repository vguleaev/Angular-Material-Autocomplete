/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input } from "@angular/core";
import { FormControl, } from "@angular/forms";
/**
 * @abstract
 */
var AbstractValueAccessor = /** @class */ (function () {
    function AbstractValueAccessor() {
        this.disabled = false;
        this._value = "";
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(AbstractValueAccessor.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    AbstractValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = value;
        // warning: comment below if only want to emit on user intervention
        this.onChange(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AbstractValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AbstractValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    AbstractValueAccessor.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return null;
    };
    AbstractValueAccessor.propDecorators = {
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        placeholder: [{ type: Input }],
        formControlItem: [{ type: Input }],
        formControlName: [{ type: Input }]
    };
    return AbstractValueAccessor;
}());
export { AbstractValueAccessor };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Admd1bGVhZXYvZHluYW1pYy1hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJzcmMvYXBwL2F1dG9jb21wbGV0ZS9hYnN0cmFjdC12YWx1ZS1hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBSUwsV0FBVyxHQUlaLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozt3QkFJUSxLQUFLO3NCQU1iLEVBQUU7d0JBa0JOLFVBQUMsQ0FBTSxLQUFPO3lCQUNiLGVBQVE7O0lBakIzQixzQkFBSSx3Q0FBSzs7OztRQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7Ozs7O1FBQ0QsVUFBVSxDQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtTQUNGOzs7T0FOQTs7Ozs7SUFRTSwwQ0FBVTs7OztjQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUtoQixnREFBZ0I7Ozs7Y0FBQyxFQUFvQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBRWQsaURBQWlCOzs7O2NBQUMsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBR2Ysd0NBQVE7Ozs7Y0FBQyxDQUFrQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDOzs7MkJBbENiLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO2tDQUNMLEtBQUs7a0NBQ0wsS0FBSzs7Z0NBakJSOztTQVdzQixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTkdfVkFMSURBVE9SUyxcclxuICBGb3JtQ29udHJvbCxcclxuICBWYWxpZGF0b3IsXHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIFZhbGlkYXRpb25FcnJvcnMsXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XHJcblxyXG4gIEBJbnB1dCgpIGRpc2FibGVkPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICBASW5wdXQoKSBmb3JtQ29udHJvbEl0ZW0/OiBGb3JtQ29udHJvbDtcclxuICBASW5wdXQoKSBmb3JtQ29udHJvbE5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSBcIlwiO1xyXG5cclxuICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xyXG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAvLyB3YXJuaW5nOiBjb21tZW50IGJlbG93IGlmIG9ubHkgd2FudCB0byBlbWl0IG9uIHVzZXIgaW50ZXJ2ZW50aW9uXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIHB1YmxpYyBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGwge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlPyhmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbn1cclxuIl19