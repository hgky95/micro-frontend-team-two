class ProductItem extends HTMLElement {

    static get observedAttributes() {
        // Define product-type belong to product item that caller can passed into.
        return ["product-type"]; 
    }

    connectedCallback() {
        /* TODO: Fetch the list of products. */
        
        /* TODO: Render HTML of product item based on product-type attr and list products. */
        this.render();

        /* TODO: Send event when click on buy / sell. */
        const productType = this.getAttribute("product-type");
        this.getElementsByClassName("sell-button")[0]?.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent("team-two-sell", {
                    bubbles: true,
                    detail: { 'product-type': productType }
                })
            );
        });

        this.getElementsByClassName("buy-button")[0]?.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent("team-two-buy", {
                    bubbles: true,
                    detail: { 'product-type': productType }
                })
            );
        });

        /* TODO: Receive event current amount updates. If current amount < product item, then disable buy button. */
        const products = this.fetchProduct();
        const product = products[productType];
        window.addEventListener("team-one-current-amount", (e) => {
            if (product.price > e.detail['amount']) {
                this.getElementsByClassName("buy-button")[0]?.classList.add('button-disable');
            } else {
                this.getElementsByClassName("buy-button")[0]?.classList.remove('button-disable');
            }
        });
    }

    attributeChangedCallback() {
        /* TODO: Handle render when attribute product type change */
    }

    render() {
        const products = this.fetchProduct();
        const productType = this.getAttribute("product-type");
        const product = products[productType];
        this.innerHTML = `
            <div class="pricing-table-header">
                <span class="pricing-table-price">
                    <img class="price-image" src="images/${product.img}">
                    <span class="price-name">${product.name}</span>
                    <span class="price-value price">$${product.price}</span>
                </span>
            </div>
            <div class="pricing-table-footer">
                <button class="sell-button pure-button">
                    Sell
                </button>
                <button class="buy-button pure-button pure-button-primary">
                    Buy
                </button>
            </div>
        `; 
    }

    fetchProduct() {
        return {
            "big-mac": { "name": "Big Mac", "price": "20", "img": "big-mac.jpg" },
            "flip-flops": { "name": "Flip Flops", "price": "30", "img": "flip-flops.jpg" },
            "coca-cola-pack": { "name": "Coca-Cola Pack", "price": "50", "img": "coca-cola-pack.jpg" },
            "movie-ticket": { "name": "Movie Ticket", "price": "12000", "img": "movie-ticket.jpg" },
            "book": { "name": "Book", "price": "150", "img": "book.jpg" },
            "lobster-dinner": { "name": "Lobster Dinner", "price": "450", "img": "lobster-dinner.jpg" },
            "video-game": { "name": "Video Game", "price": "600", "img": "video-game.jpg" },
            "amazon-echo": { "name": "Amazon Echo", "price": "99000", "img": "amazon-echo.jpg" },
            "year-of-netflix": { "name": "Year of Netflix", "price": "1000", "img": "year-of-netflix.jpg" },
            "air-jordans": { "name": "Air Jordans", "price": "125000", "img": "air-jordans.jpg" },
            "airpods": { "name": "Airpods", "price": "199", "img": "airpods.jpg" },
            "gaming-console": { "name": "Gaming Console", "price": "299", "img": "gaming-console.jpg" },
            "drone": { "name": "Drone", "price": "350", "img": "drone.jpg" },
            "smartphone": { "name": "Smartphone", "price": "699", "img": "smartphone.jpg" },
            "bike": { "name": "Bike", "price": "800", "img": "bike.jpg" }
        };
    }
}

window.customElements.define("product-item", ProductItem);