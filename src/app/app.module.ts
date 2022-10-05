import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { QueryBoxComponent } from './components/query-box/query-box.component';
import {MatButtonModule} from '@angular/material/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { ImageRefComponent } from './components/image-ref/image-ref.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryBoxComponent,
    ActionButtonsComponent,
    ImageRefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
