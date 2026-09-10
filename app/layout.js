import './globals.css';
import './bookieco-theme.css';

export const metadata = {
  title: 'BookieOS',
  description: 'BookieCo AI Command Interface',
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
