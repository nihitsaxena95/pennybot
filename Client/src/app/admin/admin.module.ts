import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import {DndModule} from 'ng2-dnd';
import {FormsModule} from '@angular/forms';
// Import containers
import {
  DashboardComponent
} from './dashboard/dashboard.component';
// Import components
import {AdminComponent} from './admin.component';
import {
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarMinimizerComponent,
  AppSidebarComponent,
  APP_SIDEBAR_NAV
} from './common';
// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './../directives';
// Import routing module
import { AdminRoutingModule } from './admin.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BottomChatComponent } from './bottom-chat/bottom-chat.component';
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';

import { TagInputModule } from 'ngx-chips';
import { IntentFormComponent } from './intent-form/intent-form.component';

import { TraindomainComponent } from './traindomain/traindomain.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AddNewContextComponent } from './add-new-context/add-new-context.component';
import { ContextComponent } from './context/context.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { IntentComponent } from './intent/intent.component';

import { BottrainingComponent } from './bottraining/bottraining.component';



@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  DndModule.forRoot(),
    AdminRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FloatingActionMenuModule,
    TagInputModule,
    ModalModule.forRoot()
  ],
  declarations: [
  AdminComponent,
   DashboardComponent,
   AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarMinimizerComponent,
  BottomChatComponent,
  APP_SIDEBAR_NAV,
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  IntentFormComponent,
  TraindomainComponent,
  AddNewContextComponent,
  AddtaskComponent,
  IntentComponent,
  BottrainingComponent,
  ContextComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
})
export class AdminModule { }
