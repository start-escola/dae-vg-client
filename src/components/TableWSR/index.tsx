"use client"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isToday } from '@/utils/conditionals';
import { findNextSupply, getTodaySectors } from '@/utils/requests';

interface ITableWSRProps {
  defaultValues: {
    id: number;
    location: string;
    turn: string;
    status: {
      date: string;
      situation: string;
    };
    description: string;
  }[];
  select: {
    defaultValue: {
      id: number;
      label: string;
    } | undefined;
    options: {
      id: number;
      label: string;
    }[];
  }
  date: string; // data em formato string
  firstAndLastDate: {
    firstWSRDate: string;
    lastWSRDate: string;
  };
}

const TableWSR = ({ defaultValues, select, date, firstAndLastDate }: ITableWSRProps) => {
  const [defaultValuesState, setDefaultValuesState] = useState(defaultValues)
  const [dateState, setDateState] = useState(date)
  const [renderedCells, setRenderedCells] = useState(defaultValues)

  const handleFilterDate = async (date: string) => {
    if (date) {
      const parsedDate = new Date(date);
  
      if (isNaN(parsedDate.getTime())) {
        return;
      }
  
      const sectors = await getTodaySectors(date);
  
      if (sectors) {
        const formmatedTableData = sectors?.map(({ id, last_status, name, turno }) => ({
          id,
          location: name,
          turn: turno,
          status: {
            date: last_status.createdAt,
            situation: last_status.situation,
          },
          description: last_status.description ?? "",
        }));
  
        setDefaultValuesState(formmatedTableData);
        setRenderedCells(formmatedTableData);
        setDateState(date);
      }
    } else {
      setDefaultValuesState(defaultValues);
      setRenderedCells(defaultValues);
      setDateState(date);
    }
  };
  
  const handleFilterDistrict = async (districtId?: number) => {
    if (districtId === undefined) {
      setRenderedCells(defaultValuesState)
      setDateState(date)
      return
    }

    const filteredCells = renderedCells.filter(({ id }) => id === districtId)

    if (filteredCells.length > 0) {
      setRenderedCells(filteredCells)
      return
    }

    if (filteredCells.length === 0) {
      const nextSupplyDate = await findNextSupply(districtId)

      const sectors = await getTodaySectors(nextSupplyDate)

      if (sectors) {
        const formmatedTableData = sectors?.map(({ id, last_status, name, turno }) => ({
          id,
          location: name,
          turn: turno,
          status: {
            date: last_status.createdAt,
            situation: last_status.situation
          },
          description: last_status.description ?? ""
        }))

        setDefaultValuesState(formmatedTableData)
        setRenderedCells(formmatedTableData.filter(({ id }) => id === districtId))
        setDateState(nextSupplyDate)
        return
      }

      setRenderedCells([])
      setDateState("")
    }
  }

  const situationColor = {
    "Previsão": "#93C5FD",  // Azul claro
    "Ocorrência": "#F87171",  // Vermelho
    "Em andamento": "#F59E0B",  // Amarelo
    "Finalizado": "#10B981",  // Verde
  };

  return (
    <div className="bg-white-0 text-primary-500 my-10 max-w-full overflow-auto p-2 md:p-4 w-full">
      <div>
        <p className="text-2xl">
          {isToday(dateState) ? "Hoje" : `${dateState ? dayjs(dateState).format("DD/MM/YYYY") : "Indisponível" }`}
        </p>
        <p className="text-sm">
          Relação de abastecimento: {dateState ? dayjs(dateState).format("DD/MM/YYYY") : "Sem dados disponíveis para este bairro" }.
        </p>
      </div>
      <div className="flex flex-wrap justify-between py-2 my-10 gap-4">
        <div className="flex w-full max-w-80">
          <Autocomplete
            disablePortal
            options={select.options}
            defaultValue={select.defaultValue}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Bairro" />}
            onChange={(e, value) => handleFilterDistrict(value?.id)}
          />
        </div>
        <div className="flex w-full max-w-80 gap-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Selecionar data"
              sx={{ width: "100%" }}
              defaultValue={isToday(dateState) ? undefined : dayjs(new Date(dateState + "T04:00:00"))}
              minDate={dayjs()}
              maxDate={dayjs(firstAndLastDate.lastWSRDate)}
              format="DD/MM/YYYY"
              onChange={(e) => e && handleFilterDate(e.format("YYYY-MM-DD"))}
            />
          </LocalizationProvider>
        </div>
      </div>
      <table className="rounded w-full text-left">
        <thead>
          <tr className="text-xs md:text-base *:p-2 md:*:p-4 border-opacity-15 border-b border-primary-500">
            <th>Localidade</th>
            <th>Turno</th>
            <th>Situação</th>
            <th>Detalhe Ocorrência</th>
          </tr>
        </thead>
        <tbody>
          {renderedCells ? renderedCells?.map(({ id, location, turn, status, description }) => (
            <tr key={id} className="text-xs md:text-base *:p-2 md:*:p-4 border-opacity-15 border-b border-primary-500">
              <td><p className="text-xs md:text-base">{location}</p></td>
              <td><p className="text-xs md:text-base">{turn}</p></td>
              <td style={{ backgroundColor: situationColor[status?.situation as keyof typeof situationColor] }}>
                <p className="text-xs md:text-base font-bold">{status?.situation}</p>
                {status?.date && <p className="text-xs">Última atualização {status.date}</p>}
              </td>
              {description && (
                <td>
                  <p className="text-xs md:text-sm">{description}</p>
                </td>
              )}
            </tr>
          )) : (
            <tr className="text-xs md:text-base *:p-2 md:*:p-4 border-opacity-15 border-b border-primary-500">
              <td colSpan={4}>
                <p className="text-xs md:text-base">Não há dados disponíveis para essa data</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWSR;
