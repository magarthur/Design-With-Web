document.addEventListener("DOMContentLoaded", () => {
    
    // URL of the dataset
    const datasetURL = "https://makerslab.em-lyon.com/dww/data/products.json";
    
    const loadData = async (doStuffs) => {
        try {
            const response = await fetch(datasetURL);
            if(!response.ok){
                throw new Error('Network response not ok :' + response.statusText);
            }
            const data = await response.json();
            doStuffs(data);

        } catch (error) {
            console.error("Problem occured while getting your data" + error)
        }
    } 
    
    // On selecte la grille de produits dans laquelle on va ajouter les blocs de chaque chaussure.
    const grilleProduits = document.querySelector(".grille-produits");

    // On cree une fonction qui va s'occuper d'afficher les produits. Elle prend en paramètre les données du dataset.
    const displayProducts = (data) => {
        
        // Première boucle : on parcourt chaque marque de chaussure
        data.brands.forEach((brand) => {

            // Seconde boucle : on parcourt chaque modèle de la marque
            data.items[brand].forEach((model, index) => {
                
                const cardHTML = `
                    <div>
                        <a class="carte-produit" href="product.html?brand=${brand}&id=${index}">
                            <img src="${model.image}" alt="${model.name}" />
                            
                            <div class="coloris-liste">
                                <div class="coloris-vignette">
                                    <img src="${model.image}" alt="coloris ${model.name}" />
                                </div>
                            </div>
                        </a>    
                        <span class="carte-nom">${model.name}</span>
                        <span class="carte-description">${model.description}</span>
                        <span class="carte-prix">${model.price} €</span>
                    </div>
                `;
                
                grilleProduits.innerHTML += cardHTML;
            });
        });
    };

    // On upload les données et on affiche les produits.
    loadData(displayProducts);
});