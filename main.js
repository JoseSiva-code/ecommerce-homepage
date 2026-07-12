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
}

// PT: Executa a função para carregar os produtos quando o ficheiro JavaScript é lido.
// EN: Runs the function to load the products when the JavaScript file is read.
getProducts();