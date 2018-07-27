import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, TemplateRef, forwardRef } from "@angular/core";
import { MatAutocomplete } from "@angular/material";
import { AutocompleteService } from "./autocomplete.service";
import { HttpParams } from "@angular/common/http";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from "@angular/forms";

@Component({
  selector: "autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
  }]
})
export class AutocompleteComponent implements AfterViewInit, OnInit, ControlValueAccessor {
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
   *    [displayTemplate] = "TemplateRef"           // template reference for autocomplete options, displayItem or displayTemplate
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
   *    [formControl]="form.controls['controlName']"      // access it as any form control
   *    [(ngModel)]="model.item"                          // or just use model binding
   *    (ngModelChange)="itemSelected($event)"
   *
   *  ></autocomplete>
   */

  @Input() set source(value: AutocompleteService<any> | any[]) {
    if (this.isAutocompleteService(value)) {
      this.service = value as AutocompleteService<any>;
    } else
    if (value instanceof Array) {
      this.storedItems = value.slice(0);
      this.saveReturnType(this.storedItems);
    }
  }

  @Input() name = "";
  @Input() placeholder = "";
  @Input() formControl?: FormControl;
  @Input() doPrefetch = false;
  @Input() displayItem?: string;
  @Input() hasSearchButton = false;
  @Input() hasProgressBar = false;
  @Input() minChars = 2;
  @Input() clearAfterSearch = false;
  @Input() canCreateNew = false;
  @Input() addNewText = "Add new";
  @Input() focusOn = false;
  @Input() validationErrors: string[] = [];
  @Input() serviceParams?: HttpParams;
  @Input() displayItemFn?: (item: any) => string;
  @Input() displayTemplate?: TemplateRef<any>;
  @Input() filterCallback: any = (x: any[]) => x;

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter();
  @Output() createNew = new EventEmitter();

  @ViewChild("autocompleteInput") autocompleteInput: ElementRef;
  @ViewChild("autocomplete") autocomplete: MatAutocomplete;

  public selectedOption: any;
  public query = "";
  public autocompleteList: any[] | null;
  public request = false;
  public noSuggestions: boolean;
  public requestsInQueue = 0;

  private storedItems?: any[];
  private service?: AutocompleteService<any>;
  private returnType: string;

  constructor() {}

  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Search";
    if (this.doPrefetch) {
      this.prefetch();
    }
  }

  ngAfterViewInit() {
    if (this.focusOn) {
      setTimeout(() => {
        this.autocompleteInput.nativeElement.focus();
      });
    }
  }

  public prefetch() {
    if (!this.service) {
      throw new Error("Service for prefetch is not defined in 'Source'");
    }

    this.storedItems = [];
    this.noSuggestions = false;

    let params = new HttpParams();
    if (this.serviceParams) {
      params = this.serviceParams;
    }

    this.service.fetch(params).then((result: any) => {
      this.storedItems = this.filterCallback(result);
      this.noSuggestions = result.length === 0;
      this.saveReturnType(this.storedItems);
    });
  }

  public fetch(force?: boolean) {
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
      let params = new HttpParams();
      params = params.set("query", this.query);
      if (this.serviceParams) {
        params = this.serviceParams.set("query", this.query);
      }

      this.noSuggestions = false;
      this.requestsInQueue = this.requestsInQueue + 1;

      this.service.fetch(params)
        .then((result: any) => {
          this.requestsInQueue = this.requestsInQueue - 1;
          this.autocompleteList = this.filterCallback(result);
          this.noSuggestions = result.length === 0;
          this.saveReturnType(this.autocompleteList);
        });
    }
  }

  public filterStoredItems() {
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

        let formatedItem = this.viewItem(item).toLowerCase();
        if (this.displayItemFn) {
          formatedItem = this.displayItemFn(item).toLowerCase();
        }
        return formatedItem.indexOf(this.query.toLowerCase()) > -1;
      });
      this.noSuggestions = this.query.length > 0 && this.autocompleteList.length === 0;

    } else {
      this.autocompleteList = [];
      this.noSuggestions = false;
    }
  }

  public autocompleteSelected($event: any) {
    this.query = this.autocompleteInput.nativeElement.value;
    const selected = $event.option.value;
    this.writeValue(selected);

    if (selected) {
      this.optionSelected.emit(selected);
    }

    if (this.clearAfterSearch) {
      this.clearValue();
    }
  }

  public autocompleteDisplayFn() {
    if (this.displayItemFn) {
      return this.displayItemFn;
    }

    return (item: any) => {
      return item ? this.viewItem(item) : item;
    };
  }

  public onKey($event: KeyboardEvent) {
    // prevent filtering results if arrow were pressed
    if ($event.keyCode < 37 || $event.keyCode > 40) {
      if (this.autocompleteInput.nativeElement.value === "") {
        this.clearValue();
      }
      this.onKeyCallback();
    }
  }

  public onKeyCallback() {
    if (this.doSearchViaService) {
      this.fetch();
    } else {
      this.filterStoredItems();
    }
  }

  public onBlur($event: MouseEvent) {
    this.query = this.autocompleteInput.nativeElement.value;
    if (this.selectedOption && this.viewItem(this.selectedOption) !== this.query) {
      this.autocompleteInput.nativeElement.value = this.viewItem(this.selectedOption);
    }
  }

  public onFocus($event: any) {
    if (this.doSearchViaService) {
      this.fetch();
    } else {
      this.filterStoredItems();
    }
  }

  public viewItem(item: any) {
    if (this.displayItemFn) {
      return this.displayItemFn(item);
    }
    // using eval() can be dangerous, better use displayItemFn function
    return this.displayItem ? eval(this.displayItem) : item.name;
  }

  public clearValue() {
    if (this.formControl) {
      this.formControl.reset();
    }
    this.selectedOption = null;
    this.autocompleteInput.nativeElement.value = "";
    this.query = "";
    this.onChange(this.selectedOption);
  }

  get doSearchViaService() {
    // check if search result returns from service or from local data
    // if prefetch is active only one request will be made on init
    return this.service && !this.doPrefetch;
  }

  public onCreateNew() {
    if (this.selectedOption) {
      const value = this.returnType === typeof this.selectedOption ? this.viewItem(this.selectedOption) : this.selectedOption;
      this.autocompleteInput.nativeElement.value = value;
    }

    this.createNew.emit(this.selectedOption);
  }

  private isQueryEmpty(query: string): boolean {
    return query.length <= 0;
  }

  private isAutocompleteService(object: any): object is AutocompleteService<any> {
    return object && "fetch" in object;
  }

  private saveReturnType(items: any[] | undefined | null) {
    if (items && items.length > 0) {
      this.returnType = typeof items[0];
    }
  }

  writeValue(val: any): void {
    if (!val) {
      return;
    }
    this.selectedOption = val;

    if (this.autocompleteInput) {
      this.autocompleteInput.nativeElement.value = this.viewItem(this.selectedOption);
    }

    this.onChange(val);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
