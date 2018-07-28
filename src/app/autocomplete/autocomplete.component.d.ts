import { AfterViewInit, OnInit, ElementRef, EventEmitter, TemplateRef } from "@angular/core";
import { AbstractValueAccessor } from "./abstract-value-accessor";
import { MatAutocomplete, MatButton } from "@angular/material";
import { AutocompleteService } from "./autocomplete.service";
import { HttpParams } from "@angular/common/http";
export declare class AutocompleteComponent extends AbstractValueAccessor implements AfterViewInit, OnInit {
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
    source: AutocompleteService<any> | any[];
    name: string;
    doPrefetch: boolean;
    displayItem: string;
    hasSearchButton: boolean;
    hasProgressBar: boolean;
    minChars: number;
    clearAfterSearch: boolean;
    canCreateNew: boolean;
    addNewText: string;
    focusOn: boolean;
    validationErrors: string[];
    serviceParams?: HttpParams;
    displayItemFn?: (item: any) => string;
    displayTemplate?: TemplateRef<any>;
    filterCallback: any;
    modelChange: EventEmitter<any>;
    optionSelected: EventEmitter<{}>;
    createNew: EventEmitter<{}>;
    autocompleteInput: ElementRef;
    searchButton: MatButton;
    clearButton: MatButton;
    autocomplete: MatAutocomplete;
    currentModel: any;
    query: string;
    autocompleteList: any[] | null;
    request: boolean;
    noSuggestions: boolean;
    requestsInQueue: number;
    private storedItems?;
    private service?;
    private returnType;
    model: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    prefetch(): void;
    fetch(force?: boolean): void;
    filterStoredItems(): void;
    autocompleteSelected($event: any): void;
    autocompleteDisplayFn(): (item: any) => any;
    onKey($event: KeyboardEvent): void;
    onKeyCallback(): void;
    onBlur($event: MouseEvent): void;
    onFocus($event: any): void;
    viewItem(item: any): any;
    clearValue(): void;
    readonly doSearchViaService: boolean;
    onCreateNew(): void;
    private isQueryEmpty(query);
    private isAutocompleteService(object);
    private saveReturnType(items);
}
