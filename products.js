document.addEventListener("DOMContentLoaded", () => {
    
    // On récupère ici la marque et l'ID de la chaussure à afficher, qui sont passés en paramètres dans l'URL de la page.
    const params = new URLSearchParams(window.location.search);
    const urlBrand = params.get("brand");
    const urlId = params.get("id");

    if (urlBrand !== null && urlId !== null) {
        
        fetch("https://makerslab.em-lyon.com/dww/data/products.json")
            .then(response => response.json())
            .then(data => {
                // On récupère les données de la chaussure sélectionnée grâce à la marque et à l'ID obtenus depuis l'URL.
                const shoe = data.items[urlBrand][urlId];

                // On remplit les éléments de la page avec les données de la chaussure sélectionnée
                document.getElementById("prod-image").src = shoe.image;
                document.getElementById("prod-nom").textContent = shoe.name;
                document.getElementById("prod-desc").textContent = shoe.description;
                document.getElementById("prod-prix").textContent = shoe.price + " €";

                // On crée une grille de boutons pour les tailles disponibles
                const taillesContainer = document.getElementById("prod-tailles");
                taillesContainer.innerHTML = ""; // On vide la grille

                shoe.availability.forEach(taille => {
                    const btn = document.createElement("button");
                    btn.className = "btn-taille";
                    btn.textContent = taille.size;

                    // Si la taille est en rupture de stock, on grise le bouton
                    if (taille.quantity === 0) {
                        btn.style.opacity = "0.3";
                        btn.style.textDecoration = "line-through";
                        btn.disabled = true;
                    }

                    taillesContainer.appendChild(btn);
                });

            })
    } else {
        // A but informatif : on affiche une erreur dans la console pour repérer l'erreur plus facilement.
        console.log("ERREUR : Il manque la marque ou l'ID dans l'URL.");
    }
});