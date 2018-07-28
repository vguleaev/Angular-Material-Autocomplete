/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, TemplateRef, forwardRef } from "@angular/core";
import { AbstractValueAccessor } from "./abstract-value-accessor";
import { MatAutocomplete, MatButton } from "@angular/material";
import { HttpParams } from "@angular/common/http";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
export class AutocompleteComponent extends AbstractValueAccessor {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQW1FbkQsTUFBTSw0QkFBNkIsU0FBUSxxQkFBcUI7SUErRjlEO1FBQ0UsS0FBSyxFQUFFLENBQUM7O29CQWpETSxFQUFFOzBCQUNJLEtBQUs7K0JBRUEsS0FBSzs4QkFDTixLQUFLO3dCQUNYLENBQUM7Z0NBQ08sS0FBSzs0QkFDVCxLQUFLOzBCQUNQLFNBQVM7dUJBQ1osS0FBSztnQ0FDYyxFQUFFOzhCQUlULENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzJCQUVILElBQUksWUFBWSxFQUFPOzhCQUN2QyxJQUFJLFlBQVksRUFBRTt5QkFDdkIsSUFBSSxZQUFZLEVBQUU7cUJBUXpCLEVBQUU7dUJBRUEsS0FBSzsrQkFFRyxDQUFDO1FBb0J4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUNuRTs7Ozs7Ozs7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QyxNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUM7Ozs7OztJQUc3QixjQUFjLENBQUMsS0FBK0I7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DOzs7O1lBNVdKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdURYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGtLQUFrSyxDQUFDO2dCQUM1SyxTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3dCQUNwRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2FBQ0g7Ozs7O3FCQXFDRSxLQUFLO21CQVdMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSzt1QkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3NCQUNMLEtBQUs7K0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzBCQUVMLE1BQU07NkJBQ04sTUFBTTt3QkFDTixNQUFNO2dDQUVOLFNBQVMsU0FBQyxtQkFBbUI7MkJBQzdCLFNBQVMsU0FBQyxjQUFjOzBCQUN4QixTQUFTLFNBQUMsYUFBYTsyQkFDdkIsU0FBUyxTQUFDLGNBQWM7b0JBYXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vYWJzdHJhY3QtdmFsdWUtYWNjZXNzb3JcIjtcclxuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlLCBNYXRCdXR0b24gfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlU2VydmljZSB9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImF1dG9jb21wbGV0ZVwiLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgPGlucHV0IG1hdElucHV0XHJcbiAgICAgICAgICpuZ0lmPVwiZm9ybUNvbnRyb2xJdGVtICYmIGZvcm1Db250cm9sTmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbEl0ZW1cIlxyXG4gICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCJcclxuICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgI2F1dG9jb21wbGV0ZUlucHV0XHJcbiAgLz5cclxuICA8aW5wdXQgbWF0SW5wdXRcclxuICAgICAgICAgKm5nSWY9XCIhZm9ybUNvbnRyb2xJdGVtICYmICFmb3JtQ29udHJvbE5hbWVcIlxyXG4gICAgICAgICBbbmFtZV09XCJuYW1lXCJcclxuICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcclxuICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxyXG4gICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAoa2V5dXApPVwib25LZXkoJGV2ZW50KVwiXHJcbiAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxyXG4gICAgICAgICAjYXV0b2NvbXBsZXRlSW5wdXRcclxuICAvPlxyXG4gIDxidXR0b24gKm5nSWY9XCJoYXNTZWFyY2hCdXR0b25cIiAjc2VhcmNoQnV0dG9uIG1hdC1idXR0b24gbWF0UHJlZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiU2VhcmNoXCIgKGNsaWNrKT1cImZldGNoKHRydWUpXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJzZWFyY2gtaWNvblwiPnNlYXJjaDwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiAqbmdJZj1cIm1vZGVsIHx8IHZhbHVlIHx8IHF1ZXJ5XCIgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiAjY2xlYXJCdXR0b24gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY2xlYXItaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiICpuZ0lmPVwiaGFzUHJvZ3Jlc3NCYXIgJiYgcmVxdWVzdHNJblF1ZXVlID4gMFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cclxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCJcclxuICAgICAgICAgICAgICAgICAgICBbZGlzcGxheVdpdGhdPVwiYXV0b2NvbXBsZXRlRGlzcGxheUZuKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhdXRvY29tcGxldGVTZWxlY3RlZCgkZXZlbnQpXCI+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBhdXRvY29tcGxldGVMaXN0XCIgW3ZhbHVlXT1cIml0ZW1cIj5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNwbGF5VGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc3BsYXlUZW1wbGF0ZVwiPlxyXG4gICAgICAgIHt7dmlld0l0ZW0oaXRlbSl9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnNcIiBkaXNhYmxlZD5cclxuICAgICAgPHNwYW4+U29ycnksIG5vIHN1Z2dlc3Rpb25zIHdlcmUgZm91bmQ8L3NwYW4+XHJcbiAgICA8L21hdC1vcHRpb24+XHJcbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInF1ZXJ5ICYmIG5vU3VnZ2VzdGlvbnMgJiYgY2FuQ3JlYXRlTmV3XCIgW3ZhbHVlXT1cInF1ZXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlTmV3KClcIj5cclxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWRkLWljb25cIj5hZGQ8L21hdC1pY29uPiA8c3BhbiBjbGFzcz1cImNyZWF0ZS1uZXdcIj4ge3thZGROZXdUZXh0fX0gPC9zcGFuPlxyXG4gICAgPC9tYXQtb3B0aW9uPlxyXG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cclxuICA8bWF0LWVycm9yPlxyXG4gICAge3sgdmFsaWRhdGlvbkVycm9ycyAmJiB2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDAgPyB2YWxpZGF0aW9uRXJyb3JzWzBdIDogJyd9fVxyXG4gIDwvbWF0LWVycm9yPlxyXG48L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlucHV0LWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5zZWFyY2gtaWNvbntmb250LXNpemU6MjRweH0ubWF0LXByb2dyZXNzLWJhcntwb3NpdGlvbjphYnNvbHV0ZX0uY3JlYXRlLW5ld3tjb2xvcjojMjdhZTYwfS5hZGQtaWNvbntwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojMjdhZTYwfWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICAvKipcclxuICAgKiAgSG93IHRvIHVzZSB0aGlzIGNvbXBvbmVudDpcclxuICAgKlxyXG4gICAqICA8YXV0b2NvbXBsZXRlXHJcbiAgICogICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxyXG4gICAqICAgIFttaW5DaGFyc10gPSBcIjJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBmZXRjaCBpdGVtcyBhZnRlciBtaW4gY2hhcnMgYW1vdW50LCBkZWZhdWx0IGlzIDJcclxuICAgKiAgICBbc291cmNlXT1cIkF1dG9jb21wbGV0ZVNlcnZpY2UgfCBhbnlbXVwiICAgICAgLy8gc291cmNlIGNhbiBiZSBzZXJ2aWNlIG9yIGFycmF5LCB3aGVuIGFycmF5IGlzIHBhc3NlZCBmaWx0ZXIgaXMgZG9uZSBsb2NhbFxyXG4gICAqICAgIFtzZXJ2aWNlUGFyYW1zXT0gXCJIdHRwUGFyYW1zXCIgICAgICAgICAgICAgICAvLyBzZXRzIEh0dHBQYXJhbXMgZm9yIHNlcnZpY2UgZmV0Y2ggZnVuY3Rpb25cclxuICAgKiAgICBbZG9QcmVmZXRjaF09IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhY3RpdmUsIHNlcnZpY2UgZG8gZmV0Y2ggaXRlbXMgb24gaW5pdFxyXG4gICAqICAgIFtjbGVhckFmdGVyU2VhcmNoXSA9wqBcImZhbHNlXCIgICAgICAgICAgICAgICAgLy8gY2xlYXJzIGlucHV0IGFmdGVyIGl0ZW0gc2VsZWN0XHJcbiAgICogICAgW2hhc1Byb2dyZXNzQmFyXSA9wqBcImZhbHNlXCIgICAgICAgICAgICAgICAgICAvLyBhZGRzIGxvYWRpbmcgd2hpbGUgbWFraW5nIHJlcXVlc3RcclxuICAgKiAgICBbaGFzU2VhcmNoQnV0dG9uXSA9IFwiZmFsc2VcIiAgICAgICAgICAgICAgICAgLy8gYWRkcyBzZWFyY2ggYnV0dG9uIG5lYXIgaW5wdXRcclxuICAgKlxyXG4gICAqICAgIGRpc3BsYXlJdGVtID0gXCJpdGVtLm5hbWVcIiAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHdpbGwgYmUgZXZhbHVhdGVkIGFuZCBleGVjdXRlZCwgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZvciBmdW5jdGlvblxyXG4gICAqICAgIFtkaXNwbGF5VGVtcGxhdGVdID0gXCJUZW1wbGF0ZVJlZlwiICAgICAgICAgICAvLyB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGF1dG9jb21wbGV0ZSBvcHRpb25zLCBkaXNwbGF5SXRlbSBpcyBuZWVkZWQgZm9yIGxvY2FsIHNlYXJjaFxyXG4gICAqXHJcbiAgICogICAgW2NhbkNyZWF0ZU5ld10gPcKgXCJmYWxzZVwiICAgICAgICAgICAgICAgICAgICAvLyBhZGRzIGNyZWF0ZSBidXR0b24gd2hlbiBubyBzdWdnZXN0aW9uc1xyXG4gICAqICAgIFthZGROZXdUZXh0XSA9IFwiJ0FkZCBuZXcnXCIgICAgICAgICAgICAgICAgICAvLyB0ZXh0IHRvIGRpc3BsYXkgbmVhciBjcmVhdGUgYnV0dG9uXHJcbiAgICogICAgKGNyZWF0ZU5ldykgPSBcIm9uQ3JlYXRlTmV3KCRldmVudClcIiAgICAgICAgIC8vIHJpc2VzIGFuIGV2ZW50IHdoZW4gY2xpY2sgb24gY3JlYXRlIGJ1dHRvblxyXG4gICAqXHJcbiAgICogICAgW2ZpbHRlckNhbGxiYWNrXSA9IFwiZnVuY3Rpb25cIiAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZvcm1hdCBkYXRhIGZyb20gc2VydmVyIHJlc3BvbnNlXHJcbiAgICogICAgW2ZvY3VzT25dPVwidHJ1ZVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHMgZm9jdXMgdGhhdCB0cmlnZ2VycyBmZXRjaFxyXG4gICAqXHJcbiAgICogICAgKG9wdGlvblNlbGVjdGVkKT1cIm9uU2VsZWN0Q2FsbGJhY2soJGV2ZW50KVwiIC8vIGdldCBzZWxlY3RlZCBpdGVtIGZyb20gZXZlbnRcclxuICAgKlxyXG4gICAqICAgIGZvcm1Db250cm9sTmFtZT1cImNvbnRyb2xOYW1lXCIgICAgICAgICAgICAgICAvLyBhY2Nlc3MgaXQgYXMgYW55IGZvcm0gY29udHJvbFxyXG4gICAqICAgIFtmb3JtQ29udHJvbEl0ZW1dPVwiZm9ybS5jb250cm9sc1snY29udHJvbE5hbWUnXVwiXHJcbiAgICogICAgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtXCJcclxuICAgKlxyXG4gICAqICAgIFsobW9kZWwpXT1cIm1vZGVsLml0ZW1cIiAgICAgICAgICAgICAgICAgICAgICAvLyBvciBqdXN0IHVzZSBtb2RlbCBiaW5kaW5nXHJcbiAgICogICAgKG1vZGVsQ2hhbmdlKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgKlxyXG4gICAqICA+PC9hdXRvY29tcGxldGU+XHJcbiAgICovXHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3VyY2UodmFsdWU6IEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PiB8IGFueVtdKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dG9jb21wbGV0ZVNlcnZpY2UodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZSA9IHZhbHVlIGFzIEF1dG9jb21wbGV0ZVNlcnZpY2U8YW55PjtcclxuICAgIH0gZWxzZVxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHZhbHVlLnNsaWNlKDApO1xyXG4gICAgICB0aGlzLnNhdmVSZXR1cm5UeXBlKHRoaXMuc3RvcmVkSXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIG5hbWUgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRvUHJlZmV0Y2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNwbGF5SXRlbTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhhc1NlYXJjaEJ1dHRvbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhhc1Byb2dyZXNzQmFyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbWluQ2hhcnMgPSAyO1xyXG4gIEBJbnB1dCgpIGNsZWFyQWZ0ZXJTZWFyY2ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBjYW5DcmVhdGVOZXcgPSBmYWxzZTtcclxuICBASW5wdXQoKSBhZGROZXdUZXh0ID0gXCJBZGQgbmV3XCI7XHJcbiAgQElucHV0KCkgZm9jdXNPbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbGlkYXRpb25FcnJvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgQElucHV0KCkgc2VydmljZVBhcmFtcz86IEh0dHBQYXJhbXM7XHJcbiAgQElucHV0KCkgZGlzcGxheUl0ZW1Gbj86IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNwbGF5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGZpbHRlckNhbGxiYWNrOiBhbnkgPSAoeDogYW55W10pID0+IHg7XHJcblxyXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZU5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZUlucHV0XCIpIGF1dG9jb21wbGV0ZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJzZWFyY2hCdXR0b25cIikgc2VhcmNoQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImNsZWFyQnV0dG9uXCIpIGNsZWFyQnV0dG9uOiBNYXRCdXR0b247XHJcbiAgQFZpZXdDaGlsZChcImF1dG9jb21wbGV0ZVwiKSBhdXRvY29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgcHVibGljIGN1cnJlbnRNb2RlbDogYW55O1xyXG4gIHB1YmxpYyBxdWVyeSA9IFwiXCI7XHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZUxpc3Q6IGFueVtdIHwgbnVsbDtcclxuICBwdWJsaWMgcmVxdWVzdCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBub1N1Z2dlc3Rpb25zOiBib29sZWFuO1xyXG4gIHB1YmxpYyByZXF1ZXN0c0luUXVldWUgPSAwO1xyXG5cclxuICBwcml2YXRlIHN0b3JlZEl0ZW1zPzogYW55W107XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlPzogQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+O1xyXG4gIHByaXZhdGUgcmV0dXJuVHlwZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1cnJlbnRNb2RlbCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHZhbHVlO1xyXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBtb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogXCJTZWFyY2hcIjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZG9QcmVmZXRjaCkge1xyXG4gICAgICB0aGlzLnByZWZldGNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c09uKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVmZXRjaCgpIHtcclxuICAgIGlmICghdGhpcy5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZpY2UgZm9yIHByZWZldGNoIGlzIG5vdCBkZWZpbmVkIGluICdTb3VyY2UnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkSXRlbXMgPSBbXTtcclxuICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZVBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSB0aGlzLnNlcnZpY2VQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlLmZldGNoKHBhcmFtcykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZWRJdGVtcyA9IHRoaXMuZmlsdGVyQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gcmVzdWx0Lmxlbmd0aCA9PT0gMDtcclxuICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLnN0b3JlZEl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZldGNoKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZSBmb3IgZmV0Y2ggaXMgbm90IGRlZmluZWQgaW4gJ1NvdXJjZSdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAvLyBlbXB0eSBxdWVyeSBpcyBub3QgYWxsb3dlZCBmb3IgYXV0b2NvbXBsZXRlXHJcbiAgICBpZiAodGhpcy5pc1F1ZXJ5RW1wdHkodGhpcy5xdWVyeSkpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5DaGFycykge1xyXG4gICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlUGFyYW1zKSB7XHJcbiAgICAgICAgcGFyYW1zID0gdGhpcy5zZXJ2aWNlUGFyYW1zLnNldChcInF1ZXJ5XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSArIDE7XHJcblxyXG4gICAgICB0aGlzLnNlcnZpY2UuZmV0Y2gocGFyYW1zKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c0luUXVldWUgPSB0aGlzLnJlcXVlc3RzSW5RdWV1ZSAtIDE7XHJcbiAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUxpc3QgPSB0aGlzLmZpbHRlckNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLm5vU3VnZ2VzdGlvbnMgPSByZXN1bHQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgdGhpcy5zYXZlUmV0dXJuVHlwZSh0aGlzLmF1dG9jb21wbGV0ZUxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbHRlclN0b3JlZEl0ZW1zKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlJdGVtICYmICF0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBkaXNwbGF5SXRlbSBvciBkaXNwbGF5SXRlbUZuIGZvciBsb2NhbCBzZWFyY2guXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPCB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZWRJdGVtcykge1xyXG5cclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gdGhpcy5zdG9yZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdJdGVtKGl0ZW0pKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcgdG8gZXZhbHVhdGUgaW4gZGlzcGxheUl0ZW0gd2FzIHByb3ZpZGVkIHdyb25nLiBCZXR0ZXIgdXNlIGRpc3BsYXlJdGVtRm5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybWF0ZWRJdGVtID0gdGhpcy52aWV3SXRlbShpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgICAgIGZvcm1hdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1GbihpdGVtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0ZWRJdGVtLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5ub1N1Z2dlc3Rpb25zID0gdGhpcy5xdWVyeS5sZW5ndGggPiAwICYmIHRoaXMuYXV0b2NvbXBsZXRlTGlzdC5sZW5ndGggPT09IDA7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVMaXN0ID0gW107XHJcbiAgICAgIHRoaXMubm9TdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZVNlbGVjdGVkKCRldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcclxuICAgIHRoaXMubW9kZWwgPSBzZWxlY3RlZDtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckFmdGVyU2VhcmNoKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9jb21wbGV0ZURpc3BsYXlGbigpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlJdGVtRm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUl0ZW1GbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4gaXRlbSA/IHRoaXMudmlld0l0ZW0oaXRlbSkgOiBpdGVtO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIHByZXZlbnQgZmlsdGVyaW5nIHJlc3VsdHMgaWYgYXJyb3cgd2VyZSBwcmVzc2VkXHJcbiAgICBpZiAoJGV2ZW50LmtleUNvZGUgPCAzNyB8fCAkZXZlbnQua2V5Q29kZSA+IDQwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uS2V5Q2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbktleUNhbGxiYWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZG9TZWFyY2hWaWFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU3RvcmVkSXRlbXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkJsdXIoJGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hCdXR0b24gJiYgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSBcIlwiXHJcbiAgICAgICYmICRldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEJ1dHRvbltcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiBcIlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRvU2VhcmNoVmlhU2VydmljZSkge1xyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclN0b3JlZEl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmlld0l0ZW0oaXRlbTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5SXRlbUZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlJdGVtRm4oaXRlbSk7XHJcbiAgICB9XHJcbiAgICAvLyB1c2luZyBldmFsKCkgY2FuIGJlIGRhbmdlcm91cywgYmV0dGVyIHVzZSBkaXNwbGF5SXRlbUZuIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5SXRlbSA/IGV2YWwodGhpcy5kaXNwbGF5SXRlbSkgOiBpdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sSXRlbSkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sSXRlbS5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICB0aGlzLnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGdldCBkb1NlYXJjaFZpYVNlcnZpY2UoKSB7XHJcbiAgICAvLyBjaGVjayBpZiBzZWFyY2ggcmVzdWx0IHJldHVybnMgZnJvbSBzZXJ2aWNlIG9yIGZyb20gbG9jYWwgZGF0YVxyXG4gICAgLy8gaWYgcHJlZmV0Y2ggaXMgYWN0aXZlIG9ubHkgb25lIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIG9uIGluaXRcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2UgJiYgIXRoaXMuZG9QcmVmZXRjaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNyZWF0ZU5ldygpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXR1cm5UeXBlID09PSB0eXBlb2YgdGhpcy5tb2RlbCA/IHRoaXMudmlld0l0ZW0odGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xyXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5ldy5lbWl0KHRoaXMubW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1F1ZXJ5RW1wdHkocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA8PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0F1dG9jb21wbGV0ZVNlcnZpY2Uob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgQXV0b2NvbXBsZXRlU2VydmljZTxhbnk+IHtcclxuICAgIHJldHVybiBvYmplY3QgJiYgXCJmZXRjaFwiIGluIG9iamVjdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZVJldHVyblR5cGUoaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5yZXR1cm5UeXBlID0gdHlwZW9mIGl0ZW1zWzBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=