'use client'

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { getPage, ITender } from "./action";
import InfoComponent from "@/components/InfoComponent";

interface IList {
  defaultValues: ITender[],
  searchParams: {
    year: string,
    tender_type: string,
    text?: string,
    status?: string
  }
}

const List = ({ defaultValues, searchParams: { year, tender_type, text, status } }: IList) => {
  const [values, setValues] = useState(defaultValues)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const [total, setTotal] = useState<undefined | number>(undefined)

  const loadMoreValues = async () => {
    const next = page + 1
    const { data, resultsFound } = await getPage(year, tender_type, page, { text, status })

    setPage(next)
    setTotal(resultsFound)
    setValues((prev) => [...prev, ...data])
  }

  useEffect(() => {
    if (inView) {
      loadMoreValues();
    }
  }, [inView]);

  return (
    <>
      <ul className="flex flex-col gap-10 py-5">
        {values.map(({ id, ...rest }) => (
          <li key={id}>
            <InfoComponent {...rest} />
          </li>
        ))}
      </ul>
      {total === values.length || total === undefined && <div ref={ref}>Loading</div>}
    </>
  )
}

export default List