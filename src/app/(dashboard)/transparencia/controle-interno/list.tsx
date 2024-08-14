'use client'

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { getPage } from "./action";
import { SearchParams } from "./page";
import InternalComponent from "@/components/InternalComponent";

interface IList {
  defaultValues: any[],
  searchParams: SearchParams
}

const List = ({ defaultValues, searchParams: { id, publishedAt, title } }: IList) => {
  const [values, setValues] = useState(defaultValues)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const [total, setTotal] = useState<undefined | number>(undefined)

  const loadMoreValues = async () => {
    const next = page + 1
    const { data, total } = await getPage(page, { id, publishedAt, title })

    setPage(next)
    setTotal(total)
    setValues((prev) => [...prev, ...data])
  }

  useEffect(() => {
    if (inView && total && values.length < total) {
      loadMoreValues();
    }
  }, [inView]);

  return (
    <>
      <ul className="flex flex-col gap-10 py-5">
        {values.map(({ id, ...rest }) => (
          <li key={id}>
            <InternalComponent {...rest} />
          </li>
        ))}
      </ul>
      {total === values.length || total === undefined && <div ref={ref}>Loading</div>}
    </>
  )
}

export default List