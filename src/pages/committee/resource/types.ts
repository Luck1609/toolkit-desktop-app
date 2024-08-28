import { CommitteFormValues } from "./schema";


export type FormProps = {
  title: string;
  initialData: CommitteeMember | null
}

export type CommitteeMember = {
  id?: string;
  status: boolean;
} & CommitteFormValues