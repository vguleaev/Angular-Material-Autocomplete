# DynamicAutocomplete
Dynamic Autocomplete component for Angular Material. See the [demo here](https://vguleaev.github.io/DynamicAutocomplete/)

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
     *    [source] = "AutocompleteService | any[]"    // source can be service or array, when array is passed filter is done local
     *    [serviceParams]= "HttpParams"               // sets HttpParams for service fetch function
     *    [minChars] = "2"                            // start fetch items after min chars amount, default is 2
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
     *    [formControl]="form.controls['controlName']"    // access it as any form control
     *    [(ngModel)]="model.item"                        // or just use model binding
     *    (ngModelChange)="itemSelected($event)"
     *
     *  ></autocomplete>
     
 # Detailed documentation
 
| Attribute        | Description |
| -------------    | ------------- |
| placeholder      | Text for placeholder |
| source           | Source should be a simple any[] or service that implements 'AutocompleteService' interface. Autocomplete will call a 'fetch(params)' method and will pass HttpParams as argument, returning a Promise. HttpParams will containn a query string param with name 'query' that represents the autocomplete input current value. Any additional params can be passed with serviceParams attribute.  |
| serviceParams    | Should be a value of type HttpParams. This params together with 'query' will ba passed to a service fetch function.|
| minChars         | Number of minimum chars requered to start search. Default is 2. Set to 0 if you want that all the values available on empty input. |
| doPrefetch       | Should be boolean. When active a prefetch is made on component initalization. Requires a service in source. After prefetch is done, result is stored in memory and search is done on local array. |
| clearAfterSearch | Boolean. When active input clears after item select. |
| hasProgressBar   | Boolean. When active shows a loading bar under input. Animation displays while request is doing. Works only when source is setup as service. |
| hasSearchButton  | Boolean. Shows a search button near input. When button pressed s force search is done. Even if minChars value is bigger than current input value length, this button will do search. |
| displayItem      | String. This string will be evaluated with eval() function to show formatted value in autocomplete suggestions list. Often result data is array of objects. if you want to display some property use 'item.myprop' string. The 'item' word is required. When search is done via service, search logic is done on the server. When source is an array, search logic is simple comparing strings. Result of the displayItem and input value will be compared. Eval function is dangerous and error prone. Better use displayItemFn which is a function. |
| displayItemFn | Function. If not null, displayItemFn will be used instead of displayItem string to show item in autocomplete list. Example of display function: (x: string) => x + '$' |
| canCreateNew | Boolean. When active shows a create button when no suggestions are found. | 
| addNewText   | String. Text to display near create button. Default is 'Add new'. | 
| createNew    | Output event. Clicking on create new button rises this event and pass current input value as event param. | 
| filterCallback | Function. Is used to format data returned from the server. Used only when source is a service. |
| focusOn      | Boolean. Sets the focus on autocomplete on component init. Please note that on focus search is triggered. | 
| optionSelected | Output event. Clicking on any suggested option will raise this event. Event has current selected option as a param. |
