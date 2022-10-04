import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent implements OnInit {
  @Input() showDelete = true;
  @Input() showAdd = true;

  @Output() onClickDelete$ = new EventEmitter<void>();
  @Output() onClickAdd$ = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
