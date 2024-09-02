
export type FormProps = {
  title: string;
  initialData: Letter | null
}






export type Letter = {
  id?: string;
  date: Date;
  reference: string;
  content: string;
  to: string;
} & (
  {
    status: 'Outgoing'
  } | {
    status: 'Incoming',
    scanned_copy: File
  }
)