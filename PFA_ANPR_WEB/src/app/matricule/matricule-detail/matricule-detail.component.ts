import {Component, OnInit} from '@angular/core';
import {Product} from "../../api/product";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {MatriculeService} from "../matricule.service";
import {LicensePlate} from "../../api/licensePlate";

@Component({
  selector: 'app-matricule-detail',
  templateUrl: './matricule-detail.component.html',
  styleUrls: ['./matricule-detail.component.scss']
})
export class MatriculeDetailComponent implements OnInit {
  productDialog: boolean = false;
  NewlicensePlateDialog:boolean = false
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  licensePlate: LicensePlate={};
  licensePlates: LicensePlate[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private licensePlateService:MatriculeService,private router:Router) {}

  ngOnInit() {
    this.getAlllicensePlate();
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

  getAlllicensePlate(){
    this.licensePlateService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.licensePlates=data.licensePlateListResponses;
      console.log(this.licensePlates);

    })
  }
  getlicensePlateByID(){
    this.licensePlateService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.licensePlate = {};
    this.submitted = false;
    this.NewlicensePlateDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editlicensePlate(licensePlate: LicensePlate) {
    this.licensePlate = { ...licensePlate };
    this.productDialog = true;
  }

  deletelicensePlate(licensePlate: LicensePlate) {
    this.licensePlate = { ...licensePlate };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
    this.deleteProductDialog = false;
    console.log(id);
    this.licensePlateService.delete(id).subscribe((data:any)=>{
      window.location.reload();
    })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savelicensePlate(licensePlate: LicensePlate) {
    this.productDialog = false;
    this.licensePlateService.create(licensePlate).subscribe((data:any)=>{
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
