

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import useSWR from "swr"
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "../ui/label";
import { Loading } from "../form-components/form-button";
import { fetcher, getBaseURL } from "@/lib/utils";
import { ImageType } from "@/lib/global-types";
import Image from "next/image";
import { Typography } from "./typography";
import { Check } from "lucide-react";



type SearchSelect = {
  label: string;
  name: string;
  options: {
    label: ReactNode;
    value: string;
  }[]
}

export default function SearchSelect({ label, name, options = [] }: SearchSelect) {
  const [search, setSearch] = useState( null )
  // const [showList, setShowList] = useState(false)
  const { data, isLoading } = useSWR(`/products?search=${search}`, fetcher)
  const { setValue, watch } = useFormContext()
  const selected = watch( name ) ?? []

  const updateSearch = debounce((query) => setSearch(query), 100)

  // console.log( "Selected products", selected )
  const handleSelection = (id: string) => () => {
    setValue(name, selected.includes(id) ? selected.filter((selectedId: string) => id !== selectedId) : [...selected, id])
  }

  return (
    <>
      <div className="form-field">
        <Label>
          {label}
          {
            selected.length > 0 && <span className="text-green-500 ml-2">{selected.length} items selected</span>
          }
        </Label>
        <Command className="rounded-lg border dark:border-dark-border shadow-md">
          <CommandInput className="command-input" placeholder="Type a command or search..." onInput={({ currentTarget: {value: query} }) => updateSearch(query)} />

            <CommandList>
              {
                isLoading ? (
                  <CommandEmpty>
                    <Loading text="Searching, please wait..." />
                  </CommandEmpty>
                ) : (
                    <>
                      {
                        data?.data?.length < 1 ? (
                          <CommandEmpty>No results found.</CommandEmpty>
                        ) : (
                          <>
                            {
                              data?.data?.map( ( { id, name, image }: { id: string; name: string;  image: ImageType}): JSX.Element => (
                                <CommandItem onSelect={handleSelection(id)} key={id} className="">
                                  <span className="w-8">{ selected.includes(id) && <Check size={18} /> }</span>
                                  <div className="w-14 h-12 relative mr-2">
                                    <Image src={image?.image ? `${getBaseURL(JSON.parse(image?.image).url, true)}` : ``} alt="" className="rounded" fill />
                                  </div>
                                  <span>{ name }</span>
                                </CommandItem>
                              ))
                            }
                          </>
                        )
                      }
                    </>
                )
              }
            </CommandList>
        </Command>
      </div>

      {/* <SearchSelectRenderer name={name} /> */}
    </>
  )
}


// const SearchSelectRenderer = ( { name }: { name: string; } ) => {
//   const { watch } = useFormContext();

//   const value = watch(name)
  
//   return (
//     <div className="w-full grid lg:grid-cols-4 gap-4">
//       {
//         console.log('value from selector', value)
//       }
//       <div className="w-full p-2 rounded-lg flex space-x-2">
//         <div className="w-12 h-10 relative">
//           <Image src={``} alt="" fill />
//         </div>

//         <div className="">
//           <Typography>Product title here</Typography>
//           <span className="">GHc 230</span>
//         </div>
//       </div>
//     </div>
//   );
// };