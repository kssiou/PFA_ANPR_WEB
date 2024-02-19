import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {Product} from "../../api/product";
import {Router} from "@angular/router";
import {FicheDeRecherche} from "../../api/ficheDeRecherche";
import {FicheRechercheService} from "../fiche-recherche.service";
import {Fiche_recherche} from "../../api/fiche_recherche";


@Component({
  selector: 'app-fiche-recherche-details',
  templateUrl: './fiche-recherche-details.component.html',
  styleUrls: ['./fiche-recherche-details.component.scss']
})
export class FicheRechercheDetailsComponent implements OnInit {
  productDialog: boolean = false;
  NewFicheRechercheDialog:boolean = false;
  ficheDeRecherche:FicheDeRecherche={};
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  ficheRecherche: FicheDeRecherche={};
  ficheRecherches: FicheDeRecherche[]=[];
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
  getStatusStyle(status: string) {
    switch (status) {
      case 'REJECTED':
        return { color: 'red' };
      case 'PENDING':
        return { color: '#534933' };
      case 'ACCEPTED':
        return { color: 'green' };
      default:
        return {};
    }
  }
  getStatusClass(status: string) {
    switch (status) {
      case 'REJECTED':
        return 'rejected-status';
      case 'PENDING':
        return 'pending-status';
      case 'ACCEPTED':
        return 'accepted-status';
      default:
        return '';
    }
  }

  getAll(){
    this.ficheRechercheService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.ficheRecherches=data.ficheDeRechercheListResponse;
      console.log(this.ficheRecherches);
    })
  }
  getByID(){
    this.ficheRechercheService.getByID(1).subscribe((data:any)=>{
      console.log(data);
    })
  }


  openNew() {

    this.router.navigateByUrl('/fiche-recherche-create');

  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editficheDeRecherche(ficheDeRecherche: FicheDeRecherche) {
    this.ficheRecherche = { ...ficheDeRecherche };
    this.productDialog = true;
  }

  deleteficheDeRecherche(ficheDeRecherche: FicheDeRecherche) {
    this.ficheRecherche = { ...ficheDeRecherche };
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

  // saveFicheRecherche(ficheDeRecherche: Fiche_recherche) {
  //   this.productDialog = false;
  //   this.ficheRechercheService.create(?).subscribe((data:any)=>{
  //     console.log(data);
  //     window.location.reload();
  //   })
  //
  //
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
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
