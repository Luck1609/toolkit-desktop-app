import React, { ReactNode } from 'react'
import { LucideProps } from "lucide-react";


export type LucidIcon = React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;


export type SelectType = { value: string; label: string | ReactNode }




export type UserBasicInfo = {
  firstname: string;
  lastname: string;
  contact: string;
  email?: string;
  title?: string;
}