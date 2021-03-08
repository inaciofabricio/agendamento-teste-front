import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from './agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  constructor(
    private agendamentoService : AgendamentoService
  ) { }

  listView:boolean = true;
  newView:boolean = false;

  activeList:any = [
    { id : 0, text : "NÃO" },
    { id : 1, text : "SIM" }
  ];
  
  allAgendamento:any = [];
  oneAgendamento:any = null;

  ngOnInit() {
    this.getAll();
  }

  getOne(obj:any){
    this.agendamentoService.getOne(obj)
      .subscribe(res => {
        this.oneAgendamento = res.data;
        this.invertView();
      });
  }

  getAll(){
    this.agendamentoService.getAll()
      .subscribe(res => this.allAgendamento = res.data);
  }

  deleteVinculo(a,p){
    this.agendamentoService.deleteVinculo({ id_agendamento : a, telefone : p })
      .subscribe(res => {

        let array = [];

        this.oneAgendamento.pessoas.forEach(i => {
          if(i.telefone != p){
            array.push(i);
          }
        });
        
        this.oneAgendamento.pessoas = array;

      });
  }

  fileChanged(e) {
    
    let file = e.target.files[0]; 
    
    this.agendamentoService.readFilePromise(file)
      .then(result => this.oneAgendamento.pessoas = result);
  }

  newAgendamento(){
    this.invertView();
    this.oneAgendamento = {
      id : null,
      hora_minuto : null,
      mensagem : "",
      ativo : null,
      pessoas : []  
    }
  }

  invertView(){
    this.listView = (this.listView == true) ? false : true;
    this.newView = (this.newView == true) ? false : true;
  }

  disabledBtn(){
    if (
        (this.oneAgendamento.hora_minuto == null || this.oneAgendamento.hora_minuto == "") ||
        (this.oneAgendamento.mensagem == null || this.oneAgendamento.mensagem == "") ||
        (this.oneAgendamento.ativo == null || this.oneAgendamento.ativo == "") ||
        (this.oneAgendamento.pessoas.length == 0)
      ) {
      return true;
    }
    else {
      return false;
    }
  }

  confirm(){
    this.agendamentoService.update(this.oneAgendamento)
      .subscribe(res => {
        this.invertView();
        this.getAll();
      });
  }

  cancel(){
    this.getAll();
    this.invertView();
  }

}
