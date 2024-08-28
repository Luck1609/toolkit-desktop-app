

import { MouseEvent, ReactNode, useRef, useState } from "react";
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
  const [showList, setShowList] = useState(false)
  const { data, isLoading } = useSWR(`/products?search=${search}`, fetcher)
  const { setValue, watch } = useFormContext()
  const selected = watch( name ) ?? []
  const commandRef = useRef<HTMLDivElement>(null)

  const updateSearch = debounce((query) => setSearch(query), 100)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (commandRef?.current) {
      const clickedInside = commandRef.current.contains(event.target as Node);
    const child = event.currentTarget.children[2]
      
      if (clickedInside) {
        setShowList(true)
        
      } else setShowList(false)
    }
  };

  return (
    <div className="form-field">
      <Label>{label}</Label>
      <Command className="rounded-lg border shadow-md" onClick={handleClick}>
        <CommandInput placeholder="Type a command or search..." onInput={({ currentTarget: {value: query} }) => updateSearch(query)} />
        {
          showList && (
            <CommandList ref={commandRef}>
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
                                <CommandItem onSelect={() => setValue(name, [...selected, id])} key={id} className="">

                                  <div className="w-14 h-12 relative mr-2">
                                    <Image src={image?.image ? `${getBaseURL(JSON.parse(image?.image).url, true)}` : ``} alt="" className="rounded" fill />
                                  </div>
                                  
                                  { name }
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
          )
        }
      </Command>
    </div>
  )
}
