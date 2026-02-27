# Guide de configuration — Lier le questionnaire à Google Sheets / Excel

Ce guide explique comment connecter le questionnaire NATIF BODY à une Google Sheet
pour recevoir automatiquement toutes les réponses dans un tableur.

---

## Étape 1 : Créer la Google Sheet

1. Va sur [Google Sheets](https://sheets.google.com)
2. Clique sur **"+ Feuille de calcul vierge"**
3. Renomme-la : **"Réponses Questionnaire NATIF BODY"**

## Étape 2 : Ajouter le script

1. Dans ta Google Sheet, va dans **Extensions → Apps Script**
2. **Supprime** tout le code existant dans l'éditeur
3. **Copie-colle** tout le contenu du fichier `google-apps-script.gs` de ce projet
4. Clique sur **💾 Enregistrer** (ou Ctrl+S)

## Étape 3 : Déployer le script

1. Clique sur **"Déployer"** → **"Nouveau déploiement"**
2. À côté de "Sélectionner un type", clique sur l'icône ⚙️ et choisis **"Application Web"**
3. Configure :
   - **Description** : Questionnaire NATIF BODY
   - **Exécuter en tant que** : Moi
   - **Qui a accès** : **Tout le monde**
4. Clique sur **"Déployer"**
5. Google va te demander d'autoriser l'accès → Accepte
6. **Copie l'URL** affichée (elle ressemble à `https://script.google.com/macros/s/XXXXXX/exec`)

## Étape 4 : Connecter le questionnaire

1. Ouvre le fichier `index.html`
2. Trouve cette ligne (vers le haut du `<script>`) :
   ```javascript
   const GOOGLE_SCRIPT_URL = 'COLLER_VOTRE_URL_ICI';
   ```
3. Remplace `COLLER_VOTRE_URL_ICI` par l'URL copiée à l'étape 3 :
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXX/exec';
   ```
4. Sauvegarde le fichier

## Étape 5 : Tester

1. Ouvre le questionnaire dans ton navigateur
2. Remplis et envoie une réponse test
3. Retourne sur ta Google Sheet → la réponse devrait apparaître !

---

## Colonnes dans la Google Sheet

| Colonne | Contenu |
|---------|---------|
| A | Horodatage (date et heure) |
| B | Fréquence de visite |
| C | Freins |
| D | Avis coaching |
| E | Créneaux souhaités |
| F | Ce qui ferait revenir |
| G | Commentaire libre |
| H | Email |

## Exporter en Excel

Pour télécharger les données en Excel :
1. Dans Google Sheets, va dans **Fichier → Télécharger → Microsoft Excel (.xlsx)**
2. Le fichier Excel sera téléchargé sur ton ordinateur

## FAQ

**Les réponses n'apparaissent pas dans la Sheet ?**
- Vérifie que l'URL dans `index.html` est correcte
- Vérifie que le déploiement est en mode "Tout le monde" pour l'accès
- Ouvre la console du navigateur (F12) pour voir s'il y a des erreurs

**Je veux modifier le script après déploiement ?**
- Va dans Apps Script, modifie le code
- Puis "Déployer" → "Gérer les déploiements" → "Modifier" → redéploie

**C'est gratuit ?**
- Oui, Google Apps Script est entièrement gratuit (jusqu'à ~20 000 requêtes/jour)
