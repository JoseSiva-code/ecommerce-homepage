// PT: Importa a função externa que envia o produto escolhido para o carrinho.
// EN: Imports the external function that sends the selected product to the cart.
import { addProductToCart } from "./cart.js";

// PT: Guarda o endereço da API de onde vamos buscar os produtos.
// EN: Stores the API address where we will fetch the products from.
const productsUrl = "https://fakestoreapi.com/products";

// PT: Seleciona a zona #products do HTML para lá colocar os cards dos produtos.
// EN: Selects the #products area in the HTML to place the product cards there.
const productsSection = document.querySelector("#products");

// PT: Seleciona o contador do carrinho para atualizar o número de produtos adicionados.
// EN: Selects the cart counter to update the number of added products.
const cartCounter = document.querySelector("#cart-counter");

// PT: Seleciona todos os botões de filtro para podermos adicionar eventos de clique.
// EN: Selects all filter buttons so we can add click events to them.
const filterButtons = document.querySelectorAll(".filters button");

// PT: Guarda o número de produtos adicionados ao carrinho.
// EN: Stores the number of products added to the cart.
let cartCount = 0;

// PT: Guarda todos os produtos recebidos da API para podermos filtrar sem pedir dados outra vez.
// EN: Stores all products received from the API so we can filter without fetching data again.
let allProducts = [];

// PT: Mostra uma mensagem enquanto os produtos estão a carregar.
// EN: Shows a message while the products are loading.
productsSection.textContent = "Loading products...";

// PT: Adiciona uma classe para estilizar visualmente a mensagem de carregamento.
// EN: Adds a class to visually style the loading message.
productsSection.classList.add("products-message");

// PT: Cria uma função assíncrona para buscar os produtos à API sem bloquear a página.
// EN: Creates an async function to fetch the products from the API without blocking the page.
async function getProducts() {
    try {
    // PT: Faz o pedido à API e espera pela resposta antes de continuar.
    // EN: Sends the request to the API and waits for the response before continuing.
    const response = await fetch(productsUrl);
    
    // PT: Converte a resposta da API para um array de produtos em JavaScript.
    // EN: Converts the API response into a JavaScript array of products.
    const products = await response.json();
    
    // PT: Guarda a lista completa de produtos para ser usada pelos filtros.
    // EN: Stores the complete product list to be used by the filters.
    allProducts = products;

    // PT: Mostra os produtos na consola para confirmar que a API respondeu corretamente.
    // EN: Shows the products in the console to confirm that the API responded correctly.
    console.log(products);
    
    // PT: Envia a lista de produtos para a função que vai criar os cards no HTML.
    // EN: Sends the product list to the function that will create the cards in the HTML.
    showProducts(products);
    } catch (error) {
        // PT: Mostra uma mensagem amigável se os produtos não forem carregados.
        // EN: Shows a friendly message if the products are not loaded.
        productsSection.textContent = "Unable to load products. Please try again later.";
        // PT: Adiciona uma classe para estilizar visualmente a mensagem de erro.
        // EN: Adds a class to visually style the error message.
        productsSection.classList.add("products-error");   
    }

}

// PT: Cria uma função que recebe a lista de produtos e prepara a criação dos cards.
// EN: Creates a function that receives the product list and prepares the card creation.
function showProducts(products) {
    // PT: Limpa a mensagem de loading antes de mostrar os produtos.
    // EN: Clears the loading message before showing the products.
    productsSection.textContent = "";

    // PT: Remove a classe da mensagem para a secção voltar a usar o layout dos produtos.
    // EN: Removes the message class so the section can use the product layout again.
    productsSection.classList.remove("products-message");
    
    // PT: Remove a classe de erro caso a lista de produtos seja mostrada corretamente.
    // EN: Removes the error class if the product list is shown correctly.
    productsSection.classList.remove("products-error");

    // PT: Percorre cada produto recebido da API para criar um card individual.
    // EN: Loops through each product received from the API to create an individual card.
    products.forEach((product) => {
            
            // PT: Cria uma div para guardar a informação de um produto.
            // EN: Creates a div to hold the information of one product.
            const productCard = document.createElement("div");
            
            // PT: Adiciona uma classe CSS ao card para podermos estilizar todos os produtos da mesma forma.
            // EN: Adds a CSS class to the card so we can style all products the same way.
            productCard.classList.add("product-card");
            
            // PT: Cria um elemento de imagem para mostrar a imagem do produto.
            // EN: Creates an image element to show the product image.
            const productImage = document.createElement("img");
            
            // PT: Define o caminho da imagem usando a propriedade image do produto recebido da API.
            // EN: Sets the image path using the image property from the product received from the API.
            productImage.src = product.image;
            
            // PT: Define um texto alternativo para a imagem usando o nome do produto.
            // EN: Sets alternative text for the image using the product name.
            productImage.alt = product.title;
            
            // PT: Cria um título para mostrar o nome do produto no card.
            // EN: Creates a heading to show the product name inside the card.
            const productTitle = document.createElement("h2");
            
            // PT: Coloca o nome do produto dentro do título criado.
            // EN: Places the product name inside the created heading.
            productTitle.textContent = product.title;

            // PT: Cria um parágrafo para mostrar o preço do produto no card.
            // EN: Creates a paragraph to show the product price inside the card.
            const productPrice = document.createElement("p");

            // PT: Define o texto do preço usando o valor price recebido da API.
            // EN: Defines the price text using the price value received from the API.
            productPrice.textContent = `$${product.price}`;

            // PT: Adiciona uma classe CSS ao preço para o destacar visualmente.
            // EN: Adds a CSS class to the price to visually highlight it.
            productPrice.classList.add("product-price");

            // PT: Cria um botão para permitir adicionar o produto ao carrinho.
            // EN: Creates a button to allow adding the product to the cart.
            const addToCartButton = document.createElement("button");

            // PT: Define o texto visível do botão.
            // EN: Defines the visible text of the button.
            addToCartButton.textContent = "Add to cart";

            // PT: Quando o botão é clicado, chama a função externa e mostra feedback visual ao utilizador.
            // EN: When the button is clicked, calls the external function and shows visual feedback to the user.
            addToCartButton.addEventListener("click", async () => {
                addToCartButton.textContent = "Adding...";

                // PT: Desativa o botão enquanto o produto está a ser enviado para o carrinho.
                // EN: Disables the button while the product is being sent to the cart.
                addToCartButton.disabled = true;

                // PT: Mantém o estado "Adding..." visível durante dois segundos antes de continuar.
                // EN: Keeps the "Adding..." state visible for two seconds before continuing.
                await new Promise((resolve) => setTimeout(resolve, 2000));

                // PT: Espera a API responder e guarda o carrinho atualizado.
                // EN: Waits for the API response and stores the updated cart.
                const updatedCart = await addProductToCart(product);

                // PT: Mostra no main.js o resultado recebido da função externa.
                // EN: Shows in main.js the result received from the external function.
                console.log(updatedCart);
                
                // PT: Mostra no botão que o produto foi adicionado ao carrinho.
                // EN: Shows on the button that the product was added to the cart.
                addToCartButton.textContent = "Added";

                // PT: Aumenta o contador do carrinho depois de adicionar um produto.
                // EN: Increases the cart counter after adding a product.
                cartCount++;

                // PT: Atualiza o texto do contador no header com o novo total.
                // EN: Updates the counter text in the header with the new total.
                cartCounter.textContent = `Cart (${cartCount})`;

                // PT: Volta o texto do botão ao estado inicial depois de dois segundos.
                // EN: Returns the button text to its initial state after two seconds.
                setTimeout(() => {
                    addToCartButton.textContent = "Add to cart";
                    // PT: Reativa o botão depois de terminar o feedback visual.
                    // EN: Enables the button again after the visual feedback finishes.
                    addToCartButton.disabled = false;
                }, 3000);
            });

                 
            
            // PT: Adiciona a imagem do produto dentro do card.
            // EN: Adds the product image inside the card.
            productCard.appendChild(productImage);
            
            // PT: Adiciona o título do produto dentro do card, por baixo da imagem.
            // EN: Adds the product title inside the card, below the image.
            productCard.appendChild(productTitle);

            // PT: Adiciona o preço do produto dentro do card, por baixo do título.
            // EN: Adds the product price inside the card, below the title.
            productCard.appendChild(productPrice);

            // PT: Adiciona o botão ao card por baixo do título do produto.
            // EN: Adds the button to the card below the product title.
            productCard.appendChild(addToCartButton);
            
            // PT: Adiciona o card completo dentro da section de produtos no HTML.
            // EN: Adds the completed card inside the products section in the HTML.
            productsSection.appendChild(productCard);
    });
}

// PT: Cria uma função para preparar os cliques nos botões de filtro.
// EN: Creates a function to prepare the clicks on the filter buttons.
function setupFilters() {
    // PT: Percorre todos os botões de filtro para adicionar um evento de clique a cada um.
    // EN: Loops through all filter buttons to add a click event to each one.
    filterButtons.forEach((button) => {
        // PT: Quando o botão for clicado, vamos descobrir a categoria escolhida.
        // EN: When the button is clicked, we will find out the selected category.
        button.addEventListener("click", () => {
            // PT: Guarda a categoria escolhida usando o atributo data-category do botão clicado.
            // EN: Stores the selected category using the data-category attribute from the clicked button.
            const selectedCategory = button.dataset.category;
            
            // PT: Remove a classe active de todos os botões antes de marcar o botão clicado.
            // EN: Removes the active class from all buttons before marking the clicked button.
            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active");
            });

            // PT: Adiciona a classe active ao botão que foi clicado.
            // EN: Adds the active class to the button that was clicked.
            button.classList.add("active");

            // PT: Se a categoria escolhida for "all", mostra novamente todos os produtos.
            // EN: If the selected category is "all", shows all products again.
            if (selectedCategory === "all") {
                showProducts(allProducts);
            } else {
                // PT: Cria uma nova lista apenas com os produtos da categoria escolhida.
                // EN: Creates a new list only with the products from the selected category.
                const filteredProducts = allProducts.filter((product) => product.category === selectedCategory);

                // PT: Mostra no ecrã apenas os produtos filtrados.
                // EN: Shows on the screen only the filtered products.
                showProducts(filteredProducts);
            }
        });
    });
}

// PT: Executa a função para carregar os produtos quando o ficheiro JavaScript é lido.
// EN: Runs the function to load the products when the JavaScript file is read.
getProducts();

// PT: Executa a função que ativa os botões de filtro.
// EN: Runs the function that activates the filter buttons.
setupFilters();
