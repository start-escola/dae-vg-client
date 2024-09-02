"use client"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPage } from "./action";
import Card from "./card";
import { useRouter } from "next/navigation";

type Item = {
  id: number,
  title: string,
  short_description: string,
  main_image: {
    url: string
  },
  createdAt: string
}

interface IList {
  defaultValues: any[];
  defaultPage: number;
  total: number;
}

const List = ({ defaultValues, total, defaultPage }: IList) => {
  const [values, setValues] = useState(defaultValues)
  const [ref, inView] = useInView()
  const [page, setPage] = useState(defaultPage);
  const router = useRouter()

  const loadMoreValues = async () => {
    const next = page + 1

    const { data } = await getPage(next)

    setPage(next)
    if (data.length !== 0) {
      router.replace(`/comunicacao/noticias-e-eventos?page=${next}`, { scroll: false })
    }
    setValues((prev) => [...prev, ...data])
  }

  useEffect(() => {
    if (inView && values.length < total) {
      loadMoreValues();
      setPage((old) => old + 1)
    }
  }, [inView]);

  return (
    <ul className="flex flex-col gap-4">
      {values.map(
        ({ id, ...props }) => (
          <Card {...props} key={id} />
        )
      )}
      {total > values.length && <div ref={ref} />}
    </ul>
  )
}

export default List