import { Component } from '@angular/core';

@Component({
  selector: 'app-matricule-detail',
  templateUrl: './matricule-detail.component.html',
  styleUrls: ['./matricule-detail.component.scss']
})
export class MatriculeDetailComponent {
  products = [
    { code: '001', name: 'Product A', category: 'Electronics', quantity: 10 },
    { code: '002', name: 'Product B', category: 'Clothing', quantity: 20 },
    { code: '003', name: 'Product C', category: 'Books', quantity: 15 }
  ];
  onAddButtonClick() {
    // Add your logic here for handling the "Add" button click
    console.log('Add button clicked');
  }
  onUpdateButtonClick(product: any) {
    // Add your logic for handling the "Update" button click
    console.log('Update button clicked for:', product);
  }

  onDeleteButtonClick(product: any) {
    // Add your logic for handling the "Delete" button click
    console.log('Delete button clicked for:', product);
  }

  onInfoButtonClick(product: any) {
    // Add your logic for handling the "Info" button click
    console.log('Info button clicked for:', product);
  }


}
