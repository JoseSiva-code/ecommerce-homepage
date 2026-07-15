// PT: Cria e exporta uma função para adicionar um produto ao carrinho a partir de outro ficheiro.
// EN: Creates and exports a function to add a product to the cart from another file.
export async function addProductToCart(product) {

    // PT: Guarda o endpoint do carrinho que será atualizado com o produto escolhido.
    // EN: Stores the cart endpoint that will be updated with the selected product.
    const cartUrl = "https://fakestoreapi.com/carts/7";

    // PT: Cria a data atual no formato YYYY-MM-DD pedido pela API.
    // EN: Creates the current date in the YYYY-MM-DD format required by the API.
    const currentDate = new Date().toISOString().split("T")[0];

    // PT: Cria os dados que serão enviados para atualizar o carrinho na API.
    // EN: Creates the data that will be sent to update the cart in the API.
    const cartData = {
        // PT: Define o id do utilizador que está a atualizar o carrinho.
        // EN: Defines the user id that is updating the cart.
        userId: 1,
        // PT: Define a data atual como data da atualização do carrinho.
        // EN: Defines the current date as the cart update date.
        date: currentDate,
        // PT: Cria a lista de produtos enviada para o carrinho, usando o id do produto clicado.
        // EN: Creates the product list sent to the cart, using the clicked product id.
        products: [
            {
                productId: product.id,
                quantity: 1
            }
        ],
    };

    // PT: Envia os dados para a API usando PUT para atualizar o carrinho.
    // EN: Sends the data to the API using PUT to update the cart.
    const response = await fetch(cartUrl, {
        // PT: Define que o pedido vai atualizar dados existentes.
        // EN: Defines that the request will update existing data.
        method: "PUT",
        // PT: Informa a API que vamos enviar dados em formato JSON.
        // EN: Tells the API that we are sending data in JSON format.
        headers: {
            "Content-Type": "application/json"
        },
        
        // PT: Converte o objeto cartData para texto JSON antes de enviar.
        // EN: Converts the cartData object into JSON text before sending.
        body: JSON.stringify(cartData),
    });
 
    // PT: Converte a resposta da API para um objeto JavaScript.
    // EN: Converts the API response into a JavaScript object.
    const updatedCart = await response.json();
    // PT: Mostra na consola o carrinho atualizado para confirmar que o pedido funcionou.
    // EN: Shows the updated cart in the console to confirm that the request worked.
    console.log(updatedCart);
}

    

   