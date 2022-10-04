import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'image-ref',
  templateUrl: './image-ref.component.html',
  styleUrls: ['./image-ref.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageRefComponent implements OnInit {
  @Input() showAdd = false;
  @Input() showDel = false;
  @Output() onClickAdd$ = new EventEmitter<void>();
  @Output() onClickRemove$ = new EventEmitter<void>();
  @Output() onUrlChange$ = new EventEmitter<string>();

  url = '';
  isPreviewVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  get isRefUrlValid() {
    if (!this.url) return false;

    return(this.url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
  }

  mouseOverRefIcon() {
    this.isPreviewVisible = this.isRefUrlValid;
  }

  mouseOutRefIcon() {
    this.isPreviewVisible = false;
  }

  onUrlChanged(e: string) {
    this.url = e;
    this.onUrlChange$.emit(this.url);
  }
}
