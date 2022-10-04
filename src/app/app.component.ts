import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface IQuery {
  // id: number;
  description: string;
  weight: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  queries: IQuery[] = [];

  constructor(private ref: ChangeDetectorRef) {
    for (let i = 0; i < 3; i++) {
      this.addQuery();
    }
  }

  addQuery() {
    this.queries.push({
      description: '',
      weight: 1,
    });
  }

  drop(event: CdkDragDrop<IQuery>) {
    moveItemInArray(this.queries, event.previousIndex, event.currentIndex);
    this.ref.detectChanges();
    console.log(`DROPPED`, this.queries)
  }

  trackByIdx(index: number): any {
    return index;
  }
}
