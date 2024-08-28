import { useMemo } from "react";
import useSWR from "swr";
import ApplicantInfo from "./ApplicantInfo";
// import OtherDocuments from "./OtherDocuments";
import Preview from "./Preview";
import ScannedDocuments from "./ScannedDocuments";
import StructureDetails from "./StructureDetails";
import Helper from "@/helper";
import Loader from "@/components/Loader";


const { isJsonString } = Helper,
  areas = { localities: [], sectors: {} };


export default function ApplicationForms({step}) {
  const { data, isLoading } = useSWR("/locality");

  
  const locations = useMemo(() => {
    return data?.data
      ? data.data.reduce((allLocalities, { name, id, sectors }) => {
          return {
            ...allLocalities,
            localities: [
              ...allLocalities.localities,
              {
                label: name,
                value: id,
              },
            ],
            sectors: {
              ...allLocalities.sectors,
              [id]: {
                ...sectors.reduce(
                  (allSectors, { id: sectorID, name, blocks }) => {
                    return {
                      ...allSectors,
                      [sectorID]: {
                        value: sectorID,
                        label: name,
                        blocks: blocks
                          ? isJsonString(blocks).reduce(
                              (allBlocks, block) => [
                                ...allBlocks,
                                { label: block, value: block },
                              ],
                              []
                            )
                          : [],
                      },
                    };
                  },
                  []
                ),
              },
            },
          };
        }, areas)
      : areas;
  }, [data?.data]);

  // console.log("All locations", locations)

  function switcher () {
    switch (step) {
      case 0:
        return <ApplicantInfo locations={locations} />
      case 1:
        return <StructureDetails />
      case 2:
        return <ScannedDocuments />
      // case 3:
      //   return <OtherDocuments />
      case 3:
        return <Preview locations={locations} />
    
      default:
        return <ApplicantInfo />;
    }
  }

  return isLoading ? <Loader /> : switcher()
}


