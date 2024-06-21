import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // Variable pour les inputs 
  email: string = "";
  password: string = "";

  verifMessageEmail: string = "";

  verifMessagePassword: string = "";

  messageErreur: string = "";

  // Déclaration des méthode 
  // Injection des services auth et route 
  constructor(private authService: AuthService, private route: Router ){}


  ngOnInit(): void { 
    // Initialiser le localstorage 
  
    if(!localStorage.getItem("userConnect")){
      localStorage.setItem("userConnect", JSON.stringify(""))
    }
  }

  // Methode de connexion 
  login(){

    if(!this.email){
      this.verifMessageEmail = "L'email est obligatoire";
    }
    if(!this.password){
      this.verifMessagePassword = "Le mot de passe est obligatoire";
    }
    
    if (this.email && this.password){
      let user = {
        email: this.email,
        password: this.password
      };
      this.authService.login(user).subscribe(
        (response :any) =>{
          if (response.token){
            sweetAlertMessage("success", "Connexion reussie", response.message)
            this.authService.isAuthenticated = true; 
            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem("userConnect", JSON.stringify(response));
                  
        // Récupération du role_id à partir de la réponse
        const role_id = response.user.role_id;

        // Redirection en fonction du role_id
        if (role_id === 1) {
          this.route.navigateByUrl('/ministre');
        } else if (role_id === 2) {
          this.route.navigateByUrl('/chancelier');
        }
            this.email = "";
            this.password  = "";
          }
        },
        (error) =>{
          this.messageErreur= "Email ou mot de passe incorrect";
          sweetAlertMessage("error", "Connexion echouer", this.messageErreur)
         
        })
    }
  }
  

  // Afficher ou cacher le mot de passe 
  hidePassword: boolean = true;
  passwordVisibility(): void {
    if(this.password){
      this.hidePassword = !this.hidePassword;
    }
  }
}
