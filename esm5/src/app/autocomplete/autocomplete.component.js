/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, TemplateRef, forwardRef } from "@angular/core";
import { AbstractValueAccessor } from "./abstract-value-accessor";
import { MatAutocomplete, MatButton } from "@angular/material";
import { HttpParams } from "@angular/common/http";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
var AutocompleteComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AutocompleteComponent, _super);
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
export { AutocompleteComponent };
function AutocompleteComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AutocompleteComponent.prototype.name;
    /** @type {?} */
    AutocompleteComponent.prototype.doPrefetch;
    /** @type {?} */
    AutocompleteComponent.prototype.displayItem;
    /** @type {?} */
    AutocompleteComponent.prototype.hasSearchButton;
    /** @type {?} */
    AutocompleteComponent.prototype.hasProgressBar;
    /** @type {?} */
    AutocompleteComponent.prototype.minChars;
    /** @type {?} */
    AutocompleteComponent.prototype.clearAfterSearch;
    /** @type {?} */
    AutocompleteComponent.prototype.canCreateNew;
    /** @type {?} */
    AutocompleteComponent.prototype.addNewText;
    /** @type {?} */
    AutocompleteComponent.prototype.focusOn;
    /** @type {?} */
    AutocompleteComponent.prototype.validationErrors;
    /** @type {?} */
    AutocompleteComponent.prototype.serviceParams;
    /** @type {?} */
    AutocompleteComponent.prototype.displayItemFn;
    /** @type {?} */
    AutocompleteComponent.prototype.displayTemplate;
    /** @type {?} */
    AutocompleteComponent.prototype.filterCallback;
    /** @type {?} */
    AutocompleteComponent.prototype.modelChange;
    /** @type {?} */
    AutocompleteComponent.prototype.optionSelected;
    /** @type {?} */
    AutocompleteComponent.prototype.createNew;
    /** @type {?} */
    AutocompleteComponent.prototype.autocompleteInput;
    /** @type {?} */
    AutocompleteComponent.prototype.searchButton;
    /** @type {?} */
    AutocompleteComponent.prototype.clearButton;
    /** @type {?} */
    AutocompleteComponent.prototype.autocomplete;
    /** @type {?} */
    AutocompleteComponent.prototype.currentModel;
    /** @type {?} */
    AutocompleteComponent.prototype.query;
    /** @type {?} */
    AutocompleteComponent.prototype.autocompleteList;
    /** @type {?} */
    AutocompleteComponent.prototype.request;
    /** @type {?} */
    AutocompleteComponent.prototype.noSuggestions;
    /** @type {?} */
    AutocompleteComponent.prototype.requestsInQueue;
    /** @type {?} */
    AutocompleteComponent.prototype.storedItems;
    /** @type {?} */
    AutocompleteComponent.prototype.service;
    /** @type {?} */
    AutocompleteComponent.prototype.returnType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBbUVSLGlEQUFxQjtJQStGOUQ7UUFBQSxZQUNFLGlCQUFPLFNBRVI7O3FCQW5EZSxFQUFFOzJCQUNJLEtBQUs7Z0NBRUEsS0FBSzsrQkFDTixLQUFLO3lCQUNYLENBQUM7aUNBQ08sS0FBSzs2QkFDVCxLQUFLOzJCQUNQLFNBQVM7d0JBQ1osS0FBSztpQ0FDYyxFQUFFOytCQUlULFVBQUMsQ0FBUSxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUM7NEJBRUgsSUFBSSxZQUFZLEVBQU87K0JBQ3ZDLElBQUksWUFBWSxFQUFFOzBCQUN2QixJQUFJLFlBQVksRUFBRTtzQkFRekIsRUFBRTt3QkFFQSxLQUFLO2dDQUVHLENBQUM7UUFvQnhCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztLQUNuRTtJQTlERCxzQkFBYSx5Q0FB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QUFuRCxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3JcIjtcclxuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlLCBNYXRCdXR0b24gfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlU2VydmljZSB9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImF1dG9jb21wbGV0ZVwiLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgPGlucHV0IG1hdElucHV0XHJcbiAgICAgICAgICpuZ0lmPVwiZm9ybUNvbnRyb2xJdGVtICYmIGZvcm1Db250cm9sTmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbEl0ZW1cIlxyXG4gICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCJcclxuICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgI2F1dG9jb21wbGV0ZUlucHV0XHJcbiAgLz5cclxuICA8aW5wdXQgbWF0SW5wdXRcclxuICAgICAgICAgKm5nSWY9XCIhZm9ybUNvbnRyb2xJdGVtICYmICFmb3JtQ29udHJvbE5hbWVcIlxyXG4gICAgICAgICBbbmFtZV09XCJuYW1lXCJcclxuICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcclxuICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxyXG4gICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAoa2V5dXApPVwib25LZXkoJGV2ZW50KVwiXHJcbiAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxyXG4gICAgICAgICAjYXV0b2NvbXBsZXRlSW5wdXRcclxuICAvPlxyXG4gIDxidXR0b24gKm5nSWY9XCJoYXNTZWFyY2hCdXR0b25cIiAjc2VhcmNoQnV0dG9uIG1hdC1idXR0b24gbWF0UHJlZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiU2VhcmNoXCIgKGNsaWNrKT1cImZldGNoKHRydWUpXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJzZWFyY2gtaWNvblwiPnNlYXJjaDwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiAqbmdJZj1cIm1vZGVsIHx8IHZhbHVlIHx8IHF1ZXJ5XCIgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiAjY2xlYXJCdXR0b24gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY2xlYXItaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiICpuZ0lmPVwiaGFzUHJvZ3Jlc3NCYXIgJiYgcmVxdWVzdHNJblF1ZXVlID4gMFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cclxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCJcclxuICAgICAgICAgICAgICAgICAgICBbZGlzcGxheVdpdGhdPVwiYXV0b2NvbXBsZXRlRGlzcGxheUZuKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhdXRvY29tcGxldGVTZWxlY3RlZCgkZXZlbnQpXCI+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBhdXRvY29tcGxldGVMaXN0XCIgW3ZhbHVlXT1cIml0ZW1cIj5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNwbGF5VGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIHt7dmlld0l0ZW0oaXRlbSl9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnNcIiBkaXNhYmxlZD5cclxuICAgICAgPHNwYW4+U29ycnksIG5vIHN1Z2dlc3Rpb25zIHdlcmUgZm91bmQ8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnMgJiYgY2FuQ3JlYXRlTmV3XCIgW3ZhbHVlXT1cInF1ZXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlTmV3KClcIj5cclxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWRkLWljb25cIj5hZGQ8L21hdC1pY29uPiA8c3BhbiBjbGFzcz1cImNyZWF0ZS1uZXdcIj4ge3thZGROZXdUZXh0fX0gPC9zcGFuPlxyXG4gICAgPC9tYXQtb3B0aW9uPlxyXG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cclxuICA8bWF0LWVycm9yPlxyXG4gICAge3sgdmFsaWRhdGlvbkVycm9ycyAmJiB2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDAgPyB2YWxpZGF0aW9uRXJyb3JzWzBdIDogJyd9fVxyXG4gIDwvbWF0LWVycm9yPlxyXG48L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlucHV0LWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5zZWFyY2gtaWNvbntmb250LXNpemU6MjRweH0ubWF0LXByb2dyZXNzLWJhcntwb3NpdGlvbjphYnNvbHV0ZX0uY3JlYXRlLW5ld3tjb2xvcjojMjdhZTYwfS5hZGQtaWNvbntwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojMjdhZTYwfWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICAvKipcclxuICAgKiAgSG93IHRvIHVzZSB0aGlzIGNvbXBvbmVudDpcclxuICAgKlxyXG4gICAqICA8YXV0b2NvbXBsZXRlXHJcbiAgICogICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxyXG4gICAqICAgIFttaW5DaGFyc10gPSBcIjJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBmZXRjaCBpdGVtcyBhZnRlciBtaW4gY2hhcnMgYW1vdW50LCBkZWZhdWx0IGlzIDJcclxuICAgKiAgICBbc291cmNlXT1cIkF1dG9jb21wbGV0ZVNlcnZpY2UgfCBhbnlbXVwiICAgICAgLy8gc291cmNlIGNhbiBiZSBzZXJ2aWNlIG9yIGFycmF5LCB3aGVuIGFycmF5IGlzIHBhc3NlZCBmaWx0ZXIgaXMgZG9uZSBsb2NhbFxyXG4gICAqICAgIFtzZXJ2aWNlUGFyYW1zXT0gXCJIdHRwUGFyYW1zXCIgICAgICAgICAgICAgICAvLyBzZXRzIEh0dHBQYXJhbXMgZm9yIHNlcnZpY2UgZmV0Y2ggZnVuY3Rpb25cclxuICAgKiAgICBbZG9QcmVmZXRjaF09IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhY3RpdmUsIHNlcnZpY2UgZG8gZmV0Y2ggaXRlbXMgb24gaW5pdFxyXG4gICAqICAgIFtjbGVhckFmdGVyU2VhcmNoXSA9wqBcImZhbHNlXCIgICAgICAgICAgICAgICAgLy8gY2xlYXJzIGlucHV0IGFmdGVyIGl0ZW0gc2VsZWN0XHJcbiAgICogICAgW2hhc1Byb2dyZXNzQmFyXSA9wqBcImZhbHNlXCIgICAgICAgICAgICAgICAgICAvLyBhZGRzIGxvYWRpbmcgd2hpbGUgbWFraW5nIHJlcXVlc3RcclxuICAgKiAgICBbaGFzU2VhcmNoQnV0dG9uXSA9IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgLy8gYWRkcyBzZWFyY2ggYnV0dG9uIG5lYXIgaW5wdXRcclxuICAgKlxyXG4gICAqICAgIGRpc3BsYXlJdGVtID0gXCJpdGVtLm5hbWVcIiAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHdpbGwgYmUgZXZhbHVhdGVkIGFuZCBleGVjdXRlZCwgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZvciBmdW5jdGlvblxyXG4gICAqICAgIFtkaXNwbGF5VGVtcGxhdGVdID0gXCJUZW1wbGF0ZVJlZlwiICAgICAgICAgICAvLyB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGF1dG9jb21wbGV0ZSBvcHRpb25zLCBkaXNwbGF5SXRlbSBpcyBuZWVkZWQgZm9yIGxvY2FsIHNlYXJjaFxyXG4gICAqXHJcbiAgICogICAgW2NhbkNyZWF0ZU5ld10gPcKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgICAvLyBhZGRzIGNyZWF0ZSBidXR0b24gd2hlbiBubyBzdWdnZXN0aW9uc1xyXG4gICAqICAgIFthZGROZXdUZXh0XSA9IFwiJ0FkZCBuZXcnXCIgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHRvIGRpc3BsYXkgbmVhciBjcmVhdGUgYnV0dG9uXHJcbiAgICogICAgKGNyZWF0ZU5ldykgPSBcIm9uQ3JlYXRlTmV3KCRldmVudClcIiAgICAgICAgIC8vIHJpc2VzIGFuIGV2ZW50IHdoZW4gY2xpY2sgb24gY3JlYXRlIGJ1dHRvblxyXG4gICAqXHJcbiAgICogICAgW2ZpbHRlckNhbGxiYWNrXSA9IFwiZnVuY3Rpb25cIiAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZvcm1hdCBkYXRhIGZyb20gc2VydmVyIHJlc3BvbnNlXHJcbiAgICogICAgW2ZvY3VzT25dPVwidHJ1ZVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHMgZm9jdXMgdGhhdCB0cmlnZ2VycyBmZXRjaFxyXG4gICAqXHJcbiAgICogICAgKG9wdGlvblNlbGVjdGVkKT1cIm9uU2VsZWN0Q2FsbGJhY2soJGV2ZW50KVwiIC8vIGdldCBzZWxlY3RlZCBpdGVtIGZyb20gZXZlbnRcclxuICAgKlxyXG4gICAqICAgIGZvcm1Db250cm9sTmFtZT1cImNvbnRyb2xOYW1lXCIgICAgICAgICAgICAgICAvLyBhY2Nlc3MgaXQgYXMgYW55IGZvcm0gY29udHJvbFxyXG4gICAqICAgIFtmb3JtQ29udHJvbEl0ZW1dPVwiZm9ybS5jb250cm9sc1snY29udHJvbE5hbWUnXVwiXHJcbiAgICogICAgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtXCJcclxuICAgKlxyXG4gICAqICAgIFsobW9kZWwpXT1cIm1vZGVsLml0ZW1cIiAgICAgICAgICAgICAgICAgICAgICAvLyBvciBqdXN0IHVzZSBtb2RlbCBiaW5kaW5nXHJcbiAgICogICAgKG1vZGVsQ2hhbmdlKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgKlxyXG4gICAqICA+PC9hdXRvY29tcGxldGU+XHJcbiAgICovXHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3VyY2UodmFsdWU6IEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PiB8IGFueVtdKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dG9jb21wbGV0ZVNlcnZpY2UodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZSA9IHZhbHVlIGFzIEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PjtcclxuICAgIH0gZWxzZVxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHZhbHVlLnNsaWNlKDApO1xyXG4gICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuc3RvcmVkSXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIG5hbWUgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRvUHJlZmV0Y2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNwbGF5SXRlbTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhhc1NlYXJjaEJ1dHRvbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhhc1Byb2dyZXNzQmFyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbWluQ2hhcnMgPSAyO1xyXG4gIEBJbnB1dCgpIGNsZWFyQWZ0ZXJTZWFyY2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBjYW5DcmVhdGVOZXcgPSBmYWxzZTtcclxuICBASW5wdXQoKSBhZGROZXdUZXh0ID0gXCJBZGQgbmV3XCI7XHJcbiAgQElucHV0KCkgZm9jdXNPbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbGlkYXRpb25FcnJvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgQElucHV0KCkgc2VydmljZVBhcmFtcz86IEh0dHBQYXJhbXM7XHJcbiAgQElucHV0KCkgZGlzcGxheUl0ZW1Gbj86IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNwbGF5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGZpbHRlckNhbGxiYWNrOiBhbnkgPSAoeDogYW55W10pID0+IHg7XHJcblxyXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZU5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZUlucHV0XCIpIGF1dG9jb21wbGV0ZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJzZWFyY2hCdXR0b25cIikgc2VhcmNoQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImNsZWFyQnV0dG9uXCIpIGNsZWFyQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZVwiKSBhdXRvY29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgcHVibGljIGN1cnJlbnRNb2RlbDogYW55O1xyXG4gIHB1YmxpYyBxdWVyeSA9IFwiXCI7XHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZUxpc3Q6IGFueVtdIHwgbnVsbDtcclxuICBwdWJsaWMgcmVxdWVzdCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBub1N1Z2dlc3Rpb25zOiBib29sZWFuO1xyXG4gIHB1YmxpYyByZXF1ZXN0c0luUXVldWUgPSAwO1xyXG5cclxuICBwcml2YXRlIHN0b3JlZEl0ZW1zPzogYW55W107XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlPzogQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+O1xyXG4gIHByaXZhdGUgcmV0dXJuVHlwZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1cnJlbnRNb2RlbCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHZhbHVlO1xyXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBtb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogXCJTZWFyY2hcIjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZG9QcmVmZXRjaCkge1xyXG4gICAgICB0aGlzLnByZWZldGNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c09uKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVmZXRjaCgpIHtcclxuICAgIGlmICghdGhpcy5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZpY2UgZm9yIHByZWZldGNoIGlzIG5vdCBkZWZpbmVkIGluICdTb3VyY2UnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkSXRlbXMgPSBbXTtcclxuICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZVBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSB0aGlzLnNlcnZpY2VQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlLmZldGNoKHBhcmFtcykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHRoaXMuZmlsdGVyQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gcmVzdWx0Lmxlbmd0aCA9PT0gMDtcclxuICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLnN0b3JlZEl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZldGNoKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZSBmb3IgZmV0Y2ggaXMgbm90IGRlZmluZWQgaW4gJ1NvdXJjZSdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAvLyBlbXB0eSBxdWVyeSBpcyBub3QgYWxsb3dlZCBmb3IgYXV0b2NvbXBsZXRlXHJcbiAgICBpZiAodGhpcy5pc1F1ZXJ5RW1wdHkodGhpcy5xdWVyeSkpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5DaGFycykge1xyXG4gICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlUGFyYW1zKSB7XHJcbiAgICAgICAgcGFyYW1zID0gdGhpcy5zZXJ2aWNlUGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSArIDE7XHJcblxyXG4gICAgICB0aGlzLnNlcnZpY2UuZmV0Y2gocGFyYW1zKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSAtIDE7XHJcbiAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSB0aGlzLmZpbHRlckNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSByZXN1bHQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLmF1dG9jb21wbGV0ZUxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbHRlclN0b3JlZEl0ZW1zKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlJdGVtICYmICF0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBkaXNwbGF5SXRlbSBvciBkaXNwbGF5SXRlbUZuIGZvciBsb2NhbCBzZWFyY2guXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPCB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZWRJdGVtcykge1xyXG5cclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gdGhpcy5zdG9yZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdJdGVtKGl0ZW0pKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcgdG8gZXZhbHVhdGUgaW4gZGlzcGxheUl0ZW0gd2FzIHByb3ZpZGVkIHdyb25nLiBCZXR0ZXIgdXNlIGRpc3BsYXlJdGVtRm5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybWF0ZWRJdGVtID0gdGhpcy52aWV3SXRlbShpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgICAgIGZvcm1hdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1GbihpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0ZWRJdGVtLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gdGhpcy5xdWVyeS5sZW5ndGggPiAwICYmIHRoaXMuYXV0b2NvbXBsZXRlTGlzdC5sZW5ndGggPT09IDA7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZVNlbGVjdGVkKCRldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcclxuICAgIHRoaXMubW9kZWwgPSBzZWxlY3RlZDtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckFmdGVyU2VhcmNoKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZURpc3BsYXlGbigpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUl0ZW1GbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4gaXRlbSA/IHRoaXMudmlld0l0ZW0oaXRlbSkgOiBpdGVtO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIHByZXZlbnQgZmlsdGVyaW5nIHJlc3VsdHMgaWYgYXJyb3cgd2VyZSBwcmVzc2VkXHJcbiAgICBpZiAoJGV2ZW50LmtleUNvZGUgPCAzNyB8fCAkZXZlbnQua2V5Q29kZSA+IDQwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uS2V5Q2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleUNhbGxiYWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZG9TZWFyY2hWaWFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU3RvcmVkSXRlbXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkJsdXIoJGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hCdXR0b24gJiYgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSBcIlwiXHJcbiAgICAgICYmICRldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEJ1dHRvbltcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiBcIlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRvU2VhcmNoVmlhU2VydmljZSkge1xyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclN0b3JlZEl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmlld0l0ZW0oaXRlbTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5SXRlbUZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlJdGVtRm4oaXRlbSk7XHJcbiAgICB9XHJcbiAgICAvLyB1c2luZyBldmFsKCkgY2FuIGJlIGRhbmdlcm91cywgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5SXRlbSA/IGV2YWwodGhpcy5kaXNwbGF5SXRlbSkgOiBpdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sSXRlbSkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sSXRlbS5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICB0aGlzLnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGdldCBkb1NlYXJjaFZpYVNlcnZpY2UoKSB7XHJcbiAgICAvLyBjaGVjayBpZiBzZWFyY2ggcmVzdWx0IHJldHVybnMgZnJvbSBzZXJ2aWNlIG9yIGZyb20gbG9jYWwgZGF0YVxyXG4gICAgLy8gaWYgcHJlZmV0Y2ggaXMgYWN0aXZlIG9ubHkgb25lIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIG9uIGluaXRcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2UgJiYgIXRoaXMuZG9QcmVmZXRjaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNyZWF0ZU5ldygpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5ldy5lbWl0KHRoaXMubW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1F1ZXJ5RW1wdHkocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA8PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0F1dG9jb21wbGV0ZVNlcnZpY2Uob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+IHtcclxuICAgIHJldHVybiBvYmplY3QgJiYgXCJmZXRjaFwiIGluIG9iamVjdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZVJldHVyblR5cGUoaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5yZXR1cm5UeXBlID0gdHlwZW9mIGl0ZW1zWzBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=