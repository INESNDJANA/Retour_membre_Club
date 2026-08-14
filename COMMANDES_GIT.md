# 📝 Guide Git — Déployer le Formulaire (Pour utilisateurs confiants)

Si tu es à l'aise avec Git/terminal, voici les commandes exactes.

## Prérequis
- Git installé : https://git-scm.com
- Compte GitHub : https://github.com
- Compte Vercel : https://vercel.com

---

## Étape 1 : Créer et préparer le repo local

```bash
# Crée le dossier du projet
mkdir books-and-being-survey
cd books-and-being-survey

# Initialise Git
git init

# Crée la structure des dossiers
mkdir app

# Copie tous les fichiers fournis :
# - package.json → à la racine
# - next.config.js → à la racine
# - .gitignore → à la racine
# - layout.jsx → dans app/
# - page.jsx → dans app/
# - survey.jsx → dans app/
# - globals.css → dans app/
```

---

## Étape 2 : Uploader sur GitHub

```bash
# Configure Git avec tes infos
git config user.name "Ton Nom"
git config user.email "ton.email@example.com"

# Ajoute tous les fichiers
git add .

# Crée le premier commit
git commit -m "Initial commit: Books & Being survey form"

# Sur GitHub, crée un nouveau repo (https://github.com/new)
# Nommé: books-and-being-survey
# Puis copie cette commande (GitHub te la donne) :

git branch -M main
git remote add origin https://github.com/TON_USERNAME/books-and-being-survey.git
git push -u origin main
```

---

## Étape 3 : Déployer sur Vercel

### Option A : Avec Vercel CLI (pour développeurs)

```bash
# Installe Vercel CLI
npm i -g vercel

# Déploie depuis le dossier du projet
vercel

# Suis les prompts :
# - Link to existing project? → No
# - Project name → books-and-being-survey
# - Framework → Next.js
# - Deploy → Yes
```

### Option B : Via l'interface Vercel (plus simple)

1. Va sur https://vercel.com/new
2. Connecte-toi avec GitHub
3. Sélectionne `books-and-being-survey`
4. Clique "Deploy"

---

## Étape 4 : Modifier et redéployer

Une fois sur GitHub, les changements se déploient automatiquement :

```bash
# Fais une modification
# Ex: modifie survey.jsx

# Puis :
git add .
git commit -m "Updated survey questions"
git push

# Vercel redéploie automatiquement en ~1 min ✨
```

---

## 🆘 Dépannage

**"fatal: not a git repository"**
```bash
cd chemin/vers/books-and-being-survey
git init
```

**"Permission denied (publickey)"**
- Génère une clé SSH : https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**"npm install" échoue**
```bash
# Node.js installé ?
node --version

# Si pas : https://nodejs.org
# Puis réessaie

npm install
```

---

## ✅ Vérification

Après déploiement, tu dois avoir :

```
✓ Lien Vercel actif (vercel.app)
✓ Formulaire chargeable
✓ Boutons fonctionnels
✓ Export JSON fonctionnel
```

---

**Voilà, c'est déployé !** 🚀
