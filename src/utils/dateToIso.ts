interface IDateToIso {
  calender: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}
const dateToIso = (date: IDateToIso) => {
  if (!date) {
    return new Date().toISOString();
  }

  const { day, month, year } = date;

  return new Date(`${month}-${day}-${year}`).toISOString();
};

export default dateToIso;
