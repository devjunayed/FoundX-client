interface IDateToIso {
  calender: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}
const dateToIso = ({ day, month, year }: IDateToIso) => {
  return new Date(`${month}-${day}-${year}`).toISOString();
};

export default dateToIso;