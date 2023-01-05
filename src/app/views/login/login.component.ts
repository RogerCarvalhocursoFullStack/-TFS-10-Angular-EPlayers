import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

//Comando para rodar o json serve auth
//json-server db.json -m ./node_modules/json-server-auth

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  //nossas funcionalidades
  faUser = faUser
  faEnvelope = faEnvelope
  faLock = faLock
  faArrowLeft = faArrowLeft

// modelo/model
  userModel = new User() 
  nomeprofessor : any = ""
  mensagem: string = ""

 validaLogin(): boolean {
  
  let blackList = ["SELECT", "OR", "--", ";", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];//lista de palavras proibidas

  let ataque = 0;
  
  blackList.forEach((palavra) => {
  if(this.userModel.email?.toUpperCase().includes(palavra)) {
    ataque++;//conta mais uma palavra proibida
  }

  })
  
  //console.log("ATAQUEEEEEEE",ataque);
  
  //if(ataque > 0){//tem palavras de sql injection
  //  return false;// não deixa passar
  //}

  if (
    this.userModel.nome === undefined || this.userModel.nome === '' ||
    this.userModel.email === undefined || this.userModel.email === '' ||
    this.userModel.password === undefined || this.userModel.password === '' ||
    ataque > 0
  ) {
    return false;
  } else {
    return true
  }
 }//fim da função

  //funçao de login
  signin(){
    //fazer validação
    //console.log(this.userModel);
    if (this.validaLogin () ) {
    // console.log(this.userModel);
    this.userService.sigin(this.userModel)
    .subscribe( 
      {
        next: (response) => {
          //console.log(response);
          this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}` 
          //encaminahr para a rota home
          //this.router.navigate([''])
      },
      error: (e) => {
        //console.log('DEU RUIMMMMM ', e);
        this.mensagem = `${e.error} ${e.status} ${e.statusText}`
      }
          
      }
    )
    } else {
      console.log(this.userModel);
      this.mensagem = "Preencher todos os campos corretamente"
    
  }
}     
} // FIM DA CLASSE



// nova forma de utilizar o subscribe segundo a biblioteca rxJS, utilizada com o service do Angular

// https://rxjs.dev/deprecations/subscribe-arguments
//subscribe({
 // next: (v) => console.log(v),
  //error: (e) => console.error(e),
  //complete: () => console.info('complete')

  //ARROW FUCTION
//(params) => {
  //açoes
//}  
