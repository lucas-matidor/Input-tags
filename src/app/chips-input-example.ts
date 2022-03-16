import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-example.html',
  styleUrls: ['chips-input-example.css'],
})
export class ChipsInputExample implements AfterViewInit {
  @ViewChild('tagsInputRef', { static: true }) tagsInputRef: ElementRef;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  pasteEventListener: EventListener;

  ngAfterViewInit(): void {
    this.addEventListeners();
  }

  addEventListeners(): void {
    this.pasteEventListener = (e: Event) => this.onPaste(e);
  }

  onPaste(event: any): void {
    console.log('onPaste', event);
    console.log('tagsInputRef', this.tagsInputRef);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fruits, event.previousIndex, event.currentIndex);
  }

  test(): void {
    this.fruits.push({name: 'test1'});
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */