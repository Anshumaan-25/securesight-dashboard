// app/layout.js
export const metadata = {
  title: 'SecureSight Dashboard',
  description: 'CCTV Monitoring Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
