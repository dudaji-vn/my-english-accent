export interface IApiResponse<T> {
  status: string;
  data: T;
}

export interface ICursorPaginationResponse<T> {
  items: T[];
  endCursor: string;
  hasNextPage: boolean;
}
