export interface IRegister {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  optionnalInfos?: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICustomerCredentials {
  id:number;
  firstname:string;
  email:string;
}

export interface IConfirmAccount {
  email: string;
  guid: string;
}
