import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "CMU Silicon Valley",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Explore CMU Silicon Valley",
  };


  constructor(public http: Http) {
    let items = [
      {
        "name": "CMU Silicon Valley",
        "profilePic": "assets/img/speakers/cmu.jpg",
        "about": "Explore CMU Silicon Valley"
      },
      {
        "name": "Fake Car Intern Welcome",
        "profilePic": "assets/img/speakers/car.jpg",
        "about": "Fake Car Intern Orientation"
      },
      {
        "name": "Mountain View Mission",
        "profilePic": "assets/img/speakers/mtv.jpg",
        "about": "Discover the coolest sights in Mountain View"
      },
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
