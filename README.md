# DynamicAutocomplete
Dynamic Autocomplete component for Angular Material 

![alt text](https://pp.userapi.com/c845417/v845417502/b1b35/QT0YqgKaKb4.jpg)

# Install
Run `npm install @vguleaev/dynamic-autocomplete`

# Get started
Import module with `import { DynamicAutocompleteModule } from '../../node_modules/@vguleaev/dynamic-autocomplete';`

Use component somewhere in html template `<autocomplete></autocomplete>`

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
     
 # Detailed documentation
 
 
