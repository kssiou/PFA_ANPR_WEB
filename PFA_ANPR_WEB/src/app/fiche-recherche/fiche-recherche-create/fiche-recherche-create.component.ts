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
export class FicheRechercheCreateComponent implements OnInit{
  errorMessages = {
    Person_name: [
      { type: 'required', message: 'Nom est requis' },
      { type: 'minlength', message: 'Nom doit avoir au moins 3 caractères' }
    ],
    // Define error messages for other form controls similarly
  };
  colora: string | undefined;
   AddVehiculedialg:boolean=false;
  fiche_recherche: Fiche_recherche | undefined;
  FicheRechercheForm:any;
  AddVehiculeForm:any ;

  dropdownItems = [
    { name: 'En Cours ' },
    { name: 'Soumis ' },
    { name: 'Approuvé' }
  ];
  vehiculeList :any=[] ;
  constructor(private formBuilder: FormBuilder,private ficheRechercheService:FicheRechercheService,private router :Router) {}

  ngOnInit(): void {
        this.createForm();
    }
    createForm(){
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
        Gravity_degree: ['', [Validators.required, Validators.minLength(3)]],
        Vehicules: this.formBuilder.array([])
      });
      this.AddVehiculeForm=this.formBuilder.group({
        vehicle_model: ['a', [Validators.required, Validators.minLength(3)]],
        vehicle_registration: ['', [Validators.required, Validators.minLength(3)]],
        vehicle_colors: ['#634343', [Validators.required]],
        vehicle_Licence_plate: ['', [Validators.required, Validators.minLength(3)]],
      })

    }



  showVehiculeDialg(){
    this.AddVehiculedialg=true;
  }
hideVehiculeDialg(){
  this.AddVehiculedialg=false;
  }
  addVehicule(){
    (this.FicheRechercheForm.get('Vehicules') as FormArray).push(this.AddVehiculeForm);
    this.vehiculeList.push(this.AddVehiculeForm.value);
    console.log(this.vehiculeList);
   }
  addFicheDeRecherche(){
//     const formData = {...this.FicheRechercheForm.value};
//     if (!this.FicheRechercheForm.valid) {  alert("Veuillez corriger les erreurs dans le formulaire avant de continuer.");
//
//    console.log(this.FicheRechercheForm.errorMessages) }
//
//     else if(this.FicheRechercheForm.valid) {
//       const formData = {...this.FicheRechercheForm.value};
//       formData.Status = formData.Status.name;
//       this.ficheRechercheService.create(formData).subscribe((data:any)=>{
//         this.FicheRechercheForm.value;
//         console.log(formData);
//         console.log(this.vehiculeList);
//       });
//       // this.router.navigateByUrl('/fiche-recherche');
// console.log(formData);
//     }
    const formData = {...this.FicheRechercheForm.value};
    addFicheDeRecherche() {
      // Copy the FicheRechercheForm data
      const formData = {...this.FicheRechercheForm.value};

      // Construct the final object
      const finalData = {
        ficheDeRechercheId: null, // You might need to set this value if it's available elsewhere
        date: new Date().toISOString(), // Assuming you want to use the current date
        gravity: formData.Gravity_degree,
        status: formData.Status,
        badgeNumber: formData.Person_number, // Assuming this is the badge number
        registrationNumber: formData.Zip, // Assuming this is the registration number
        vehicleOwner: {
          vehicleOwnerId: null, // You might need to set this value if it's available elsewhere
          registrationNumber: formData.Zip, // Assuming this is the registration number
          username: formData.Person_name,
          firstname: formData.Person_name, // Assuming this is the first name
          lastname: formData.Person_surname, // Assuming this is the last name
          cin: formData.Person_CIN,
          email: formData.Person_email,
          phone: formData.Person_number,
          address: formData.Person_address,
          city: '', // You might need to provide city data if available
          nationality: formData.Person_nationality,
          codePostal: '', // You might need to provide postal code data if available
          vehicles: [] // Will be populated later
        }
      };

      // Copy the AddVehiculeForm data
      const vehiculeFormData = {...this.AddVehiculeForm.value};

      // Construct the vehicle object
      const vehicle:any = {
        licensePlateNumber: vehiculeFormData.vehicle_Licence_plate,
        model: vehiculeFormData.vehicle_model,
        color: vehiculeFormData.vehicle_colors,
        vehicleOwnerRegistrationNumber: formData.Zip // Assuming this is the registration number
      };

      // Add the vehicle to the vehicles array in the finalData object
      finalData.vehicleOwner.vehicles.push(vehicle);

      console.log(finalData);

      // Now you can use finalData to send to the server
    }

    // Convert status to lowercase and remove spaces


    // Construct the final object
    const finalData = {
      ficheDeRechercheId: formData.ficheDeRechercheId,
      date: formData.date,
      gravity: formData.gravity,
      status: formData.status, // Ensure status is uppercase as in the first format
      badgeNumber: formData.badgeNumber,
      // registrationNumber: formData.registrationNumber,
      vehicleOwner: {
        // registrationNumber: formData.vehicleOwner.registrationNumber,
        // username: formData.vehicleOwner.username,
        firstname: formData.vehicleOwner.firstname,
        lastname: formData.vehicleOwner.lastname,
        cin: formData.vehicleOwner.cin,
        email: formData.vehicleOwner.email,
        phone: formData.vehicleOwner.phone,
        address: formData.vehicleOwner.address,
        city: formData.vehicleOwner.city,
        nationality: formData.vehicleOwner.nationality,
        codePostal: formData.vehicleOwner.codePostal,
        vehicles: formData.vehicleOwner.vehicles.map((vehicle: { vehicleId: any; licensePlateNumber: any; model: any; color: any; vehicleOwnerRegistrationNumber: any; }) => ({
          vehicleId: vehicle.vehicleId,
          licensePlateNumber: vehicle.licensePlateNumber,
          model: vehicle.model,
          color: vehicle.color,
          vehicleOwnerRegistrationNumber: vehicle.vehicleOwnerRegistrationNumber
        }))
      }
    };

    console.log(finalData);
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
