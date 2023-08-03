'use client';

import { Provider } from 'react-redux'
import './globals.css'
import { store } from '@/store/store'

export default function RootLayout({children}: any) {
 
  return (
    <html lang="en-US">
      <head>
        <title>Evently</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat" rel="stylesheet" />
        <link rel='shortcut icon' href='/favicon.ico' />
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}