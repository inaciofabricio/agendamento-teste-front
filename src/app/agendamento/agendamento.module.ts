import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgendamentoComponent } from './agendamento.component';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoRoutingModule } from './agendamento.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AgendamentoRoutingModule
    ],
    exports: [],
    declarations: [
        AgendamentoComponent
    ],
    providers: [
        AgendamentoService
    ]
})
export class AgendamentoModule{ }