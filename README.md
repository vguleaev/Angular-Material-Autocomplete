# Angular Material Autocompelte
This is a wrapper for standard [mat-autocomplete](https://material.angular.io/components/autocomplete/overview) made to simplify and minimize work with autocomplete inputs. It extends traditional behavior with new functionality such as form control binding, fetch from API service or data array, prefetch items on init, loading animation, template render for options in list. 

See the [demo here.](https://vguleaev.github.io/Angular-Material-Autocomplete/)

![alt text](https://pp.userapi.com/c845417/v845417502/b1b35/QT0YqgKaKb4.jpg)

## Getting started

Install package via npm
```
npm install @vguleaev/angular-material-autocomplete
```

Requires Angular Material to be installed. 
```
npm install @angular/material @angular/cdk
```

Import module with 
```
import { DynamicAutocompleteModule } from '../../node_modules/@vguleaev/angular-material-autocomplete';
```

Use component somewhere in html template 

```
<autocomplete> </autocomplete>
```

For more examples [click here](#basic-examples).
     
 ## Documentation
 
### Required attributes are marked as **bold text.** ###

**source** and **displayItem** or **displayItemFn** are required attributes.


| Attribute        | Default Value   |  Description |
| -------------    | --------------  | ------------- |
| **source**       | null            | Source can be a simple any[ ] or service that implements _'AutocompleteService'_ interface. <br/><br/> If source is a **service**, on every key press component will call a `service.fetch(params)` method and return a _Promise_. <br/>Argument `params` is object of type _HttpParams_ that will containt one single param called "query" having current input value. Any additional params can be passed with serviceParams attribute. <br/><br/>  If source is an **array**, a local filter is done. Result of displayItem or displayItemFn functions (which is a string) is checked if it contains input value. <br/><br/>For more examples [click here](#basic-examples).|
| **displayItem**      | 'item.name'     | String. This string will be evaluated with `eval()` function to show formatted value in autocomplete suggestions list. Often result data is array of objects. If you want to display some property use `'item.myprop'` string. The 'item' word is required. When search is done via service, search logic is done on the server. When source is an array, search logic is simple comparing strings. Result of the displayItem/displayItemFn and input value will be compared. Eval function is dangerous and error prone. Better use displayItemFn which is a function. |
| **displayItemFn** | null               | Function. If not null, displayItemFn will be used instead of displayItem string to show item in autocomplete list. Example of display function: `(country: string) => country.name + country.code` |
| displayTemplate | null             | Should be a value of type TemplateRef. When this value is not null an html template will be rendered for each option in autocomplete list. Please note that search is done by comparing input value with displayItem or displayItemFn executing result. |
| serviceParams    | null            | Should be a value of type HttpParams. This params together with 'query' will ba passed to a service fetch function.|
| placeholder      |  "Search"       |Text for placeholder. |
| minChars         | 2               | Number of minimum chars requered to start search. Default is 2. Set to 0 if you want all the values available on empty input. |
| doPrefetch       | false           | Should be boolean. When active, a prefetch is made on component initalization. Requires a service in source. After prefetch is done, result is stored in memory and search is done on local array. |
| clearAfterSearch | false           | Boolean. When active, input clears after item select. |
| hasProgressBar   | false           | Boolean. When active, shows a loading bar under input. Animation displays while request is doing. Works only when source is setup as service. |
| hasSearchButton  | false           | Boolean. Shows a search button near input. When button pressed s force search is done. Even if minChars value is bigger than current input value length, this button will do search. |
| (optionSelected) |      event         |Output event. Clicking on any suggested option will raise this event. Event has current selected option as a param. |
| showAddNew       | false                 | Boolean. When active, shows a create button when no suggestions are found. | 
| addNewText      | "Add new"           | String. Text to display near create button. | 
| (createNew)      |     event            | Output event. Clicking on create new button rises this event and pass current input value as event param. | 
| transformResult | `x: any[] => x`     | Function. Is used to format data returned from the server. Used only when source is a service. |
| isFocused       | false             | Boolean. Sets the focus on autocomplete on component init. Please note that on focus search is triggered. | 
| validationErrors | [ ]             | String[ ]. Every sting in array displays as mat-error under input. |



<table style="width: 100%">
    <thead>
        <tr>
            <th>Group</th>
            <th>Attribute</th>
            <th>Default Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=1>Required</td>
            <td> <b>source</b> </td>
            <td> null </td>
            <td>Source should be a simple any[] or service that implements 'AutocompleteService' interface. Autocomplete will call a 'fetch(params)' method and will pass HttpParams as argument, returning a Promise. HttpParams will containn a query string param with name 'query' that represents the autocomplete input current value. Any additional params can be passed with serviceParams attribute.</td>
        </tr>
        <tr>
            <td rowspan=3>Display</td>
            <td>displayItem</td>
            <td> "item.name" </td>
            <td>String. This string will be evaluated with eval() function to show formatted value in autocomplete suggestions list. Often result data is array of objects. if you want to display some property use 'item.myprop' string. The 'item' word is required. When search is done via service, search logic is done on the server. When source is an array, search logic is simple comparing strings. Result of the displayItem and input value will be compared. Eval function is dangerous and error prone. Better use displayItemFn which is a function.
        </tr>
         <tr>
              <td> displayItemFn </td>
               <td> null </td>
              <td> Function. If not null, displayItemFn will be used instead of displayItem string to show item in autocomplete list. Example of display function: `(country: string) => country.name + country.code`  </td>
         </tr>
         <tr>
              <td> displayTemplate </td>
               <td> null </td>
              <td> Should be a value of type TemplateRef. When this value is not null an html template will be rendered for each option in autocomplete list. Please note that search is done by comparing input value with displayItem or displayItemFn executing result.</td>
         </tr>
        <tr>
            <td rowspan=3>Basic</td>
            <td>displayItemFn</td>
            <td> "Search" </td>
            <td>Text for placeholder.
        </tr>
         <tr>
            <td>serviceParams</td>
            <td> null </td>
            <td>Should be a value of type HttpParams. This params together with 'query' will ba passed to a service fetch function.</td>
        </tr>
        <tr>
            <td>minChars</td>
            <td> 2 </td>
            <td>Number of minimum chars requered to start search. Default is 2. Set to 0 if you want all the values available on empty input.</td>
        </tr>       
    </tbody>
</table>

## Basic examples

Component can be used as any form control because of implementing ControlValueAccessor.

How to use this component:
```    
       <autocomplete
       placeholder="Search"
       [source] = "AutocompleteService | any[]"    
       [serviceParams]= "HttpParams"               
       [minChars] = "2"                            
       [doPrefetch]= "false"                       
       [clearAfterSearch] = "false"                
       [hasProgressBar] = "false"                 
       [hasSearchButton] = "false"                 
       [validationErrors]="errors"                 
     
       [displayItem] = "'item.name'"               
       [displayItemFn] = "function"                
       [displayTemplate] = "TemplateRef"           
     
       [showAddNew] = "false"                      
       [addNewText] = "'Add new'"                 
       (createNew) = "onCreateNew(inputValue)"   
       [transformResult] = "function"               
       [isFocused]="true"                          
  
      (optionSelected)="onSelectCallback(item)"    
      [formControl]="form.controls['controlName']"   
      [(ngModel)]="model.item"                      
      (ngModelChange)="itemSelected(item)"
     >
     </autocomplete>
```
