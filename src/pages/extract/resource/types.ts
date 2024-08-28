

export type FormProps = {
  title: string;
  initialData: Extract | null
}


export type Extract = {
  id?: string;
  use: string[];
  name: string;
  plot: string;
  contact: string;
  registration_date: Date;
  allocation_date: Date;
}