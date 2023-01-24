import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor( private formBuilder: FormBuilder, private router: Router ) {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      check: [false]
    });
   }

  ngOnInit(): void {   
  }

  guardar(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.router.navigate(['/backoffice']);
    }
    
  }

}
