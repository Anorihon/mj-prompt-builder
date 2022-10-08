import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {QueriesService, QueryId} from '../../shared/services/queries.service';

@Component({
  selector: 'query-box',
  templateUrl: './query-box.component.html',
  styleUrls: ['./query-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryBoxComponent implements OnInit {
  @Input() id: QueryId = 1;
  @Input() canDel = true;
  @Input() weightVisible = true;

  readonly MAX_IMAGE_REFS = 5;

  queryText = '';
  queryWeight = 1;
  imgRefs = [''];

  constructor(
    private ref: ChangeDetectorRef,
    private readonly queriesService: QueriesService,
  ) { }

  ngOnInit(): void {}

  get canAddImageRef(): boolean {
    return this.imgRefs.length < this.MAX_IMAGE_REFS;
  }

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
    this.updateModel();
  }

  onTextChanged(value: string) {
    this.queryText = value;
    this.updateModel();
  }

  onWeightChanged(value: number) {
    this.queryWeight = value;
    this.updateModel();
  }

  addNewQuery() {
    this.queriesService.addQuery(this.id);
  }

  removeQuery() {
    this.queriesService.removeQuery(this.id);
  }

  private updateModel() {
    this.queriesService.updateQuery({
      id: this.id,
      imgRefs: this.imgRefs,
      weight: this.queryWeight,
      description: this.queryText,
    });
  }
}
