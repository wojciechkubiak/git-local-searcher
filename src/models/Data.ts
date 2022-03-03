export interface RawOwner {
  login: string;
  avatar_url: string;
  url: string;
}

export interface RawItem {
  id: number;
  full_name: string;
  language: string;
  created_at: string;
  owner: RawOwner;
}

export interface RawData {
  incomplete_results: boolean;
  items: RawItem[];
  total_count: number;
}

export interface Owner {
  login: string;
  avatarUrl: string;
  url: string;
}

export interface Item {
  id: number;
  fullName: string;
  language: string;
  createdAt: string;
  owner?: Owner;
}

export interface Data {
  incompleteResults: boolean;
  items?: Item[];
  totalCount: number;
}