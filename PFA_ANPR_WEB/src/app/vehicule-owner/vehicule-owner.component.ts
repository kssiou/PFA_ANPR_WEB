import {Component, OnInit} from '@angular/core';
import {Product} from "../api/product";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {VehiculeOwnerService} from "./vehicule-owner.service";
import {Vehicle_owner} from "../api/vehicle_owner";

@Component({
  selector: 'app-vehicule-owner',
  templateUrl: './vehicule-owner.component.html',
  styleUrls: ['./vehicule-owner.component.scss']
})
export class VehiculeOwnerComponent implements OnInit {
  productDialog: boolean = false;
  NewvehiculeOwnerDialog:boolean = false
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  vehiculeOwner: Vehicle_owner={};
  vehiculeOwners: Vehicle_owner[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private vehiculeOwnerService:VehiculeOwnerService,private router:Router) {}

  ngOnInit() {
    this.getAllOwners();
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

  getAllOwners(){
    this.vehiculeOwnerService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.vehiculeOwners=data.vehicleOwnerListResponse;
      console.log(this.vehiculeOwners);

    })
  }
  getvehiculeOwnerByID(){
    this.vehiculeOwnerService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.vehiculeOwner = {};
    this.submitted = false;
    this.NewvehiculeOwnerDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editvehiculeOwner(vehiculeOwner: Vehicle_owner) {
    this.vehiculeOwner = { ...vehiculeOwner };
    this.productDialog = true;
  }

  deletevehiculeOwner(vehiculeOwner: Vehicle_owner) {
    this.vehiculeOwner = { ...vehiculeOwner };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
    this.deleteProductDialog = false;
    this.vehiculeOwnerService.delete(id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savevehiculeOwner(vehiculeOwner: Vehicle_owner) {
    this.productDialog = false;
    this.vehiculeOwnerService.create(vehiculeOwner).subscribe((data:any)=>{
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

  // createId(): string {
  //   let id = '';
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
