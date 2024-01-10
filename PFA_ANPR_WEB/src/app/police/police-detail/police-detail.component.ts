import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Product} from "../../api/product";
import {PoliceService} from "../police.service";
import {Police} from "../../api/police";

@Component({
  selector: 'app-police-detail',
  templateUrl: './police-detail.component.html',
  styleUrls: ['./police-detail.component.scss'],
})
export class PoliceDetailComponent implements OnInit {

  productDialog: boolean = false;

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
constructor(private policeservice:PoliceService) {}

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
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.selectedProducts = [];
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  // saveProduct() {
  //   this.submitted = true;
  //
  //   if (this.product.name?.trim()) {
  //     if (this.product.id) {
  //       // @ts-ignore
  //       this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //     } else {
  //       this.product.id = this.createId();
  //       this.product.code = this.createId();
  //       this.product.image = 'product-placeholder.svg';
  //       // @ts-ignore
  //       this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
  //       this.products.push(this.product);
  //     }
  //
  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }

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









