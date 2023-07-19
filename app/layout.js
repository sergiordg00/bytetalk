import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ByteTalk',
  description: 'Experience next-level communication with our web application, designed to reinvent the way you connect. Seamlessly chat with individuals or in groups, harnessing the power of advanced AI to make your conversations more efficient and insightful. A user-friendly interface meets cutting-edge technology for a superior chatting experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
