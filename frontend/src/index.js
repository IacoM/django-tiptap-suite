import { Editor, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Suggestion from '@tiptap/suggestion';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { common, createLowlight } from 'lowlight';
import tippy from 'tippy.js';

import './styles.css';

const lowlight = createLowlight(common);

// SVG Icons mapping
const icons = {
  bold: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',
  italic: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',
  underline: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>',
  strikethrough: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><path d="M16 6C16 6 14.5 4 12 4C9.5 4 8 6 8 6C8 6 8 12 12 12C16 12 16 18 16 18C16 18 14.5 20 12 20C9.5 20 8 18 8 18"></path></svg>',
  link: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
  h1: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 18V6M20 18V6"></path><path d="M17 12l3-3v9"></path></svg>',
  h2: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 18V6M20 18V6"></path><path d="M17 9c0-1.1.9-2 2-2s2 .9 2 2c0 1.5-3 3.5-3 3.5V18h4"></path></svg>',
  h3: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 18V6M20 18V6"></path><path d="M17 9c0-1.1.9-2 2-2s2 .9 2 2c0 1.5-1.5 1.5-1.5 2.5 0 1 1.5 1 1.5 2.5 0 1.1-.9 2-2 2s-2-.9-2-2"></path></svg>',
  bulletList: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
  orderedList: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1.5"></path></svg>',
  blockquote: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
  codeBlock: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
  image: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
  callout: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="13" y2="17"></line></svg>',
  divider: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
  // New icons
  alignLeft: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>',
  alignCenter: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>',
  alignRight: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>',
  alignJustify: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>',
  table: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>',
  taskList: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"></rect><rect x="3" y="13" width="6" height="6" rx="1"></rect><line x1="12" y1="8" x2="21" y2="8"></line><line x1="12" y1="16" x2="21" y2="16"></line></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>',
};

const getIconSvg = (name) => icons[name] || '';

// Create custom Slash Commands extension
const getCommands = ({ uploadUrl, csrfToken, enabledExtensions }) => {
  const list = [
    {
      id: 'heading',
      title: 'Heading 1',
      description: 'Big section heading',
      icon: 'h1',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      id: 'heading',
      title: 'Heading 2',
      description: 'Medium section heading',
      icon: 'h2',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      id: 'heading',
      title: 'Heading 3',
      description: 'Small section heading',
      icon: 'h3',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
      },
    },
    {
      id: 'bulletList',
      title: 'Bullet List',
      description: 'Create a simple bulleted list',
      icon: 'bulletList',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      id: 'orderedList',
      title: 'Numbered List',
      description: 'Create a list with order',
      icon: 'orderedList',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      id: 'taskList',
      title: 'Task List',
      description: 'Create a list of checkable items',
      icon: 'taskList',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      id: 'blockquote',
      title: 'Callout Box',
      description: 'Make writing stand out',
      icon: 'callout',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      id: 'codeBlock',
      title: 'Code Block',
      description: 'Code block with highlighting',
      icon: 'codeBlock',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      id: 'table',
      title: 'Table',
      description: 'Insert a 3x3 table',
      icon: 'table',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      },
    },
    {
      id: 'divider',
      title: 'Horizontal Rule',
      description: 'Insert a divider line',
      icon: 'divider',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      id: 'image',
      title: 'Image Upload',
      description: 'Insert image from your computer',
      icon: 'image',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async () => {
          const file = fileInput.files[0];
          if (!file) return;
          const formData = new FormData();
          formData.append('upload', file);
          try {
            const response = await fetch(uploadUrl, {
              method: 'POST',
              headers: {
                'X-CSRFToken': csrfToken,
              },
              body: formData,
            });
            if (response.ok) {
              const data = await response.json();
              if (data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
              }
            }
          } catch (err) {
            console.error('Image upload failed', err);
          }
        };
        fileInput.click();
      },
    },
  ];
  return list.filter(item => enabledExtensions.includes(item.id) || item.id === 'divider');
};

const SlashCommands = Extension.create({
  name: 'slash-commands',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const renderItems = () => {
  let component;
  let popup;
  let selectedIndex = 0;
  let items = [];
  let commandCallback;

  const updateSelection = () => {
    const buttons = component.querySelectorAll('.tiptap-slash-item');
    buttons.forEach((btn, index) => {
      if (index === selectedIndex) {
        btn.classList.add('selected');
        btn.scrollIntoView({ block: 'nearest' });
      } else {
        btn.classList.remove('selected');
      }
    });
  };

  return {
    onStart: (props) => {
      items = props.items;
      commandCallback = props.command;
      selectedIndex = 0;

      component = document.createElement('div');
      component.className = 'tiptap-slash-menu';

      if (items.length === 0) {
        component.style.display = 'none';
      }

      items.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tiptap-slash-item';
        button.innerHTML = `
          <div class="tiptap-slash-icon">${getIconSvg(item.icon)}</div>
          <div class="tiptap-slash-text">
            <strong>${item.title}</strong>
            <div class="tiptap-slash-desc">${item.description}</div>
          </div>
        `;
        button.addEventListener('click', () => {
          commandCallback(item);
        });
        component.appendChild(button);
      });

      updateSelection();

      if (!props.clientRect) {
        return;
      }

      const tippyResult = tippy(document.body, {
        getReferenceClientRect: typeof props.clientRect === 'function' ? props.clientRect : () => props.clientRect,
        appendTo: () => document.body,
        content: component,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
      
      popup = Array.isArray(tippyResult) ? tippyResult[0] : tippyResult;
    },

    onUpdate(props) {
      items = props.items;
      commandCallback = props.command;
      
      if (items.length === 0) {
        component.style.display = 'none';
      } else {
        component.style.display = 'flex';
      }

      component.innerHTML = '';
      items.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tiptap-slash-item';
        button.innerHTML = `
          <div class="tiptap-slash-icon">${getIconSvg(item.icon)}</div>
          <div class="tiptap-slash-text">
            <strong>${item.title}</strong>
            <div class="tiptap-slash-desc">${item.description}</div>
          </div>
        `;
        button.addEventListener('click', () => {
          commandCallback(item);
        });
        component.appendChild(button);
      });

      selectedIndex = Math.min(selectedIndex, items.length - 1);
      updateSelection();

      if (popup && props.clientRect) {
        popup.setProps({
          getReferenceClientRect: typeof props.clientRect === 'function' ? props.clientRect : () => props.clientRect,
        });
      }
    },

    onKeyDown(props) {
      if (items.length === 0) {
        return false;
      }

      if (props.event.key === 'ArrowUp') {
        selectedIndex = (selectedIndex + items.length - 1) % items.length;
        updateSelection();
        return true;
      }
      if (props.event.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection();
        return true;
      }
      if (props.event.key === 'Enter') {
        if (items[selectedIndex]) {
          commandCallback(items[selectedIndex]);
          return true;
        }
      }
      if (props.event.key === 'Escape') {
        if (popup) {
          popup.hide();
        }
        return true;
      }
      return false;
    },

    onExit() {
      if (popup) {
        popup.destroy();
      }
      if (component) {
        component.remove();
      }
    },
  };
};

window.initTiptapSuite = function(editorId, uploadUrl, csrfToken, config) {
  const wrapper = document.getElementById(`wrapper-${editorId}`);
  const container = document.getElementById(`tiptap-container-${editorId}`);
  const textarea = document.getElementById(editorId);
  if (!container || !textarea) return;

  container.innerHTML = '';

  const enabledExtensions = config.enabled_extensions || [
    'bold', 'italic', 'underline', 'strike', 'heading',
    'bulletList', 'orderedList', 'blockquote', 'codeBlock',
    'link', 'image', 'textAlign', 'table', 'taskList'
  ];

  // 1. Create Top Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'tiptap-editor-toolbar';
  
  const buttons = [];

  if (enabledExtensions.includes('bold')) {
    buttons.push({ icon: 'bold', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', label: 'Bold' });
  }
  if (enabledExtensions.includes('italic')) {
    buttons.push({ icon: 'italic', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', label: 'Italic' });
  }
  if (enabledExtensions.includes('underline')) {
    buttons.push({ icon: 'underline', action: () => editor.chain().focus().toggleUnderline().run(), active: 'underline', label: 'Underline' });
  }
  if (enabledExtensions.includes('strike')) {
    buttons.push({ icon: 'strikethrough', action: () => editor.chain().focus().toggleStrike().run(), active: 'strike', label: 'Strikethrough' });
  }
  if (enabledExtensions.includes('heading')) {
    buttons.push({ icon: 'h1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { name: 'heading', attributes: { level: 1 } }, label: 'H1' });
    buttons.push({ icon: 'h2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { name: 'heading', attributes: { level: 2 } }, label: 'H2' });
    buttons.push({ icon: 'h3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: { name: 'heading', attributes: { level: 3 } }, label: 'H3' });
  }
  if (enabledExtensions.includes('bulletList')) {
    buttons.push({ icon: 'bulletList', action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList', label: 'Bullet List' });
  }
  if (enabledExtensions.includes('orderedList')) {
    buttons.push({ icon: 'orderedList', action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList', label: 'Ordered List' });
  }
  if (enabledExtensions.includes('taskList')) {
    buttons.push({ icon: 'taskList', action: () => editor.chain().focus().toggleTaskList().run(), active: 'taskList', label: 'Task List' });
  }
  if (enabledExtensions.includes('blockquote')) {
    buttons.push({ icon: 'blockquote', action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote', label: 'Quote' });
  }
  if (enabledExtensions.includes('codeBlock')) {
    buttons.push({ icon: 'codeBlock', action: () => editor.chain().focus().toggleCodeBlock().run(), active: 'codeBlock', label: 'Code Block' });
  }
  if (enabledExtensions.includes('link')) {
    buttons.push({ 
      icon: 'link', 
      action: () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);
        if (url === null) return;
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }, 
      active: 'link',
      label: 'Link'
    });
  }
  if (enabledExtensions.includes('image')) {
    buttons.push({ 
      icon: 'image', 
      action: () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async () => {
          const file = fileInput.files[0];
          if (!file) return;
          const formData = new FormData();
          formData.append('upload', file);
          try {
            const response = await fetch(uploadUrl, {
              method: 'POST',
              headers: {
                'X-CSRFToken': csrfToken,
              },
              body: formData,
            });
            if (response.ok) {
              const data = await response.json();
              if (data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
              }
            }
          } catch (err) {
            console.error('Image upload failed', err);
          }
        };
        fileInput.click();
      },
      label: 'Image'
    });
  }
  if (enabledExtensions.includes('textAlign')) {
    buttons.push({ icon: 'alignLeft', action: () => editor.chain().focus().setTextAlign('left').run(), active: { name: 'textAlign', attributes: { align: 'left' } }, label: 'Align Left' });
    buttons.push({ icon: 'alignCenter', action: () => editor.chain().focus().setTextAlign('center').run(), active: { name: 'textAlign', attributes: { align: 'center' } }, label: 'Align Center' });
    buttons.push({ icon: 'alignRight', action: () => editor.chain().focus().setTextAlign('right').run(), active: { name: 'textAlign', attributes: { align: 'right' } }, label: 'Align Right' });
    buttons.push({ icon: 'alignJustify', action: () => editor.chain().focus().setTextAlign('justify').run(), active: { name: 'textAlign', attributes: { align: 'justify' } }, label: 'Align Justify' });
  }
  if (enabledExtensions.includes('table')) {
    buttons.push({ 
      icon: 'table', 
      action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), 
      active: 'table', 
      label: 'Table' 
    });
  }

  // Fullscreen button is always present
  buttons.push({
    icon: 'fullscreen',
    action: () => {
      const editorEl = document.getElementById(`tiptap-container-${editorId}`);
      if (editorEl) {
        editorEl.classList.toggle('fullscreen-mode');
      }
    },
    label: 'Fullscreen'
  });

  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tiptap-toolbar-btn';
    button.title = btn.label;
    button.innerHTML = getIconSvg(btn.icon);
    button.addEventListener('click', btn.action);
    toolbar.appendChild(button);
  });

  // 2. Create Bubble Menu Element
  const bubbleMenuEl = document.createElement('div');
  bubbleMenuEl.className = 'tiptap-bubble-menu';
  
  const bubbleButtons = [];
  if (enabledExtensions.includes('bold')) {
    bubbleButtons.push({ icon: 'bold', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', label: 'Bold' });
  }
  if (enabledExtensions.includes('italic')) {
    bubbleButtons.push({ icon: 'italic', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', label: 'Italic' });
  }
  if (enabledExtensions.includes('underline')) {
    bubbleButtons.push({ icon: 'underline', action: () => editor.chain().focus().toggleUnderline().run(), active: 'underline', label: 'Underline' });
  }
  if (enabledExtensions.includes('strike')) {
    bubbleButtons.push({ icon: 'strikethrough', action: () => editor.chain().focus().toggleStrike().run(), active: 'strike', label: 'Strike' });
  }
  if (enabledExtensions.includes('link')) {
    bubbleButtons.push({ 
      icon: 'link', 
      action: () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);
        if (url === null) return;
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }, 
      active: 'link',
      label: 'Link'
    });
  }

  bubbleButtons.forEach(btn => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tiptap-bubble-btn';
    button.title = btn.label;
    button.innerHTML = getIconSvg(btn.icon);
    button.addEventListener('click', btn.action);
    bubbleMenuEl.appendChild(button);
  });

  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'tiptap-editor-content-wrapper';

  container.appendChild(toolbar);
  container.appendChild(bubbleMenuEl);
  container.appendChild(editorWrapper);

  const extensions = [
    StarterKit.configure({
      codeBlock: false,
    }),
    Placeholder.configure({
      placeholder: config.placeholder || "Type '/' for commands...",
    }),
    BubbleMenu.configure({
      element: bubbleMenuEl,
    }),
  ];

  if (enabledExtensions.includes('image')) {
    extensions.push(Image);
  }
  if (enabledExtensions.includes('link')) {
    extensions.push(Link.configure({ openOnClick: false }));
  }
  if (enabledExtensions.includes('codeBlock')) {
    extensions.push(CodeBlockLowlight.configure({ lowlight }));
  }
  if (enabledExtensions.includes('underline')) {
    extensions.push(Underline);
  }
  if (enabledExtensions.includes('textAlign')) {
    extensions.push(TextAlign.configure({ types: ['heading', 'paragraph'] }));
  }
  if (enabledExtensions.includes('table')) {
    extensions.push(Table.configure({ resizable: true }));
    extensions.push(TableRow);
    extensions.push(TableCell);
    extensions.push(TableHeader);
  }
  if (enabledExtensions.includes('taskList')) {
    extensions.push(TaskList);
    extensions.push(TaskItem.configure({ nested: true }));
  }

  // Conditionally add Slash Commands
  if (!config.disable_slash_commands) {
    extensions.push(
      SlashCommands.configure({
        suggestion: {
          items: ({ query }) => {
            const list = getCommands({ uploadUrl, csrfToken, enabledExtensions });
            return list.filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()));
          },
          render: renderItems,
        },
      })
    );
  }

  const editor = new Editor({
    element: editorWrapper,
    extensions: extensions,
    content: textarea.value,
    onUpdate({ editor }) {
      textarea.value = editor.getHTML();
    },
    onSelectionUpdate({ editor }) {
      // Update top toolbar active status
      buttons.forEach((btn, index) => {
        const button = toolbar.children[index];
        if (btn.active) {
          const isActive = typeof btn.active === 'string' 
            ? editor.isActive(btn.active)
            : editor.isActive(btn.active.name, btn.active.attributes);
          button.classList.toggle('active', isActive);
        }
      });
      // Update bubble menu active status
      bubbleButtons.forEach((btn, index) => {
        const button = bubbleMenuEl.children[index];
        if (btn.active) {
          const isActive = typeof btn.active === 'string' 
            ? editor.isActive(btn.active)
            : editor.isActive(btn.active.name, btn.active.attributes);
          button.classList.toggle('active', isActive);
        }
      });
    }
  });
};
