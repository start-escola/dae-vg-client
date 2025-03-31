"use client";

import { Input, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }

    // Atualiza a URL com o novo parâmetro
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex mt-10">
      <Input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Buscar pela empresa"
      />
      <Button
        onClick={handleSearch}
        sx={{ marginLeft: 1 }}
        variant="contained"
        color="primary"
      >
        Pesquisar
      </Button>
    </div>
  );
}
