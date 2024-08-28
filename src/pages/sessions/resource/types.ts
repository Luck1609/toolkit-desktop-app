import { Application } from "@/pages/applications/resource/types";
import { Meeting } from "../partials/meetings/resource/types";




export type Session = {
  id?: string;
  quarter_name: string
  approved: number;
  total: number;
  deferred: number;
  finalized: boolean;
  start_date: Date;
  end_date: Date;
  applications?: Application[],
  spc?: Meeting;
  tsc?: Meeting;
  status: boolean;
}