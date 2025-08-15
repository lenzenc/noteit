import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Calendar from './Calendar';

const RightPanel: React.FC = () => {
  return (
    <Box
      sx={{
        width: 320,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
        p: 3,
        overflowY: 'auto',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      {/* Calendar Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1d1d1f',
            mb: 2,
          }}
        >
          Calendar
        </Typography>
        <Calendar />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Recent Activity Section (Placeholder) */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1d1d1f',
            mb: 2,
          }}
        >
          Recent Activity
        </Typography>
        <Box sx={{ space: 2 }}>
          {[
            { text: 'New task added: "API security review"', time: '5 minutes ago' },
            { text: 'TextMate file synced: mobile_notes.txt', time: '12 minutes ago' },
            { text: 'Task completed: "Q3 architecture review"', time: '1 hour ago' },
          ].map((activity, index) => (
            <Box
              key={index}
              sx={{
                py: 1.5,
                borderBottom: index < 2 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  color: '#1d1d1f',
                  mb: 0.5,
                }}
              >
                {activity.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.6875rem',
                  color: '#8e8e93',
                }}
              >
                {activity.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Quick Stats Section (Placeholder) */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1d1d1f',
            mb: 2,
          }}
        >
          Quick Stats
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          {[
            { number: '47', label: 'Active Notes' },
            { number: '12', label: 'Pending Tasks' },
            { number: '3', label: 'Overdue Items' },
            { number: '23', label: 'TextMate Files' },
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#007aff',
                  mb: 0.5,
                }}
              >
                {stat.number}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.6875rem',
                  color: '#8e8e93',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RightPanel;