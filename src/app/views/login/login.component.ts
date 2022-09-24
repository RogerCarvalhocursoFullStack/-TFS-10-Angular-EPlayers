import { Component, OnInit } from '@angular/core';

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private userService: UserService) { }

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

 

  //funçao de login
  signin(){
    //fazer validação
    //console.log(this.userModel);

    

    this.userService.sigin(this.userModel)
    .subscribe( 
      {
        next: (response) => {
          console.log(response);
          this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}` 
      },
      error: (e) => {
        console.log('DEU RUIMMMMM ', e);
        this.mensagem = `${e.error} ${e.status} ${e.statusText}`
      }
          
      }
    )
 
  }
} // FIM DA CLASSE



// nova forma de utilizar o subscribe segundo a biblioteca rxJS, utilizada com o service do Angular
//subscribe({
 // next: (v) => console.log(v),
  //error: (e) => console.error(e),
  //complete: () => console.info('complete')

  //ARROW FUCTION
//(params) => {
  //açoes
//}  
