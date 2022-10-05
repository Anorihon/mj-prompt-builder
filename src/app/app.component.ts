import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {IQuery, QueriesService} from './shared/services/queries.service';

interface IQuality {
  value: number;
  hint: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly arTemplates: number[][] = [
    [1, 1],
    [2, 3],
    [3, 2],
    [16, 9],
    [9, 16],
  ];
  readonly qualityOptions: IQuality[] = [
    {
      value: .25,
      hint: 'Rough results, 4x faster / cheaper',
    },
    {
      value: .5,
      hint: 'Less detailed results but 2x faster / cheaper',
    },
    {
      value: 1,
      hint: 'The default value, you do not need to specify it',
    },
    {
      value: 2,
      hint: 'More detailed results, but 2x slower and 2x the price (2 GPU minutes per /imagine)',
    },
    {
      value: 5,
      hint: 'Kind of experimental, might be more creative or detailed... also might be worse! (5 GPU minutes per /imagine)',
    },
  ];

  customParams: string = '';
  aspectRatio: string[] = ['', ''];
  qualityValue = 1;

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

  get isAspectRatioValid(): boolean {
    return +this.aspectRatio[0] > 0 && +this.aspectRatio[1] > 0;
  }

  get result(): string {
    let text = '';

    for (let i = 0; i < this.list.length; i++) {
      const query = this.list[i];

      if (query.description.length === 0) continue;

      for (let j = 0; j < query.imgRefs.length; j++) {
        const imgRef = query.imgRefs[j];

        if (imgRef.length === 0) continue;

        text += imgRef + ' ';
      }

      text += `${query.description} ::${query.weight} `;
    }

    if (this.customParams) {
      text += this.customParams.trim() + ' ';
    }

    // Params
    if (this.isAspectRatioValid) {
      text += `--ar ${this.aspectRatio[0]}:${this.aspectRatio[1]} `;
    }

    if (this.qualityValue !== 1) {
      text += `--q ${this.qualityValue} `;
    }

    return text.trim();
  }

  drop(event: CdkDragDrop<IQuery>) {
    this.queriesService.drop(event);
    this.ref.markForCheck();
  }

  trackByIdx(index: number, item: IQuery): any {
    return item.id;
  }

  resetAspectRatio() {
    this.aspectRatio = ['', ''];
  }

  presetAspectRatio(aspect: number[]) {
    this.aspectRatio = [aspect[0].toString(), aspect[1].toString()];
  }
}
