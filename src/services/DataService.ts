import { RawOwner, RawItem, RawData, Owner, Item, Data } from "../models/Data";
import axios from "axios";

export interface IDataInput {
  id: string;
  technology: string;
}

interface IDataService {
  getData({ id, technology }: IDataInput): Promise<Data | null | string>;
}

export class DataService implements IDataService {
  async getData({ id, technology }: IDataInput): Promise<Data | null | string> {
    const data = axios
      .get(`https://api.github.com/search/repositories?q=${id}`)
      .then((result) => {
        console.log(result.status);
        if(result.status < 400) {
          const data: Data = this.mapRawDataToData(result.data);
          data.items = [];
  
          result?.data?.items?.forEach((value: RawItem) => {
            const owner = this.mapRawOwnerToOwner(value.owner);
            const item = this.mapRawItemToItem(value);
            item.owner = owner;
            if (item.language?.toLowerCase() === technology.toLowerCase())
              data.items?.push(item);
          });
  
          return data;
        } else {
          return "Something went wrong";
        }
        
      })
      .catch((error) => {
        console.error(error);
        throw error.response?.data?.message || "Something went wrong";
      });

    return data;
  }

  private mapRawOwnerToOwner(owner: RawOwner): Owner {
    return {
      login: owner.login,
      avatarUrl: owner.avatar_url,
      url: owner.url,
    };
  }

  private mapRawItemToItem(item: RawItem): Item {
    return {
      id: item.id,
      fullName: item.full_name,
      language: item.language,
      createdAt: item.created_at,
    };
  }

  private mapRawDataToData(data: RawData): Data {
    return {
      incompleteResults: data.incomplete_results,
      totalCount: data.total_count,
    };
  }
}
