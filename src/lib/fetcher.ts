import { toast } from "@/components/ui/use-toast";
import http from "./http";
import { getBaseURL } from "./utils";

export const fetcher = async <T>(url: string) => {
  const result = await http.get<T>(getBaseURL(url))
  
  if (result?.status === 'success') {
    return result?.data
  }
  else 
    toast(result)
};