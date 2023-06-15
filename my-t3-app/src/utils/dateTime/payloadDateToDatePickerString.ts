export const payloadDateToDatePickerString = (date: Date): string => {
    const dateToUse = new Date( new Date(date.toISOString()).toLocaleString("en-us", {timeZone: 'UTC'}) );

    const yearString = dateToUse.getFullYear().toString();
    const monthString = (dateToUse.getMonth() + 1).toString().padStart(2, '0');
    const dayString = dateToUse.getDate().toString().padStart(2, '0');

    return `${yearString}-${monthString}-${dayString}`
}