import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  NoteAdd as NoteAddIcon,
  Upload as UploadIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
import QuickNoteModal from '../components/QuickNoteModal';
import { useAppStore } from '../stores/useAppStore';

const Dashboard: React.FC = () => {
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);
  const addNote = useAppStore((state) => state.addNote);

  const handleQuickNote = () => {
    setQuickNoteOpen(true);
  };

  const handleCloseQuickNote = () => {
    setQuickNoteOpen(false);
  };

  const handleSaveNote = (content: string, language: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: `Note - ${new Date().toLocaleString()}`,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [language],
    };
    addNote(newNote);
    console.log('Note saved:', newNote);
  };

  const handleAddTask = () => {
    console.log('Add Task clicked');
  };

  const handleImportTextMate = () => {
    console.log('Import TextMate clicked');
  };

  const handleSyncFiles = () => {
    console.log('Sync Files clicked');
  };

  return (
    <Box className="fade-in">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1">
          Your organizational command center
        </Typography>
      </Box>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<NoteAddIcon />}
          onClick={handleQuickNote}
          sx={{
            background: '#007aff',
            '&:hover': {
              background: '#0056d3',
            },
          }}
        >
          Quick Note
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            color: '#1d1d1f',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={handleImportTextMate}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            color: '#1d1d1f',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Import TextMate
        </Button>
        <Button
          variant="outlined"
          startIcon={<SyncIcon />}
          onClick={handleSyncFiles}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            color: '#1d1d1f',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Sync Files
        </Button>
      </Box>

      {/* Dashboard Content - Placeholder Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                borderColor: 'rgba(0, 122, 255, 0.2)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent TextMate Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last synced: 2 minutes ago
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#8e8e93' }}>
                Your recent notes will appear here...
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                borderColor: 'rgba(0, 122, 255, 0.2)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Urgent Items
            </Typography>
            <Typography variant="body2" color="text.secondary">
              3 items need attention
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#8e8e93' }}>
                Urgent tasks will be displayed here...
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                borderColor: 'rgba(0, 122, 255, 0.2)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Code Snippets
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Auto-detected from notes
            </Typography>
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              <Typography variant="body2" component="pre" sx={{ margin: 0 }}>
                {`// Code snippets from your notes will appear here
const example = "Coming soon...";`}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Note Modal */}
      <QuickNoteModal
        open={quickNoteOpen}
        onClose={handleCloseQuickNote}
        onSave={handleSaveNote}
      />
    </Box>
  );
};

export default Dashboard;