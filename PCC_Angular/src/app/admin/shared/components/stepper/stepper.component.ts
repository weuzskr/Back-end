import { CitoyenService } from 'src/app/services/citoyen.service';
import { ProfessionService } from './../../../../services/profession.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from 'src/app/services/apiUrl';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  citoyenForm: FormGroup;
  professions: any;
  citoyens: any;
  consulat_id: number = 0;
  user: any;
  get_id() {
    if (localStorage.getItem("userConnect")) {
      this.user = JSON.parse(localStorage.getItem("userConnect") || "");
      this.consulat_id = this.user.user.consulatId;
      console.log(this.consulat_id);
      console.log("L'utilisateur connecté est :", this.user.user);

    }
  }

  ngOnInit() {
    this.loadProfessions(); // Charger les professions lors de l'initialisation
  }
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private ProfessionService: ProfessionService,
    private CitoyenService: CitoyenService
  ) {
    this.get_id()
    this.citoyenForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      lieuDeNaissance: ['', Validators.required],
      paysDeNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      taille: ['', Validators.required],
      numeroDeTelephone: ['', Validators.required],
      photo: ['', Validators.required],
      signature: ['', Validators.required],
      lieuDactivites: ['', Validators.required],
      empreinteDigitale: ['', Validators.required],
      situationMatrimoniale: ['', Validators.required],
      profession: this.fb.group({
        id: ['', Validators.required],
      }),
      attacherFamilliales: this.fb.array([
        this.createAttachFamillialeGroup({
          prenom: '',
          nom: '',
          numeroDeTelephone: '',
          lienDeParente: '',
          adresse: ''
        })
      ]),
      familles: this.fb.array([
      ]),
      consulat: this.fb.group({
        id: [this.consulat_id, Validators.required],
      }),
    });
  }

  createAttachFamillialeGroup(data?: any): FormGroup {
    return this.fb.group({
      adresse: [data ? data.adresse : '', Validators.required],
      lienDeParente: [data ? data.lienDeParente : '', Validators.required],
      nom: [data ? data.nom : '', Validators.required],
      numeroDeTelephone: [data ? data.numeroDeTelephone : '', Validators.required],
      prenom: [data ? data.prenom : '', Validators.required],
    });
  }

  createFamilleGroup(data?: any): FormGroup {
    return this.fb.group({
      age: [data ? data.age : ''],
      nom: [data ? data.nom : ''],
      prenom: [data ? data.prenom : ''],
      sexe: [data ? data.sexe : ''],
      type: [data ? data.type : ''],
    });
  }

  get attacherFamilliales() {
    return this.citoyenForm.get('attacherFamilliales') as FormArray;
  }

  get familles() {
    return this.citoyenForm.get('familles') as FormArray;
  }

  addAttacheFamilliale() {
    this.attacherFamilliales.push(this.createAttachFamillialeGroup());
  }

  addFamille() {
    this.familles.push(this.createFamilleGroup());
  }

  removeAttacheFamilliale(index: number) {
    this.attacherFamilliales.removeAt(index);
  }

  removeFamille(index: number) {
    this.familles.removeAt(index);
  }
  CloseModal() {
    const element = document.querySelector('#close-modal') as HTMLElement | null;
    if (element) {
      element.click();
    }
  }

  onSubmit() {
    if (this.citoyenForm.valid) {

      console.log("les données que je veux envoyé", this.citoyenForm.value);
      this.CitoyenService.createCitoyen(this.citoyenForm.value)

        .subscribe(
          response => {
            sweetAlertMessage("success", "Ajout reussie", "Citoyen créé avec succès");
            this.CitoyenService.getAllcitoyens().subscribe(
              (data) => {
                this.citoyens = data.citoyens;
              },
              (error) => {
                console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
              }
            );
            this.CloseModal()
          },
          error => {

            console.error("Erreur lors de l'enrollement :", error);

            sweetAlertMessage("error", "Erreur lors de l'ajout du citoyen", "Veuillez vérifier les données que vous avez fournies");
          }
        );
    }
    // this.get_id()
  }



  loadProfessions() {
    this.ProfessionService.getProfessions().subscribe(
      (data) => {
        this.professions = data; // Assigner les professions récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération des professions', error);
      }
    );
  }


  steps = [
    {
      number: 1,
      title: 'Informations Personnel',
      description: 'Fournir les informations personnels du citoyen',
    },
    {
      number: 2,
      title: 'Informations Familiale',
      description:
        'Fournir les informations familiales du citoyen (conjoint.e.s et  enfant.s)',
    },
    {
      number: 3,
      title: 'Attaches Familiale',
      description:
        "Personnes a contacter en cas de necessité au pays d'origine",
    },
  ];
  activeStep = this.steps[0];

  isActiveStep(index: number): boolean {
    return this.activeStep.number === this.steps[index].number;
  }

  isStepCompleted(index: number): boolean {
    return this.steps[index].number < this.activeStep.number;
  }

  goToStep(index: number): void {
    this.activeStep = this.steps[index];
  }

  nextStep(): void {
    const currentIndex = this.steps.indexOf(this.activeStep);
    if (currentIndex < this.steps.length - 1) {
      this.activeStep = this.steps[currentIndex + 1];
    }
  }

  prevStep(): void {
    const currentIndex = this.steps.indexOf(this.activeStep);
    if (currentIndex > 0) {
      this.activeStep = this.steps[currentIndex - 1];
    }
  }

  isLastStep(): boolean {
    return this.activeStep.number === this.steps.length;
  }

  isBetweenStep(): boolean {
    const currentIndex = this.steps.indexOf(this.activeStep);
    return currentIndex > 0 && currentIndex < this.steps.length - 1;
  }


  isFirstStep(): boolean {
    return this.activeStep.number === 1;
  }
  isNotLastStep(index: number): boolean {
    return index < this.steps.length - 1;
  }

}
