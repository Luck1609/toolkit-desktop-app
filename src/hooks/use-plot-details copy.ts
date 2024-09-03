import { fetcher } from '@/lib/fetcher';
import { SelectType } from '@/lib/global-types';
import { Locality } from '@/pages/locality/resource/schema';
import { Sector } from '@/pages/sector/resource/schema';
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';


interface Props {locality: Locality | null, sector: Sector | null}

export default function usePlotDetails() {
  const {watch, setValue} = useFormContext();
  const locality_id: string = watch('locality_id'), sector_id: string = watch('sector_id');
  const [plotInfo, setPlotInfo] = useState<Props>({
    locality: null,
    sector: null
  })

  const { data: localities } = useSWR('/locality', fetcher<{data: Locality[]}>)
  

  useEffect(() => {
    if (locality_id && localities && locality_id !== plotInfo.locality?.id) {
        const selectedLocality = localities.data.filter((currentLocality: Locality) => currentLocality.id === locality_id)[0]
      setPlotInfo({
        ...plotInfo,
        locality: selectedLocality,
      });

      setValue('sector_id', '')
      setValue('block', '')
    }
  }, [locality_id, localities, plotInfo, setValue]);


  useEffect(() => {
    if (sector_id && sector_id !== plotInfo.sector?.id) {
      console.log('Sector useEffect called', plotInfo)
      const selectedSector = plotInfo.locality?.sectors?.filter(currentSector => currentSector.id === sector_id)[0];
      setPlotInfo({
        ...plotInfo,
        sector: selectedSector ?? null
      });

      setValue('block', '')
    }
  }, [sector_id, plotInfo, setValue]);


  return {
    localities: localities?.data.reduce((allLocalities: SelectType[], locality: Locality): SelectType[] => ([
      ...allLocalities,
      {
        label: locality.name,
        value: locality.id ?? ''
      }
    ]), []) ?? [], 
    sectors: plotInfo.locality?.sectors?.reduce((allsectors: SelectType[], sector: Sector): SelectType[] => ([
      ...allsectors,
      {
        label: sector.name,
        value: sector.id ?? ''
      }
    ]), []) ?? [],
    blocks: plotInfo.sector?.blocks
      ? JSON.parse(plotInfo.sector.blocks)
        .reduce((allBlocks: SelectType[], block: string): SelectType[] => ([
          ...allBlocks,
          {
            label: block,
            value: block
          }
        ]), [])
      : [],
    preview: plotInfo
  }
}