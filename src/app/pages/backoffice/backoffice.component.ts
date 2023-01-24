import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Result } from 'src/app/interfaces/rick';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  expandir: boolean = true;
  users: Result[] = [];
  page: number = 1;
  maxres: number = 1;
  maxpage: number = 1;
  formulario: FormGroup;
  personaje: string = '';
  paginas: number[] = [];
  mtr: number = 0;

  constructor( private usuarios: UsuariosService, private fb:FormBuilder ) {
    this.formulario = this.fb.group({
      nombre: [''],
      fecha: ['']
    });
   }

  ngOnInit(): void {    
    this.usuarios.getChars(this.page, this.personaje).subscribe(resp=>{
      this.users = resp.results.slice(0,5); 
      this.maxpage = resp.info.pages;
      this.maxres = resp.info.count; 
      this.crearPaginas();
    });    
  }

  crearPaginas() {
    this.paginas = [];
    this.mtr = Math.min(this.page*20,this.maxres);
    if (this.page <=3){
      for (let i=1;i<=(Math.min(5,this.maxpage));i++) {
        this.paginas.push(i);
      }
    } else {
      this.paginas.push(this.page-2);
      this.paginas.push(this.page-1);
      for (let i=this.page;i<=(Math.min(this.page+2,this.maxpage));i++) {
        this.paginas.push(i);
      }
    }    
  }

  atras(q:number) {
    if (this.page-q>0) {
      this.page -= q;
      this.crearPaginas();
      this.usuarios.getChars(this.page, this.personaje).subscribe(resp=>{
        this.users = resp.results.slice(0,5);
      });  
    }
  }

  adelante(q:number) {
    if (this.page+q<=this.maxpage) {
      this.page += q;
      this.crearPaginas();
      this.usuarios.getChars(this.page, this.personaje).subscribe(resp=>{
        this.users = resp.results.slice(0,5);
      });  
    }
  }

  borrar() {
    this.formulario.reset();
  }

  buscar() {
    this.page = 1;
    this.personaje = this.formulario.get('nombre')?.value || '';
    this.usuarios.getChars(this.page, this.personaje).subscribe(resp=>{
      this.users = resp.results.slice(0,5);  
      this.maxpage = resp.info.pages;
      this.maxres = resp.info.count;
      this.crearPaginas();
    }); 
  }

}
