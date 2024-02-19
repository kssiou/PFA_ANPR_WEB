import {Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {CountryService} from "../../service/country.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Fiche_recherche} from "../../api/fiche_recherche";
import {FicheRechercheService} from "../fiche-recherche.service";
import {Router} from "@angular/router";
import {Vehicule} from "../../api/vehicule";

@Component({
  selector: 'app-fiche-recherche-create',
  templateUrl: './fiche-recherche-create.component.html',
  styleUrls: ['./fiche-recherche-create.component.scss']
})
export class FicheRechercheCreateComponent implements OnInit {
  errorMessages = {
    Person_name: [
      {type: 'required', message: 'Nom est requis'},
      {type: 'minlength', message: 'Nom doit avoir au moins 3 caractères'}
    ],
    // Define error messages for other form controls similarly
  };
  colora: string | undefined;
  AddVehiculedialg: boolean = false;
  fiche_recherche: Fiche_recherche | undefined;
  FicheRechercheForm: any;
  AddVehiculeForm: any;

  dropdownItems = [
    {name: 'ENCOURS'},
    {name: 'SOUMISE'},
    {name: 'APPROUVEE'},
    {name: 'ALERT'}

  ];
  vehiculeList: any = [];

  constructor(private formBuilder: FormBuilder, private ficheRechercheService: FicheRechercheService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.FicheRechercheForm = this.formBuilder.group({
      Person_name: ['a', [Validators.required, Validators.minLength(3)]],
      Person_surname: ['', [Validators.required, Validators.minLength(3)]],
      Person_nationality: ['', [Validators.required]],
      Person_email: ['', [Validators.email]],
      Person_address: ['', [Validators.required]],
      Person_CIN: ['', [Validators.required]],
      Person_number: ['', [Validators.pattern('^[0-9]+$')]],
      Status: ['', [Validators.required]],
      Zip: ['', [Validators.required]],
      city: ['',],
      Gravity_degree: ['', [Validators.required, Validators.minLength(3)]],
      Vehicules: this.formBuilder.array([])
    });
    this.AddVehiculeForm = this.formBuilder.group({
      vehicle_model: ['a', [Validators.required, Validators.minLength(3)]],
      vehicle_registration: ['', [Validators.required, Validators.minLength(3)]],
      vehicle_colors: ['#634343', [Validators.required]],
      vehicle_Licence_plate: ['', [Validators.required, Validators.minLength(3)]],
    })

  }


  showVehiculeDialg() {
    this.AddVehiculedialg = true;
  }

  hideVehiculeDialg() {
    this.AddVehiculedialg = false;
  }

  addVehicule() {
    (this.FicheRechercheForm.get('Vehicules') as FormArray).push(this.AddVehiculeForm);
    this.vehiculeList.push(this.AddVehiculeForm.value);
    console.log(this.vehiculeList);
  }

  addFicheDeRecherche() {
    const formData = {...this.FicheRechercheForm.value};
    if (!this.FicheRechercheForm.valid) {
      alert("Veuillez corriger les erreurs dans le formulaire avant de continuer.");
    }
//
//
    else if (this.FicheRechercheForm.valid) {
//       this.ficheRechercheService.create(formData).subscribe((data:any)=>{
//         this.FicheRechercheForm.value;
//         console.log(formData);
//         console.log(this.vehiculeList);
//       });
//       // this.router.navigateByUrl('/fiche-recherche');
// console.log(formData);
//     }
      const vehiculeFormData = {...this.AddVehiculeForm.value};
      formData.Status = formData.Status.name;
      const finalData = {
        gravity: formData.Gravity_degree,
        status: formData.Status, // Ensure status is uppercase as in the first format
        // badgeNumber: formData.badgeNumber,
        // registrationNumber: formData.registrationNumber,
        vehicleOwner: {
          // registrationNumber: formData.vehicleOwner.registrationNumber,
          // username: formData.vehicleOwner.username,
          firstname: formData.Person_name,
          lastname: formData.Person_name,
          cin: formData.Person_CIN,
          email: formData.Person_email,
          phone: formData.Person_number,
          address: formData.Person_address,
          city: formData.city,
          nationality: formData.Person_nationality,
          codePostal: formData.Zip,
          vehicles: []
        }
      };
      if (formData.Vehicules && Array.isArray(formData.Vehicules)) {
        // Map the vehiculeList to extract relevant data for each vehicle
        finalData.vehicleOwner.vehicles = formData.Vehicules.map((vehicle: any) => ({
          licensePlateNumber: vehicle.vehicle_Licence_plate, // Adjust property name as per your form
          model: vehicle.vehicle_model,
          color: vehicle.vehicle_colors,
          vehicleOwnerRegistrationNumber: formData.Zip // Assuming this is the registration number for the vehicle owner
        }));
      } else {
        console.error("formData.vehiculeList is either undefined or not an array");
      }
      console.log(finalData);
            this.ficheRechercheService.create(finalData).subscribe((data:any)=>{
        this.FicheRechercheForm.value;
        console.log(finalData);
        console.log(this.vehiculeList);
      });
      // this.router.navigateByUrl('/fiche-recherche');
    }
  }



   deleteVehicule(vehicule:any){
     console.log(vehicule);
     const index = this.vehiculeList.indexOf(vehicule);

     if (index !== -1) {
       // Remove the vehicle from the list using splice
       this.vehiculeList.splice(index, 1);
     }

     console.log(this.vehiculeList);
   }
}
