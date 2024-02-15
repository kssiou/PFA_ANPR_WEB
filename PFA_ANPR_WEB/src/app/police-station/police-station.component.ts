import {Component, OnInit} from '@angular/core';
import {Product} from "../api/product";
import {Vehicle_owner} from "../api/vehicle_owner";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {Station} from "../api/station";
import {PoliceStationService} from "./police-station.service";

@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.component.html',
  styleUrls: ['./police-station.component.scss']
})
export class PoliceStationComponent implements OnInit {
  productDialog: boolean = false;
  NewStationDialog:boolean = false
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  station: Station={};
  stations: Station[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  constructor(private policeStationService:PoliceStationService,private router:Router) {}

  ngOnInit() {
    this.getAllStations();
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

  getAllStations(){
    this.policeStationService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.stations=data.policeStationListResponse;
      console.log(this.stations);

    })
  }
  getStationByID(){
    this.policeStationService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.station = {};
    this.submitted = false;
    this.NewStationDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editStation(station: Station) {
    this.station = { ...station };
    this.productDialog = true;
  }

  deleteStation(station: Station) {
    this.station = { ...station };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
    this.deleteProductDialog = false;
    this.policeStationService.delete(id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveStation(station: Station) {
    this.productDialog = false;
    this.policeStationService.create(station).subscribe((data:any)=>{
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
