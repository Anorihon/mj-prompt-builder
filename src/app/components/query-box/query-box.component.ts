import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

export type QueryId = number;

@Component({
  selector: 'query-box',
  templateUrl: './query-box.component.html',
  styleUrls: ['./query-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryBoxComponent implements OnInit {
  @Input() id: QueryId = 1;
  @Output() onClickAddNewQuery$ = new EventEmitter<QueryId>();
  @Output() onClickRemoveQuery$ = new EventEmitter<QueryId>();

  queryText = '';
  queryWeight = 1;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.ref.markForCheck();
    // this.ref.detectChanges();
  }
}
