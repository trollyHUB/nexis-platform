import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

// Демо события
const demoEvents = [
  { id: 1, title: 'Стендап', time: '10:00', date: '2025-12-26', color: 'bg-blue-500' },
  { id: 2, title: 'Ревью кода', time: '14:00', date: '2025-12-26', color: 'bg-green-500' },
  { id: 3, title: 'Митинг с клиентом', time: '16:00', date: '2025-12-27', color: 'bg-purple-500' },
  { id: 4, title: 'Релиз v2.0', time: '12:00', date: '2025-12-30', color: 'bg-red-500' },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Получить первый день месяца
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Понедельник = 0

  // Получить количество дней в месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Создать массив дней
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return demoEvents.filter(e => e.date === dateStr);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <CalendarIcon className="text-accent" />
            Календарь
          </h1>
          <p className="text-text-muted mt-1">Планирование событий и встреч</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Добавить событие
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <h2 className="text-xl font-semibold text-text-primary ml-2">
                {months[month]} {year}
              </h2>
            </div>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-text-secondary transition-colors"
            >
              Сегодня
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-text-muted py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const events = day ? getEventsForDay(day) : [];
              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-1 border border-border rounded-lg transition-colors ${
                    day ? 'hover:bg-surface-2 cursor-pointer' : 'bg-surface-2/50'
                  } ${isToday(day!) ? 'ring-2 ring-accent' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-sm font-medium ${isToday(day) ? 'text-accent' : 'text-text-primary'}`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs text-white px-1 py-0.5 rounded truncate ${event.color}`}
                            title={`${event.time} - ${event.title}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <span className="text-xs text-text-muted">+{events.length - 2} ещё</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-4">Ближайшие события</h3>
          <div className="space-y-3">
            {demoEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-2 hover:bg-surface-2 rounded-lg transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 ${event.color}`} />
                <div>
                  <p className="font-medium text-text-primary text-sm">{event.title}</p>
                  <p className="text-xs text-text-muted">{event.date} в {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

