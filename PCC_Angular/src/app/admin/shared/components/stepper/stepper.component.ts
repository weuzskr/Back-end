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
      date_de_naissance: ['', Validators.required],
      lieu_de_naissance: ['', Validators.required],
      nom: ['', Validators.required],
      numero_de_telephone: ['', Validators.required],
      pays_de_naissance: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      lieu_dactivite: ['', Validators.required],
      empreinte_digitale: ['', Validators.required],
      signature: ['', Validators.required],
      profession_id: ['', Validators.required],
      situation_matrimoniale: ['', Validators.required],
      famille: this.fb.array([]),
      attaches_familliales: this.fb.array([
        this.createAttachFamillialeGroup()
      ])
    });
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
  createAttachFamillialeGroup(): FormGroup {
    return this.fb.group({
      adresse: ['', Validators.required],
      lien_de_parente: ['', Validators.required],
      nom: ['', Validators.required],
      numero_de_telephone: ['', Validators.required],
      prenom: ['', Validators.required],
    });
  }

  createFamilleGroup(): FormGroup {
    return this.fb.group({
      age: [''],
      nom: [''],
      prenom: [''],
      sexe: [''],
      type: [''],
    });
  }

  get famille() {
    return this.citoyenForm.get('famille') as FormArray;
  }

  get attaches_familliales() {
    return this.citoyenForm.get('attaches_familliales') as FormArray;
  }

  addFamille() {
    this.famille.push(this.createFamilleGroup());
  }

  addAttacheFamilliale() {
    this.attaches_familliales.push(this.createAttachFamillialeGroup());
  }

  removeFamille(index: number) {
    this.famille.removeAt(index);
  }

  removeAttacheFamilliale(index: number) {
    this.attaches_familliales.removeAt(index);
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

  onSubmit() {
    if (this.citoyenForm.valid) {
      this.CitoyenService.createCitoyen(this.citoyenForm.value)
        .subscribe(
          response => {
            sweetAlertMessage("success", "Ajout reussie", "Citoyen créé avec succès")
            this.CitoyenService.getAllcitoyens().subscribe(
              (data) => {
                this.citoyens = data.citoyens;
              },
              (error) => {
                console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
              }
            );

          },
          error => {
            sweetAlertMessage("error", "Erreur lors de l'ajout du citoyen", "Veuillez vérfier les données que vous avez fournies")
          }
        );
    }
  }
}
