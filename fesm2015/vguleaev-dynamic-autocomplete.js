import { Input, Component, ViewChild, EventEmitter, Output, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
class AbstractValueAccessor {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutocompleteComponent extends AbstractValueAccessor {
    constructor() {
        super();
        // @Input() placeholder = "";
        this.name = "";
        this.doPrefetch = false;
        this.hasSearchButton = false;
        this.hasProgressBar = false;
        this.minChars = 2;
        this.clearAfterSearch = false;
        this.canCreateNew = false;
        this.addNewText = "Add new";
        this.focusOn = false;
        this.validationErrors = [];
        this.filterCallback = (x) => x;
        this.modelChange = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.createNew = new EventEmitter();
        this.query = "";
        this.request = false;
        this.requestsInQueue = 0;
        this.placeholder = this.placeholder ? this.placeholder : "Search";
    }
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
     * @param {?} value
     * @return {?}
     */
    set source(value) {
        if (this.isAutocompleteService(value)) {
            this.service = /** @type {?} */ (value);
        }
        else if (value instanceof Array) {
            this.storedItems = value.slice(0);
            this.saveReturnType(this.storedItems);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set model(value) {
        if (value !== this.currentModel) {
            this.currentModel = value;
            if (value === null || this.returnType === typeof value) {
                this.modelChange.emit(value);
            }
        }
    }
    /**
     * @return {?}
     */
    get model() {
        return this.currentModel;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.doPrefetch) {
            this.prefetch();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.focusOn) {
            setTimeout(() => {
                this.autocompleteInput.nativeElement.focus();
            });
        }
    }
    /**
     * @return {?}
     */
    prefetch() {
        if (!this.service) {
            throw new Error("Service for prefetch is not defined in 'Source'");
        }
        this.storedItems = [];
        this.noSuggestions = false;
        let /** @type {?} */ params = new HttpParams();
        if (this.serviceParams) {
            params = this.serviceParams;
        }
        this.service.fetch(params).then((result) => {
            this.storedItems = this.filterCallback(result);
            this.noSuggestions = result.length === 0;
            this.saveReturnType(this.storedItems);
        });
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    fetch(force) {
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
            let /** @type {?} */ params = new HttpParams();
            params = params.set("query", this.query);
            if (this.serviceParams) {
                params = this.serviceParams.set("query", this.query);
            }
            this.noSuggestions = false;
            this.requestsInQueue = this.requestsInQueue + 1;
            this.service.fetch(params)
                .then((result) => {
                this.requestsInQueue = this.requestsInQueue - 1;
                this.autocompleteList = this.filterCallback(result);
                this.noSuggestions = result.length === 0;
                this.saveReturnType(this.autocompleteList);
            });
        }
    }
    /**
     * @return {?}
     */
    filterStoredItems() {
        if (!this.displayItem && !this.displayItemFn) {
            throw new Error("You must provide displayItem or displayItemFn for local search.");
        }
        this.query = this.autocompleteInput.nativeElement.value;
        if (this.query.length < this.minChars) {
            return;
        }
        if (this.storedItems) {
            this.autocompleteList = this.storedItems.filter(item => {
                if (!this.viewItem(item)) {
                    throw new Error("String to evaluate in displayItem was provided wrong. Better use displayItemFn");
                }
                let /** @type {?} */ formatedItem = this.viewItem(item).toLowerCase();
                if (this.displayItemFn) {
                    formatedItem = this.displayItemFn(item).toLowerCase();
                }
                return formatedItem.indexOf(this.query.toLowerCase()) > -1;
            });
            this.noSuggestions = this.query.length > 0 && this.autocompleteList.length === 0;
        }
        else {
            this.autocompleteList = [];
            this.noSuggestions = false;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    autocompleteSelected($event) {
        this.query = this.autocompleteInput.nativeElement.value;
        const /** @type {?} */ selected = $event.option.value;
        this.value = selected;
        this.model = selected;
        if (selected) {
            this.optionSelected.emit(selected);
        }
        if (this.clearAfterSearch) {
            this.clearValue();
        }
    }
    /**
     * @return {?}
     */
    autocompleteDisplayFn() {
        if (this.displayItemFn) {
            return this.displayItemFn;
        }
        return (item) => {
            return item ? this.viewItem(item) : item;
        };
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onKey($event) {
        // prevent filtering results if arrow were pressed
        if ($event.keyCode < 37 || $event.keyCode > 40) {
            if (this.autocompleteInput.nativeElement.value === "") {
                this.clearValue();
            }
            this.onKeyCallback();
        }
    }
    /**
     * @return {?}
     */
    onKeyCallback() {
        if (this.doSearchViaService) {
            this.fetch();
        }
        else {
            this.filterStoredItems();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        if (this.searchButton && this.autocompleteInput.nativeElement.value === ""
            && $event.relatedTarget !== this.searchButton["_elementRef"].nativeElement) {
            this.autocompleteInput.nativeElement.value = this.model ? this.viewItem(this.model) : "";
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFocus($event) {
        if (this.doSearchViaService) {
            this.fetch();
        }
        else {
            this.filterStoredItems();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    viewItem(item) {
        if (this.displayItemFn) {
            return this.displayItemFn(item);
        }
        // using eval() can be dangerous, better use displayItemFn function
        return this.displayItem ? eval(this.displayItem) : item.name;
    }
    /**
     * @return {?}
     */
    clearValue() {
        if (this.formControlItem) {
            this.formControlItem.reset();
        }
        this.model = null;
        this.value = "";
    }
    /**
     * @return {?}
     */
    get doSearchViaService() {
        // check if search result returns from service or from local data
        // if prefetch is active only one request will be made on init
        return this.service && !this.doPrefetch;
    }
    /**
     * @return {?}
     */
    onCreateNew() {
        if (this.model) {
            const /** @type {?} */ value = this.returnType === typeof this.model ? this.viewItem(this.model) : this.model;
            this.autocompleteInput.nativeElement.value = value;
        }
        this.createNew.emit(this.model);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    isQueryEmpty(query) {
        return query.length <= 0;
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isAutocompleteService(object) {
        return object && "fetch" in object;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    saveReturnType(items) {
        if (items && items.length > 0) {
            this.returnType = typeof items[0];
        }
    }
}
AutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: "autocomplete",
                template: `<mat-form-field class="input-container">
  <input matInput
         *ngIf="formControlItem && formControlName"
         [formControl]="formControlItem"
         [required]="required"
         [matAutocomplete]="autocomplete"
         [placeholder]="placeholder"
         (keyup)="onKey($event)"
         (focus)="onFocus($event)"
         (blur)="onBlur($event)"
         #autocompleteInput
  />
  <input matInput
         *ngIf="!formControlItem && !formControlName"
         [name]="name"
         [disabled]="disabled"
         [required]="required"
         [matAutocomplete]="autocomplete"
         [placeholder]="placeholder"
         (keyup)="onKey($event)"
         (focus)="onFocus($event)"
         (blur)="onBlur($event)"
         [(ngModel)]="model"
         #autocompleteInput
  />
  <button *ngIf="hasSearchButton" #searchButton mat-button matPrefix mat-icon-button aria-label="Search" (click)="fetch(true)" type="button">
      <mat-icon class="search-icon">search</mat-icon>
  </button>
  <button *ngIf="model || value || query" mat-button matSuffix mat-icon-button aria-label="Clear" (click)="clearValue()" #clearButton type="button">
    <mat-icon class="clear-icon">clear</mat-icon>
  </button>
  <mat-progress-bar mode="indeterminate" *ngIf="hasProgressBar && requestsInQueue > 0"></mat-progress-bar>
  <mat-autocomplete #autocomplete="matAutocomplete"
                    [displayWith]="autocompleteDisplayFn()"
                    (optionSelected)="autocompleteSelected($event)">
    <mat-option *ngFor="let item of autocompleteList" [value]="item">
      <ng-template [ngIf]="displayTemplate">
        <ng-container *ngTemplateOutlet="displayTemplate; context: {$implicit: item}"></ng-container>
      </ng-template>
      <span *ngIf="!displayTemplate">
        {{viewItem(item)}}
      </span>
    </mat-option>
    <mat-option *ngIf="query && noSuggestions" disabled>
      <span>Sorry, no suggestions were found</span>
    </mat-option>
    <mat-option *ngIf="query && noSuggestions && canCreateNew" [value]="query" (click)="onCreateNew()">
      <mat-icon class="add-icon">add</mat-icon> <span class="create-new"> {{addNewText}} </span>
    </mat-option>
  </mat-autocomplete>
  <mat-error>
    {{ validationErrors && validationErrors.length > 0 ? validationErrors[0] : ''}}
  </mat-error>
</mat-form-field>

`,
                styles: [`.input-container{width:100%}.search-icon{font-size:24px}.mat-progress-bar{position:absolute}.create-new{color:#27ae60}.add-icon{position:relative;color:#27ae60}`],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AutocompleteComponent),
                        multi: true,
                    }],
            },] },
];
/** @nocollapse */
AutocompleteComponent.ctorParameters = () => [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicAutocompleteModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AbstractValueAccessor, DynamicAutocompleteModule, AutocompleteComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmd1bGVhZXYtZHluYW1pYy1hdXRvY29tcGxldGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS9zcmMvYXBwL2F1dG9jb21wbGV0ZS9hYnN0cmFjdC12YWx1ZS1hY2Nlc3Nvci50cyIsIm5nOi8vQHZndWxlYWV2L2R5bmFtaWMtYXV0b2NvbXBsZXRlL3NyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS9zcmMvYXBwL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOR19WQUxJREFUT1JTLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFZhbGlkYXRvcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuXHJcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sSXRlbT86IEZvcm1Db250cm9sO1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZT86IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IFwiXCI7XHJcblxyXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIC8vIHdhcm5pbmc6IGNvbW1lbnQgYmVsb3cgaWYgb25seSB3YW50IHRvIGVtaXQgb24gdXNlciBpbnRlcnZlbnRpb25cclxuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U/KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3JcIjtcclxuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlLCBNYXRCdXR0b24gfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlU2VydmljZSB9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImF1dG9jb21wbGV0ZVwiLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgPGlucHV0IG1hdElucHV0XHJcbiAgICAgICAgICpuZ0lmPVwiZm9ybUNvbnRyb2xJdGVtICYmIGZvcm1Db250cm9sTmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbEl0ZW1cIlxyXG4gICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCJcclxuICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgI2F1dG9jb21wbGV0ZUlucHV0XHJcbiAgLz5cclxuICA8aW5wdXQgbWF0SW5wdXRcclxuICAgICAgICAgKm5nSWY9XCIhZm9ybUNvbnRyb2xJdGVtICYmICFmb3JtQ29udHJvbE5hbWVcIlxyXG4gICAgICAgICBbbmFtZV09XCJuYW1lXCJcclxuICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcclxuICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxyXG4gICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAoa2V5dXApPVwib25LZXkoJGV2ZW50KVwiXHJcbiAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxyXG4gICAgICAgICAjYXV0b2NvbXBsZXRlSW5wdXRcclxuICAvPlxyXG4gIDxidXR0b24gKm5nSWY9XCJoYXNTZWFyY2hCdXR0b25cIiAjc2VhcmNoQnV0dG9uIG1hdC1idXR0b24gbWF0UHJlZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiU2VhcmNoXCIgKGNsaWNrKT1cImZldGNoKHRydWUpXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJzZWFyY2gtaWNvblwiPnNlYXJjaDwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiAqbmdJZj1cIm1vZGVsIHx8IHZhbHVlIHx8IHF1ZXJ5XCIgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiAjY2xlYXJCdXR0b24gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY2xlYXItaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiICpuZ0lmPVwiaGFzUHJvZ3Jlc3NCYXIgJiYgcmVxdWVzdHNJblF1ZXVlID4gMFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cclxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCJcclxuICAgICAgICAgICAgICAgICAgICBbZGlzcGxheVdpdGhdPVwiYXV0b2NvbXBsZXRlRGlzcGxheUZuKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhdXRvY29tcGxldGVTZWxlY3RlZCgkZXZlbnQpXCI+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBhdXRvY29tcGxldGVMaXN0XCIgW3ZhbHVlXT1cIml0ZW1cIj5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNwbGF5VGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIHt7dmlld0l0ZW0oaXRlbSl9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnNcIiBkaXNhYmxlZD5cclxuICAgICAgPHNwYW4+U29ycnksIG5vIHN1Z2dlc3Rpb25zIHdlcmUgZm91bmQ8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnMgJiYgY2FuQ3JlYXRlTmV3XCIgW3ZhbHVlXT1cInF1ZXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlTmV3KClcIj5cclxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWRkLWljb25cIj5hZGQ8L21hdC1pY29uPiA8c3BhbiBjbGFzcz1cImNyZWF0ZS1uZXdcIj4ge3thZGROZXdUZXh0fX0gPC9zcGFuPlxyXG4gICAgPC9tYXQtb3B0aW9uPlxyXG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cclxuICA8bWF0LWVycm9yPlxyXG4gICAge3sgdmFsaWRhdGlvbkVycm9ycyAmJiB2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDAgPyB2YWxpZGF0aW9uRXJyb3JzWzBdIDogJyd9fVxyXG4gIDwvbWF0LWVycm9yPlxyXG48L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlucHV0LWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5zZWFyY2gtaWNvbntmb250LXNpemU6MjRweH0ubWF0LXByb2dyZXNzLWJhcntwb3NpdGlvbjphYnNvbHV0ZX0uY3JlYXRlLW5ld3tjb2xvcjojMjdhZTYwfS5hZGQtaWNvbntwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojMjdhZTYwfWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICAvKipcclxuICAgKiAgSG93IHRvIHVzZSB0aGlzIGNvbXBvbmVudDpcclxuICAgKlxyXG4gICAqICA8YXV0b2NvbXBsZXRlXHJcbiAgICogICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxyXG4gICAqICAgIFttaW5DaGFyc10gPSBcIjJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBmZXRjaCBpdGVtcyBhZnRlciBtaW4gY2hhcnMgYW1vdW50LCBkZWZhdWx0IGlzIDJcclxuICAgKiAgICBbc291cmNlXT1cIkF1dG9jb21wbGV0ZVNlcnZpY2UgfCBhbnlbXVwiICAgICAgLy8gc291cmNlIGNhbiBiZSBzZXJ2aWNlIG9yIGFycmF5LCB3aGVuIGFycmF5IGlzIHBhc3NlZCBmaWx0ZXIgaXMgZG9uZSBsb2NhbFxyXG4gICAqICAgIFtzZXJ2aWNlUGFyYW1zXT0gXCJIdHRwUGFyYW1zXCIgICAgICAgICAgICAgICAvLyBzZXRzIEh0dHBQYXJhbXMgZm9yIHNlcnZpY2UgZmV0Y2ggZnVuY3Rpb25cclxuICAgKiAgICBbZG9QcmVmZXRjaF09IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhY3RpdmUsIHNlcnZpY2UgZG8gZmV0Y2ggaXRlbXMgb24gaW5pdFxyXG4gICAqICAgIFtjbGVhckFmdGVyU2VhcmNoXSA9w4LCoFwiZmFsc2VcIiAgICAgICAgICAgICAgICAvLyBjbGVhcnMgaW5wdXQgYWZ0ZXIgaXRlbSBzZWxlY3RcclxuICAgKiAgICBbaGFzUHJvZ3Jlc3NCYXJdID3DgsKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgLy8gYWRkcyBsb2FkaW5nIHdoaWxlIG1ha2luZyByZXF1ZXN0XHJcbiAgICogICAgW2hhc1NlYXJjaEJ1dHRvbl0gPSBcImZhbHNlXCIgICAgICAgICAgICAgICAgIC8vIGFkZHMgc2VhcmNoIGJ1dHRvbiBuZWFyIGlucHV0XHJcbiAgICpcclxuICAgKiAgICBkaXNwbGF5SXRlbSA9IFwiaXRlbS5uYW1lXCIgICAgICAgICAgICAgICAgICAgLy8gdGV4dCB3aWxsIGJlIGV2YWx1YXRlZCBhbmQgZXhlY3V0ZWQsIGJldHRlciB1c2UgZGlzcGxheUl0ZW1GbiBmb3IgZnVuY3Rpb25cclxuICAgKiAgICBbZGlzcGxheVRlbXBsYXRlXSA9IFwiVGVtcGxhdGVSZWZcIiAgICAgICAgICAgLy8gdGVtcGxhdGUgcmVmZXJlbmNlIGZvciBhdXRvY29tcGxldGUgb3B0aW9ucywgZGlzcGxheUl0ZW0gaXMgbmVlZGVkIGZvciBsb2NhbCBzZWFyY2hcclxuICAgKlxyXG4gICAqICAgIFtjYW5DcmVhdGVOZXddID3DgsKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgICAvLyBhZGRzIGNyZWF0ZSBidXR0b24gd2hlbiBubyBzdWdnZXN0aW9uc1xyXG4gICAqICAgIFthZGROZXdUZXh0XSA9IFwiJ0FkZCBuZXcnXCIgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHRvIGRpc3BsYXkgbmVhciBjcmVhdGUgYnV0dG9uXHJcbiAgICogICAgKGNyZWF0ZU5ldykgPSBcIm9uQ3JlYXRlTmV3KCRldmVudClcIiAgICAgICAgIC8vIHJpc2VzIGFuIGV2ZW50IHdoZW4gY2xpY2sgb24gY3JlYXRlIGJ1dHRvblxyXG4gICAqXHJcbiAgICogICAgW2ZpbHRlckNhbGxiYWNrXSA9IFwiZnVuY3Rpb25cIiAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZvcm1hdCBkYXRhIGZyb20gc2VydmVyIHJlc3BvbnNlXHJcbiAgICogICAgW2ZvY3VzT25dPVwidHJ1ZVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHMgZm9jdXMgdGhhdCB0cmlnZ2VycyBmZXRjaFxyXG4gICAqXHJcbiAgICogICAgKG9wdGlvblNlbGVjdGVkKT1cIm9uU2VsZWN0Q2FsbGJhY2soJGV2ZW50KVwiIC8vIGdldCBzZWxlY3RlZCBpdGVtIGZyb20gZXZlbnRcclxuICAgKlxyXG4gICAqICAgIGZvcm1Db250cm9sTmFtZT1cImNvbnRyb2xOYW1lXCIgICAgICAgICAgICAgICAvLyBhY2Nlc3MgaXQgYXMgYW55IGZvcm0gY29udHJvbFxyXG4gICAqICAgIFtmb3JtQ29udHJvbEl0ZW1dPVwiZm9ybS5jb250cm9sc1snY29udHJvbE5hbWUnXVwiXHJcbiAgICogICAgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtXCJcclxuICAgKlxyXG4gICAqICAgIFsobW9kZWwpXT1cIm1vZGVsLml0ZW1cIiAgICAgICAgICAgICAgICAgICAgICAvLyBvciBqdXN0IHVzZSBtb2RlbCBiaW5kaW5nXHJcbiAgICogICAgKG1vZGVsQ2hhbmdlKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgKlxyXG4gICAqICA+PC9hdXRvY29tcGxldGU+XHJcbiAgICovXHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3VyY2UodmFsdWU6IEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PiB8IGFueVtdKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dG9jb21wbGV0ZVNlcnZpY2UodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZSA9IHZhbHVlIGFzIEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PjtcclxuICAgIH0gZWxzZVxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHZhbHVlLnNsaWNlKDApO1xyXG4gICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuc3RvcmVkSXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIG5hbWUgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRvUHJlZmV0Y2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNwbGF5SXRlbTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhhc1NlYXJjaEJ1dHRvbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhhc1Byb2dyZXNzQmFyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbWluQ2hhcnMgPSAyO1xyXG4gIEBJbnB1dCgpIGNsZWFyQWZ0ZXJTZWFyY2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBjYW5DcmVhdGVOZXcgPSBmYWxzZTtcclxuICBASW5wdXQoKSBhZGROZXdUZXh0ID0gXCJBZGQgbmV3XCI7XHJcbiAgQElucHV0KCkgZm9jdXNPbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbGlkYXRpb25FcnJvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgQElucHV0KCkgc2VydmljZVBhcmFtcz86IEh0dHBQYXJhbXM7XHJcbiAgQElucHV0KCkgZGlzcGxheUl0ZW1Gbj86IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNwbGF5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGZpbHRlckNhbGxiYWNrOiBhbnkgPSAoeDogYW55W10pID0+IHg7XHJcblxyXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZU5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZUlucHV0XCIpIGF1dG9jb21wbGV0ZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJzZWFyY2hCdXR0b25cIikgc2VhcmNoQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImNsZWFyQnV0dG9uXCIpIGNsZWFyQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZVwiKSBhdXRvY29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgcHVibGljIGN1cnJlbnRNb2RlbDogYW55O1xyXG4gIHB1YmxpYyBxdWVyeSA9IFwiXCI7XHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZUxpc3Q6IGFueVtdIHwgbnVsbDtcclxuICBwdWJsaWMgcmVxdWVzdCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBub1N1Z2dlc3Rpb25zOiBib29sZWFuO1xyXG4gIHB1YmxpYyByZXF1ZXN0c0luUXVldWUgPSAwO1xyXG5cclxuICBwcml2YXRlIHN0b3JlZEl0ZW1zPzogYW55W107XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlPzogQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+O1xyXG4gIHByaXZhdGUgcmV0dXJuVHlwZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1cnJlbnRNb2RlbCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHZhbHVlO1xyXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBtb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogXCJTZWFyY2hcIjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZG9QcmVmZXRjaCkge1xyXG4gICAgICB0aGlzLnByZWZldGNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c09uKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVmZXRjaCgpIHtcclxuICAgIGlmICghdGhpcy5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZpY2UgZm9yIHByZWZldGNoIGlzIG5vdCBkZWZpbmVkIGluICdTb3VyY2UnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkSXRlbXMgPSBbXTtcclxuICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZVBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSB0aGlzLnNlcnZpY2VQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlLmZldGNoKHBhcmFtcykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHRoaXMuZmlsdGVyQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gcmVzdWx0Lmxlbmd0aCA9PT0gMDtcclxuICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLnN0b3JlZEl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZldGNoKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZSBmb3IgZmV0Y2ggaXMgbm90IGRlZmluZWQgaW4gJ1NvdXJjZSdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAvLyBlbXB0eSBxdWVyeSBpcyBub3QgYWxsb3dlZCBmb3IgYXV0b2NvbXBsZXRlXHJcbiAgICBpZiAodGhpcy5pc1F1ZXJ5RW1wdHkodGhpcy5xdWVyeSkpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5DaGFycykge1xyXG4gICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlUGFyYW1zKSB7XHJcbiAgICAgICAgcGFyYW1zID0gdGhpcy5zZXJ2aWNlUGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSArIDE7XHJcblxyXG4gICAgICB0aGlzLnNlcnZpY2UuZmV0Y2gocGFyYW1zKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSAtIDE7XHJcbiAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSB0aGlzLmZpbHRlckNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSByZXN1bHQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLmF1dG9jb21wbGV0ZUxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbHRlclN0b3JlZEl0ZW1zKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlJdGVtICYmICF0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBkaXNwbGF5SXRlbSBvciBkaXNwbGF5SXRlbUZuIGZvciBsb2NhbCBzZWFyY2guXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPCB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZWRJdGVtcykge1xyXG5cclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gdGhpcy5zdG9yZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdJdGVtKGl0ZW0pKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcgdG8gZXZhbHVhdGUgaW4gZGlzcGxheUl0ZW0gd2FzIHByb3ZpZGVkIHdyb25nLiBCZXR0ZXIgdXNlIGRpc3BsYXlJdGVtRm5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybWF0ZWRJdGVtID0gdGhpcy52aWV3SXRlbShpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgICAgIGZvcm1hdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1GbihpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0ZWRJdGVtLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gdGhpcy5xdWVyeS5sZW5ndGggPiAwICYmIHRoaXMuYXV0b2NvbXBsZXRlTGlzdC5sZW5ndGggPT09IDA7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZVNlbGVjdGVkKCRldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcclxuICAgIHRoaXMubW9kZWwgPSBzZWxlY3RlZDtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckFmdGVyU2VhcmNoKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZURpc3BsYXlGbigpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUl0ZW1GbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4gaXRlbSA/IHRoaXMudmlld0l0ZW0oaXRlbSkgOiBpdGVtO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIHByZXZlbnQgZmlsdGVyaW5nIHJlc3VsdHMgaWYgYXJyb3cgd2VyZSBwcmVzc2VkXHJcbiAgICBpZiAoJGV2ZW50LmtleUNvZGUgPCAzNyB8fCAkZXZlbnQua2V5Q29kZSA+IDQwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uS2V5Q2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleUNhbGxiYWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZG9TZWFyY2hWaWFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU3RvcmVkSXRlbXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkJsdXIoJGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hCdXR0b24gJiYgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSBcIlwiXHJcbiAgICAgICYmICRldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEJ1dHRvbltcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiBcIlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRvU2VhcmNoVmlhU2VydmljZSkge1xyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclN0b3JlZEl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmlld0l0ZW0oaXRlbTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5SXRlbUZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlJdGVtRm4oaXRlbSk7XHJcbiAgICB9XHJcbiAgICAvLyB1c2luZyBldmFsKCkgY2FuIGJlIGRhbmdlcm91cywgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5SXRlbSA/IGV2YWwodGhpcy5kaXNwbGF5SXRlbSkgOiBpdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sSXRlbSkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sSXRlbS5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICB0aGlzLnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGdldCBkb1NlYXJjaFZpYVNlcnZpY2UoKSB7XHJcbiAgICAvLyBjaGVjayBpZiBzZWFyY2ggcmVzdWx0IHJldHVybnMgZnJvbSBzZXJ2aWNlIG9yIGZyb20gbG9jYWwgZGF0YVxyXG4gICAgLy8gaWYgcHJlZmV0Y2ggaXMgYWN0aXZlIG9ubHkgb25lIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIG9uIGluaXRcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2UgJiYgIXRoaXMuZG9QcmVmZXRjaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNyZWF0ZU5ldygpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5ldy5lbWl0KHRoaXMubW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1F1ZXJ5RW1wdHkocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA8PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0F1dG9jb21wbGV0ZVNlcnZpY2Uob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+IHtcclxuICAgIHJldHVybiBvYmplY3QgJiYgXCJmZXRjaFwiIGluIG9iamVjdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZVJldHVyblR5cGUoaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5yZXR1cm5UeXBlID0gdHlwZW9mIGl0ZW1zWzBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7O0FBV0E7O3dCQUVnQyxLQUFLO3NCQU1iLEVBQUU7d0JBa0JOLENBQUMsQ0FBTSxRQUFPO3lCQUNiLFNBQVE7Ozs7O0lBakIzQixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtLQUNGOzs7OztJQUVNLFVBQVUsQ0FBQyxLQUFVO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUVwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFLaEIsZ0JBQWdCLENBQUMsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7OztJQUVkLGlCQUFpQixDQUFDLEVBQWM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Ozs7OztJQUdmLFFBQVEsQ0FB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