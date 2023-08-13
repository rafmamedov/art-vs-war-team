export interface ShippingForm {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state_region: string | undefined;
  postcode: string;
  addressMain: string;
  addressFirstAdditional: string | undefined;
  addressSecondAdditional: string | undefined;
  phoneNumber: string;
}
