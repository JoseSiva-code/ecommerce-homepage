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

// PT: Seleciona o subtotal do carrinho para atualizar o valor total dos produtos adicionados.
// EN: Selects the cart subtotal to update the total value of added products.
const cartSubtotal = document.querySelector("#cart-subtotal");

// PT: Seleciona o campo do IVA para mostrar quanto imposto está incluído no subtotal.
// EN: Selects the VAT field to show how much tax is included in the subtotal.
const cartVat = document.querySelector("#cart-vat");

// PT: Seleciona o botão que limpa todos os produtos do carrinho.
// EN: Selects the button that clears all products from the cart.
const clearCartButton = document.querySelector("#clear-cart-button");

// PT: Seleciona a zona onde vão aparecer os artigos adicionados ao carrinho.
// EN: Selects the area where the added cart items will appear.
const cartItemsList = document.querySelector("#cart-items");

// PT: Seleciona todos os botões de filtro para podermos adicionar eventos de clique.
// EN: Selects all filter buttons so we can add click events to them.
const filterButtons = document.querySelectorAll(".filters button");

// PT: Guarda o número de produtos adicionados ao carrinho.
// EN: Stores the number of products added to the cart.
let cartCount = 0;

// PT: Guarda o valor total dos produtos adicionados ao carrinho.
// EN: Stores the total value of products added to the cart.
let cartSubtotalValue = 0;

// PT: Guarda cada artigo adicionado para podermos remover apenas o artigo escolhido.
// EN: Stores each added item so we can remove only the chosen item.
let cartItems = [];

// PT: Guarda a taxa de IVA incluída nos preços apresentados.
// EN: Stores the VAT rate included in the displayed prices.
const vatRate = 0.19;

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

            // PT: Cria uma pequena etiqueta para mostrar a categoria do produto.
            // EN: Creates a small label to show the product category.
            const productCategory = document.createElement("span");

            // PT: Mostra "Backpacks" na etiqueta quando o produto for uma mochila.
            // EN: Shows "Backpacks" in the label when the product is a backpack.
            if (product.title.toLowerCase().includes("backpack")) {
                productCategory.textContent = "Backpacks";
            } else {
                productCategory.textContent = product.category;
            }

            // PT: Adiciona uma classe CSS à categoria para a estilizar como etiqueta.
            // EN: Adds a CSS class to the category so it can be styled as a label.
            productCategory.classList.add("product-category");

            // PT: Cria um parágrafo para mostrar o preço do produto no card.
            // EN: Creates a paragraph to show the product price inside the card.
            const productPrice = document.createElement("p");

            // PT: Define o texto do preço usando o valor price recebido da API.
            // EN: Defines the price text using the price value received from the API.
            productPrice.textContent = `$${product.price}`;

            // PT: Adiciona uma classe CSS ao preço para o destacar visualmente.
            // EN: Adds a CSS class to the price to visually highlight it.
            productPrice.classList.add("product-price");

            // PT: Guarda as opções certas para o tipo de produto atual.
            // EN: Stores the correct options for the current product type.
            const productOptions = getProductOptions(product);

            // PT: Cria os elementos visuais das opções do produto.
            // EN: Creates the visual elements for the product options.
            const productOptionsElement = createProductOptions(productOptions);

            // PT: Atualiza o preço visível no card quando o cliente escolhe opções com preço extra.
            // EN: Updates the visible card price when the customer chooses options with an extra price.
            function updateProductPrice() {
                // PT: Soma todos os preços extra das opções selecionadas neste produto.
                // EN: Adds all extra prices from the selected options in this product.
                const selectedOptionsExtraPrice = Array.from(productOptionsElement.querySelectorAll(".option-select")).reduce((total, select) => {
                    return total + Number(select.selectedOptions[0].dataset.priceModifier);
                }, 0);

                // PT: Calcula o preço atualizado do produto com as opções escolhidas.
                // EN: Calculates the updated product price with the selected options.
                const updatedProductPrice = product.price + selectedOptionsExtraPrice;

                // PT: Mostra o preço atualizado no card com duas casas decimais.
                // EN: Shows the updated price in the card with two decimal places.
                productPrice.textContent = `$${updatedProductPrice.toFixed(2)}`;
            }

            // PT: Atualiza o preço sempre que o cliente muda uma opção do produto.
            // EN: Updates the price whenever the customer changes a product option.
            productOptionsElement.querySelectorAll(".option-select").forEach((select) => {
                select.addEventListener("change", updateProductPrice);
            });

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

                // PT: Mostra no botão que o produto foi adicionado ao carrinho.
                // EN: Shows on the button that the product was added to the cart.
                addToCartButton.textContent = "Added";

                // PT: Aumenta o contador do carrinho depois de adicionar um produto.
                // EN: Increases the cart counter after adding a product.
                const selectedQuantity = Number(productOptionsElement.querySelector(".option-quantity").value);

                // PT: Soma todos os preços extra das opções selecionadas no produto.
                // EN: Adds all extra prices from the selected product options.
                const selectedOptionsExtraPrice = Array.from(productOptionsElement.querySelectorAll(".option-select")).reduce((total, select) => {
                    return total + Number(select.selectedOptions[0].dataset.priceModifier);
                }, 0);

                // PT: Guarda o texto das opções escolhidas para aparecerem no carrinho.
                // EN: Stores the selected option text so it can appear in the cart.
                const selectedOptionsText = Array.from(productOptionsElement.querySelectorAll(".option-select")).map((select) => select.value).join(", ");

                // PT: Calcula o preço final de uma unidade com as opções escolhidas.
                // EN: Calculates the final unit price with the selected options.
                const cartItemUnitPrice = product.price + selectedOptionsExtraPrice;

                // PT: Guarda o artigo adicionado numa lista para permitir removê-lo individualmente.
                // EN: Stores the added item in a list so it can be removed individually.
                cartItems.push({
                    title: product.title,
                    options: selectedOptionsText || "Default",
                    quantity: selectedQuantity,
                    unitPrice: cartItemUnitPrice,
                    totalPrice: cartItemUnitPrice * selectedQuantity
                });

                // PT: Atualiza o contador, subtotal, IVA e lista visual do carrinho.
                // EN: Updates the counter, subtotal, VAT, and visible cart list.
                updateCartDisplay();

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

            // PT: Adiciona a categoria do produto por baixo do título.
            // EN: Adds the product category below the title.
            productCard.appendChild(productCategory);

            // PT: Adiciona o preço do produto dentro do card, por baixo do título.
            // EN: Adds the product price inside the card, below the title.
            productCard.appendChild(productPrice);

            // PT: Adiciona as opções do produto ao card, por baixo do preço.
            // EN: Adds the product options to the card, below the price.
            productCard.appendChild(productOptionsElement);

            // PT: Adiciona o botão ao card por baixo do título do produto.
            // EN: Adds the button to the card below the product title.
            productCard.appendChild(addToCartButton);
            
            // PT: Adiciona o card completo dentro da section de produtos no HTML.
            // EN: Adds the completed card inside the products section in the HTML.
            productsSection.appendChild(productCard);
    });
}

// PT: Atualiza todos os valores visíveis do carrinho a partir da lista de artigos guardada.
// EN: Updates all visible cart values from the stored items list.
function updateCartDisplay() {
    // PT: Soma todas as quantidades guardadas para saber quantos artigos existem no carrinho.
    // EN: Adds all stored quantities to know how many items exist in the cart.
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // PT: Soma todos os preços totais guardados para calcular o subtotal.
    // EN: Adds all stored total prices to calculate the subtotal.
    cartSubtotalValue = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    // PT: Calcula o IVA incluído no subtotal atual.
    // EN: Calculates the VAT included in the current subtotal.
    const includedVat = cartSubtotalValue - cartSubtotalValue / (1 + vatRate);

    // PT: Atualiza o contador visível do carrinho.
    // EN: Updates the visible cart counter.
    cartCounter.textContent = `Cart (${cartCount})`;

    // PT: Atualiza o subtotal visível do carrinho.
    // EN: Updates the visible cart subtotal.
    cartSubtotal.textContent = `Subtotal: $${cartSubtotalValue.toFixed(2)}`;

    // PT: Atualiza o IVA visível do carrinho.
    // EN: Updates the visible cart VAT.
    cartVat.textContent = `VAT incl.: $${includedVat.toFixed(2)}`;

    // PT: Limpa a lista visual antes de desenhar novamente os artigos atuais.
    // EN: Clears the visible list before drawing the current items again.
    cartItemsList.textContent = "";

    // PT: Remove a classe antiga antes de decidir se a lista fica minimizada.
    // EN: Removes the old class before deciding if the list stays collapsed.
    cartItemsList.classList.remove("cart-collapsed");

    // PT: Se o carrinho estiver vazio, a lista não precisa de estado aberto ou minimizado.
    // EN: If the cart is empty, the list does not need an open or collapsed state.
    if (cartItems.length === 0) {
        return;
    }

    // PT: Quando existe pelo menos um artigo, mantém a lista minimizada até haver hover/foco.
    // EN: When there is at least one item, keeps the list collapsed until hover/focus.
    cartItemsList.classList.add("cart-collapsed");

    // PT: Percorre cada artigo do carrinho para criar uma linha com botão de remover.
    // EN: Loops through each cart item to create a row with a remove button.
    cartItems.forEach((item, index) => {
        // PT: Cria a linha visual de um artigo dentro do carrinho.
        // EN: Creates the visual row for one item inside the cart.
        const cartItem = document.createElement("div");

        // PT: Adiciona uma classe CSS para estilizar cada linha do carrinho.
        // EN: Adds a CSS class to style each cart row.
        cartItem.classList.add("cart-item");

        // PT: Cria o texto com nome, opções, quantidade e preço do artigo.
        // EN: Creates the text with the item name, options, quantity, and price.
        const cartItemText = document.createElement("span");

        // PT: Mostra um resumo curto do artigo adicionado.
        // EN: Shows a short summary of the added item.
        cartItemText.textContent = `${item.quantity}x ${item.title} (${item.options}) - $${item.totalPrice.toFixed(2)}`;

        // PT: Cria um pequeno grupo para escolher a quantidade a remover e confirmar a remoção.
        // EN: Creates a small group to choose the quantity to remove and confirm the removal.
        const removeControls = document.createElement("div");

        // PT: Adiciona uma classe CSS ao grupo dos controlos de remoção.
        // EN: Adds a CSS class to the removal controls group.
        removeControls.classList.add("cart-remove-controls");

        // PT: Cria o campo onde o cliente escreve quantas unidades quer remover.
        // EN: Creates the field where the customer types how many units they want to remove.
        const removeQuantityInput = document.createElement("input");

        // PT: Define o campo como numérico para aceitar apenas quantidades.
        // EN: Sets the field as numeric to accept only quantities.
        removeQuantityInput.type = "number";

        // PT: Define que pelo menos uma unidade pode ser removida.
        // EN: Defines that at least one unit can be removed.
        removeQuantityInput.min = "1";

        // PT: Define que a quantidade máxima a remover é a quantidade existente deste artigo.
        // EN: Defines that the maximum removable quantity is the existing quantity of this item.
        removeQuantityInput.max = item.quantity;

        // PT: Começa com uma unidade selecionada para evitar remover tudo por engano.
        // EN: Starts with one selected unit to avoid removing everything by mistake.
        removeQuantityInput.value = "1";

        // PT: Adiciona uma classe CSS ao campo de quantidade a remover.
        // EN: Adds a CSS class to the remove quantity field.
        removeQuantityInput.classList.add("remove-quantity");

        // PT: Cria o botão para remover a quantidade escolhida deste artigo.
        // EN: Creates the button to remove the chosen quantity from this item.
        const removeItemButton = document.createElement("button");

        // PT: Define o texto visível do botão de remoção.
        // EN: Defines the visible text of the remove button.
        removeItemButton.textContent = "Remove";

        // PT: Quando clicado, remove apenas a quantidade escolhida deste artigo.
        // EN: When clicked, removes only the chosen quantity from this item.
        removeItemButton.addEventListener("click", () => {
            // PT: Guarda a quantidade escrita pelo cliente no campo de remoção.
            // EN: Stores the quantity typed by the customer in the removal field.
            const requestedRemoveQuantity = Number(removeQuantityInput.value);

            // PT: Para a remoção se o valor escrito não for válido.
            // EN: Stops the removal if the typed value is not valid.
            if (Number.isNaN(requestedRemoveQuantity) || requestedRemoveQuantity < 1) {
                return;
            }

            // PT: Garante que a quantidade removida nunca passa da quantidade disponível.
            // EN: Ensures the removed quantity never exceeds the available quantity.
            const removeQuantity = Math.min(requestedRemoveQuantity, item.quantity);

            // PT: Reduz a quantidade deste artigo no carrinho.
            // EN: Reduces this item's quantity in the cart.
            item.quantity -= removeQuantity;

            // PT: Recalcula o preço total deste artigo depois da redução de quantidade.
            // EN: Recalculates this item's total price after the quantity reduction.
            item.totalPrice = item.unitPrice * item.quantity;

            // PT: Se a quantidade chegar a zero, remove a linha completa do carrinho.
            // EN: If the quantity reaches zero, removes the complete row from the cart.
            if (item.quantity === 0) {
                cartItems.splice(index, 1);
            }

            // PT: Atualiza novamente o carrinho depois da remoção.
            // EN: Updates the cart again after the removal.
            updateCartDisplay();
        });

        // PT: Adiciona o campo de quantidade aos controlos de remoção.
        // EN: Adds the quantity field to the removal controls.
        removeControls.appendChild(removeQuantityInput);

        // PT: Adiciona o botão aos controlos de remoção.
        // EN: Adds the button to the removal controls.
        removeControls.appendChild(removeItemButton);

        // PT: Adiciona o texto do artigo dentro da linha.
        // EN: Adds the item text inside the row.
        cartItem.appendChild(cartItemText);

        // PT: Adiciona os controlos de remoção dentro da linha.
        // EN: Adds the removal controls inside the row.
        cartItem.appendChild(removeControls);

        // PT: Adiciona a linha completa à lista visual do carrinho.
        // EN: Adds the complete row to the visible cart list.
        cartItemsList.appendChild(cartItem);
    });
}

// PT: Cria a interface visual das opções do produto dentro do card.
// EN: Creates the visual interface for the product options inside the card.
function createProductOptions(productOptions) {
    // PT: Cria um container para guardar todos os grupos de opções do produto.
    // EN: Creates a container to hold all product option groups.
    const optionsContainer = document.createElement("div");

    // PT: Adiciona uma classe CSS ao container das opções para o estilizar depois.
    // EN: Adds a CSS class to the options container so it can be styled later.
    optionsContainer.classList.add("product-options");

    // PT: Cria dropdowns pequenos para cada grupo de opções recebido.
    // EN: Creates small dropdowns for each received option group.
    Object.keys(productOptions).forEach((optionName) => {
        // PT: Ignora a opção quantity porque ela será tratada separadamente.
        // EN: Ignores the quantity option because it will be handled separately.
        if (optionName === "quantity") {
            return;
        }

        // PT: Cria um grupo visual para uma opção, como tamanho, cor ou material.
        // EN: Creates a visual group for one option, such as size, color, or material.
        const optionGroup = document.createElement("label");

        // PT: Adiciona uma classe CSS ao grupo da opção.
        // EN: Adds a CSS class to the option group.
        optionGroup.classList.add("option-group");

        // PT: Mostra o nome da opção com a primeira letra maiúscula.
        // EN: Shows the option name with the first letter capitalized.
        optionGroup.textContent = `${optionName.charAt(0).toUpperCase()}${optionName.slice(1)} `;

        // PT: Cria uma pequena lista dropdown para as escolhas disponíveis.
        // EN: Creates a small dropdown list for the available choices.
        const optionSelect = document.createElement("select");

        // PT: Adiciona uma classe CSS ao dropdown da opção.
        // EN: Adds a CSS class to the option dropdown.
        optionSelect.classList.add("option-select");

        // PT: Percorre cada escolha para criar uma opção dentro do dropdown.
        // EN: Loops through each choice to create an option inside the dropdown.
        productOptions[optionName].forEach((option) => {
            // PT: Cria uma opção individual dentro do dropdown.
            // EN: Creates an individual option inside the dropdown.
            const optionElement = document.createElement("option");

            // PT: Define o texto visível da opção, incluindo preço extra quando existir.
            // EN: Sets the visible option text, including extra price when it exists.
            optionElement.textContent = typeof option === "string" ? option : `${option.label} (+$${option.priceModifier})`;

            // PT: Guarda o valor da opção para ser usado mais tarde no carrinho.
            // EN: Stores the option value to be used later in the cart.
            optionElement.value = typeof option === "string" ? option : option.label;

            // PT: Guarda o preço extra da opção para calcular o subtotal quando o produto for adicionado.
            // EN: Stores the option extra price to calculate the subtotal when the product is added.
            optionElement.dataset.priceModifier = typeof option === "string" ? "0" : option.priceModifier;

            // PT: Adiciona a opção criada ao dropdown.
            // EN: Adds the created option to the dropdown.
            optionSelect.appendChild(optionElement);
        });

        // PT: Adiciona o dropdown ao grupo visual da opção.
        // EN: Adds the dropdown to the visual option group.
        optionGroup.appendChild(optionSelect);

        // PT: Adiciona o grupo completo ao container das opções.
        // EN: Adds the complete group to the options container.
        optionsContainer.appendChild(optionGroup);
    });

    // PT: Cria um grupo visual para escolher a quantidade do produto.
    // EN: Creates a visual group to choose the product quantity.
    const quantityGroup = document.createElement("label");

    // PT: Adiciona uma classe CSS ao grupo da quantidade.
    // EN: Adds a CSS class to the quantity group.
    quantityGroup.classList.add("option-group");

    // PT: Mostra o texto "Quantity" antes do campo numérico.
    // EN: Shows the text "Quantity" before the number field.
    quantityGroup.textContent = "Quantity ";

    // PT: Cria um campo pequeno para escolher a quantidade da combinação selecionada.
    // EN: Creates a small field to choose the quantity for the selected combination.
    const quantityInput = document.createElement("input");

    // PT: Define o campo como numérico.
    // EN: Sets the field as numeric.
    quantityInput.type = "number";

    // PT: Define a quantidade mínima como um.
    // EN: Sets the minimum quantity as one.
    quantityInput.min = "1";

    // PT: Define a quantidade inicial como um.
    // EN: Sets the initial quantity as one.
    quantityInput.value = "1";

    // PT: Adiciona uma classe CSS ao campo de quantidade.
    // EN: Adds a CSS class to the quantity field.
    quantityInput.classList.add("option-quantity");

    // PT: Adiciona o campo de quantidade ao grupo visual.
    // EN: Adds the quantity field to the visual group.
    quantityGroup.appendChild(quantityInput);

    // PT: Adiciona o grupo de quantidade ao container das opções.
    // EN: Adds the quantity group to the options container.
    optionsContainer.appendChild(quantityGroup);

    // PT: Devolve o container para ele poder ser adicionado ao card do produto.
    // EN: Returns the container so it can be added to the product card.
    return optionsContainer;
}
// PT: Define opções personalizadas para cada tipo de produto.
// EN: Defines custom options for each product type.
function getProductOptions(product) {
    // PT: Cria uma versão do título em letras minúsculas para identificar produtos especiais.
    // EN: Creates a lowercase version of the title to identify special products.
    const productTitle = product.title.toLowerCase();

    // PT: Se o produto for uma mochila, devolve cores simuladas.
    // EN: If the product is a backpack, returns simulated colors.
    if (productTitle.includes("backpack")) {
        return {
            colors: ["Black", "Forest Green", "Navy", "Brown", "Grey"]
        };
    }

    // PT: Verifica se o produto pertence a uma categoria de roupa.
    // EN: Checks if the product belongs to a clothing category.
    if (product.category === "men's clothing" || product.category === "women's clothing") {
        // PT: Devolve tamanhos e cores para produtos de roupa.
        // EN: Returns sizes and colors for clothing products.
        return {
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Black", "White", "Blue", "Red", "Beige"]
        };
    }

    // PT: Verifica se o produto pertence à categoria de eletrónicos.
    // EN: Checks if the product belongs to the electronics category.
    if (product.category === "electronics") {
        // PT: Se o produto for um monitor, devolve tamanhos de ecrã simulados.
        // EN: If the product is a monitor, returns simulated screen sizes.
        if (productTitle.includes("monitor") || productTitle.includes("acer")) {
            return {
                sizes: [
                    { label: '24"', priceModifier: 0 },
                    { label: '27"', priceModifier: 40 },
                    { label: '32"', priceModifier: 90 },
                    { label: '49"', priceModifier: 180 }
                ]
            };
        }

        // PT: Se o produto for um disco gaming para PlayStation, devolve capacidades e plataformas simuladas.
        // EN: If the product is a gaming drive for PlayStation, returns simulated capacities and platforms.
        if (productTitle.includes("playstation") || productTitle.includes("gaming drive")) {
            return {
                capacities: [
                    { label: "2TB", priceModifier: 0 },
                    { label: "4TB", priceModifier: 60 },
                    { label: "5TB", priceModifier: 90 },
                    { label: "8TB", priceModifier: 160 }
                ],
                platforms: ["PS4", "PS5", "PC"]
            };
        }

        // PT: Se o produto for um disco externo, devolve capacidades simuladas.
        // EN: If the product is an external hard drive, returns simulated capacities.
        if (productTitle.includes("external hard drive")) {
            return {
                capacities: [
                    { label: "1TB", priceModifier: 0 },
                    { label: "2TB", priceModifier: 35 },
                    { label: "4TB", priceModifier: 80 },
                    { label: "5TB", priceModifier: 110 }
                ]
            };
        }

        // PT: Se o produto for armazenamento, devolve capacidades simuladas.
        // EN: If the product is storage, returns simulated capacities.
        if (productTitle.includes("hard drive") || productTitle.includes("ssd")) {
            return {
                capacities: [
                    { label: "256GB", priceModifier: 0 },
                    { label: "512GB", priceModifier: 25 },
                    { label: "1TB", priceModifier: 55 },
                    { label: "2TB", priceModifier: 100 }
                ]
            };
        }
        
        // PT: Devolve versões simuladas para produtos eletrónicos.
        // EN: Returns simulated versions for electronics products.
        return {
            versions: ["Standard", "Extended Warranty", "Premium Setup", "Bundle Pack"]
        };
    }

    // PT: Verifica se o produto pertence à categoria de joias.
    // EN: Checks if the product belongs to the jewelry category.
    if (product.category === "jewelery") {
        // PT: Se a joia for uma pulseira, devolve comprimentos simulados em centímetros.
        // EN: If the jewelry item is a bracelet, returns simulated lengths in centimeters.
        if (productTitle.includes("bracelet")) {
            return {
                lengths: ["16cm", "18cm", "20cm", "22cm"],
                materials: ["Gold", "Silver", "Rose Gold"]
            };
        }

        // PT: Para produtos tratados como anéis, devolve medidas e materiais simulados.
        // EN: For products treated as rings, returns simulated sizes and materials.
        return {
            sizes: ["5", "6", "7", "8", "9"],
            materials: ["Gold", "Silver", "Rose Gold"]
        };
    }

    // PT: Devolve uma opção simples para produtos sem variantes específicas.
    // EN: Returns a simple option for products without specific variants.
    return {
        quantity: true
    };
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
            } else if (selectedCategory === "backpacks") {
                // PT: Cria uma nova lista apenas com produtos que tenham backpack no título.
                // EN: Creates a new list only with products that have backpack in the title.
                const filteredProducts = allProducts.filter((product) => product.title.toLowerCase().includes("backpack"));

                // PT: Mostra no ecrã apenas as mochilas filtradas.
                // EN: Shows on the screen only the filtered backpacks.
                showProducts(filteredProducts);
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

// PT: Quando o botão de limpar carrinho é clicado, repõe os valores do carrinho.
// EN: When the clear cart button is clicked, resets the cart values.
clearCartButton.addEventListener("click", () => {
    // PT: Esvazia a lista de artigos guardados no carrinho.
    // EN: Empties the stored list of cart items.
    cartItems = [];

    // PT: Atualiza todos os valores visíveis depois de limpar o carrinho.
    // EN: Updates all visible values after clearing the cart.
    updateCartDisplay();
});
