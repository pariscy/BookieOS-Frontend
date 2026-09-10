import './globals.css';
import './bookieco-theme.css';
import './cinematic.css';
import './core-overrides.css';

export const metadata = {
  title: 'BION | BookieCo Intelligence Operations Network',
  description: 'BION — BookieCo Intelligence Operations Network',
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
