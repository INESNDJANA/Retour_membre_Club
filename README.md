# Books & Being — Questionnaire de Relance 📋

Formulaire interactif pour collecter les retours de tes membres sur le club de lecture.

## 🚀 Déployer en 5 minutes

### Option A : Vercel (recommandée, ultra simple)

1. **Crée un compte** : https://vercel.com (avec GitHub)
2. **Crée un repo GitHub** : https://github.com/new
   - Nom : `books-and-being-survey`
   - Ajoute tous les fichiers du dossier
3. **Déploie sur Vercel** :
   - Sur vercel.com, clique "New Project"
   - Sélectionne ton repo GitHub
   - Clique "Deploy"
   - **Voilà !** Tu as un lien 🎉

→ **Guide complet** : voir `DEPLOIEMENT.md`

---

### Option B : Netlify (aussi simple)

1. Va sur https://app.netlify.com
2. Connecte-toi avec GitHub
3. Clique "New site from Git"
4. Sélectionne ton repo
5. Clique "Deploy"

---

## 📊 Fonctionnalités

✅ 6 sections de questions  
✅ Mélange de types : échelles, questions ouvertes, choix multiples  
✅ Réponses collectées en temps réel  
✅ Export JSON pour analyse  
✅ Design professionnel & anonyme  
✅ Zéro tracabilité de l'utilisateur  

---

## 📁 Structure des fichiers

```
books-and-being-survey/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── survey.jsx
├── package.json
├── next.config.js
├── globals.css
└── .gitignore
```

---

## 🔗 Une fois déployé

**Partage ce lien** avec tes membres :
```
https://books-and-being-survey.vercel.app
```

**Pour les réponses** :
- Elles s'affichent en temps réel dans le formulaire
- Clique "Exporter les réponses" pour télécharger en JSON
- Ensuite tu peux les analyser dans un tableur

---

## ❓ Questions fréquentes

**Q : Les réponses sont stockées où ?**  
A : Localement dans le navigateur. Elles disparaissent quand on ferme la page (use window.storage pour persistance future).

**Q : Je peux modifier les questions ?**  
A : Oui ! Édite `survey.jsx` et refais un `git push`. Vercel redéploie automatiquement.

**Q : Ça coûte combien ?**  
A : Gratuit. Vercel est gratis pour les petits projets.

**Q : Comment partager avec mes membres ?**  
A : Envoie juste le lien par mail/WhatsApp. C'est tout !

---

## 🛠 Support

- **Pas de compte GitHub ?** → Crée-le sur https://github.com
- **Le lien ne marche pas ?** → Attends 2-3 min, Vercel finit le build
- **Questions techniques ?** → Demande-moi, je t'aide pas à pas

---

**Bon courage pour ta relance de Books & Being ! 📚✨**
