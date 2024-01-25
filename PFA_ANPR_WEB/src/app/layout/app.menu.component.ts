import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Services',
                items: [
                    { label: 'Matricule', icon: 'pi pi-fw pi-id-card', routerLink: ['./matricule'] },
                    { label: 'Agent', icon: 'pi pi-fw pi-lock ', routerLink: ['/police'] },
                  { label: 'Fiche de Recherche ', icon: 'pi pi-fw pi-id-card', routerLink: ['/fiche-recherche'] },
                  { label: 'Vehicule ', icon: 'pi pi-fw pi-id-card', routerLink: ['/vehicule '] },
                  { label: 'Police station  ', icon: 'pi pi-fw pi-id-card', routerLink: ['/fiche de rechere '] },
                  { label: 'Citoyens ', icon: 'pi pi-fw pi-id-card', routerLink: ['/fiche de rechere '] },
                  { label: 'Alert ', icon: 'pi pi-fw pi-id-card', routerLink: ['/fiche de rechere '] },

                ]
            },

        ];
    }
}
