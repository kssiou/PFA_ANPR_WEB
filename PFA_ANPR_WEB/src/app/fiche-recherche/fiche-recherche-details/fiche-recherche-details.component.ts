import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Product} from "../../api/product";
import {Police} from "../../api/police";
import {Router} from "@angular/router";
import {PoliceService} from "../../police/police.service";


@Component({
  selector: 'app-fiche-recherche-details',
  templateUrl: './fiche-recherche-details.component.html',
  styleUrls: ['./fiche-recherche-details.component.scss']
})
export class FicheRechercheDetailsComponent implements OnInit {

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
    this.products = [		{
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "rating": 5
    },
      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "rating": 4
      },
      {
        "id": "1002",
        "code": "zz21cz3c1",
        "name": "Blue Band",
        "description": "Product Description",
        "image": "blue-band.jpg",
        "price": 79,
        "category": "Fitness",
        "quantity": 2,
        "rating": 3
      },
      {
        "id": "1003",
        "code": "244wgerg2",
        "name": "Blue T-Shirt",
        "description": "Product Description",
        "image": "blue-t-shirt.jpg",
        "price": 29,
        "category": "Clothing",
        "quantity": 25,
        "rating": 5
      },
      {
        "id": "1004",
        "code": "h456wer53",
        "name": "Bracelet",
        "description": "Product Description",
        "image": "bracelet.jpg",
        "price": 15,
        "category": "Accessories",
        "quantity": 73,
        "rating": 4
      },
      {
        "id": "1005",
        "code": "av2231fwg",
        "name": "Brown Purse",
        "description": "Product Description",
        "image": "brown-purse.jpg",
        "price": 120,
        "category": "Accessories",
        "quantity": 0,
        "rating": 4
      },
      {
        "id": "1006",
        "code": "bib36pfvm",
        "name": "Chakra Bracelet",
        "description": "Product Description",
        "image": "chakra-bracelet.jpg",
        "price": 32,
        "category": "Accessories",
        "quantity": 5,
        "rating": 3
      },
      {
        "id": "1007",
        "code": "mbvjkgip5",
        "name": "Galaxy Earrings",
        "description": "Product Description",
        "image": "galaxy-earrings.jpg",
        "price": 34,
        "category": "Accessories",
        "quantity": 23,
        "rating": 5
      },
      {
        "id": "1008",
        "code": "vbb124btr",
        "name": "Game Controller",
        "description": "Product Description",
        "image": "game-controller.jpg",
        "price": 99,
        "category": "Electronics",
        "quantity": 2,
        "rating": 4
      },
      {
        "id": "1009",
        "code": "cm230f032",
        "name": "Gaming Set",
        "description": "Product Description",
        "image": "gaming-set.jpg",
        "price": 299,
        "category": "Electronics",
        "quantity": 63,
        "rating": 3
      },
      {
        "id": "1010",
        "code": "plb34234v",
        "name": "Gold Phone Case",
        "description": "Product Description",
        "image": "gold-phone-case.jpg",
        "price": 24,
        "category": "Accessories",
        "quantity": 0,
        "rating": 4
      },]

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
      this.polices=data.policeListResponse;
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
