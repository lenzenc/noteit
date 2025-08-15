import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Code as CodeIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as OrderedListIcon,
  FormatQuote as QuoteIcon,
  Code as CodeBlockIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
} from '@mui/icons-material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

interface QuickNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (content: string, fileType: string) => void;
}

const QuickNoteModal: React.FC<QuickNoteModalProps> = ({ open, onClose, onSave }) => {
  const [fileType, setFileType] = useState('markdown');

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use syntax highlighting
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  const handleSave = () => {
    if (editor && editor.getHTML()) {
      // Get content as markdown or HTML based on file type
      const content = fileType === 'markdown' ? editor.storage.markdown?.getMarkdown() || editor.getText() : editor.getText();
      onSave(content, fileType);
      handleClose();
    }
  };

  const handleClose = () => {
    if (editor) {
      editor.commands.clearContent();
    }
    setFileType('markdown');
    onClose();
  };

  const fileExtensions = [
    { value: 'markdown', label: 'Markdown (.md)', icon: '📝' },
    { value: 'javascript', label: 'JavaScript (.js)', icon: '🟨' },
    { value: 'typescript', label: 'TypeScript (.ts)', icon: '🔷' },
    { value: 'python', label: 'Python (.py)', icon: '🐍' },
    { value: 'json', label: 'JSON (.json)', icon: '📋' },
    { value: 'html', label: 'HTML (.html)', icon: '🌐' },
    { value: 'css', label: 'CSS (.css)', icon: '🎨' },
    { value: 'text', label: 'Plain Text (.txt)', icon: '📄' },
  ];

  if (!editor) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          width: '90vw',
          height: '85vh',
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }}>Add Note</Typography>
          <FormControl size="small">
            <Select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              sx={{
                minWidth: 180,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
              startAdornment={<CodeIcon sx={{ ml: 1, mr: 0.5, fontSize: '1rem', color: '#8e8e93' }} />}
            >
              {fileExtensions.map((ext) => (
                <MenuItem key={ext.value} value={ext.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{ext.icon}</span>
                    <span>{ext.label}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: '#8e8e93',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          p: 0,
          overflow: 'hidden',
        }}
      >
        {/* Editor Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <ToggleButtonGroup size="small" exclusive>
            <ToggleButton
              value="bold"
              selected={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              <BoldIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton
              value="italic"
              selected={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
              <ItalicIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToggleButtonGroup size="small" exclusive>
            <ToggleButton
              value="h1"
              selected={editor.isActive('heading', { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              H1
            </ToggleButton>
            <ToggleButton
              value="h2"
              selected={editor.isActive('heading', { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              H2
            </ToggleButton>
            <ToggleButton
              value="h3"
              selected={editor.isActive('heading', { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              H3
            </ToggleButton>
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToggleButtonGroup size="small" exclusive>
            <ToggleButton
              value="bulletList"
              selected={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ListIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton
              value="orderedList"
              selected={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <OrderedListIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton
              value="blockquote"
              selected={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <QuoteIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton
              value="codeBlock"
              selected={editor.isActive('codeBlock')}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <CodeBlockIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ flexGrow: 1 }} />

          <ToggleButtonGroup size="small">
            <ToggleButton
              value="undo"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <UndoIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton
              value="redo"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <RedoIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Editor and Preview Container */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Editor Side */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid rgba(0, 0, 0, 0.1)',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#8e8e93', fontWeight: 600 }}>
                EDITOR
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 3,
                '& .tiptap-editor': {
                  minHeight: '100%',
                  outline: 'none',
                  '& .ProseMirror': {
                    minHeight: '100%',
                    outline: 'none',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#1d1d1f',
                    '& > * + *': {
                      marginTop: '0.75em',
                    },
                    '& h1': {
                      fontSize: '2rem',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    },
                    '& h2': {
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      lineHeight: 1.3,
                    },
                    '& h3': {
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    },
                    '& ul, & ol': {
                      paddingLeft: '1.5rem',
                    },
                    '& code': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '0.25em',
                      padding: '0.25em 0.5em',
                      fontFamily: 'monospace',
                      fontSize: '0.9em',
                    },
                    '& pre': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '0.5em',
                      fontFamily: 'monospace',
                      fontSize: '0.9em',
                      padding: '0.75em 1em',
                      '& code': {
                        backgroundColor: 'transparent',
                        padding: 0,
                      },
                    },
                    '& blockquote': {
                      borderLeft: '3px solid #007aff',
                      paddingLeft: '1em',
                      marginLeft: 0,
                      fontStyle: 'italic',
                      color: '#666',
                    },
                    '& .hljs-comment, & .hljs-quote': {
                      color: '#6a737d',
                    },
                    '& .hljs-keyword, & .hljs-selector-tag': {
                      color: '#d73a49',
                    },
                    '& .hljs-string, & .hljs-doctag': {
                      color: '#032f62',
                    },
                    '& .hljs-title, & .hljs-section': {
                      color: '#6f42c1',
                    },
                    '& .hljs-type, & .hljs-class': {
                      color: '#22863a',
                    },
                    '& .hljs-literal, & .hljs-symbol, & .hljs-bullet': {
                      color: '#005cc5',
                    },
                    '& .hljs-attribute, & .hljs-meta': {
                      color: '#e36209',
                    },
                  },
                },
              }}
            >
              <EditorContent editor={editor} />
            </Box>
          </Box>

          {/* Preview Side */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(0, 0, 0, 0.01)',
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#8e8e93', fontWeight: 600 }}>
                PREVIEW (HTML RENDERED)
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 3,
                overflow: 'auto',
                '& h1': { fontSize: '2rem', fontWeight: 700, mt: 0, mb: 2, lineHeight: 1.2 },
                '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 1.5, lineHeight: 1.3 },
                '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1, lineHeight: 1.4 },
                '& p': { mb: 1.5, lineHeight: 1.6 },
                '& ul, & ol': { pl: 3, mb: 1.5 },
                '& li': { mb: 0.5 },
                '& code': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                },
                '& pre': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  padding: '12px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  mb: 1.5,
                  '& code': {
                    backgroundColor: 'transparent',
                    padding: 0,
                  },
                },
                '& blockquote': {
                  borderLeft: '3px solid #007aff',
                  paddingLeft: '1em',
                  marginLeft: 0,
                  fontStyle: 'italic',
                  color: '#666',
                },
                '& a': {
                  color: '#007aff',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& strong': { fontWeight: 600 },
                '& em': { fontStyle: 'italic' },
              }}
            >
              {editor && (
                <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          p: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
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
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!editor || editor.isEmpty}
          sx={{
            background: '#007aff',
            '&:hover': {
              background: '#0056d3',
            },
            '&.Mui-disabled': {
              background: 'rgba(0, 122, 255, 0.3)',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickNoteModal;