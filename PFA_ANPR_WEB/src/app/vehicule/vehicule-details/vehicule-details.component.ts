import {Component, OnInit} from '@angular/core';
import {Product} from "../../api/product";
import {Vehicle_owner} from "../../api/vehicle_owner";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {Vehicule} from "../../api/vehicule";
import {VehiculeService} from "../vehicule.service";

@Component({
  selector: 'app-vehicule-details',
  templateUrl: './vehicule-details.component.html',
  styleUrls: ['./vehicule-details.component.scss']
})
export class VehiculeDetailsComponent implements OnInit {
  productDialog: boolean = false;
  NewvehiculeDialog:boolean = false
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  vehicule: Vehicule={};
  vehicules: Vehicule[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private vehiculeService:VehiculeService,private router:Router) {}

  ngOnInit() {
    this.getAllVehicule();
    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  getAllVehicule(){
    this.vehiculeService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.vehicules=data.vehicleListResponse;
      console.log(this.vehicules);

    })
  }
  getvehiculeByID(){
    this.vehiculeService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.vehicule = {};
    this.submitted = false;
    this.NewvehiculeDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editvehicule(vehicule: Vehicule) {
    this.vehicule = { ...vehicule };
    this.productDialog = true;
  }

  deletevehicule(vehicule: Vehicule) {
    this.vehicule = { ...vehicule };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
    this.deleteProductDialog = false;
    this.vehiculeService.delete(id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savevehicule(vehicule: Vehicule) {
    this.productDialog = false;
    this.vehiculeService.create(vehicule).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
