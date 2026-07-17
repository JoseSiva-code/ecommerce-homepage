// PT: Cria a classe Ecommerce para organizar produtos e carrinho de compras.
// EN: Creates the Ecommerce class to organize products and shopping cart.
export class Ecommerce {
    // PT: Prepara a lista de produtos e o carrinho quando criamos um novo Ecommerce.
    // EN: Prepares the product list and cart when we create a new Ecommerce.
    constructor() {
        // PT: Guarda todos os produtos adicionados à loja.
        // EN: Stores all products added to the store.
        this.products = [];
        // PT: Guarda os produtos adicionados ao carrinho de compras.
        // EN: Stores the products added to the shopping cart.
        this.cart = [];
    }
    // PT: Adiciona um produto à lista de produtos da loja.
    // EN: Adds a product to the store product list.
    addProduct(product) {
        // PT: Coloca o produto recebido no fim do array de produtos.
        // EN: Places the received product at the end of the products array.
        this.products.push(product);
    }

    // PT: Atualiza o preço de um produto através do seu id.
    // EN: Updates a product price using its id.
    setProductPrice(productId, price) {
        // PT: Procura na lista o produto que tem o mesmo id recebido.
        // EN: Searches the list for the product that has the same received id.
        const product = this.products.find((product) => product.id === productId);
        // PT: Se o produto existir, atualiza o seu preço com o novo valor.
        // EN: If the product exists, updates its price with the new value.
        if (product) {
            product.price = price;
        }
    }

    // PT: Devolve a lista completa de produtos da loja.
    // EN: Returns the complete list of store products.
    getAllProducts() {
        // PT: Devolve o array com todos os produtos guardados na loja.
        // EN: Returns the array with all products stored in the store.
        return this.products;
    }
    // PT: Devolve uma string com todos os nomes dos produtos separados por ponto e vírgula.
    // EN: Returns a string with all product names separated by semicolons.
    getAllProductsNames() {
        // PT: Cria um novo array apenas com os nomes dos produtos e junta tudo numa string.
        // EN: Creates a new array only with product names and joins everything into one string.
        return this.products.map((product) => product.name).join("; ");
    } 
    // PT: Devolve um produto específico através do seu id.
    // EN: Returns a specific product using its id.
    getProductById(productId) {
        // PT: Procura e devolve o produto que tem o mesmo id recebido.
        // EN: Searches and returns the product that has the same received id.
        return this.products.find((product) => product.id === productId);
    }

    // PT: Devolve produtos com preço entre o valor inicial e o valor final.
    // EN: Returns products with price between the initial value and the final value.
    getProductsByPrice(initialPrice, finalPrice) {
        // PT: Filtra produtos com preço maior ou igual ao inicial e menor ou igual ao final.
        // EN: Filters products with price greater than or equal to the initial value and less than or equal to the final value.
        return this.products.filter((product) => product.price >= initialPrice && product.price <= finalPrice);
    }
    
    // PT: Adiciona um produto ao carrinho de compras.
    // EN: Adds a product to the shopping cart.
    addProductToCart(product) {
        // PT: Coloca o produto recebido no fim do array do carrinho.
        // EN: Places the received product at the end of the cart array.
        this.cart.push(product);
    }

    // PT: Devolve a lista de produtos que estão no carrinho.
    // EN: Returns the list of products that are in the cart.
    getCart() {
        // PT: Devolve o array com todos os produtos adicionados ao carrinho.
        // EN: Returns the array with all products added to the cart.
        return this.cart;
    }

    // PT: Devolve a soma dos preços de todos os produtos no carrinho.
    // EN: Returns the sum of the prices of all products in the cart.
    getCartTotalPrice() {
        // PT: Soma os preços dos produtos do carrinho começando em zero.
        // EN: Sums the prices of the cart products starting from zero.
        return this.cart.reduce((total, product) => total + product.price, 0);
    }
}




