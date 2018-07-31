import { HttpParams } from "@angular/common/http";

export interface AutocompleteService {
    fetch(params?: HttpParams): Promise<any>;
}
