import { DEACTIVATE, DELETE, RESTORE } from "@/lib/constants";
import { DialogAlert, Options } from "../types";

export const getPayload = ({ type, url, name }: { type: Options; url: string, name: string }) => {
  let payload: DialogAlert  = {
      description: '',
      title: '',
      url: '',
    }

    switch (type) {
      case DEACTIVATE:
        payload.title = `Do you want to deactivate this ${name}?`
        payload.description = `This will hide the ${name} from public view. This action can be changed by clicking on publish`
        payload.url = url
        break;
      
      case RESTORE:
        payload.title = `Do you want to restore this ${name}?`
        payload.description = `This will show the ${name} in public view. This action can be changed by clicking on Unpublish`
        payload.url = url
        break;
      
      case DELETE:
        payload.title = `Are you absolutely sure?`
        payload.description = `This action cannot be undone. This will permanently delete ${name} and remove its data from our servers.`
        payload.url = url
        break;
    
      default:
        break;
  }
  
  return payload
}