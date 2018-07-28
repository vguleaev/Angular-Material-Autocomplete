(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@angular/forms'), require('@angular/platform-browser'), require('@angular/material'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('@vguleaev/dynamic-autocomplete', ['exports', '@angular/core', '@angular/common/http', '@angular/forms', '@angular/platform-browser', '@angular/material', '@angular/platform-browser/animations'], factory) :
    (factory((global.vguleaev = global.vguleaev || {}, global.vguleaev['dynamic-autocomplete'] = {}),global.ng.core,global.ng.common.http,global.ng.forms,global.ng.platformBrowser,global.ng.material,global.ng.platformBrowser.animations));
}(this, (function (exports,core,http,forms,platformBrowser,material,animations) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @abstract
     */
    var AbstractValueAccessor = (function () {
        function AbstractValueAccessor() {
            this.disabled = false;
            this._value = "";
            this.onChange = function (_) { };
            this.onTouched = function () { };
        }
        Object.defineProperty(AbstractValueAccessor.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this._value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            disabled: [{ type: core.Input }],
            required: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            formControlItem: [{ type: core.Input }],
            formControlName: [{ type: core.Input }]
        };
        return AbstractValueAccessor;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AutocompleteComponent = (function (_super) {
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
            _this.modelChange = new core.EventEmitter();
            _this.optionSelected = new core.EventEmitter();
            _this.createNew = new core.EventEmitter();
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
             */ function (value) {
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
             */ function () {
                return this.currentModel;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
                var /** @type {?} */ params = new http.HttpParams();
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
                    var /** @type {?} */ params = new http.HttpParams();
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: "autocomplete",
                        template: "<mat-form-field class=\"input-container\">\n  <input matInput\n         *ngIf=\"formControlItem && formControlName\"\n         [formControl]=\"formControlItem\"\n         [required]=\"required\"\n         [matAutocomplete]=\"autocomplete\"\n         [placeholder]=\"placeholder\"\n         (keyup)=\"onKey($event)\"\n         (focus)=\"onFocus($event)\"\n         (blur)=\"onBlur($event)\"\n         #autocompleteInput\n  />\n  <input matInput\n         *ngIf=\"!formControlItem && !formControlName\"\n         [name]=\"name\"\n         [disabled]=\"disabled\"\n         [required]=\"required\"\n         [matAutocomplete]=\"autocomplete\"\n         [placeholder]=\"placeholder\"\n         (keyup)=\"onKey($event)\"\n         (focus)=\"onFocus($event)\"\n         (blur)=\"onBlur($event)\"\n         [(ngModel)]=\"model\"\n         #autocompleteInput\n  />\n  <button *ngIf=\"hasSearchButton\" #searchButton mat-button matPrefix mat-icon-button aria-label=\"Search\" (click)=\"fetch(true)\" type=\"button\">\n      <mat-icon class=\"search-icon\">search</mat-icon>\n  </button>\n  <button *ngIf=\"model || value || query\" mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clearValue()\" #clearButton type=\"button\">\n    <mat-icon class=\"clear-icon\">clear</mat-icon>\n  </button>\n  <mat-progress-bar mode=\"indeterminate\" *ngIf=\"hasProgressBar && requestsInQueue > 0\"></mat-progress-bar>\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n                    [displayWith]=\"autocompleteDisplayFn()\"\n                    (optionSelected)=\"autocompleteSelected($event)\">\n    <mat-option *ngFor=\"let item of autocompleteList\" [value]=\"item\">\n      <ng-template [ngIf]=\"displayTemplate\">\n        <ng-container *ngTemplateOutlet=\"displayTemplate; context: {$implicit: item}\"></ng-container>\n      </ng-template>\n      <span *ngIf=\"!displayTemplate\">\n        {{viewItem(item)}}\n      </span>\n    </mat-option>\n    <mat-option *ngIf=\"query && noSuggestions\" disabled>\n      <span>Sorry, no suggestions were found</span>\n    </mat-option>\n    <mat-option *ngIf=\"query && noSuggestions && canCreateNew\" [value]=\"query\" (click)=\"onCreateNew()\">\n      <mat-icon class=\"add-icon\">add</mat-icon> <span class=\"create-new\"> {{addNewText}} </span>\n    </mat-option>\n  </mat-autocomplete>\n  <mat-error>\n    {{ validationErrors && validationErrors.length > 0 ? validationErrors[0] : ''}}\n  </mat-error>\n</mat-form-field>\n\n",
                        styles: [".input-container{width:100%}.search-icon{font-size:24px}.mat-progress-bar{position:absolute}.create-new{color:#27ae60}.add-icon{position:relative;color:#27ae60}"],
                        providers: [{
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return AutocompleteComponent; }),
                                multi: true,
                            }],
                    },] },
        ];
        /** @nocollapse */
        AutocompleteComponent.ctorParameters = function () { return []; };
        AutocompleteComponent.propDecorators = {
            source: [{ type: core.Input }],
            name: [{ type: core.Input }],
            doPrefetch: [{ type: core.Input }],
            displayItem: [{ type: core.Input }],
            hasSearchButton: [{ type: core.Input }],
            hasProgressBar: [{ type: core.Input }],
            minChars: [{ type: core.Input }],
            clearAfterSearch: [{ type: core.Input }],
            canCreateNew: [{ type: core.Input }],
            addNewText: [{ type: core.Input }],
            focusOn: [{ type: core.Input }],
            validationErrors: [{ type: core.Input }],
            serviceParams: [{ type: core.Input }],
            displayItemFn: [{ type: core.Input }],
            displayTemplate: [{ type: core.Input }],
            filterCallback: [{ type: core.Input }],
            modelChange: [{ type: core.Output }],
            optionSelected: [{ type: core.Output }],
            createNew: [{ type: core.Output }],
            autocompleteInput: [{ type: core.ViewChild, args: ["autocompleteInput",] }],
            searchButton: [{ type: core.ViewChild, args: ["searchButton",] }],
            clearButton: [{ type: core.ViewChild, args: ["clearButton",] }],
            autocomplete: [{ type: core.ViewChild, args: ["autocomplete",] }],
            model: [{ type: core.Input }]
        };
        return AutocompleteComponent;
    }(AbstractValueAccessor));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DynamicAutocompleteModule = (function () {
        function DynamicAutocompleteModule() {
        }
        DynamicAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            platformBrowser.BrowserModule,
                            forms.FormsModule,
                            animations.BrowserAnimationsModule,
                            forms.ReactiveFormsModule,
                            material.MatInputModule,
                            material.MatButtonModule,
                            material.MatSelectModule,
                            material.MatCardModule,
                            material.MatAutocompleteModule,
                            material.MatIconModule,
                            material.MatProgressBarModule
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

    exports.AbstractValueAccessor = AbstractValueAccessor;
    exports.DynamicAutocompleteModule = DynamicAutocompleteModule;
    exports.ɵa = AutocompleteComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmd1bGVhZXYtZHluYW1pYy1hdXRvY29tcGxldGUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Admd1bGVhZXYvZHluYW1pYy1hdXRvY29tcGxldGUvc3JjL2FwcC9hdXRvY29tcGxldGUvYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3IudHMiLG51bGwsIm5nOi8vQHZndWxlYWV2L2R5bmFtaWMtYXV0b2NvbXBsZXRlL3NyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS9zcmMvYXBwL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOR19WQUxJREFUT1JTLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFZhbGlkYXRvcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuXHJcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sSXRlbT86IEZvcm1Db250cm9sO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZT86IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IFwiXCI7XHJcblxyXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIC8vIHdhcm5pbmc6IGNvbW1lbnQgYmVsb3cgaWYgb25seSB3YW50IHRvIGVtaXQgb24gdXNlciBpbnRlcnZlbnRpb25cclxuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U/KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVGVtcGxhdGVSZWYsIGZvcndhcmRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgfSBmcm9tIFwiLi9hYnN0cmFjdC12YWx1ZS1hY2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGUsIE1hdEJ1dHRvbiB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBBdXRvY29tcGxldGVTZXJ2aWNlIH0gZnJvbSBcIi4vYXV0b2NvbXBsZXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSHR0cFBhcmFtcyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXV0b2NvbXBsZXRlXCIsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cclxuICA8aW5wdXQgbWF0SW5wdXRcclxuICAgICAgICAgKm5nSWY9XCJmb3JtQ29udHJvbEl0ZW0gJiYgZm9ybUNvbnRyb2xOYW1lXCJcclxuICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sSXRlbVwiXHJcbiAgICAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXHJcbiAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcclxuICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgICAgKGtleXVwKT1cIm9uS2V5KCRldmVudClcIlxyXG4gICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxyXG4gICAgICAgICAjYXV0b2NvbXBsZXRlSW5wdXRcclxuICAvPlxyXG4gIDxpbnB1dCBtYXRJbnB1dFxyXG4gICAgICAgICAqbmdJZj1cIiFmb3JtQ29udHJvbEl0ZW0gJiYgIWZvcm1Db250cm9sTmFtZVwiXHJcbiAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxyXG4gICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCJcclxuICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiXHJcbiAgICAgICAgICNhdXRvY29tcGxldGVJbnB1dFxyXG4gIC8+XHJcbiAgPGJ1dHRvbiAqbmdJZj1cImhhc1NlYXJjaEJ1dHRvblwiICNzZWFyY2hCdXR0b24gbWF0LWJ1dHRvbiBtYXRQcmVmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJTZWFyY2hcIiAoY2xpY2spPVwiZmV0Y2godHJ1ZSlcIiB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNlYXJjaC1pY29uXCI+c2VhcmNoPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuICA8YnV0dG9uICpuZ0lmPVwibW9kZWwgfHwgdmFsdWUgfHwgcXVlcnlcIiBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgKGNsaWNrKT1cImNsZWFyVmFsdWUoKVwiICNjbGVhckJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICA8bWF0LWljb24gY2xhc3M9XCJjbGVhci1pY29uXCI+Y2xlYXI8L21hdC1pY29uPlxyXG4gIDwvYnV0dG9uPlxyXG4gIDxtYXQtcHJvZ3Jlc3MtYmFyIG1vZGU9XCJpbmRldGVybWluYXRlXCIgKm5nSWY9XCJoYXNQcm9ncmVzc0JhciAmJiByZXF1ZXN0c0luUXVldWUgPiAwXCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxyXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtkaXNwbGF5V2l0aF09XCJhdXRvY29tcGxldGVEaXNwbGF5Rm4oKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cImF1dG9jb21wbGV0ZVNlbGVjdGVkKCRldmVudClcIj5cclxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIGF1dG9jb21wbGV0ZUxpc3RcIiBbdmFsdWVdPVwiaXRlbVwiPlxyXG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZGlzcGxheVRlbXBsYXRlXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc3BsYXlUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPHNwYW4gKm5nSWY9XCIhZGlzcGxheVRlbXBsYXRlXCI+XHJcbiAgICAgICAge3t2aWV3SXRlbShpdGVtKX19XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvbWF0LW9wdGlvbj5cclxuICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwicXVlcnkgJiYgbm9TdWdnZXN0aW9uc1wiIGRpc2FibGVkPlxyXG4gICAgICA8c3Bhbj5Tb3JyeSwgbm8gc3VnZ2VzdGlvbnMgd2VyZSBmb3VuZDwvc3Bhbj5cclxuICAgIDwvbWF0LW9wdGlvbj5cclxuICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwicXVlcnkgJiYgbm9TdWdnZXN0aW9ucyAmJiBjYW5DcmVhdGVOZXdcIiBbdmFsdWVdPVwicXVlcnlcIiAoY2xpY2spPVwib25DcmVhdGVOZXcoKVwiPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJhZGQtaWNvblwiPmFkZDwvbWF0LWljb24+IDxzcGFuIGNsYXNzPVwiY3JlYXRlLW5ld1wiPiB7e2FkZE5ld1RleHR9fSA8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxyXG4gIDxtYXQtZXJyb3I+XHJcbiAgICB7eyB2YWxpZGF0aW9uRXJyb3JzICYmIHZhbGlkYXRpb25FcnJvcnMubGVuZ3RoID4gMCA/IHZhbGlkYXRpb25FcnJvcnNbMF0gOiAnJ319XHJcbiAgPC9tYXQtZXJyb3I+XHJcbjwvbWF0LWZvcm0tZmllbGQ+XHJcblxyXG5gLFxyXG4gIHN0eWxlczogW2AuaW5wdXQtY29udGFpbmVye3dpZHRoOjEwMCV9LnNlYXJjaC1pY29ue2ZvbnQtc2l6ZToyNHB4fS5tYXQtcHJvZ3Jlc3MtYmFye3Bvc2l0aW9uOmFic29sdXRlfS5jcmVhdGUtbmV3e2NvbG9yOiMyN2FlNjB9LmFkZC1pY29ue3Bvc2l0aW9uOnJlbGF0aXZlO2NvbG9yOiMyN2FlNjB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdXRvY29tcGxldGVDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgfV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gIC8qKlxyXG4gICAqICBIb3cgdG8gdXNlIHRoaXMgY29tcG9uZW50OlxyXG4gICAqXHJcbiAgICogIDxhdXRvY29tcGxldGVcclxuICAgKiAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICogICAgW21pbkNoYXJzXSA9IFwiMlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGZldGNoIGl0ZW1zIGFmdGVyIG1pbiBjaGFycyBhbW91bnQsIGRlZmF1bHQgaXMgMlxyXG4gICAqICAgIFtzb3VyY2VdPVwiQXV0b2NvbXBsZXRlU2VydmljZSB8IGFueVtdXCIgICAgICAvLyBzb3VyY2UgY2FuIGJlIHNlcnZpY2Ugb3IgYXJyYXksIHdoZW4gYXJyYXkgaXMgcGFzc2VkIGZpbHRlciBpcyBkb25lIGxvY2FsXHJcbiAgICogICAgW3NlcnZpY2VQYXJhbXNdPSBcIkh0dHBQYXJhbXNcIiAgICAgICAgICAgICAgIC8vIHNldHMgSHR0cFBhcmFtcyBmb3Igc2VydmljZSBmZXRjaCBmdW5jdGlvblxyXG4gICAqICAgIFtkb1ByZWZldGNoXT0gXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGFjdGl2ZSwgc2VydmljZSBkbyBmZXRjaCBpdGVtcyBvbiBpbml0XHJcbiAgICogICAgW2NsZWFyQWZ0ZXJTZWFyY2hdID3DgsKgXCJmYWxzZVwiICAgICAgICAgICAgICAgIC8vIGNsZWFycyBpbnB1dCBhZnRlciBpdGVtIHNlbGVjdFxyXG4gICAqICAgIFtoYXNQcm9ncmVzc0Jhcl0gPcOCwqBcImZhbHNlXCIgICAgICAgICAgICAgICAgICAvLyBhZGRzIGxvYWRpbmcgd2hpbGUgbWFraW5nIHJlcXVlc3RcclxuICAgKiAgICBbaGFzU2VhcmNoQnV0dG9uXSA9IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgLy8gYWRkcyBzZWFyY2ggYnV0dG9uIG5lYXIgaW5wdXRcclxuICAgKlxyXG4gICAqICAgIGRpc3BsYXlJdGVtID0gXCJpdGVtLm5hbWVcIiAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHdpbGwgYmUgZXZhbHVhdGVkIGFuZCBleGVjdXRlZCwgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZvciBmdW5jdGlvblxyXG4gICAqICAgIFtkaXNwbGF5VGVtcGxhdGVdID0gXCJUZW1wbGF0ZVJlZlwiICAgICAgICAgICAvLyB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGF1dG9jb21wbGV0ZSBvcHRpb25zLCBkaXNwbGF5SXRlbSBpcyBuZWVkZWQgZm9yIGxvY2FsIHNlYXJjaFxyXG4gICAqXHJcbiAgICogICAgW2NhbkNyZWF0ZU5ld10gPcOCwqBcImZhbHNlXCIgICAgICAgICAgICAgICAgICAgIC8vIGFkZHMgY3JlYXRlIGJ1dHRvbiB3aGVuIG5vIHN1Z2dlc3Rpb25zXHJcbiAgICogICAgW2FkZE5ld1RleHRdID0gXCInQWRkIG5ldydcIiAgICAgICAgICAgICAgICAgIC8vIHRleHQgdG8gZGlzcGxheSBuZWFyIGNyZWF0ZSBidXR0b25cclxuICAgKiAgICAoY3JlYXRlTmV3KSA9IFwib25DcmVhdGVOZXcoJGV2ZW50KVwiICAgICAgICAgLy8gcmlzZXMgYW4gZXZlbnQgd2hlbiBjbGljayBvbiBjcmVhdGUgYnV0dG9uXHJcbiAgICpcclxuICAgKiAgICBbZmlsdGVyQ2FsbGJhY2tdID0gXCJmdW5jdGlvblwiICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZm9ybWF0IGRhdGEgZnJvbSBzZXJ2ZXIgcmVzcG9uc2VcclxuICAgKiAgICBbZm9jdXNPbl09XCJ0cnVlXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0cyBmb2N1cyB0aGF0IHRyaWdnZXJzIGZldGNoXHJcbiAgICpcclxuICAgKiAgICAob3B0aW9uU2VsZWN0ZWQpPVwib25TZWxlY3RDYWxsYmFjaygkZXZlbnQpXCIgLy8gZ2V0IHNlbGVjdGVkIGl0ZW0gZnJvbSBldmVudFxyXG4gICAqXHJcbiAgICogICAgZm9ybUNvbnRyb2xOYW1lPVwiY29udHJvbE5hbWVcIiAgICAgICAgICAgICAgIC8vIGFjY2VzcyBpdCBhcyBhbnkgZm9ybSBjb250cm9sXHJcbiAgICogICAgW2Zvcm1Db250cm9sSXRlbV09XCJmb3JtLmNvbnRyb2xzWydjb250cm9sTmFtZSddXCJcclxuICAgKiAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLml0ZW1cIlxyXG4gICAqXHJcbiAgICogICAgWyhtb2RlbCldPVwibW9kZWwuaXRlbVwiICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGp1c3QgdXNlIG1vZGVsIGJpbmRpbmdcclxuICAgKiAgICAobW9kZWxDaGFuZ2UpPVwiaXRlbVNlbGVjdGVkKCRldmVudClcIlxyXG4gICAqXHJcbiAgICogID48L2F1dG9jb21wbGV0ZT5cclxuICAgKi9cclxuXHJcbiAgQElucHV0KCkgc2V0IHNvdXJjZSh2YWx1ZTogQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+IHwgYW55W10pIHtcclxuICAgIGlmICh0aGlzLmlzQXV0b2NvbXBsZXRlU2VydmljZSh2YWx1ZSkpIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlID0gdmFsdWUgYXMgQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+O1xyXG4gICAgfSBlbHNlXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLnN0b3JlZEl0ZW1zID0gdmFsdWUuc2xpY2UoMCk7XHJcbiAgICAgIHRoaXMuc2F2ZVJldHVyblR5cGUodGhpcy5zdG9yZWRJdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgbmFtZSA9IFwiXCI7XHJcbiAgQElucHV0KCkgZG9QcmVmZXRjaCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlJdGVtOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaGFzU2VhcmNoQnV0dG9uID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGFzUHJvZ3Jlc3NCYXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBtaW5DaGFycyA9IDI7XHJcbiAgQElucHV0KCkgY2xlYXJBZnRlclNlYXJjaCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGNhbkNyZWF0ZU5ldyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGFkZE5ld1RleHQgPSBcIkFkZCBuZXdcIjtcclxuICBASW5wdXQoKSBmb2N1c09uID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdmFsaWRhdGlvbkVycm9yczogc3RyaW5nW10gPSBbXTtcclxuICBASW5wdXQoKSBzZXJ2aWNlUGFyYW1zPzogSHR0cFBhcmFtcztcclxuICBASW5wdXQoKSBkaXNwbGF5SXRlbUZuPzogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgZmlsdGVyQ2FsbGJhY2s6IGFueSA9ICh4OiBhbnlbXSkgPT4geDtcclxuXHJcbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgY3JlYXRlTmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiYXV0b2NvbXBsZXRlSW5wdXRcIikgYXV0b2NvbXBsZXRlSW5wdXQ6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInNlYXJjaEJ1dHRvblwiKSBzZWFyY2hCdXR0b246IE1hdEJ1dHRvbjtcclxuICBAVmlld0NoaWxkKFwiY2xlYXJCdXR0b25cIikgY2xlYXJCdXR0b246IE1hdEJ1dHRvbjtcclxuICBAVmlld0NoaWxkKFwiYXV0b2NvbXBsZXRlXCIpIGF1dG9jb21wbGV0ZTogTWF0QXV0b2NvbXBsZXRlO1xyXG5cclxuICBwdWJsaWMgY3VycmVudE1vZGVsOiBhbnk7XHJcbiAgcHVibGljIHF1ZXJ5ID0gXCJcIjtcclxuICBwdWJsaWMgYXV0b2NvbXBsZXRlTGlzdDogYW55W10gfCBudWxsO1xyXG4gIHB1YmxpYyByZXF1ZXN0ID0gZmFsc2U7XHJcbiAgcHVibGljIG5vU3VnZ2VzdGlvbnM6IGJvb2xlYW47XHJcbiAgcHVibGljIHJlcXVlc3RzSW5RdWV1ZSA9IDA7XHJcblxyXG4gIHByaXZhdGUgc3RvcmVkSXRlbXM/OiBhbnlbXTtcclxuICBwcml2YXRlIHNlcnZpY2U/OiBBdXRvY29tcGxldGVTZXJ2aWNlPGFueT47XHJcbiAgcHJpdmF0ZSByZXR1cm5UeXBlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBtb2RlbCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuY3VycmVudE1vZGVsKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudE1vZGVsID0gdmFsdWU7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0aGlzLnJldHVyblR5cGUgPT09IHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IG1vZGVsKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TW9kZWw7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiBcIlNlYXJjaFwiO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5kb1ByZWZldGNoKSB7XHJcbiAgICAgIHRoaXMucHJlZmV0Y2goKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmZvY3VzT24pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZWZldGNoKCkge1xyXG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZSBmb3IgcHJlZmV0Y2ggaXMgbm90IGRlZmluZWQgaW4gJ1NvdXJjZSdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZWRJdGVtcyA9IFtdO1xyXG4gICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlUGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcyA9IHRoaXMuc2VydmljZVBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlcnZpY2UuZmV0Y2gocGFyYW1zKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlZEl0ZW1zID0gdGhpcy5maWx0ZXJDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSByZXN1bHQubGVuZ3RoID09PSAwO1xyXG4gICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuc3RvcmVkSXRlbXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmV0Y2goZm9yY2U/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VydmljZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2aWNlIGZvciBmZXRjaCBpcyBub3QgZGVmaW5lZCBpbiAnU291cmNlJ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG5cclxuICAgIC8vIGVtcHR5IHF1ZXJ5IGlzIG5vdCBhbGxvd2VkIGZvciBhdXRvY29tcGxldGVcclxuICAgIGlmICh0aGlzLmlzUXVlcnlFbXB0eSh0aGlzLnF1ZXJ5KSkge1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSBbXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmb3JjZSB8fCB0aGlzLnF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KFwicXVlcnlcIiwgdGhpcy5xdWVyeSk7XHJcbiAgICAgIGlmICh0aGlzLnNlcnZpY2VQYXJhbXMpIHtcclxuICAgICAgICBwYXJhbXMgPSB0aGlzLnNlcnZpY2VQYXJhbXMuc2V0KFwicXVlcnlcIiwgdGhpcy5xdWVyeSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJlcXVlc3RzSW5RdWV1ZSA9IHRoaXMucmVxdWVzdHNJblF1ZXVlICsgMTtcclxuXHJcbiAgICAgIHRoaXMuc2VydmljZS5mZXRjaChwYXJhbXMpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlcXVlc3RzSW5RdWV1ZSA9IHRoaXMucmVxdWVzdHNJblF1ZXVlIC0gMTtcclxuICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlTGlzdCA9IHRoaXMuZmlsdGVyQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IHJlc3VsdC5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuYXV0b2NvbXBsZXRlTGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmlsdGVyU3RvcmVkSXRlbXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzcGxheUl0ZW0gJiYgIXRoaXMuZGlzcGxheUl0ZW1Gbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGRpc3BsYXlJdGVtIG9yIGRpc3BsYXlJdGVtRm4gZm9yIGxvY2FsIHNlYXJjaC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgIGlmICh0aGlzLnF1ZXJ5Lmxlbmd0aCA8IHRoaXMubWluQ2hhcnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlZEl0ZW1zKSB7XHJcblxyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSB0aGlzLnN0b3JlZEl0ZW1zLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMudmlld0l0ZW0oaXRlbSkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZyB0byBldmFsdWF0ZSBpbiBkaXNwbGF5SXRlbSB3YXMgcHJvdmlkZWQgd3JvbmcuIEJldHRlciB1c2UgZGlzcGxheUl0ZW1GblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3JtYXRlZEl0ZW0gPSB0aGlzLnZpZXdJdGVtKGl0ZW0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheUl0ZW1Gbikge1xyXG4gICAgICAgICAgZm9ybWF0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbUZuKGl0ZW0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXRlZEl0ZW0uaW5kZXhPZih0aGlzLnF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSB0aGlzLnF1ZXJ5Lmxlbmd0aCA+IDAgJiYgdGhpcy5hdXRvY29tcGxldGVMaXN0Lmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSBbXTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXV0b2NvbXBsZXRlU2VsZWN0ZWQoJGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICBjb25zdCBzZWxlY3RlZCA9ICRldmVudC5vcHRpb24udmFsdWU7XHJcblxyXG4gICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkO1xyXG4gICAgdGhpcy5tb2RlbCA9IHNlbGVjdGVkO1xyXG5cclxuICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNsZWFyQWZ0ZXJTZWFyY2gpIHtcclxuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXV0b2NvbXBsZXRlRGlzcGxheUZuKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzcGxheUl0ZW1Gbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaXNwbGF5SXRlbUZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiBpdGVtID8gdGhpcy52aWV3SXRlbShpdGVtKSA6IGl0ZW07XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uS2V5KCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgLy8gcHJldmVudCBmaWx0ZXJpbmcgcmVzdWx0cyBpZiBhcnJvdyB3ZXJlIHByZXNzZWRcclxuICAgIGlmICgkZXZlbnQua2V5Q29kZSA8IDM3IHx8ICRldmVudC5rZXlDb2RlID4gNDApIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25LZXlDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uS2V5Q2FsbGJhY2soKSB7XHJcbiAgICBpZiAodGhpcy5kb1NlYXJjaFZpYVNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5mZXRjaCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWx0ZXJTdG9yZWRJdGVtcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQmx1cigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnNlYXJjaEJ1dHRvbiAmJiB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09IFwiXCJcclxuICAgICAgJiYgJGV2ZW50LnJlbGF0ZWRUYXJnZXQgIT09IHRoaXMuc2VhcmNoQnV0dG9uW1wiX2VsZW1lbnRSZWZcIl0ubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLm1vZGVsID8gdGhpcy52aWV3SXRlbSh0aGlzLm1vZGVsKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Gb2N1cygkZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZG9TZWFyY2hWaWFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU3RvcmVkSXRlbXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB2aWV3SXRlbShpdGVtOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUl0ZW1GbihpdGVtKTtcclxuICAgIH1cclxuICAgIC8vIHVzaW5nIGV2YWwoKSBjYW4gYmUgZGFuZ2Vyb3VzLCBiZXR0ZXIgdXNlIGRpc3BsYXlJdGVtRm4gZnVuY3Rpb25cclxuICAgIHJldHVybiB0aGlzLmRpc3BsYXlJdGVtID8gZXZhbCh0aGlzLmRpc3BsYXlJdGVtKSA6IGl0ZW0ubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhclZhbHVlKCkge1xyXG4gICAgaWYgKHRoaXMuZm9ybUNvbnRyb2xJdGVtKSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xJdGVtLnJlc2V0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGVsID0gbnVsbDtcclxuICAgIHRoaXMudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRvU2VhcmNoVmlhU2VydmljZSgpIHtcclxuICAgIC8vIGNoZWNrIGlmIHNlYXJjaCByZXN1bHQgcmV0dXJucyBmcm9tIHNlcnZpY2Ugb3IgZnJvbSBsb2NhbCBkYXRhXHJcbiAgICAvLyBpZiBwcmVmZXRjaCBpcyBhY3RpdmUgb25seSBvbmUgcmVxdWVzdCB3aWxsIGJlIG1hZGUgb24gaW5pdFxyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZSAmJiAhdGhpcy5kb1ByZWZldGNoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ3JlYXRlTmV3KCkge1xyXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJldHVyblR5cGUgPT09IHR5cGVvZiB0aGlzLm1vZGVsID8gdGhpcy52aWV3SXRlbSh0aGlzLm1vZGVsKSA6IHRoaXMubW9kZWw7XHJcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlYXRlTmV3LmVtaXQodGhpcy5tb2RlbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzUXVlcnlFbXB0eShxdWVyeTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gcXVlcnkubGVuZ3RoIDw9IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQXV0b2NvbXBsZXRlU2VydmljZShvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBBdXRvY29tcGxldGVTZXJ2aWNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG9iamVjdCAmJiBcImZldGNoXCIgaW4gb2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlUmV0dXJuVHlwZShpdGVtczogYW55W10gfCB1bmRlZmluZWQgfCBudWxsKSB7XHJcbiAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnJldHVyblR5cGUgPSB0eXBlb2YgaXRlbXNbMF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F1dG9jb21wbGV0ZUNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0F1dG9jb21wbGV0ZUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNBdXRvY29tcGxldGVNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJJbnB1dCIsInRzbGliXzEuX19leHRlbmRzIiwiRXZlbnRFbWl0dGVyIiwiSHR0cFBhcmFtcyIsIkNvbXBvbmVudCIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIk5nTW9kdWxlIiwiQnJvd3Nlck1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRTZWxlY3RNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdFByb2dyZXNzQmFyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OzRCQWFnQyxLQUFLOzBCQU1iLEVBQUU7NEJBa0JOLFVBQUMsQ0FBTSxLQUFPOzZCQUNiLGVBQVE7O1FBakIzQixzQkFBSSx3Q0FBSzs7O2dCQUFUO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNwQjs7OztnQkFDRCxVQUFVLENBQU07Z0JBQ2QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xCO2FBQ0Y7OztXQU5BOzs7OztRQVFNLDBDQUFVOzs7O3NCQUFDLEtBQVU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztnQkFFcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O1FBS2hCLGdEQUFnQjs7OztzQkFBQyxFQUFvQjtnQkFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7OztRQUVkLGlEQUFpQjs7OztzQkFBQyxFQUFjO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O1FBR2Ysd0NBQVE7Ozs7c0JBQUMsQ0FBa0I7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDOzs7K0JB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