# Angular Material Autocompelte
This is a wrapper for standard [mat-autocomplete](https://material.angular.io/components/autocomplete/overview), made to simplify and minimize work with autocomplete inputs. It extends traditional behavior with new functionality such as form control binding, fetch from API service or data array, prefetch items on init, loading animation, template render for options in list. 

See the [demo here.](https://vguleaev.github.io/Angular-Material-Autocomplete/)

![example](https://pp.userapi.com/c845417/v845417502/b1b35/QT0YqgKaKb4.jpg)

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

For more examples [click here](#examples).
     
 ## Documentation
 
### Required attributes are marked as **bold text.** ###

**source** and **displayItem** or **displayItemFn** are required attributes.


| Attribute        | Default Value   |  Description |
| -------------    | --------------  | ------------- |
| **source**       | null            | Source can be a simple any[ ] or service that implements _'AutocompleteService'_ interface. <br/><br/> If source is a **service**, on every key press component will call a `service.fetch(params)` method and return a _Promise_. <br/>Argument `params` is object of type _HttpParams_ that will containt one single param called "query" having current input value. Any additional params can be passed with serviceParams attribute. <br/><br/>  If source is an **array**, a local filter is done. Result of displayItem or displayItemFn functions (which is a string) is checked if it contains input value. <br/><br/>For more examples [click here](#basic-usage).|
| **displayItem**      | 'item.name'     | String. This string will be evaluated with `eval()` function to show formatted value in autocomplete suggestions list. Often result data is array of objects. If you want to display some property use `'item.myprop'` string. The 'item' word is required. <br/><br/> When search is done via service, search logic is done on the server. When source is an array, search logic is simple comparing strings. Result of the `displayItem/displayItemFn` and input value will be compared. Eval function is dangerous and error prone. Better use `displayItemFn` which is a function. |
| **displayItemFn** | null               | Function. If not null, `displayItemFn` will be used instead of `displayItem` string to show item in autocomplete list. Example of display function: <br/> `(country: string) => country.name + country.code` |
| displayTemplate | null             | Should be a value of type _TemplateRef_. When this value is not null an html template will be rendered for each option in autocomplete list. <br/><br/>Please note that search is done by comparing input value with `displayItem` or `displayItemFn` executing result.<br/><br/>For more examples [click here](#template-usage). |
| serviceParams    | null            | Should be a value of type HttpParams. This params together with 'query' param will be passed to a service fetch function.|
| placeholder      |  "Search"       | Text for placeholder. |
| minChars         | 2               | Number of minimum chars requered to start search. Default is 2. Set to 0 if you want all the values available on empty input. |
| doPrefetch       | false           | Should be boolean. When active, a prefetch is done on component initalization. Requires a service in source. After prefetch is done, result is stored in memory and search is done on local array. |
| clearAfterSearch | false           | Boolean. When active, input clears after item select. |
| hasProgressBar   | false           | Boolean. When active, shows a loading bar under input. Animation displays while request is doing. Works only when source is setup as service. |
| hasSearchButton  | false           | Boolean. Shows a search button near input. When button pressed s force search is done. Even if `minChars` value is bigger than current input text length, this button will start search. |
| (optionSelected) |      event         | Output event. Clicking on any suggested option will raise this event. Event returns current selected option as a param. |
| showAddNew       | false                 | Boolean. When active, shows a create button when no suggestions are found. Click here for [example](#add-new-suggestion).| 
| addNewText      | "Add new"           | String. Text to display near create button. | 
| (createNew)      |     event            | Output event. Clicking on create new button raises this event and pass current input value as event param. | 
| transformResult | `x: any[] => x`     | Function. Is used to format data returned from the server. Used only when source is a service. |
| validationErrors | [ ]             | String[ ]. Every sting in array displays as mat-error under input. |
| isFocused       | false             | Boolean. Sets the focus on autocomplete on component init. <br/><br/>Please note that on focus search is triggered. | 

## Examples

Component can be used as any form control because of implementing ControlValueAccessor.

### Basic usage

Miminal number of attributes is **one**. You can create an items array of objects and pass it to `source` attribute.

```javascript
  // in ts file
  items = [
    { code: '0', name: 'Red' },
    { code: '1', name: 'Blue' },
    { code: '2', name: 'Green' },
    { code: '3', name: 'Yellow' },
    { code: '4', name: 'Black' },
    { code: '5', name: 'Purple' },
    { code: '6', name: 'White' },
    { code: '7', name: 'Grey' },
  ];
  
  // in html template
  <autocomplete [source]="items"> </autocomplete>
```

This will just work. Because of property of objects called `name`. Default displayItem string is `'item.name'`. If you want to show and search by property `code`, you can specify it in `displayItem` property.

```
  <autocomplete [source]="items" [displayItem]="'item.code'"> </autocomplete>
```

You can also use `disaplyItemFn` attribute and provide an anonymous function. It helps on syntax checking, strong typing and refactor tools available.

```javascript
  // in ts file
  displayItem = (x: any) => '# ' + x.code + ' name: ' + x.name.toUpperCase();
  
  // in html template
  <autocomplete [source]="items" [displayItemFn]="displayItem"> </autocomplete>
```

_If your items are simple array of strings. Use `diaplayItem = "item"`. Word "item" is requried for code evaluation._

### Using service as a source

You need to pass a service with implements _AutocompleteService_ interface into `source` proprerty.

```javascript
@Injectable()
export class DataService implements AutocompleteService {
    private _url = 'api/colors'; // fake api url

    constructor(private _http: HttpClient) {}

    fetch(params?: HttpParams): Promise<any> {
        return this._http.get<any[]>(this._url, {params: params}).toPromise();
    }
}
```

Get this service into constructor via dependency injection and pass it to autocompelte `source`.

```javascript
  // in ts file
  constructor(public dataService: DataService) {}
  
  // in html template
  <autocomplete [source]="dataService" [displayItemFn]="displayItem"> </autocomplete>
```
We are expecting return data from server as an array of objects. If for example we get another format returned from the server like

```
{
  items: any[],
  total: nubmer
}
```

You can use `transformResult` attribute to format the data returned from the server.

```javascript
  // in ts file
  formatData = (data: any) => data.items;
  
  // in html template
  <autocomplete [source]="dataService" 
                [displayItemFn]="displayItem"
                [transformResult]="formatData"> 
  </autocomplete>
```

### Template usage

You can use an html template to display options in list. `diplayItem` and `displayItemFn` result will be replaced with template render, but **local search** (if source is array) will be anyway done by comparing display functions result.

To do this simply define local template variable and assign it to `displayTempalte` attribute.

```javascript
  // in html template
  <autocomplete [source]="dataService" 
                [displayItemFn]="displayItem"
                [displayTemplate]="itemTemplate"> 
  </autocomplete>
  
   <ng-template #itemTemplate let-item>
      <mat-icon>flag</mat-icon> {{item.name}} | {{item.code}}
  </ng-template>
```

### Add new suggestion

You can implement a possibility to create a new option if no suggestion found. To do this set attribute `showAddNew` to true. 

![alt text](https://pp.userapi.com/c845421/v845421060/b219c/2N4HhXybWZE.jpg)

You can change the default text to any other string using `addNewText` attribute. 
Clicking on that button will raise an event `(createNew)` with current input text as a param. Subscribe to this event to implement the logic.

```
  // in html template
  <autocomplete [source]="items"
                [showAddNew] = "true
                [addNewText] = "'Add new country'"
                (createnew)="createNew(text)"> 
  </autocomplete>
  
  // in ts file
  public createNew(value: string) {
    const newName = prompt('Enter new name for a country', value);
    this.items.push({code: '99', name: newName});
    this.items = this.items.slice(0);
  }
```

### All available attributes example

How to use this component:
```    
<autocomplete
     placeholder="Search country"
     [source] = "dataService"    
     [serviceParams]= "params"               
     [minChars] = "2"                            
     [doPrefetch]= "false"                       
     [clearAfterSearch] = "false"                
     [hasProgressBar] = "false"                 
     [hasSearchButton] = "false"                 
     [validationErrors]="errors"                 
     
     [displayItem] = "'item.name'"               
     [displayItemFn] = "displayCountry"                
     [displayTemplate] = "countryTemplate"           
     
     [showAddNew] = "false"                      
     [addNewText] = "'Add new'"                 
     (createNew) = "onCreateNew(inputValue)"   
     [transformResult] = "formatCountries"               
     [isFocused]="true"                          
  
    (optionSelected)="selectCountry(country)"    
    [formControl]="form.controls['country']"   
    [(ngModel)]="model.country"                      
    (ngModelChange)="countryChanged(country)"
>
</autocomplete>
```
