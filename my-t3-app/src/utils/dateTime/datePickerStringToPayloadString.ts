export const getTimeZoneOffsetString = () => {
    const timezoneOffset = new Date().getTimezoneOffset()
    const offset = Math.abs(timezoneOffset)
    const offsetOperator = timezoneOffset < 0 ? '+' : '-'
    const offsetHours = Math.floor(offset / 60).toString().padStart(2, '0')
    const offsetMinutes = Math.floor(offset % 60).toString().padStart(2, '0')
  
    return `${offsetOperator}${offsetHours}:${offsetMinutes}`
}

export const getPayloadDateString = (datePickerString: string): string => {
    const datePickerStringAsDate = new Date(datePickerString);

    const utcYearString = datePickerStringAsDate.getUTCFullYear().toString();
    const utcMonthString = (datePickerStringAsDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const utcDayString = datePickerStringAsDate.getUTCDate().toString().padStart(2, '0');
    const utcHourString = datePickerStringAsDate.getUTCHours().toString().padStart(2, '0');
    const utcMinuteString = datePickerStringAsDate.getUTCMinutes().toString().padStart(2, '0');
    const utcSecondString = datePickerStringAsDate.getUTCSeconds().toString().padStart(2, '0');

    const offSetString = getTimeZoneOffsetString();

    const localDateString = `${utcYearString}-${utcMonthString}-${utcDayString}T${utcHourString}:${utcMinuteString}:${utcSecondString}${offSetString}`;

    return localDateString;
}