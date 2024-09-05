import dayjs from 'dayjs'

export const formatDate = (date?: string, format = 'MMM D, YYYY'): string => {
  if (!date) return ''

  return dayjs(date).format(format)
}
