import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatInputModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatDialogModule, MatTableModule, MatCheckboxModule, MatBadgeModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PromptComponent } from './prompt/prompt.component';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ChatComponent } from './chat/chat.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AddFriendCameraComponent } from './add-friend-camera/add-friend-camera.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ShowQrComponent } from './show-qr/show-qr.component';
@NgModule({
  declarations: [
    AppComponent,
    PromptComponent,
    ShowQrComponent,
    FriendsComponent,
    AddFriendComponent,
    AddFriendCameraComponent,
    CreateGroupComponent,
    ChatComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatBadgeModule,
    MatCheckboxModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    RouterModule.forRoot([
      { path: '**', component: AppComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PromptComponent, ShowQrComponent, FriendsComponent, AddFriendComponent, AddFriendCameraComponent, CreateGroupComponent]
})
export class AppModule { }
