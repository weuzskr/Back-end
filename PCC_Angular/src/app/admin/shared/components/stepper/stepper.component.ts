import { CitoyenService } from 'src/app/services/citoyen.service';
import { ProfessionService } from './../../../../services/profession.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from 'src/app/services/apiUrl';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { TableComponent } from '../table/table.component';


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
  // @Input() totalPages: number = 0;
  @ViewChild(TableComponent) table!: TableComponent;
  get_id() {
    if (localStorage.getItem("userConnect")) {
      this.user = JSON.parse(localStorage.getItem("userConnect") || "");
      this.consulat_id = this.user.user.consulatId;
      // console.log(this.consulat_id);
      // console.log("L'utilisateur connecté est :", this.user.user);

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
      nom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      prenom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      dateDeNaissance: ['', Validators.required],
      lieuDeNaissance: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      paysDeNaissance: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      sexe: ['', Validators.required],
      taille: ['', Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(300),
      ])],
      numeroDeTelephone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      photo: ['', Validators.required],
      signature: ['signature.jpeg', Validators.required],
      lieuDactivites: ['', Validators.required, Validators.minLength(3), Validators.maxLength(255)],
      empreinteDigitale: ['empreinte_digitale.jpeg', Validators.required],
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
        this.createFamilleGroup({
          prenom: '',
          nom: '',
          age: '',
          sexe: '',
          type: ''
        }),
      ]),
      consulat: this.fb.group({
        id: [this.consulat_id, Validators.required],
      }),
    });
  }

  createAttachFamillialeGroup(data?: any): FormGroup {
    return this.fb.group({
      adresse: [data ? data.adresse : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      lienDeParente: [data ? data.lienDeParente : '', Validators.required],
      nom: [data ? data.nom : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      numeroDeTelephone: [data ? data.numeroDeTelephone : '', Validators.compose([
        Validators.required,
        Validators.pattern(/^(77|78|76|70|75|33)[0-9]{7}$/),

      ])],
      prenom: [data ? data.prenom : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
    });
  }

  createFamilleGroup(data?: any): FormGroup {
    return this.fb.group({
      age: [data ? data.age : '', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(150),
      ])],
      nom: [data ? data.nom : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      prenom: [data ? data.prenom : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ])],
      sexe: [data ? data.sexe : '', Validators.required],
      type: [data ? data.type : '', Validators.required],
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

      // console.log("les données que je veux envoyé", this.citoyenForm.value);
      this.CitoyenService.createCitoyen(this.citoyenForm.value)

        .subscribe(
          response => {
            sweetAlertMessage("success", "Ajout reussie", "Citoyen créé avec succès");
            this.table.loardcitoyenbychancelier()
            // this.get_id
            // this.CitoyenService.getCitoyensByChancelier(this.consulat_id).subscribe(
            //   (data) => {
            //     this.citoyens = data;
            //     this.table.updateTotalPages();
            //     this.table.paginateCitoyens();
            //   },
            //   (error) => {
            //     console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
            //   }
            // );
            this.CloseModal()
          },
          error => {

            // console.error("Erreur lors de l'enrollement :", error);

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
