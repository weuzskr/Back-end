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
    this.citoyenForm = this.fb.group({
      matricule: ['JP001', Validators.required],
      nom: ['Tanaka', Validators.required],
      prenom: ['Hiroshi', Validators.required],
      dateDeNaissance: ['1985-03-15', Validators.required],
      lieuDeNaissance: ['Tokyo', Validators.required],
      paysDeNaissance: ['Japon', Validators.required],
      sexe: ['M', Validators.required],
      taille: [172.0, Validators.required],
      numeroDeTelephone: ['+819012345678', Validators.required],
      photo: ['hiroshi_tanaka.jpg', Validators.required],
      signature: ['hiroshi_tanaka_signature.jpg', Validators.required],
      lieuDactivites: ['Tokyo', Validators.required],
      empreinteDigitale: ['GHI789', Validators.required],
      situationMatrimoniale: ['Marié', Validators.required],
      profession: this.fb.group({
        id: [1, Validators.required],
      }),
      attaches_familliales: this.fb.array([
        this.createAttachFamillialeGroup({
          matricule: 'JAF003',
          prenom: 'Yuki',
          nom: 'Tanaka',
          numeroDeTelephone: '+819012345679',
          lienDeParente: 'Conjointe',
          adresse: 'Tokyo'
        }),
        this.createAttachFamillialeGroup({
          matricule: 'JAF004',
          prenom: 'Ken',
          nom: 'Tanaka',
          numeroDeTelephone: '+819012345680',
          lienDeParente: 'Enfant',
          adresse: 'Tokyo'
        }),
      ]),
      familles: this.fb.array([
        this.createFamilleGroup({
          matricule: 'JF003',
          prenom: 'Akira',
          nom: 'Tanaka',
          age: 32,
          sexe: 'M',
          type: 'Frère'
        }),
        this.createFamilleGroup({
          matricule: 'JF004',
          prenom: 'Aya',
          nom: 'Tanaka',
          age: 29,
          sexe: 'F',
          type: 'Sœur'
        }),
      ]),
      consulat: this.fb.group({
        id: [1, Validators.required],
      }),
    });
  }

  createAttachFamillialeGroup(data?: any): FormGroup {
    return this.fb.group({
      matricule: [data ? data.matricule : '', Validators.required],
      adresse: [data ? data.adresse : '', Validators.required],
      lienDeParente: [data ? data.lienDeParente : '', Validators.required],
      nom: [data ? data.nom : '', Validators.required],
      numeroDeTelephone: [data ? data.numeroDeTelephone : '', Validators.required],
      prenom: [data ? data.prenom : '', Validators.required],
    });
  }

  createFamilleGroup(data?: any): FormGroup {
    return this.fb.group({
      matricule: [data ? data.matricule : ''],
      age: [data ? data.age : ''],
      nom: [data ? data.nom : ''],
      prenom: [data ? data.prenom : ''],
      sexe: [data ? data.sexe : ''],
      type: [data ? data.type : ''],
    });
  }

  get attaches_familliales() {
    return this.citoyenForm.get('attaches_familliales') as FormArray;
  }

  get familles() {
    return this.citoyenForm.get('familles') as FormArray;
  }

  addAttacheFamilliale() {
    this.attaches_familliales.push(this.createAttachFamillialeGroup());
  }

  addFamille() {
    this.familles.push(this.createFamilleGroup());
  }

  removeAttacheFamilliale(index: number) {
    this.attaches_familliales.removeAt(index);
  }

  removeFamille(index: number) {
    this.familles.removeAt(index);
  }

  onSubmit() {
    // if (this.citoyenForm.valid) {
    console.log("Les données que j'envoie", this.citoyenForm.value);

    this.CitoyenService.createCitoyen(this.citoyenForm.value)
      .subscribe(
        response => {
          sweetAlertMessage("success", "Ajout reussie", "Citoyen créé avec succès");
          // this.CitoyenService.getAllcitoyens().subscribe(
          //   (data) => {
          //     this.citoyens = data.citoyens;
          //   },
          //   (error) => {
          //     console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
          //   }
          // );
        },
        error => {
          console.log("Erreur lors de l'ajout", error);

          sweetAlertMessage("error", "Erreur lors de l'ajout du citoyen", "Veuillez vérifier les données que vous avez fournies");
        }
      );
    // }
  }



  loadProfessions() {
    this.ProfessionService.getProfessions().subscribe(
      (data) => {
        this.professions = data.data; // Assigner les professions récupérées
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
