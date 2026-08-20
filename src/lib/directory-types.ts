export interface DirectoryCompany {
  slug: string;
  name: string;
  location: string;
  state: string;
  country: "USA" | "Canada";
  region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West" | "Canada";
  website?: string;
  linkedin?: string;
  description: string;
  capabilities: string[];
  industries?: string[];
  certifications?: string[];
  wireDiameters?: string;
  established?: string;
}
