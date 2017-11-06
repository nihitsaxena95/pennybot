import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { IntentFormComponent } from './intent-form/intent-form.component';
import { IntentComponent } from './intent/intent.component';
import { TraindomainComponent } from './traindomain/traindomain.component';
import { AddNewContextComponent } from './add-new-context/add-new-context.component';
import { AddtaskComponent } from './addtask/addtask.component';
import {BottrainingComponent} from './bottraining/bottraining.component';




const routes: Routes = [
	{
		path: '', component: AdminComponent,
		children: [
		{
			path: 'dashboardAdmin', component: DashboardComponent
		}]
	},
	{
     	path : 'traindomain', component : TraindomainComponent
     },
     {
        path:'trainingbot' ,component:BottrainingComponent
     },
   
	{
		path: 'dashboardAdmin/intentForm', component: IntentFormComponent
		//loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule'
	},
	{	path : 'trainingbot/addnewcontext', component : AddNewContextComponent },
	{path: 'dashboardAdmin/intent', component: IntentComponent},
	{
		path: 'dashboardAdmin/addtask', component: AddtaskComponent
	},
	];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }


