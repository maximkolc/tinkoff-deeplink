
const apiBase = "https://api.alfabit.org";

async function loadCurrencies() {
    const res = await fetch(apiBase + "/currencies");
    const data = await res.json();
    const fromSelect = document.getElementById("from-currency");
    const toSelect = document.getElementById("to-currency");

    data.currencies.forEach(cur => {
        const optionFrom = document.createElement("option");
        optionFrom.value = cur.code;
        optionFrom.textContent = cur.name;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = cur.code;
        optionTo.textContent = cur.name;
        toSelect.appendChild(optionTo);
    });
}

document.getElementById("exchange-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const address = document.getElementById("address").value;

    const res = await fetch(apiBase + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from_currency: from,
            to_currency: to,
            amount: amount,
            destination_address: address
        })
    });

    const result = await res.json();
    document.getElementById("result").textContent = JSON.stringify(result, null, 2);
});

document.getElementById("track-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const orderId = document.getElementById("track-order-id").value;
    if (!orderId) return;

    const res = await fetch(apiBase + "/orders/" + orderId);
    const result = await res.json();
    document.getElementById("result").textContent = JSON.stringify(result, null, 2);
});

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

loadCurrencies();
