import { UserBasicInfo } from "@/lib/global-types";


export type FormProps = {
  title: string;
  initialData: Staff | null
}



export type Staff = UserBasicInfo & {
  id?: string;
  role: string;
  status: boolean;
}