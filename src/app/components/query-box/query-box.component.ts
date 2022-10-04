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

  readonly MAX_IMAGE_REFS = 5;

  queryText = '';
  queryWeight = 1;
  imgRefs = [''];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {}

  addImageRefField() {
    if (!this.canAddImageRef) return;

    this.imgRefs.push('');
  }

  removeImageRefField(index: number) {
    if (index >= this.imgRefs.length) return;

    this.imgRefs.splice(index, 1);
  }

  trackByIdx(index: number): any {
    return index;
  }

  updateUrl(index: number, url: string) {
    this.imgRefs[index] = url;
  }

  get canAddImageRef(): boolean {
    return this.imgRefs.length < this.MAX_IMAGE_REFS;
  }
}
