import { ColumnDef } from "@tanstack/react-table";


export type SectorData = {
  name: string,
  initials: string
  blocks: string[]
}


export const sectorColumns: ColumnDef<SectorData>[] = [
  {
    id: "name",
    header: "Sector name",
  },
  {
    id: "initials",
    header: "Initials",
  },
  {
    id: "blocks",
    header: "Blocks",
  }
];