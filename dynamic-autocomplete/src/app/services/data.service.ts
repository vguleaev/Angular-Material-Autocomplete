import { Observable } from 'rxjs';
import { tap, catchError, delay, filter, map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutocompleteService } from '../autocomplete/autocomplete.service';

@Injectable()
export class DataService implements AutocompleteService<any> {
    private _productUrl = 'assets/json/data.json'; // fake

    constructor(private _http: HttpClient) {}

    fetch(params?: HttpParams): Promise<any[]> {
        const query = params.get('query');

        return this._http.get<any[]>(this._productUrl, {params: params}).pipe(
            map(result => {
                if (query) {
                    return result.filter(x => x.view && x.view.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }
                return result;
            }),
            delay(1000))
        .toPromise();
    }
}
