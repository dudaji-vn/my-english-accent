export interface IApiResponse<T> {
  status: string;
  data: T;
}

export interface ICursorPaginationResponse<T> {
  items: T[];
  endCursor: string;
  hasNextPage: boolean;
}

export interface IPaginationResponse<T> {
  items: T[];
  limit: number;
  totalItems: number;
  currentPage: number;
  totalPage: number;
  hasNextPage: boolean;
}
