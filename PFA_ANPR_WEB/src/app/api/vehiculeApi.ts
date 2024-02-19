export interface VehiculeApi {
  gravity?:any;
  status?:any; // Ensure status is uppercase as in the first format
  // badgeNumber: formData.badgeNumber;
  // registrationNumber: formData.registrationNumber;
  vehicleOwner: {
    // registrationNumber: formData.vehicleOwner.registrationNumber;
    // username: formData.vehicleOwner.username;
    firstname?: any;
    lastname?:any;
    cin?: any;
    email?: any;
    phone?:any
    address?:any;
    city?:any;
    nationality?: any;
    codePostal?: any;
    vehicles?: never[];
  }
}
