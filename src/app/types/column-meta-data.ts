import {AliasColumnMetaData} from "./alias-column-meta-data";
import {MediaColumnMetaData} from "./media-column-meta-data";
import {DetailMetaData} from "./detail-meta-data";

export interface ColumnMetaData {
  name: string;
  display: string;
  displayIt: boolean;
  clickable: boolean;
  isId: boolean;
  type: string;
  length: number;
  readOnlyInsert?: boolean;
  readOnlyUpdate?: boolean;
  alias?: AliasColumnMetaData;
  media?: MediaColumnMetaData[];
  detailsMetaData?: DetailMetaData[];
}
