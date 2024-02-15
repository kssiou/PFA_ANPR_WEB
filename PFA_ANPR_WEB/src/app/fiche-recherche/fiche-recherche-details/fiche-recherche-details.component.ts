import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {Product} from "../../api/product";
import {Router} from "@angular/router";
import {FicheDeRecherche} from "../../api/ficheDeRecherche";
import {FicheRechercheService} from "../fiche-recherche.service";


@Component({
  selector: 'app-fiche-recherche-details',
  templateUrl: './fiche-recherche-details.component.html',
  styleUrls: ['./fiche-recherche-details.component.scss']
})
export class FicheRechercheDetailsComponent implements OnInit {
  productDialog: boolean = false;
  NewFicheRechercheDialog:boolean = false;
  ficheDeRecherches:FicheDeRecherche[]=[];
  ficheDeRecherche:FicheDeRecherche={};
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  FicheRecherche: FicheDeRecherche={};
  FicheRecherches: FicheDeRecherche[]=[];
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  constructor(private ficheRechercheService:FicheRechercheService,private router:Router) {}
  ngOnInit() {
    this.getByID();
    this.getAll();
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

  getAll(){
    this.ficheRechercheService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.FicheRecherches=data.ficheDeRechercheListResponse;
      console.log(this.FicheRecherches);
    })
  }
  getByID(){
    this.ficheRechercheService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {
    this.FicheRecherche = {};
    this.submitted = false;
    this.NewFicheRechercheDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editficheDeRecherche(ficheDeRecherche: FicheDeRecherche) {
    this.FicheRecherche = { ...ficheDeRecherche };
    this.productDialog = true;
  }

  deleteficheDeRecherche(ficheDeRecherche: FicheDeRecherche) {
    this.FicheRecherche = { ...ficheDeRecherche };
    this.deleteProductDialog = true;

  }

  confirmDeleteSelected(id:any) {
    this.deleteProductDialog = false;
    this.ficheRechercheService.delete(id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveFicheRecherche(ficheDeRecherche: FicheDeRecherche) {
    this.productDialog = false;
    this.ficheRechercheService.create(ficheDeRecherche).subscribe((data:any)=>{
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
