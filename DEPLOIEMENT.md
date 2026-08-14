# 📋 Déploiement du Formulaire Books & Being sur Vercel

## ⚡ Les 5 étapes pour mettre en ligne

### **Étape 1 : Créer un compte Vercel** (1 min)
1. Va sur **https://vercel.com**
2. Clique sur **"Sign Up"**
3. Connecte-toi avec GitHub (ou email)
   - *Si tu n'as pas de compte GitHub : crée-le sur https://github.com/signup* (5 min)

---

### **Étape 2 : Préparer le code** (2 min)
1. **Sur ton ordinateur**, crée un dossier : `books-and-being-survey`
2. À l'intérieur, crée un sous-dossier : `app`
3. Copie ces fichiers à la racine du dossier principal :
   - `package.json`
   - `next.config.js`
   - `.gitignore` (voir ci-dessous)

4. À l'intérieur du dossier `app`, copie :
   - `page.jsx`
   - `survey.jsx` (renomme `books-and-being-survey.jsx` en `survey.jsx`)
   - `layout.jsx` (voir le template ci-dessous)

**Structure finale :**
```
books-and-being-survey/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── survey.jsx
├── package.json
├── next.config.js
└── .gitignore
```

---

### **Étape 3 : Uploader sur GitHub** (3 min)
1. Va sur **https://github.com/new**
2. Nom du repo : `books-and-being-survey`
3. Clique **"Create repository"**
4. Suis les instructions pour uploader ton dossier local
   - *(Les commandes Git s'affichent directement)*

---

### **Étape 4 : Connecter Vercel à GitHub** (2 min)
1. Sur **vercel.com**, clique **"New Project"**
2. Connecte ton compte GitHub
3. Autorise Vercel à accéder à tes repos
4. Sélectionne **`books-and-being-survey`**
5. Clique **"Deploy"** → *C'est fini !* ✨

**Vercel te donne un lien automatique**, genre : `https://books-and-being-survey.vercel.app`

---

### **Étape 5 : Partage le lien** (instantané)
Envoie le lien à tes membres ! Ils peuvent remplir le formulaire directement.

**Pour voir les réponses :**
- Chaque réponse s'affiche en temps réel dans le formulaire
- Clique sur **"Exporter les réponses"** pour télécharger un fichier JSON

---

## 📄 Fichiers à créer

### `.gitignore`
```
node_modules/
.next/
out/
*.log
.env.local
.DS_Store
```

### `app/layout.jsx`
```jsx
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
```

### `app/globals.css`
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 🆘 Si tu bloques

- **"Je n'arrive pas à créer un compte GitHub"** → Demande de l'aide, on peut utiliser Netlify à la place (même processus)
- **"Comment uploader mon dossier sur GitHub"** → Je peux te donner les commandes pas à pas
- **"Le lien ne marche pas"** → Attends 2-3 minutes, Vercel finit le déploiement

---

## 🎯 Résumé du lien final

Une fois déployé, tu auras :
✅ Un lien unique pour tes membres  
✅ Les réponses collectées en temps réel  
✅ Un bouton d'export JSON  
✅ Zéro configuration compliquée  

**C'est gratuit, illimité, et ça prend 5 minutes.** 🚀
