import {ApplicationArea} from "../enums/application-area.enum";
import {MediaMatch} from "../enums/media-match.enum";

export interface MediaColumnMetaData {
  match: MediaMatch;
  area: ApplicationArea;
  visible: boolean;
}
