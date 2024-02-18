import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../api/product';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ChartModule } from 'primeng/chart';
import {MatriculeService} from "../matricule/matricule.service";
import {Router} from "@angular/router";
import {FicheRechercheService} from "../fiche-recherche/fiche-recherche.service";
import {PoliceStationService} from "../police-station/police-station.service";
import {VehiculeService} from "../vehicule/vehicule.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items!: MenuItem[];

  products!: Product[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;
  ficheRecherches:any;
  ficheRecherchesCount:any;

  policeStations:any;
  policeStationsCount:any;
  vehicules:any;
  vehiculesCount:any;


  constructor(private ficheRechercheService:FicheRechercheService,private policeStationService:PoliceStationService,private vehiculeService:VehiculeService ,private router:Router) {}
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
  ngOnInit() {
    this.getdata();
    this.initChart();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }
  getdata(){
    {
      this.ficheRechercheService.getAll().subscribe((ficheData: any) => {
        this.ficheRecherches = ficheData.ficheDeRechercheListResponse;
        this.ficheRecherchesCount=this.ficheRecherches.length * 50 ;
        console.log("Fiche de Recherches lengthaa * 50:", this.ficheRecherches.filter((item: { status: string; })=> item.status === 'ACCEPTED').length );
        console.log("Fiche de Recherches lengthaa * 50:", this.ficheRecherches.filter((item: { status: string; })=> item.status === 'PENDING').length );
        console.log("Fiche de Recherches lengthaa * 50:", this.ficheRecherches.filter((item: { status: string; })=> item.status === 'REJECTED').length );
        console.log("Fiche de Recherches lengthaa * 50:", this.ficheRecherches);
        this.initChart();

      });

      this.policeStationService.getAll().subscribe((policeData: any) => {
        this.policeStations = policeData.policeStationListResponse ;
        this.policeStationsCount = this.policeStations.length  * 50;
        console.log("Fiche de Recherches length * 50:", this.policeStationsCount );      });

      this.vehiculeService.getAll().subscribe((vehiculeData: any) => {
        this.vehicules = vehiculeData.vehicleListResponse ;
        this.vehiculesCount =  this.vehicules.length * 50;
        console.log("Fiche de Recherches length * 50:", this.vehiculesCount);       });

      // You can add more service calls if needed
    }
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['ACCEPTED', 'PENDING', 'REJECTED'],
      datasets: [
        {
          label: 'My Dataset',
          data: [this.ficheRecherches.filter((item: { status: string; })=> item.status === 'ACCEPTED').length,this.ficheRecherches.filter((item: { status: string; })=> item.status === 'PENDING').length,this.ficheRecherches.filter((item: { status: string; })=> item.status === 'REJECTED').length], // Adjust values as needed
          backgroundColor: [
            documentStyle.getPropertyValue('--green-700'),
            documentStyle.getPropertyValue('--yellow-600'),
            documentStyle.getPropertyValue('--red-500') // Add a third color if needed
          ],
          borderColor: [
            documentStyle.getPropertyValue('--green-700'),
            documentStyle.getPropertyValue('--yellow-600'),
            documentStyle.getPropertyValue('--red-500') // Add corresponding border color
          ],
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor // Adjust text color
          }
        }
      }
    };
  }
}
