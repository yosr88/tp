# Memory Game avec Supabase

Ce projet est un jeu de mémoire développé avec React. Il utilise Supabase pour stocker et récupérer les images des cartes du jeu. Chaque carte du jeu est une image d'animal que j'ai récupérée en utilisant l'API Unsplash, et j'utilise Supabase comme backend pour gérer l'état du jeu et le score des utilisateurs.

## Fonctionnalités

- Jeu de mémoire avec des cartes d'animaux
- Score dynamique qui s'incrémente avec chaque paire trouvée
- Intégration avec Supabase pour la persistance des données

## Étapes de Développement

1. **Configuration de Supabase :**

   - J'ai commencé par créer un compte sur Supabase et configuré un nouveau projet.
   - J'ai ensuite créé une table 'mon-app-react' avec les champs id et image_url pour stocker les images pour les cartes

2. **Intégration de l'API Unsplash :**

   - J'ai récupéré les URLs des images d'animaux à l'aide de l'API Unsplash.
   - J'ai inséré ces URLs dans ma table Supabase pour les utiliser dans le jeu.

3. **Développement de l'Application React :**

   - J'ai utilisé `create-react-app` pour initialiser mon projet React.
   - J'ai développé les composants du jeu, y compris les cartes et la logique de jeu.

4. **Connexion avec Supabase :**

   - J'ai intégré le client JavaScript de Supabase dans mon application React dans le fichier supabaseClient.js
   - J'ai utilisé Supabase pour récupérer les images des cartes et gérer le score.

5. **Gestion des Variables d'Environnement :**

   - J'ai configuré les variables d'environnement pour stocker ma clé API Supabase.
   - J'ai veillé à ne pas exposer ma clé API en la plaçant dans un fichier `.env` à la racine du projet.

6. **Tests et Débogage :**

   - J'ai testé mon application localement pour m'assurer que tout fonctionnait correctement.
   - J'ai débogué les problèmes en utilisant les outils de développement de mon navigateur et chatgpt.

7. **Rédaction de ce README :**
   - Enfin, j'ai rédigé ce README pour expliquer mon projet et les étapes suivies pour le développer.
