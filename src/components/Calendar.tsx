import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

interface CalendarDay {
  date: Date;
  isToday: boolean;
  hasEvents: boolean;
  dayNumber: number;
}

const Calendar: React.FC = () => {
  const today = new Date();
  const currentMonth = format(today, 'MMMM yyyy');
  
  // Get all days in the current month
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add padding days for the start of the week
  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startDayOfWeek).fill(null);
  
  // Mock events for demonstration (days 13, 16, 19 have events)
  const eventsOnDays = [13, 16, 19];
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const calendarDays: (CalendarDay | null)[] = [
    ...paddingDays,
    ...daysInMonth.map((date) => ({
      date,
      isToday: isToday(date),
      hasEvents: eventsOnDays.includes(date.getDate()),
      dayNumber: date.getDate(),
    })),
  ];

  const handleDayClick = (day: CalendarDay | null) => {
    if (day) {
      console.log(`Clicked on ${format(day.date, 'MMMM d, yyyy')}`);
    }
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 1.5,
        border: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          color: '#1d1d1f',
          mb: 2.5,
        }}
      >
        {currentMonth}
      </Typography>
      
      <Grid container spacing={0.5}>
        {/* Week day headers */}
        {weekDays.map((day, index) => (
          <Grid item xs={12 / 7} key={`weekday-${index}`}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1',
                color: '#8e8e93',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {day}
            </Box>
          </Grid>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <Grid item xs={12 / 7} key={`day-${index}`}>
            <Box
              onClick={() => handleDayClick(day)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1',
                borderRadius: 0.75,
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: day ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                color: day ? '#1d1d1f' : 'transparent',
                backgroundColor: day?.isToday
                  ? '#007aff'
                  : day?.hasEvents
                  ? 'rgba(255, 149, 0, 0.15)'
                  : 'transparent',
                ...(day?.isToday && {
                  color: 'white',
                }),
                ...(day?.hasEvents && !day?.isToday && {
                  color: '#ff9500',
                }),
                '&:hover': day
                  ? {
                      backgroundColor: day.isToday
                        ? '#007aff'
                        : day.hasEvents
                        ? 'rgba(255, 149, 0, 0.25)'
                        : 'rgba(0, 122, 255, 0.1)',
                    }
                  : {},
              }}
            >
              {day?.dayNumber}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Calendar;