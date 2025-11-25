import { useMemo } from 'react'

interface DateDisplayProps {
  date: Date | string
  darkMode?: boolean
  withTime?: boolean
  className?: string
}

export default function DateDisplay ({ date, darkMode = false, withTime = true, className = '' }: DateDisplayProps) {
  const parsedDate = useMemo(() => {
    return typeof date === 'string' ? new Date(date) : date
  }, [date])

  const formattedDate = useMemo(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const day = parsedDate.getDate()
    const month = parsedDate.toLocaleString('ru-RU', { month: 'short' })
    const year = parsedDate.getFullYear()
    const hours = parsedDate.getHours().toString().padStart(2, '0')
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0')

    // Проверка на сегодня/вчера
    if (parsedDate.toDateString() === today.toDateString()) {
      return withTime ? `Сегодня, ${hours}:${minutes}` : 'Сегодня'
    }
    if (parsedDate.toDateString() === yesterday.toDateString()) {
      return withTime ? `Вчера, ${hours}:${minutes}` : 'Вчера'
    }

    if (parsedDate.getFullYear() === today.getFullYear()) {
      return withTime 
        ? `${day} ${month}, ${hours}:${minutes}` 
        : `${day} ${month}`
    }

    return withTime 
      ? `${day} ${month} ${year}, ${hours}:${minutes}` 
      : `${day} ${month} ${year}`
  }, [parsedDate, withTime])

  return (
    <time 
      dateTime={parsedDate.toISOString()}
      className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${className}`}
      title={parsedDate.toLocaleString('ru-RU')}
    >
      {formattedDate}
    </time>
  )
}