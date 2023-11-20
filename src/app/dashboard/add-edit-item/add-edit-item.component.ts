import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Item} from "../../models/Item";
import {ItemService} from "../../services/item.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnChanges {
  @Input("item") item: Item = new Item("", "", "", "", "");

  id: string = "";
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  imageUrl = new FormControl('', [Validators.required]);

  itemCategories: Array<string> = environment.itemCategories;
  constructor(private itemService: ItemService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Add edit delete item");
    console.log(this.item);
    this.id = this.item.id!;
    this.title = new FormControl(this.item.title, [Validators.required]);
    this.description = new FormControl(this.item.description, [Validators.required]);
    this.price = new FormControl(this.item.price, [Validators.required]);
    this.category = new FormControl(this.item.category, [Validators.required]);
    this.imageUrl = new FormControl(this.item.imageUrl, [Validators.required]);
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    return "";
  }

  onSave(): void {
    let item: Item = new Item("", "", "", "", "");

    item.id = this.id;
    item.title = this.title.getRawValue()!;
    item.description = this.description.getRawValue()!;
    item.price = this.price.getRawValue()!;
    item.category = this.category.getRawValue()!;
    item.imageUrl = this.imageUrl.getRawValue()!;

    if (item.id == "") {
      this.itemService.createItem(item);
    } else {
      this.itemService.updateItem(item);
    }

    this.resetFrom();
  }

  private resetFrom() {
    this.id = "";
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.category = new FormControl('', [Validators.required]);
    this.imageUrl = new FormControl('', [Validators.required]);
  }
}
