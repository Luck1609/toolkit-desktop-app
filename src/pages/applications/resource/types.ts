import { UserBasicInfo } from "@/lib/global-types";
import { Locality, Sector } from "@/pages/locality/resource/types";


export type FormProps = {
  title: string;
  initialData: Application | null
}

export type Application = UserBasicInfo & {
  id?: string;
  locality: Locality;
  sector: Sector;
  block: string;
  plot: string;
  type: string;
  height: number;
  use: string[];
  shelf: string;
  existing: boolean;
  scanned_documents: Record<string, FileList>
}