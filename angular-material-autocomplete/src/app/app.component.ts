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
    { code: '0', name: 'Red' },
    { code: '1', name: 'Blue' },
    { code: '2', name: 'Green' },
    { code: '3', name: 'Yellow' },
    { code: '4', name: 'Black' },
    { code: '5', name: 'Purple' },
    { code: '6', name: 'White' },
    { code: '7', name: 'Grey' },
    { code: '8', name: 'Orange' },
  ];

  items2 = ['1', '2', '3', '4'];
  displayItem = (x: any) => 'code: 0' + x.code + ' || name: ' + x.name.toUpperCase();

  constructor(public dataService: DataService) {}

  ngOnInit() {
  }

  public showSelected() {
    alert('See output in console log');
    console.log('Current model: ', this.model);
  }

  public createNew(value: string) {
    const newName = prompt('Enter new name for an item', value);
    this.items.push({code: '99', name: newName});
    this.items = this.items.slice(0);
  }
}
