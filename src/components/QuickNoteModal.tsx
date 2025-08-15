import React, { useState, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Editor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import ReactMarkdown from 'react-markdown';

interface QuickNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (content: string, language: string) => void;
}


const QuickNoteModal: React.FC<QuickNoteModalProps> = ({ open, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('markdown');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Set initial language
    monaco.editor.setModelLanguage(editor.getModel()!, 'markdown');

    // Focus the editor
    editor.focus();
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, newLanguage);
      }
    }
  };

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, currentLanguage);
      handleClose();
    }
  };

  const handleClose = () => {
    setContent('');
    setCurrentLanguage('markdown');
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, 'markdown');
      }
    }
    onClose();
  };

  // Only show preview for markdown files
  const showPreview = currentLanguage === 'markdown';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullWidth
      slotProps={{
        paper: {
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
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              sx={{
                minWidth: 120,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& .MuiSelect-select': {
                  py: 0.5,
                  fontSize: '0.875rem',
                },
              }}
            >
              <MenuItem value="markdown">Markdown</MenuItem>
              <MenuItem value="json">JSON</MenuItem>
              <MenuItem value="plaintext">Plain Text</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
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
          gap: 0,
          p: 0,
          overflow: 'hidden',
        }}
      >
        {/* Monaco Editor */}
        <Box
          sx={{
            flex: showPreview ? 1 : 'none',
            width: showPreview ? '50%' : '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: showPreview ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={content}
            onChange={(value) => setContent(value || '')}
            onMount={handleEditorDidMount}
            theme="vs-light"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'all',
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
              suggest: {
                showMethods: true,
                showFunctions: true,
                showConstructors: true,
                showFields: true,
                showVariables: true,
                showClasses: true,
                showStructs: true,
                showInterfaces: true,
                showModules: true,
                showProperties: true,
              },
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true,
              },
              parameterHints: {
                enabled: true,
              },
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: 'on',
              tabCompletion: 'on',
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </Box>

        {/* Preview Panel - Only for Markdown */}
        {showPreview && (
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
                MARKDOWN PREVIEW
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
                '& h4': { fontSize: '1.125rem', fontWeight: 600, mt: 2, mb: 1, lineHeight: 1.4 },
                '& h5': { fontSize: '1rem', fontWeight: 600, mt: 1.5, mb: 0.75, lineHeight: 1.4 },
                '& p': { mb: 1.5, lineHeight: 1.6 },
                '& ul, & ol': { pl: 3, mb: 1.5 },
                '& li': { mb: 0.5, lineHeight: 1.6 },
                '& code': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  color: '#d73a49',
                },
                '& pre': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  mb: 1.5,
                  '& code': {
                    backgroundColor: 'transparent',
                    padding: 0,
                    color: '#1d1d1f',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                  },
                },
                '& blockquote': {
                  borderLeft: '4px solid #007aff',
                  paddingLeft: '1em',
                  marginLeft: 0,
                  marginRight: 0,
                  fontStyle: 'italic',
                  color: '#666',
                  backgroundColor: 'rgba(0, 122, 255, 0.05)',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  mb: 1.5,
                },
                '& hr': {
                  border: 'none',
                  borderTop: '2px solid rgba(0, 0, 0, 0.1)',
                  my: 3,
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
                '& del': { textDecoration: 'line-through', opacity: 0.7 },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  my: 2,
                },
              }}
            >
              {content ? (
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 style={{fontSize: '2rem', fontWeight: 700, marginTop: 0, marginBottom: '16px', lineHeight: 1.2}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{fontSize: '1.5rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px', lineHeight: 1.3}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginTop: '16px', marginBottom: '8px', lineHeight: 1.4}}>{children}</h3>,
                    h4: ({children}) => <h4 style={{fontSize: '1.125rem', fontWeight: 600, marginTop: '16px', marginBottom: '8px', lineHeight: 1.4}}>{children}</h4>,
                    h5: ({children}) => <h5 style={{fontSize: '1rem', fontWeight: 600, marginTop: '12px', marginBottom: '6px', lineHeight: 1.4}}>{children}</h5>,
                    p: ({children}) => <p style={{marginBottom: '12px', lineHeight: 1.6}}>{children}</p>,
                    ul: ({children}) => <ul style={{paddingLeft: '24px', marginBottom: '12px'}}>{children}</ul>,
                    ol: ({children}) => <ol style={{paddingLeft: '24px', marginBottom: '12px'}}>{children}</ol>,
                    li: ({children}) => <li style={{marginBottom: '4px', lineHeight: 1.6}}>{children}</li>,
                    code: ({children}) => <code style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em', color: '#d73a49'}}>{children}</code>,
                    pre: ({children}) => <pre style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '16px', borderRadius: '8px', overflow: 'auto', marginBottom: '12px'}}>{children}</pre>,
                    blockquote: ({children}) => <blockquote style={{borderLeft: '4px solid #007aff', paddingLeft: '1em', marginLeft: 0, marginRight: 0, fontStyle: 'italic', color: '#666', backgroundColor: 'rgba(0, 122, 255, 0.05)', padding: '12px 16px', borderRadius: '4px', marginBottom: '12px'}}>{children}</blockquote>,
                    hr: () => <hr style={{border: 'none', borderTop: '2px solid rgba(0, 0, 0, 0.1)', margin: '24px 0'}} />,
                    a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" style={{color: '#007aff', textDecoration: 'none'}}>{children}</a>,
                    strong: ({children}) => <strong style={{fontWeight: 600}}>{children}</strong>,
                    em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
                    del: ({children}) => <del style={{textDecoration: 'line-through', opacity: 0.7}}>{children}</del>,
                    img: ({src, alt}) => <img src={src} alt={alt} style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '16px 0'}} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              ) : (
                <Typography sx={{ color: '#8e8e93', fontStyle: 'italic' }}>
                  Preview will appear here as you type...
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          p: 2,
          gap: 1,
        }}
      >
        <Box sx={{ mr: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#8e8e93' }}>
            {content.length} characters
          </Typography>
          {content && (
            <>
              <Typography variant="caption" sx={{ color: '#8e8e93' }}>•</Typography>
              <Typography variant="caption" sx={{ color: '#8e8e93' }}>
                {content.split('\n').length} lines
              </Typography>
              {currentLanguage === 'markdown' && (
                <>
                  <Typography variant="caption" sx={{ color: '#8e8e93' }}>•</Typography>
                  <Typography variant="caption" sx={{ color: '#8e8e93' }}>
                    {content.split(/\s+/).filter(word => word.length > 0).length} words
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
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
          disabled={!content.trim()}
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