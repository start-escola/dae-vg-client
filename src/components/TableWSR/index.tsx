"use client"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

interface ITableWSRProps {
  data: {
    id: number;
    location: string;
    turn: string;
    status: {
      date: string;
      situation: string;
    };
    description: string;
  }[];
  districts: {
    id: number;
    label: string;
  }[];
  date: string; // data em formato string
  firstAndLastDate: {
    firstWSRDate: string;
    lastWSRDate: string;
  };
}

const TableWSR = ({ data, districts, date, firstAndLastDate }: ITableWSRProps) => {
  const [district, setDistrict] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState(date);
  const [districtsData, setDistrictsData] = useState(data)
  const router = useRouter();

  const dataFiltered = districtsData.filter((item) => item.id === district?.id);

  const handleFilter = () => {
    setDistrictsData([])
    router.push(`?date=${selectedDate}`);
    router.refresh();
  }

  const isToday = (dateString: string) => {
    // Fuso horário de Várzea Grande (GMT-4)
    const varzeaGrandeOffset = -4 * 60;  // Deslocamento GMT-4 em minutos
    const currentDate = new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day); // Mês é 0-indexado

    // Ajusta as datas para o fuso horário fixo GMT-4
    const currentOffset = currentDate.getTimezoneOffset(); // offset atual do navegador
    currentDate.setMinutes(currentDate.getMinutes() + (currentOffset - varzeaGrandeOffset));

    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate.getTime() === currentDate.getTime();
  };

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
          {isToday(date) ? "Hoje" : `${formatDate(new Date(date + "T04:00:00"))}`}
        </p>
        <p className="text-sm">
          Relação de abastecimento {formatDate(new Date(date + "T04:00:00"))}.
        </p>
      </div>
      <div className="flex flex-wrap justify-between py-2 my-10 gap-4">
        <div className="flex w-full max-w-80">
          <Autocomplete
            disablePortal
            options={districts}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Bairro" />}
            onChange={(e, value) => {
              setDistrict(value);
            }}
            value={district}
          />
        </div>
        <div className="flex w-full max-w-80 gap-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(selectedDate)}
              label="Selecionar data"
              sx={{ width: "100%" }}
              minDate={dayjs(new Date())}
              maxDate={dayjs(firstAndLastDate.lastWSRDate)}
              onChange={(value) => value && setSelectedDate(value.format("YYYY-MM-DD"))}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          <div className="flex max-w-80">
            <button
              className="px-4 py-2 text-white-0 bg-primary-500 hover:bg-primary-700 rounded"
              onClick={() => handleFilter()}
            >
              Filtrar
            </button>
          </div>
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
          {(district ? dataFiltered : data).map(({ id, location, turn, status, description }) => (
            <tr key={id} className="text-xs md:text-base *:p-2 md:*:p-4 border-opacity-15 border-b border-primary-500">
              <td><p className="text-xs md:text-base">{location}</p></td>
              <td><p className="text-xs md:text-base">{turn}</p></td>
              <td style={{ backgroundColor: situationColor[status.situation as keyof typeof situationColor] }}>
                <p className="text-xs md:text-base font-bold">{status.situation}</p>
                {status?.date && <p className="text-xs">Última atualização {status.date}</p>}
              </td>
              {description && (
                <td>
                  <p className="text-xs md:text-sm">{description}</p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="controls w-full py-5">
        <div></div>
      </div>
    </div>
  );
};

export default TableWSR;
