

## 📂 **Détails des dossiers**

### 📌 **`public/`**
Dossier contenant des fichiers statiques accessibles directement par le navigateur.  
➡️ **Exemples de fichiers à mettre ici :**  
- `index.html` → Point d’entrée HTML du projet  
- `favicon.ico` → Icône de l’application  
- `logo.svg` → Logo du site  
- `manifest.json` → Métadonnées pour les PWA  

---

### 📌 **`src/`**  
Le cœur du projet contenant tout le code source.

#### 📂 **`assets/`** → Ressources statiques  
Ce dossier contient **les fichiers qui ne changent pas dynamiquement**.  
- `icons/` → Icônes SVG  
- `images/` → Images utilisées dans l’application  
- `styles/` → Feuilles de styles globales  
  - `index.css` → Contient les styles globaux  

💡 **Ne mets ici que les fichiers statiques !** Tout ce qui est dynamique (ex: avatars d’utilisateurs) devrait être géré différemment.

---

#### 📂 **`components/`** → Composants UI réutilisables  
Ce dossier contient **des composants visuels génériques** qui ne dépendent d’aucune logique métier.  

➡️ **Exemples de fichiers :**  
- `Button.tsx` → Bouton réutilisable  
- `Modal.tsx` → Fenêtre modale  
- `Navbar.tsx` → Barre de navigation  

💡 **Si un composant est réutilisable dans plusieurs pages et n'a pas de logique métier, il va ici.**

---

#### 📂 **`features/`** → Fonctionnalités spécifiques  
Contient **des modules complets** liés à une fonctionnalité. Ces fichiers ont souvent **des appels API et du state**.

➡️ **Exemples de fichiers :**  
- `auth/` → Gestion de l'authentification (`LoginForm.tsx`, `SignupForm.tsx`)  
- `profile/` → Gestion du profil utilisateur (`ProfileCard.tsx`, `EditProfile.tsx`)  

💡 **Si un composant fait partie d’une fonctionnalité spécifique et gère du state, il va ici.**

---

#### 📂 **`hooks/`** → Hooks personnalisés  
Ce dossier contient **des hooks React réutilisables** pour éviter la duplication de code.  

➡️ **Exemples de fichiers :**  
- `useTheme.ts` → Hook pour gérer le mode sombre  
- `useLocalStorage.ts` → Hook pour gérer le stockage local  

💡 **Si tu utilises un `useState`, `useEffect`, ou `useContext` dans plusieurs endroits, crée un hook ici.**

---

#### 📂 **`pages/`** → Pages principales de l’application  
Chaque fichier ici représente une **page unique** de l’application.  

➡️ **Exemples de fichiers :**  
- `Home.tsx` → Page d’accueil  
- `About.tsx` → Page "À propos"  
- `Contact.tsx` → Page de contact  

💡 **Les pages importent généralement des composants depuis `components/` et `features/`.**

---

#### 📂 **`routes/`** → Configuration des routes  
Ce dossier contient **le système de navigation** de l’application.  

➡️ **Exemples de fichiers :**  
- `AppRoutes.tsx` → Définit toutes les routes avec `react-router-dom`  

💡 **Garde ici uniquement les fichiers liés à la gestion des routes.**

---

#### 📂 **`services/`** → Gestion des appels API  
Ce dossier contient **les fonctions qui interagissent avec des services externes** (API, Firebase, etc.).  

➡️ **Exemples de fichiers :**  
- `api.ts` → Instance Axios ou configuration Fetch  
- `authService.ts` → Fonctions liées à l’authentification (`login()`, `register()`)  

💡 **Ne mets ici que des fichiers contenant des appels réseau ou des accès aux bases de données.**

---

#### 📂 **`utils/`** → Fonctions utilitaires  
Ce dossier contient **des fonctions réutilisables** qui n'ont aucun lien avec React.  

➡️ **Exemples de fichiers :**  
- `formatDate.ts` → Formate les dates (`DD/MM/YYYY`)  
- `validateForm.ts` → Vérifie la validité des formulaires  

💡 **Si une fonction peut être utilisée n’importe où et n’a pas besoin de React, elle va ici.**

---

## 🏗️ **Fichiers principaux**
- **`App.tsx`** → Composant principal de l’application.  
- **`index.tsx`** → Point d’entrée qui monte React dans le DOM.  
- **`.gitignore`** → Liste des fichiers à ignorer dans Git.  
- **`package.json`** → Liste des dépendances du projet.  
- **`tsconfig.json`** → Configuration TypeScript.  
- **`README.md`** → Ce fichier !  

---

## ✅ **Règles pour ajouter du code**
1. **Utilise TypeScript** (`.ts` ou `.tsx` pour les fichiers React).  
2. **Respecte l’architecture** expliquée ci-dessus.  
3. **Les composants doivent être fonctionnels et réutilisables autant que possible**.  
4. **Les fichiers doivent être nommés en `PascalCase.tsx` pour les composants** et `camelCase.ts` pour les utilitaires.  
5. **Les fichiers et dossiers doivent être bien organisés** pour éviter le chaos.   
---

## </> Commandes 
1. **Télécharger les dépendances** `npm install`
2. **Lancer le projet et activer hot reload tailwind** `npm start`
3. **Build le projet (ne pas faire avant d'envoyer en prod)** `npm build`
