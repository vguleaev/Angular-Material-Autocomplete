import { Input, Component, ViewChild, EventEmitter, Output, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { __extends } from 'tslib';
import { MatProgressBarModule, MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatCardModule } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutocompleteComponent = /** @class */ (function (_super) {
    __extends(AutocompleteComponent, _super);
    function AutocompleteComponent() {
        var _this = _super.call(this) || this;
        // @Input() placeholder = "";
        _this.name = "";
        _this.doPrefetch = false;
        _this.hasSearchButton = false;
        _this.hasProgressBar = false;
        _this.minChars = 2;
        _this.clearAfterSearch = false;
        _this.canCreateNew = false;
        _this.addNewText = "Add new";
        _this.focusOn = false;
        _this.validationErrors = [];
        _this.filterCallback = function (x) { return x; };
        _this.modelChange = new EventEmitter();
        _this.optionSelected = new EventEmitter();
        _this.createNew = new EventEmitter();
        _this.query = "";
        _this.request = false;
        _this.requestsInQueue = 0;
        _this.placeholder = _this.placeholder ? _this.placeholder : "Search";
        return _this;
    }
    Object.defineProperty(AutocompleteComponent.prototype, "source", {
        /**
         *  How to use this component:
         *
         *  <autocomplete
         *    placeholder="Search"
         *    [minChars] = "2"                            // start fetch items after min chars amount, default is 2
         *    [source]="AutocompleteService | any[]"      // source can be service or array, when array is passed filter is done local
         *    [serviceParams]= "HttpParams"               // sets HttpParams for service fetch function
         *    [doPrefetch]= "false"                       // when active, service do fetch items on init
         *    [clearAfterSearch] = "false"                // clears input after item select
         *    [hasProgressBar] = "false"                  // adds loading while making request
         *    [hasSearchButton] = "false"                 // adds search button near input
         *
         *    displayItem = "item.name"                   // text will be evaluated and executed, better use displayItemFn for function
         *    [displayTemplate] = "TemplateRef"           // template reference for autocomplete options, displayItem is needed for local search
         *
         *    [canCreateNew] = "false"                    // adds create button when no suggestions
         *    [addNewText] = "'Add new'"                  // text to display near create button
         *    (createNew) = "onCreateNew($event)"         // rises an event when click on create button
         *
         *    [filterCallback] = "function"               // callback function to format data from server response
         *    [focusOn]="true"                            // sets focus that triggers fetch
         *
         *    (optionSelected)="onSelectCallback($event)" // get selected item from event
         *
         *    formControlName="controlName"               // access it as any form control
         *    [formControlItem]="form.controls['controlName']"
         *    [(ngModel)]="model.item"
         *
         *    [(model)]="model.item"                      // or just use model binding
         *    (modelChange)="itemSelected($event)"
         *
         *  ></autocomplete>
         */
        set: /**
         *  How to use this component:
         *
         *  <autocomplete
         *    placeholder="Search"
         *    [minChars] = "2"                            // start fetch items after min chars amount, default is 2
         *    [source]="AutocompleteService | any[]"      // source can be service or array, when array is passed filter is done local
         *    [serviceParams]= "HttpParams"               // sets HttpParams for service fetch function
         *    [doPrefetch]= "false"                       // when active, service do fetch items on init
         *    [clearAfterSearch] = "false"                // clears input after item select
         *    [hasProgressBar] = "false"                  // adds loading while making request
         *    [hasSearchButton] = "false"                 // adds search button near input
         *
         *    displayItem = "item.name"                   // text will be evaluated and executed, better use displayItemFn for function
         *    [displayTemplate] = "TemplateRef"           // template reference for autocomplete options, displayItem is needed for local search
         *
         *    [canCreateNew] = "false"                    // adds create button when no suggestions
         *    [addNewText] = "'Add new'"                  // text to display near create button
         *    (createNew) = "onCreateNew($event)"         // rises an event when click on create button
         *
         *    [filterCallback] = "function"               // callback function to format data from server response
         *    [focusOn]="true"                            // sets focus that triggers fetch
         *
         *    (optionSelected)="onSelectCallback($event)" // get selected item from event
         *
         *    formControlName="controlName"               // access it as any form control
         *    [formControlItem]="form.controls['controlName']"
         *    [(ngModel)]="model.item"
         *
         *    [(model)]="model.item"                      // or just use model binding
         *    (modelChange)="itemSelected($event)"
         *
         *  ></autocomplete>
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.isAutocompleteService(value)) {
                this.service = /** @type {?} */ (value);
            }
            else if (value instanceof Array) {
                this.storedItems = value.slice(0);
                this.saveReturnType(this.storedItems);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutocompleteComponent.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentModel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.currentModel) {
                this.currentModel = value;
                if (value === null || this.returnType === typeof value) {
                    this.modelChange.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.doPrefetch) {
            this.prefetch();
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.focusOn) {
            setTimeout(function () {
                _this.autocompleteInput.nativeElement.focus();
            });
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.prefetch = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.service) {
            throw new Error("Service for prefetch is not defined in 'Source'");
        }
        this.storedItems = [];
        this.noSuggestions = false;
        var /** @type {?} */ params = new HttpParams();
        if (this.serviceParams) {
            params = this.serviceParams;
        }
        this.service.fetch(params).then(function (result) {
            _this.storedItems = _this.filterCallback(result);
            _this.noSuggestions = result.length === 0;
            _this.saveReturnType(_this.storedItems);
        });
    };
    /**
     * @param {?=} force
     * @return {?}
     */
    AutocompleteComponent.prototype.fetch = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (!this.service) {
            throw new Error("Service for fetch is not defined in 'Source'");
        }
        this.query = this.autocompleteInput.nativeElement.value;
        // empty query is not allowed for autocomplete
        if (this.isQueryEmpty(this.query)) {
            this.autocompleteList = [];
            return;
        }
        if (force || this.query.length >= this.minChars) {
            var /** @type {?} */ params = new HttpParams();
            params = params.set("query", this.query);
            if (this.serviceParams) {
                params = this.serviceParams.set("query", this.query);
            }
            this.noSuggestions = false;
            this.requestsInQueue = this.requestsInQueue + 1;
            this.service.fetch(params)
                .then(function (result) {
                _this.requestsInQueue = _this.requestsInQueue - 1;
                _this.autocompleteList = _this.filterCallback(result);
                _this.noSuggestions = result.length === 0;
                _this.saveReturnType(_this.autocompleteList);
            });
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.filterStoredItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.displayItem && !this.displayItemFn) {
            throw new Error("You must provide displayItem or displayItemFn for local search.");
        }
        this.query = this.autocompleteInput.nativeElement.value;
        if (this.query.length < this.minChars) {
            return;
        }
        if (this.storedItems) {
            this.autocompleteList = this.storedItems.filter(function (item) {
                if (!_this.viewItem(item)) {
                    throw new Error("String to evaluate in displayItem was provided wrong. Better use displayItemFn");
                }
                var /** @type {?} */ formatedItem = _this.viewItem(item).toLowerCase();
                if (_this.displayItemFn) {
                    formatedItem = _this.displayItemFn(item).toLowerCase();
                }
                return formatedItem.indexOf(_this.query.toLowerCase()) > -1;
            });
            this.noSuggestions = this.query.length > 0 && this.autocompleteList.length === 0;
        }
        else {
            this.autocompleteList = [];
            this.noSuggestions = false;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteComponent.prototype.autocompleteSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.query = this.autocompleteInput.nativeElement.value;
        var /** @type {?} */ selected = $event.option.value;
        this.value = selected;
        this.model = selected;
        if (selected) {
            this.optionSelected.emit(selected);
        }
        if (this.clearAfterSearch) {
            this.clearValue();
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.autocompleteDisplayFn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.displayItemFn) {
            return this.displayItemFn;
        }
        return function (item) {
            return item ? _this.viewItem(item) : item;
        };
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteComponent.prototype.onKey = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        // prevent filtering results if arrow were pressed
        if ($event.keyCode < 37 || $event.keyCode > 40) {
            if (this.autocompleteInput.nativeElement.value === "") {
                this.clearValue();
            }
            this.onKeyCallback();
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.onKeyCallback = /**
     * @return {?}
     */
    function () {
        if (this.doSearchViaService) {
            this.fetch();
        }
        else {
            this.filterStoredItems();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteComponent.prototype.onBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.searchButton && this.autocompleteInput.nativeElement.value === ""
            && $event.relatedTarget !== this.searchButton["_elementRef"].nativeElement) {
            this.autocompleteInput.nativeElement.value = this.model ? this.viewItem(this.model) : "";
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteComponent.prototype.onFocus = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.doSearchViaService) {
            this.fetch();
        }
        else {
            this.filterStoredItems();
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AutocompleteComponent.prototype.viewItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.displayItemFn) {
            return this.displayItemFn(item);
        }
        // using eval() can be dangerous, better use displayItemFn function
        return this.displayItem ? eval(this.displayItem) : item.name;
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.clearValue = /**
     * @return {?}
     */
    function () {
        if (this.formControlItem) {
            this.formControlItem.reset();
        }
        this.model = null;
        this.value = "";
    };
    Object.defineProperty(AutocompleteComponent.prototype, "doSearchViaService", {
        get: /**
         * @return {?}
         */
        function () {
            // check if search result returns from service or from local data
            // if prefetch is active only one request will be made on init
            return this.service && !this.doPrefetch;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.onCreateNew = /**
     * @return {?}
     */
    function () {
        if (this.model) {
            var /** @type {?} */ value = this.returnType === typeof this.model ? this.viewItem(this.model) : this.model;
            this.autocompleteInput.nativeElement.value = value;
        }
        this.createNew.emit(this.model);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    AutocompleteComponent.prototype.isQueryEmpty = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return query.length <= 0;
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AutocompleteComponent.prototype.isAutocompleteService = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return object && "fetch" in object;
    };
    /**
     * @param {?} items
     * @return {?}
     */
    AutocompleteComponent.prototype.saveReturnType = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (items && items.length > 0) {
            this.returnType = typeof items[0];
        }
    };
    AutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: "autocomplete",
                    template: "<mat-form-field class=\"input-container\">\n  <input matInput\n         *ngIf=\"formControlItem && formControlName\"\n         [formControl]=\"formControlItem\"\n         [required]=\"required\"\n         [matAutocomplete]=\"autocomplete\"\n         [placeholder]=\"placeholder\"\n         (keyup)=\"onKey($event)\"\n         (focus)=\"onFocus($event)\"\n         (blur)=\"onBlur($event)\"\n         #autocompleteInput\n  />\n  <input matInput\n         *ngIf=\"!formControlItem && !formControlName\"\n         [name]=\"name\"\n         [disabled]=\"disabled\"\n         [required]=\"required\"\n         [matAutocomplete]=\"autocomplete\"\n         [placeholder]=\"placeholder\"\n         (keyup)=\"onKey($event)\"\n         (focus)=\"onFocus($event)\"\n         (blur)=\"onBlur($event)\"\n         [(ngModel)]=\"model\"\n         #autocompleteInput\n  />\n  <button *ngIf=\"hasSearchButton\" #searchButton mat-button matPrefix mat-icon-button aria-label=\"Search\" (click)=\"fetch(true)\" type=\"button\">\n      <mat-icon class=\"search-icon\">search</mat-icon>\n  </button>\n  <button *ngIf=\"model || value || query\" mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clearValue()\" #clearButton type=\"button\">\n    <mat-icon class=\"clear-icon\">clear</mat-icon>\n  </button>\n  <mat-progress-bar mode=\"indeterminate\" *ngIf=\"hasProgressBar && requestsInQueue > 0\"></mat-progress-bar>\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n                    [displayWith]=\"autocompleteDisplayFn()\"\n                    (optionSelected)=\"autocompleteSelected($event)\">\n    <mat-option *ngFor=\"let item of autocompleteList\" [value]=\"item\">\n      <ng-template [ngIf]=\"displayTemplate\">\n        <ng-container *ngTemplateOutlet=\"displayTemplate; context: {$implicit: item}\"></ng-container>\n      </ng-template>\n      <span *ngIf=\"!displayTemplate\">\n        {{viewItem(item)}}\n      </span>\n    </mat-option>\n    <mat-option *ngIf=\"query && noSuggestions\" disabled>\n      <span>Sorry, no suggestions were found</span>\n    </mat-option>\n    <mat-option *ngIf=\"query && noSuggestions && canCreateNew\" [value]=\"query\" (click)=\"onCreateNew()\">\n      <mat-icon class=\"add-icon\">add</mat-icon> <span class=\"create-new\"> {{addNewText}} </span>\n    </mat-option>\n  </mat-autocomplete>\n  <mat-error>\n    {{ validationErrors && validationErrors.length > 0 ? validationErrors[0] : ''}}\n  </mat-error>\n</mat-form-field>\n\n",
                    styles: [".input-container{width:100%}.search-icon{font-size:24px}.mat-progress-bar{position:absolute}.create-new{color:#27ae60}.add-icon{position:relative;color:#27ae60}"],
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AutocompleteComponent; }),
                            multi: true,
                        }],
                },] },
    ];
    /** @nocollapse */
    AutocompleteComponent.ctorParameters = function () { return []; };
    AutocompleteComponent.propDecorators = {
        source: [{ type: Input }],
        name: [{ type: Input }],
        doPrefetch: [{ type: Input }],
        displayItem: [{ type: Input }],
        hasSearchButton: [{ type: Input }],
        hasProgressBar: [{ type: Input }],
        minChars: [{ type: Input }],
        clearAfterSearch: [{ type: Input }],
        canCreateNew: [{ type: Input }],
        addNewText: [{ type: Input }],
        focusOn: [{ type: Input }],
        validationErrors: [{ type: Input }],
        serviceParams: [{ type: Input }],
        displayItemFn: [{ type: Input }],
        displayTemplate: [{ type: Input }],
        filterCallback: [{ type: Input }],
        modelChange: [{ type: Output }],
        optionSelected: [{ type: Output }],
        createNew: [{ type: Output }],
        autocompleteInput: [{ type: ViewChild, args: ["autocompleteInput",] }],
        searchButton: [{ type: ViewChild, args: ["searchButton",] }],
        clearButton: [{ type: ViewChild, args: ["clearButton",] }],
        autocomplete: [{ type: ViewChild, args: ["autocomplete",] }],
        model: [{ type: Input }]
    };
    return AutocompleteComponent;
}(AbstractValueAccessor));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicAutocompleteModule = /** @class */ (function () {
    function DynamicAutocompleteModule() {
    }
    DynamicAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        FormsModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        MatButtonModule,
                        MatSelectModule,
                        MatCardModule,
                        MatAutocompleteModule,
                        MatIconModule,
                        MatProgressBarModule
                    ],
                    declarations: [AutocompleteComponent],
                    exports: [AutocompleteComponent]
                },] },
    ];
    return DynamicAutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AbstractValueAccessor, DynamicAutocompleteModule, AutocompleteComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmd1bGVhZXYtZHluYW1pYy1hdXRvY29tcGxldGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS9zcmMvYXBwL2F1dG9jb21wbGV0ZS9hYnN0cmFjdC12YWx1ZS1hY2Nlc3Nvci50cyIsIm5nOi8vQHZndWxlYWV2L2R5bmFtaWMtYXV0b2NvbXBsZXRlL3NyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS9zcmMvYXBwL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOR19WQUxJREFUT1JTLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFZhbGlkYXRvcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuXHJcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sSXRlbT86IEZvcm1Db250cm9sO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZT86IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IFwiXCI7XHJcblxyXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIC8vIHdhcm5pbmc6IGNvbW1lbnQgYmVsb3cgaWYgb25seSB3YW50IHRvIGVtaXQgb24gdXNlciBpbnRlcnZlbnRpb25cclxuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U/KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3JcIjtcclxuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlLCBNYXRCdXR0b24gfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlU2VydmljZSB9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImF1dG9jb21wbGV0ZVwiLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgPGlucHV0IG1hdElucHV0XHJcbiAgICAgICAgICpuZ0lmPVwiZm9ybUNvbnRyb2xJdGVtICYmIGZvcm1Db250cm9sTmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbEl0ZW1cIlxyXG4gICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCJcclxuICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgI2F1dG9jb21wbGV0ZUlucHV0XHJcbiAgLz5cclxuICA8aW5wdXQgbWF0SW5wdXRcclxuICAgICAgICAgKm5nSWY9XCIhZm9ybUNvbnRyb2xJdGVtICYmICFmb3JtQ29udHJvbE5hbWVcIlxyXG4gICAgICAgICBbbmFtZV09XCJuYW1lXCJcclxuICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcclxuICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxyXG4gICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAoa2V5dXApPVwib25LZXkoJGV2ZW50KVwiXHJcbiAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxyXG4gICAgICAgICAjYXV0b2NvbXBsZXRlSW5wdXRcclxuICAvPlxyXG4gIDxidXR0b24gKm5nSWY9XCJoYXNTZWFyY2hCdXR0b25cIiAjc2VhcmNoQnV0dG9uIG1hdC1idXR0b24gbWF0UHJlZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiU2VhcmNoXCIgKGNsaWNrKT1cImZldGNoKHRydWUpXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJzZWFyY2gtaWNvblwiPnNlYXJjaDwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiAqbmdJZj1cIm1vZGVsIHx8IHZhbHVlIHx8IHF1ZXJ5XCIgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiAjY2xlYXJCdXR0b24gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY2xlYXItaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiICpuZ0lmPVwiaGFzUHJvZ3Jlc3NCYXIgJiYgcmVxdWVzdHNJblF1ZXVlID4gMFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cclxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCJcclxuICAgICAgICAgICAgICAgICAgICBbZGlzcGxheVdpdGhdPVwiYXV0b2NvbXBsZXRlRGlzcGxheUZuKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhdXRvY29tcGxldGVTZWxlY3RlZCgkZXZlbnQpXCI+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBhdXRvY29tcGxldGVMaXN0XCIgW3ZhbHVlXT1cIml0ZW1cIj5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNwbGF5VGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIHt7dmlld0l0ZW0oaXRlbSl9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnNcIiBkaXNhYmxlZD5cclxuICAgICAgPHNwYW4+U29ycnksIG5vIHN1Z2dlc3Rpb25zIHdlcmUgZm91bmQ8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnMgJiYgY2FuQ3JlYXRlTmV3XCIgW3ZhbHVlXT1cInF1ZXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlTmV3KClcIj5cclxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWRkLWljb25cIj5hZGQ8L21hdC1pY29uPiA8c3BhbiBjbGFzcz1cImNyZWF0ZS1uZXdcIj4ge3thZGROZXdUZXh0fX0gPC9zcGFuPlxyXG4gICAgPC9tYXQtb3B0aW9uPlxyXG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cclxuICA8bWF0LWVycm9yPlxyXG4gICAge3sgdmFsaWRhdGlvbkVycm9ycyAmJiB2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDAgPyB2YWxpZGF0aW9uRXJyb3JzWzBdIDogJyd9fVxyXG4gIDwvbWF0LWVycm9yPlxyXG48L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlucHV0LWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5zZWFyY2gtaWNvbntmb250LXNpemU6MjRweH0ubWF0LXByb2dyZXNzLWJhcntwb3NpdGlvbjphYnNvbHV0ZX0uY3JlYXRlLW5ld3tjb2xvcjojMjdhZTYwfS5hZGQtaWNvbntwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojMjdhZTYwfWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICAvKipcclxuICAgKiAgSG93IHRvIHVzZSB0aGlzIGNvbXBvbmVudDpcclxuICAgKlxyXG4gICAqICA8YXV0b2NvbXBsZXRlXHJcbiAgICogICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxyXG4gICAqICAgIFttaW5DaGFyc10gPSBcIjJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBmZXRjaCBpdGVtcyBhZnRlciBtaW4gY2hhcnMgYW1vdW50LCBkZWZhdWx0IGlzIDJcclxuICAgKiAgICBbc291cmNlXT1cIkF1dG9jb21wbGV0ZVNlcnZpY2UgfCBhbnlbXVwiICAgICAgLy8gc291cmNlIGNhbiBiZSBzZXJ2aWNlIG9yIGFycmF5LCB3aGVuIGFycmF5IGlzIHBhc3NlZCBmaWx0ZXIgaXMgZG9uZSBsb2NhbFxyXG4gICAqICAgIFtzZXJ2aWNlUGFyYW1zXT0gXCJIdHRwUGFyYW1zXCIgICAgICAgICAgICAgICAvLyBzZXRzIEh0dHBQYXJhbXMgZm9yIHNlcnZpY2UgZmV0Y2ggZnVuY3Rpb25cclxuICAgKiAgICBbZG9QcmVmZXRjaF09IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhY3RpdmUsIHNlcnZpY2UgZG8gZmV0Y2ggaXRlbXMgb24gaW5pdFxyXG4gICAqICAgIFtjbGVhckFmdGVyU2VhcmNoXSA9w4LCoFwiZmFsc2VcIiAgICAgICAgICAgICAgICAvLyBjbGVhcnMgaW5wdXQgYWZ0ZXIgaXRlbSBzZWxlY3RcclxuICAgKiAgICBbaGFzUHJvZ3Jlc3NCYXJdID3DgsKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgLy8gYWRkcyBsb2FkaW5nIHdoaWxlIG1ha2luZyByZXF1ZXN0XHJcbiAgICogICAgW2hhc1NlYXJjaEJ1dHRvbl0gPSBcImZhbHNlXCIgICAgICAgICAgICAgICAgIC8vIGFkZHMgc2VhcmNoIGJ1dHRvbiBuZWFyIGlucHV0XHJcbiAgICpcclxuICAgKiAgICBkaXNwbGF5SXRlbSA9IFwiaXRlbS5uYW1lXCIgICAgICAgICAgICAgICAgICAgLy8gdGV4dCB3aWxsIGJlIGV2YWx1YXRlZCBhbmQgZXhlY3V0ZWQsIGJldHRlciB1c2UgZGlzcGxheUl0ZW1GbiBmb3IgZnVuY3Rpb25cclxuICAgKiAgICBbZGlzcGxheVRlbXBsYXRlXSA9IFwiVGVtcGxhdGVSZWZcIiAgICAgICAgICAgLy8gdGVtcGxhdGUgcmVmZXJlbmNlIGZvciBhdXRvY29tcGxldGUgb3B0aW9ucywgZGlzcGxheUl0ZW0gaXMgbmVlZGVkIGZvciBsb2NhbCBzZWFyY2hcclxuICAgKlxyXG4gICAqICAgIFtjYW5DcmVhdGVOZXddID3DgsKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgICAvLyBhZGRzIGNyZWF0ZSBidXR0b24gd2hlbiBubyBzdWdnZXN0aW9uc1xyXG4gICAqICAgIFthZGROZXdUZXh0XSA9IFwiJ0FkZCBuZXcnXCIgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHRvIGRpc3BsYXkgbmVhciBjcmVhdGUgYnV0dG9uXHJcbiAgICogICAgKGNyZWF0ZU5ldykgPSBcIm9uQ3JlYXRlTmV3KCRldmVudClcIiAgICAgICAgIC8vIHJpc2VzIGFuIGV2ZW50IHdoZW4gY2xpY2sgb24gY3JlYXRlIGJ1dHRvblxyXG4gICAqXHJcbiAgICogICAgW2ZpbHRlckNhbGxiYWNrXSA9IFwiZnVuY3Rpb25cIiAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZvcm1hdCBkYXRhIGZyb20gc2VydmVyIHJlc3BvbnNlXHJcbiAgICogICAgW2ZvY3VzT25dPVwidHJ1ZVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHMgZm9jdXMgdGhhdCB0cmlnZ2VycyBmZXRjaFxyXG4gICAqXHJcbiAgICogICAgKG9wdGlvblNlbGVjdGVkKT1cIm9uU2VsZWN0Q2FsbGJhY2soJGV2ZW50KVwiIC8vIGdldCBzZWxlY3RlZCBpdGVtIGZyb20gZXZlbnRcclxuICAgKlxyXG4gICAqICAgIGZvcm1Db250cm9sTmFtZT1cImNvbnRyb2xOYW1lXCIgICAgICAgICAgICAgICAvLyBhY2Nlc3MgaXQgYXMgYW55IGZvcm0gY29udHJvbFxyXG4gICAqICAgIFtmb3JtQ29udHJvbEl0ZW1dPVwiZm9ybS5jb250cm9sc1snY29udHJvbE5hbWUnXVwiXHJcbiAgICogICAgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtXCJcclxuICAgKlxyXG4gICAqICAgIFsobW9kZWwpXT1cIm1vZGVsLml0ZW1cIiAgICAgICAgICAgICAgICAgICAgICAvLyBvciBqdXN0IHVzZSBtb2RlbCBiaW5kaW5nXHJcbiAgICogICAgKG1vZGVsQ2hhbmdlKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgKlxyXG4gICAqICA+PC9hdXRvY29tcGxldGU+XHJcbiAgICovXHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3VyY2UodmFsdWU6IEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PiB8IGFueVtdKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dG9jb21wbGV0ZVNlcnZpY2UodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZSA9IHZhbHVlIGFzIEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PjtcclxuICAgIH0gZWxzZVxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHZhbHVlLnNsaWNlKDApO1xyXG4gICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuc3RvcmVkSXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIG5hbWUgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRvUHJlZmV0Y2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNwbGF5SXRlbTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhhc1NlYXJjaEJ1dHRvbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhhc1Byb2dyZXNzQmFyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbWluQ2hhcnMgPSAyO1xyXG4gIEBJbnB1dCgpIGNsZWFyQWZ0ZXJTZWFyY2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBjYW5DcmVhdGVOZXcgPSBmYWxzZTtcclxuICBASW5wdXQoKSBhZGROZXdUZXh0ID0gXCJBZGQgbmV3XCI7XHJcbiAgQElucHV0KCkgZm9jdXNPbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbGlkYXRpb25FcnJvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgQElucHV0KCkgc2VydmljZVBhcmFtcz86IEh0dHBQYXJhbXM7XHJcbiAgQElucHV0KCkgZGlzcGxheUl0ZW1Gbj86IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNwbGF5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGZpbHRlckNhbGxiYWNrOiBhbnkgPSAoeDogYW55W10pID0+IHg7XHJcblxyXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZU5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZUlucHV0XCIpIGF1dG9jb21wbGV0ZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJzZWFyY2hCdXR0b25cIikgc2VhcmNoQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImNsZWFyQnV0dG9uXCIpIGNsZWFyQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZVwiKSBhdXRvY29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgcHVibGljIGN1cnJlbnRNb2RlbDogYW55O1xyXG4gIHB1YmxpYyBxdWVyeSA9IFwiXCI7XHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZUxpc3Q6IGFueVtdIHwgbnVsbDtcclxuICBwdWJsaWMgcmVxdWVzdCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBub1N1Z2dlc3Rpb25zOiBib29sZWFuO1xyXG4gIHB1YmxpYyByZXF1ZXN0c0luUXVldWUgPSAwO1xyXG5cclxuICBwcml2YXRlIHN0b3JlZEl0ZW1zPzogYW55W107XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlPzogQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+O1xyXG4gIHByaXZhdGUgcmV0dXJuVHlwZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1cnJlbnRNb2RlbCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHZhbHVlO1xyXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBtb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogXCJTZWFyY2hcIjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZG9QcmVmZXRjaCkge1xyXG4gICAgICB0aGlzLnByZWZldGNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c09uKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVmZXRjaCgpIHtcclxuICAgIGlmICghdGhpcy5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZpY2UgZm9yIHByZWZldGNoIGlzIG5vdCBkZWZpbmVkIGluICdTb3VyY2UnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkSXRlbXMgPSBbXTtcclxuICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZVBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSB0aGlzLnNlcnZpY2VQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlLmZldGNoKHBhcmFtcykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHRoaXMuZmlsdGVyQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gcmVzdWx0Lmxlbmd0aCA9PT0gMDtcclxuICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLnN0b3JlZEl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZldGNoKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZSBmb3IgZmV0Y2ggaXMgbm90IGRlZmluZWQgaW4gJ1NvdXJjZSdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAvLyBlbXB0eSBxdWVyeSBpcyBub3QgYWxsb3dlZCBmb3IgYXV0b2NvbXBsZXRlXHJcbiAgICBpZiAodGhpcy5pc1F1ZXJ5RW1wdHkodGhpcy5xdWVyeSkpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5DaGFycykge1xyXG4gICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlUGFyYW1zKSB7XHJcbiAgICAgICAgcGFyYW1zID0gdGhpcy5zZXJ2aWNlUGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSArIDE7XHJcblxyXG4gICAgICB0aGlzLnNlcnZpY2UuZmV0Y2gocGFyYW1zKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSAtIDE7XHJcbiAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSB0aGlzLmZpbHRlckNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSByZXN1bHQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLmF1dG9jb21wbGV0ZUxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbHRlclN0b3JlZEl0ZW1zKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlJdGVtICYmICF0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBkaXNwbGF5SXRlbSBvciBkaXNwbGF5SXRlbUZuIGZvciBsb2NhbCBzZWFyY2guXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPCB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZWRJdGVtcykge1xyXG5cclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gdGhpcy5zdG9yZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdJdGVtKGl0ZW0pKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcgdG8gZXZhbHVhdGUgaW4gZGlzcGxheUl0ZW0gd2FzIHByb3ZpZGVkIHdyb25nLiBCZXR0ZXIgdXNlIGRpc3BsYXlJdGVtRm5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybWF0ZWRJdGVtID0gdGhpcy52aWV3SXRlbShpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgICAgIGZvcm1hdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1GbihpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0ZWRJdGVtLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gdGhpcy5xdWVyeS5sZW5ndGggPiAwICYmIHRoaXMuYXV0b2NvbXBsZXRlTGlzdC5sZW5ndGggPT09IDA7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZVNlbGVjdGVkKCRldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcclxuICAgIHRoaXMubW9kZWwgPSBzZWxlY3RlZDtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckFmdGVyU2VhcmNoKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZURpc3BsYXlGbigpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUl0ZW1GbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4gaXRlbSA/IHRoaXMudmlld0l0ZW0oaXRlbSkgOiBpdGVtO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIHByZXZlbnQgZmlsdGVyaW5nIHJlc3VsdHMgaWYgYXJyb3cgd2VyZSBwcmVzc2VkXHJcbiAgICBpZiAoJGV2ZW50LmtleUNvZGUgPCAzNyB8fCAkZXZlbnQua2V5Q29kZSA+IDQwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uS2V5Q2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleUNhbGxiYWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZG9TZWFyY2hWaWFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU3RvcmVkSXRlbXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkJsdXIoJGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hCdXR0b24gJiYgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSBcIlwiXHJcbiAgICAgICYmICRldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEJ1dHRvbltcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiBcIlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRvU2VhcmNoVmlhU2VydmljZSkge1xyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclN0b3JlZEl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmlld0l0ZW0oaXRlbTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5SXRlbUZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlJdGVtRm4oaXRlbSk7XHJcbiAgICB9XHJcbiAgICAvLyB1c2luZyBldmFsKCkgY2FuIGJlIGRhbmdlcm91cywgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5SXRlbSA/IGV2YWwodGhpcy5kaXNwbGF5SXRlbSkgOiBpdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sSXRlbSkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sSXRlbS5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICB0aGlzLnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGdldCBkb1NlYXJjaFZpYVNlcnZpY2UoKSB7XHJcbiAgICAvLyBjaGVjayBpZiBzZWFyY2ggcmVzdWx0IHJldHVybnMgZnJvbSBzZXJ2aWNlIG9yIGZyb20gbG9jYWwgZGF0YVxyXG4gICAgLy8gaWYgcHJlZmV0Y2ggaXMgYWN0aXZlIG9ubHkgb25lIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIG9uIGluaXRcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2UgJiYgIXRoaXMuZG9QcmVmZXRjaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNyZWF0ZU5ldygpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5ldy5lbWl0KHRoaXMubW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1F1ZXJ5RW1wdHkocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA8PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0F1dG9jb21wbGV0ZVNlcnZpY2Uob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+IHtcclxuICAgIHJldHVybiBvYmplY3QgJiYgXCJmZXRjaFwiIGluIG9iamVjdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZVJldHVyblR5cGUoaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5yZXR1cm5UeXBlID0gdHlwZW9mIGl0ZW1zWzBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozt3QkFhZ0MsS0FBSztzQkFNYixFQUFFO3dCQWtCTixVQUFDLENBQU0sS0FBTzt5QkFDYixlQUFROztJQWpCM0Isc0JBQUksd0NBQUs7Ozs7UUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjs7Ozs7UUFDRCxVQUFVLENBQU07WUFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtTQUNGOzs7T0FOQTs7Ozs7SUFRTSwwQ0FBVTs7OztjQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUtoQixnREFBZ0I7Ozs7Y0FBQyxFQUFvQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBRWQsaURBQWlCOzs7O2NBQUMsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxH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