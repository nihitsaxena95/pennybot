import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import {YoutubePlayerModule} from 'ng2-youtube-player';

import {
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarMinimizerComponent,
  AppSidebarComponent,
  APP_SIDEBAR_NAV
} from './common';
import {MatSidenavModule} from '@angular/material';
// Import directives
// import {
//   AsideToggleDirective,
//   NAV_DROPDOWN_DIRECTIVES,
//   ReplaceDirective,
//   SIDEBAR_TOGGLE_DIRECTIVES
// } from './../directives';
import { LayoutComponent } from './layout.component';
import { DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import { ChatComponent } from './chat/chat.component';

import { BottomChatComponent } from './bottom-chat/bottom-chat.component';
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        FloatingActionMenuModule,
        MatSidenavModule,
        YoutubePlayerModule
    ],
    declarations: [
    LayoutComponent,
    DashboardUserComponent,
    ChatComponent,
    BottomChatComponent,
    AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  // AsideToggleDirective,
  // NAV_DROPDOWN_DIRECTIVES,
  // ReplaceDirective,
  // SIDEBAR_TOGGLE_DIRECTIVES
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class LayoutModule { }
