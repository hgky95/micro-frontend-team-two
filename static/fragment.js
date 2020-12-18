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
        console.log('load');
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
            airpods: { name: "Airpods", price: "199", img: "airpods.jpg" },
            shoe: { name: "Air Jordans", price: "125", img: "air-jordans.jpg" },
            iphone: { name: "Smartphone", price: "699", img: "smartphone.jpg" },
            book: { name: "Book", price: "15", img: "book.jpg" },
            bike: { name: "Bike", price: "800", img: "bike.jpg" },
            videoGame: { name: "Gaming Console", price: "299", img: "video-game.jpg" },
            movieTicket: { name: "Movie Ticket", price: "12", img: "movie-ticket.jpg" },
            amazonEcho: { name: "Amazon Echo", price: "99", img: "amazon-echo.jpg" },
            drone: { name: "Drone", price: "350", img: "drone.jpg" }
        };
    }
}

window.customElements.define("product-item", ProductItem);