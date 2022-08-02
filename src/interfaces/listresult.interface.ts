export interface ListResult<T> {
  list: T[];
  count: number;
  page: number;
  pageSize: number;
}
