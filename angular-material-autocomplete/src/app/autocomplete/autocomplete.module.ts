import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
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
})
export class NgMatAutocompleteModule { }
