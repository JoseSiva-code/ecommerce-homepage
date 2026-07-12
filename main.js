// PT: Guarda o endereço da API de onde vamos buscar os produtos.
// EN: Stores the API address where we will fetch the products from.
const productsUrl = "https://fakestoreapi.com/products";

// PT: Seleciona a zona #products do HTML para lá colocar os cards dos produtos.
// EN: Selects the #products area in the HTML to place the product cards there.
const productsSection = document.querySelector("#products");

// PT: Cria uma função assíncrona para buscar os produtos à API sem bloquear a página.
// EN: Creates an async function to fetch the products from the API without blocking the page.
async function getProducts() {
    // PT: Faz o pedido à API e espera pela resposta antes de continuar.
    // EN: Sends the request to the API and waits for the response before continuing.
    const response = await fetch(productsUrl);
    // PT: Converte a resposta da API para um array de produtos em JavaScript.
    // EN: Converts the API response into a JavaScript array of products.
    const products = await response.json();
    // PT: Mostra os produtos na consola para confirmar que a API respondeu corretamente.
    // EN: Shows the products in the console to confirm that the API responded correctly.
    console.log(products);
    // PT: Envia a lista de produtos para a função que vai criar os cards no HTML.
    // EN: Sends the product list to the function that will create the cards in the HTML.
    showProducts(products);
}

// PT: Cria uma função que recebe a lista de produtos e prepara a criação dos cards.
// EN: Creates a function that receives the product list and prepares the card creation.
function showProducts(products) {
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
            // PT: Adiciona a imagem do produto dentro do card.
            // EN: Adds the product image inside the card.
            productCard.appendChild(productImage);
            // PT: Adiciona o título do produto dentro do card, por baixo da imagem.
            // EN: Adds the product title inside the card, below the image.
            productCard.appendChild(productTitle);
            // PT: Adiciona o card completo dentro da section de produtos no HTML.
            // EN: Adds the completed card inside the products section in the HTML.
            productsSection.appendChild(productCard);
    });
}

// PT: Executa a função para carregar os produtos quando o ficheiro JavaScript é lido.
// EN: Runs the function to load the products when the JavaScript file is read.
getProducts();