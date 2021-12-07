import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
// import { ListsResolver } from './_resolver/lists.resolver';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
// import { MemberListResolver } from './_resolver/member-list.resolver';

export const appRoutes:Routes =[
    {
        path:'',component:HomeComponent
    },
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[AuthGuard],
        children:[
            { path:'members',component:MemberListComponent
            // ,resolve:{users:MemberListResolver} 
        },
            { path:'members/:id',component:MemberDetailComponent,resolve:{user:MemberDetailResolver} },
            { path:'member/edit',component:MemberEditComponent,resolve:{user:MemberEditResolver}, canDeactivate:[PreventUnsavedChanges]},
            { path:'messages',component:MessagesComponent },
            { path:'lists',component:ListsComponent
            // ,resolve:{users:ListsResolver} 
        },
            { path:'profile',component:ProfileComponent,resolve:{user:MemberEditResolver} }
        ]
    },
    { path:'**',redirectTo:'',pathMatch:'full' }
];
