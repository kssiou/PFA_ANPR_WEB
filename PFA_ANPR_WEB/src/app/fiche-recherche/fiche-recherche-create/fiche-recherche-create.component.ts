import {Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {CountryService} from "../../service/country.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Fiche_recherche} from "../../api/fiche_recherche";

@Component({
  selector: 'app-fiche-recherche-create',
  templateUrl: './fiche-recherche-create.component.html',
  styleUrls: ['./fiche-recherche-create.component.scss']
})
export class FicheRechercheCreateComponent implements OnInit{
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
  constructor(private formBuilder: FormBuilder) {}

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
        Person_CIN: ['', [Validators.pattern('^[0-9]+$')]],
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
