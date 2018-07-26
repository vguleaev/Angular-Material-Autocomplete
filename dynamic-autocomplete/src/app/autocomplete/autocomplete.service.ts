import { HttpParams } from "@angular/common/http";

export interface AutocompleteService<T> {
    fetch(params?: HttpParams): Promise<T[]>;
}
