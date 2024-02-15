import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Product} from "../../api/product";
import {PoliceService} from "../police.service";
import {Police} from "../../api/police";
import {Router} from "@angular/router";

@Component({
  selector: 'app-police-detail',
  templateUrl: './police-detail.component.html',
  styleUrls: ['./police-detail.component.scss'],
})
export class PoliceDetailComponent implements OnInit {
  productDialog: boolean = false;
  NewPoliceDialog:boolean = false
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  police: Police={};
  polices: Police[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
constructor(private policeservice:PoliceService,private router:Router) {}

  ngOnInit() {
    this.getPoliceByID();
    this.getAllPolice();
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

  getAllPolice(){
  this.policeservice.getAllPolice().subscribe((data:any)=>{
    console.log(data);
    this.polices=data.policeOfficerListResponse;
    console.log(this.polices);
  })
  }
  getPoliceByID(){
    this.policeservice.getPoliceByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.police = {};
    this.submitted = false;
    this.NewPoliceDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editPolice(police: Police) {
    this.police = { ...police };
    this.productDialog = true;
  }

  deletePolice(police: Police) {
    this.police = { ...police };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
  this.deleteProductDialog = false;
  this.policeservice.deletePolice(id).subscribe((data:any)=>{
    console.log(data);
    window.location.reload();
  })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savePolice(police: Police) {
    this.productDialog = false;
    this.policeservice.createPolice(police).subscribe((data:any)=>{
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









