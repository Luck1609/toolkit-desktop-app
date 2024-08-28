import {
  Breadcrumb as BreadCrumbComponent,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { breadcrumbNav } from "@/lib/breadcrumb"
import { capitalize } from "lodash"
import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Breadcrumb() {
  const { pathname: path } = useLocation()
  const links = breadcrumbNav;
  

  const crumbList: string[] = path.split('/')

  const index = crumbList[1]

  const currentPath = links[index as keyof typeof links]
  crumbList.shift()

  // console.log('Bread crumb ->', crumbList)

  return (
    <BreadCrumbComponent>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/dashboard">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {
          crumbList.map((name: string, index) => (
            <Fragment key={name}>
              <BreadcrumbItem>
                <Link to={`${name}`}>{ capitalize(name) }</Link>
              </BreadcrumbItem>
              
              {
                index + 1 !== crumbList.length && <BreadcrumbSeparator />
              }
            </Fragment>
          ))
        }
      </BreadcrumbList>
    </BreadCrumbComponent>
  )
}
