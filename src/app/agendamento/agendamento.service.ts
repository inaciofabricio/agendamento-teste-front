import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import * as g from '../global';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(
    private http: Http
  ) { }

  getOne(obj:any){
    return this.http.post(g.baseUrl+'agendamento/get_one',obj)
      .pipe(map((response: Response) => response.json()));
  }

  getAll(){
    return this.http.get(g.baseUrl+'agendamento/get_all')
      .pipe(map((response: Response) => response.json()));
  }

  update(obj:any){
    return this.http.post(g.baseUrl+'agendamento/update',obj)
      .pipe(map((response: Response) => response.json()));
  }

  deleteVinculo(obj:any){
    return this.http.post(g.baseUrl+'agendamento/delete_vinculo',obj)
      .pipe(map((response: Response) => response.json()));
  }

  readFilePromise(file){
    return new Promise((resolve, reject) => {
      this.readFile(file)
        .then(result => resolve(result))
        .catch(err => reject(err));
      }
    );
  }

  readFile(file: File) {
    return new Promise((resolve, reject) => {
            
      let reader = new FileReader();
      reader.onload = () => {

        let result : any = reader.result;
        let linhas = result.split("\n");

        let dados = [];
        let linha = '';

        for (let i = 0; i < linhas.length;i++){
          
            if(linhas[i] != ""){
            
                linha = '';
                linha = linhas[i].split(';');

                dados.push({
                  "telefone" : linha[0],
                  "nome" : linha[1]             
                });
            }
        }

        resolve(dados)
        reject('Revise o arquivo que está sendo feito upload');
      };
      reader.readAsText(file, 'ISO-8859-1');
    });
  }

}
