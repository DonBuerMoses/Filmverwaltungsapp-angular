import {ColumnMetaData} from "./column-meta-data";

export interface MovieObject {
  dataType: string;
  endpoint: string;
  data: any;
  columnsMetaData?: ColumnMetaData[];
  tableHeader?: string;
}
