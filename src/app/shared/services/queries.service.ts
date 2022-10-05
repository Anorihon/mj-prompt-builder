import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export type QueryId = number;

export interface IQuery {
  id: QueryId;
  description: string;
  weight: number;
  imgRefs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  get queries(): IQuery[] {
    return this._queries;
  }
  private _queries: IQuery[] = [];
  private _lastId = 0;

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.addQuery();
    }
  }

  addQuery(prevQueryId?: QueryId) {
    const data = {
      id: ++this._lastId,
      description: '',
      weight: 1,
      imgRefs: [''],
    };

    if (prevQueryId) {
      const index = this.getQueryIndexById(prevQueryId);

      this._queries.splice(index + 1, 0, data);
    } else {
      this._queries.push(data);
    }
  }

  removeQuery(id: QueryId) {
    const index = this.getQueryIndexById(id);

    if (index < 0 || index >= this._queries.length) return;

    this._queries.splice(index, 1);
  }

  getQueryById(id: QueryId) {
    return this._queries.find(item => item.id === id);
  }

  getQueryIndexById(id: QueryId): number {
    return this._queries.findIndex(item => item.id === id);
  }

  updateQuery(data: IQuery) {
    const query = this.getQueryById(data.id);

    if (!query) return;

    query.description = data.description;
    query.weight = data.weight;
    query.imgRefs = [...data.imgRefs];
  }

  drop(event: CdkDragDrop<IQuery>) {
    moveItemInArray(this._queries, event.previousIndex, event.currentIndex);
  }
}
