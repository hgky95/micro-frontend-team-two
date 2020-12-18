// Simulate send event "CURRENT AMOUNT CHANGE" of team 1, so we can test our fragment
document.getElementsByClassName('dummy-amount-200')[0]?.addEventListener("click", () => {
    this.dispatchEvent(
        new CustomEvent("team-one-current-amount", {
            bubbles: true,
            detail: { 'amount': 200 }
        })
    );
});

document.getElementsByClassName('dummy-amount-1000')[0]?.addEventListener("click", () => {
    this.dispatchEvent(
        new CustomEvent("team-one-current-amount", {
            bubbles: true,
            detail: { 'amount': 1000 }
        })
    );
});

// Simulate receiver of team 3, so we can verify our fragment send event "BUY / SELL" correctly
window.addEventListener("team-two-buy", (e) => {
    console.log("receive event " + e.detail['product-type']);
    document.getElementsByClassName('dummy-receipt')[0].innerHTML = `buy ${e.detail['product-type']}`;
});

window.addEventListener("team-two-sell", (e) => {
    console.log("receive event " + e.detail['product-type']);
    document.getElementsByClassName('dummy-receipt')[0].innerHTML = `sell ${e.detail['product-type']}`;
});