import { DataService } from "./DataService";

export interface Services {
  dataService: DataService;
}

const getServices = () => {
  const dataService = new DataService();
  return { dataService };
};

export const services: Services = getServices();
