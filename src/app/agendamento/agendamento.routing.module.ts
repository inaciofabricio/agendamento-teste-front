import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AgendamentoComponent } from './agendamento.component';

const loginRoutes: Routes = [
    { path: '', component: AgendamentoComponent, 
        children: [
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class AgendamentoRoutingModule {

}
