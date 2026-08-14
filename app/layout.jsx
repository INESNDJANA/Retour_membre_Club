import './globals.css'

export const metadata = {
  title: 'Books & Being — Questionnaire',
  description: 'Votre avis compte pour nous'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
