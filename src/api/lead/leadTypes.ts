export interface Lead {
  _id: string;
  vehicle: {
    vehicleInputMethod: string;
    vin: string;
    year: string;
    make: string;
    model: string;
    vehicleCondition: string;
    ownerCheck: string;
    purchaseYear: string;
    purchaseMonth: string;
    annualDistance: string;
    commuteUsage: string;
    commuteDistance: string;
    businessUse: string;
    referredByName?: string;
    affiliateCount?: number;

  };
  personal: {
    dob: {
      year: string;
      month: string;
      day: string;
    };
    firstName: string;
    lastName: string;
    preferredFirstName: string;
    preferredLastName: string;
    gender: string;
    maritalStatus: string;
    address: string;
    city: string;
    pincode: string;
    province: string;
  };
  license: {
    hasOntarioLicense: string;
    licenseClass: string;
    firstLicensedYear: string;
    licenseNumber: string;
  };
  history: {
    hadTickets: string;
    tickets: {
      reason: string;
      year: string;
      month: string;
      _id: string;
    }[];
    hadSuspensions: string;
    suspensions: {
      length: string;
      _id: string;
    }[];
    hadClaims: string;
    hadInsurance: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  referredBy: string;
  coverageStart: string;
  groupDiscountOption: string;
  groupDiscountInput: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LeadPayload {
  vehicle: Lead["vehicle"];
  personal: Lead["personal"];
  license: Lead["license"];
  history: Lead["history"];
  contact: Lead["contact"];
  coverageStart: string;
  groupDiscountOption: string;
  groupDiscountInput: string;
}

export interface LeadApiResponse<T> {
  status: string;
  results: number;
  data: T;
}
