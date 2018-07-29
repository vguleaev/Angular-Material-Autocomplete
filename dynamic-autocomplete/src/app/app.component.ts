import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  model: any;
  @ViewChild("itemTemplate") linkTemplate: TemplateRef<any>;

  items = [
    { value: '0', view: 'zero' },
    { value: '1', view: 'one' },
    { value: '2', view: 'two' },
    { value: '3', view: 'three' },
    { value: '4', view: 'four' }
  ];

  items2 = ['1', '2', '3', '4'];

  constructor(public dataService: DataService) {}

  ngOnInit() {
  }

  public showSelected() {
    alert('See output in console log');
    console.log('Current model: ', this.model);
  }

  public createNew(value: string) {
    const newName = prompt('Enter new name for an item', value);
    this.items.push({value: '99', view: newName});
    this.items = this.items.slice(0);
  }
}
