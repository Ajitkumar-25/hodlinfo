document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/tickers');
    const tickers = await response.json();

    const tableBody = document.querySelector('#tickers-table tbody');

    tickers.forEach((ticker, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticker.name}</td>
            <td>₹${ticker.last.toLocaleString()}</td>
            <td>₹${ticker.buy.toLocaleString()}</td>
            <td>₹${ticker.sell.toLocaleString()}</td>
            <td>${ticker.volume.toLocaleString()}</td>
            <td>${ticker.base_unit.toUpperCase()}</td>
        `;
        tableBody.appendChild(row);
    });
});
