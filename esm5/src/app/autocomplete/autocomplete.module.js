/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './autocomplete.component';
var DynamicAutocompleteModule = /** @class */ (function () {
    function DynamicAutocompleteModule() {
    }
    DynamicAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        FormsModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        MatButtonModule,
                        MatSelectModule,
                        MatCardModule,
                        MatAutocompleteModule,
                        MatIconModule,
                        MatProgressBarModule
                    ],
                    declarations: [AutocompleteComponent],
                    exports: [AutocompleteComponent]
                },] },
    ];
    return DynamicAutocompleteModule;
}());
export { DynamicAutocompleteModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B2Z3VsZWFldi9keW5hbWljLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hLLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztnQkFFaEUsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsdUJBQXVCO3dCQUN2QixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLG9CQUFvQjtxQkFDckI7b0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUNqQzs7b0NBdkJEOztTQXdCYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtBdXRvY29tcGxldGVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxyXG4iXX0=