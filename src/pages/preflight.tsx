import { Loading } from "@/components/form-components/form-button";
import { fetcher } from "@/lib/fetcher";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";


type Preflight = {
  office: {
    contact: string;
    district: string;
    email: string
    id: string;
    initials: string;
    logo: string;
    name: string;
    region: string;
    server_id: string;
    shelves: number;
    sms_balance: number;
  }[],
  staff: {
    avatar: string;
    contact: string;
    email: string;
    firstname: string;
    id: string;
    lastname: string;
    role: string;
    status: boolean
    title: string;
    unread_notifications: []
  }[]
}

export default function PreflightCheck() {
  const { data, isLoading } = useSWR("/preflight", fetcher<{data: Preflight}>)
  const navigate = useNavigate()
  const goto = (url: string) => navigate(url);

  // const {office, staff} = data?.data ?? {};
  console.log('Preflight data', data?.data, isLoading)

  useEffect(() => {
    if (data?.data.office?.length === 0) goto("/office")
    else if (data?.data.staff?.length === 0) goto("/officer")
    else goto("/login")

  }, [data, isLoading])

  return (
    isLoading
      ? <Loading text="Please wait..." />
      : <></>
  )
}
