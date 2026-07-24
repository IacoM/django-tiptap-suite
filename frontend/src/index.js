import { Editor, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Suggestion from '@tiptap/suggestion';
import { common, createLowlight } from 'lowlight';
import tippy from 'tippy.js';

import './styles.css';

const lowlight = createLowlight(common);

// SVG Icons mapping
const icons = {
  bold: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',
  italic: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',
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
};

const getIconSvg = (name) => icons[name] || '';

// Create custom Slash Commands extension
const getCommands = ({ uploadUrl, csrfToken }) => [
  {
    title: 'Heading 1',
    description: 'Big section heading',
    icon: 'h1',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: 'h2',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
    },
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    icon: 'h3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
    },
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bulleted list',
    icon: 'bulletList',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a list with order',
    icon: 'orderedList',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Callout Box',
    description: 'Make writing stand out',
    icon: 'callout',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Code Block',
    description: 'Code block with highlighting',
    icon: 'codeBlock',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: 'Horizontal Rule',
    description: 'Insert a divider line',
    icon: 'divider',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
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

  // 1. Create Top Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'tiptap-editor-toolbar';
  
  const buttons = [
    { icon: 'bold', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', label: 'Bold' },
    { icon: 'italic', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', label: 'Italic' },
    { icon: 'strikethrough', action: () => editor.chain().focus().toggleStrike().run(), active: 'strike', label: 'Strikethrough' },
    { icon: 'h1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { name: 'heading', attributes: { level: 1 } }, label: 'H1' },
    { icon: 'h2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { name: 'heading', attributes: { level: 2 } }, label: 'H2' },
    { icon: 'h3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: { name: 'heading', attributes: { level: 3 } }, label: 'H3' },
    { icon: 'bulletList', action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList', label: 'Bullet List' },
    { icon: 'orderedList', action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList', label: 'Ordered List' },
    { icon: 'blockquote', action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote', label: 'Quote' },
    { icon: 'codeBlock', action: () => editor.chain().focus().toggleCodeBlock().run(), active: 'codeBlock', label: 'Code Block' },
    { 
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
    },
    { 
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
    }
  ];

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
  
  const bubbleButtons = [
    { icon: 'bold', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', label: 'Bold' },
    { icon: 'italic', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', label: 'Italic' },
    { icon: 'strikethrough', action: () => editor.chain().focus().toggleStrike().run(), active: 'strike', label: 'Strike' },
    { 
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
    },
  ];

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

  const editor = new Editor({
    element: editorWrapper,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: config.placeholder || "Type '/' for commands...",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      BubbleMenu.configure({
        element: bubbleMenuEl,
      }),
      SlashCommands.configure({
        suggestion: {
          items: ({ query }) => {
            const list = getCommands({ uploadUrl, csrfToken });
            return list.filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()));
          },
          render: renderItems,
        },
      }),
    ],
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
