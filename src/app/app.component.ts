import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {IQuery, QueriesService} from './shared/services/queries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private readonly queriesService: QueriesService,
    private readonly ref: ChangeDetectorRef,
  ) {}

  get list(): IQuery[] {
    return this.queriesService.queries;
  }

  get canRemoveQuery(): boolean {
    return this.list.length > 1;
  }

  drop(event: CdkDragDrop<IQuery>) {
    this.queriesService.drop(event);
    this.ref.markForCheck();
  }

  trackByIdx(index: number, item: IQuery): any {
    return item.id;
  }
}
