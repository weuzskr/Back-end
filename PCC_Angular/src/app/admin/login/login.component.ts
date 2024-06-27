import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  hasError: boolean = false;



  // Variable pour les inputs 
  email: string = "";
  password: string = "";

  verifMessageEmail: string = "";

  verifMessagePassword: string = "";

  messageErreur: string = "";

  // Déclaration des méthode 
  // Injection des services auth et route 
  constructor(private authService: AuthService, private route: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    // Initialiser le localstorage 
    this.initForm();
    if (!localStorage.getItem("userConnect")) {
      localStorage.setItem("userConnect", JSON.stringify(""))
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.email,
        Validators.compose([
          Validators.required,
          // Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  // Methode de connexion 
  login() {


    let user = {
      username: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      (response: any) => {

        if (response.user) {
          // sweetAlertMessage("success", "Connexion reussie", response.message)
          this.authService.isAuthenticated = true;
          // On stocke les info de la requete dans notre localstorage
          localStorage.setItem("userConnect", JSON.stringify(response));

          // Récupération du role_id à partir de la réponse
          const role = response.user.role;

          // Redirection en fonction du role_id
          if (role === "ROLE_ADMIN") {
            this.route.navigateByUrl('/ministre');
          } else if (role === "ROLE_USER") {
            this.route.navigateByUrl('/chancelier');
          }
          this.email = "";
          this.password = "";
        }
      },
      (error) => {
        console.log("mon user que je veux connecté", user);
        // console.log("Erreur lors de la connexion avec le backend", error);

        this.messageErreur = "Email ou mot de passe incorrect";
        sweetAlertMessage("error", "Connexion echouer", this.messageErreur)

      })

  }


  // Afficher ou cacher le mot de passe 
  hidePassword: boolean = true;
  passwordVisibility(): void {
    if (this.password) {
      this.hidePassword = !this.hidePassword;
    }
  }
}
