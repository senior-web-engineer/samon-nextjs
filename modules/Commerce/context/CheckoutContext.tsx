import { createContext } from 'react';
interface ICountry {
  name: string;
  code: string;
}
interface IBilling {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: ICountry | any;
  email: string;
  phone: string;
  company: string;
  vatNum: string;
}

type TBilling = {
  data: IBilling;
  completed: boolean;
  editing: boolean;
  setCompleted: (isCompleted: boolean) => void;
  update: (key: string, value: string) => void;
  validate: () => boolean;
  continue: (ev: any) => void;
  edit: (ev: any) => void;
};
interface IShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: ICountry | any;
}
type TShipping = {
  data: IShipping;
  completed: boolean;
  editing: boolean;
  setCompleted: (isCompleted: boolean) => void;
  update: (key: string, value: string) => void;
  continue: (ev: any) => void;
  edit: (ev: any) => void;
};
type TCheckoutContext = {
  billing: TBilling;
  shipping?: TShipping;
  paymentOptions: any;
  delivery: any;
  order: any;
  error: string;
  step: number;
};
const CheckoutContext = createContext<Partial<TCheckoutContext>>({});
export default CheckoutContext;
