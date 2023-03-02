export interface IDateProvider {
  compareInHours:(start_date: Date, end_date: Date) => number
  convertToUTC: (date: Date) => string
  dateNow:() => Date
  compareInDays: (start_date: Date, end_date: Date) => number
  addDays: (daysAmount: number) => Date
  addHours: (hoursAmount: number) => Date
  compareIfBefore: (start_date: Date, end_date: Date) => boolean
}