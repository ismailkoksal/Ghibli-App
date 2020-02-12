Ghibli App 
==========

L'application que vous allez construire durant ces deux séances est une base de connaissance sur l'univers des studios d'animation Ghibli. 
Vous disposez de l'API suivante qui contient toutes les informations nécessaires. 

API : https://ghibliapi.herokuapp.com/ Cette API ne nécessite pas d'authentification. 

L'application est à rendre sur un dépot Gitlab (forge.iut-larochelle.fr), la branche évaluée est master à son état du 12/02/2020 à 18h00. N'oubliez pas de m'ajouter à votre dépot (avec les droits suffisants pour accéder au code). L'application sera évaluée en fonction des fonctionnalités réalisées et fonctionnelles, ainsi que de la qualité du code (nommage, indentation, commentaires, etc.)

## Fonctionnalités attendues

1. L'application est composée d'une vue par endpoint disponible dans l'API, à savoir : films, peoples, locations, species, vehicles. Chaque vue affiche la liste des items disponibles. Chaque clic sur un item affiche ses informations détaillées. Ces pages sont accessibles depuis une page d'accueil recensant ces différentes catégories. L'affichage de ces informations requiert l'usage de requêtes externes, vopus prendrez soin d'ajouter des indicateurs de chargement des pages (spinner).

2. La page "Locations" offre en plus de la liste des items un moyen de filtrer chaque item par la nature du terrain. A titre d'exemple, si l'utilisateur sélectionne la valeur "mountain", seuls les terrains de ce type seront affichés. 

3. L'application propose une page de "Films à voir", l'utilisateur peut ajouter des films à cette liste depuis la page de détail d'un film (ainsi que le supprimer de la liste si il est déjà ajouté)

4. L'application permet de laisser une note textuelle sur chaque film et sur chaque personnage dans la page de détail de chaque item. Ces notes sont égalements accessibles depuis une page "Mes notes". Un filtre permet de n'afficher que l'une ou l'autre de ces catégories de notes. 

5. La page "People" affiche en plus des détails du personnage, la liste des films dans lesquels il est présent. Cette fonction nécessitant éventuellement plusieurs requêtes, vous devez afficher un indicateur de chargement de la page. 

6. En plus de la page d'accueil permettant un accès aux différentes page, un menu (positionné en bas en permanence) permet l'accès aux notes et à la liste des films à voir. 
