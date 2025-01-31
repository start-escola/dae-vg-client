export const isToday = (dateString: string) => {
  if(dateString === undefined) return false

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