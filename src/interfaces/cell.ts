import { Index2D } from "./dimension";

export interface CellInterface {
  posXY: Index2D;
  isMine: boolean;
  number: number;
  revealed: boolean;
  flagged: boolean;
}