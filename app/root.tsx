// root.tsx
import React, { useContext, useEffect, useState } from 'react';
import { withEmotionCache } from '@emotion/react';
import {
  ChakraProvider,
  DarkMode,
  ThemeConfig,
  extendTheme,
} from '@chakra-ui/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { MetaFunction, LinksFunction } from '@remix-run/node'; // Depends on the runtime you choose

import { ServerStyleContext, ClientStyleContext } from './context';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'ZenoNoto',
    },
  ];
};

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const customTheme = extendTheme({ config });

const data = [
  {
    title: 'Note 1',
    content: 'This is the content of note 1.',
    id: '1',
    createdAt: new Date(),
    isCompleted: false,
    isPinned: false,
    color: 'teal',
  },
  {
    title: 'Note 2',
    content: 'This is the content of note 2.',
    id: '2',
    createdAt: new Date(),
    isCompleted: true,
    isPinned: true,
    color: 'blue',
  },
  {
    title: 'Note 3',
    content: 'This is the content of note 3.',
    id: '3',
    createdAt: new Date(),
    isCompleted: false,
    isPinned: true,
    color: 'purple',
  },
];

export default function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('notes')
        : null;
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    return parsedNotes.length > 0 ? parsedNotes : data;
  });

  // Save notes to localStorage every time they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('saving notes');
      window.localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);
  const editNoteById = (id: string, note: any) => {
    const newNotes = notes.map((n) => {
      if (n.id === id) {
        return note;
      }
      return n;
    });
    setNotes(newNotes);
    console.log(newNotes);
  };
  const deleteNoteById = (id: string) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };
  return (
    <Document>
      <ChakraProvider theme={customTheme}>
        <Outlet context={[notes, editNoteById, deleteNoteById]} />
      </ChakraProvider>
    </Document>
  );
}
