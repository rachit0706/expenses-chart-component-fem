// import data from "./data.json" assert {type: 'json'};
// import assertions not currently supported in the FireFox browser!!

(async () => {
    const response = await fetch('./data.json');
    const data = await response.json();

    const barChart = document.querySelector('.bar-chart');
    console.log(data);
    let maxAmount = 0;
    data.map(async obj => obj.amount).forEach(amount => {
        if (amount > maxAmount) {
            maxAmount = amount;
        }
    });

    data.forEach(obj => {
        const barWithDay = document.createElement('div');
        barWithDay.classList.add('bar-with-day');

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${obj.amount * 0.12}rem`;

        if (obj.amount === maxAmount) {
            bar.classList.add("max-bar");
        }
        addHoverState(bar, `$${obj.amount}`)

        const day = document.createElement('span');
        day.classList.add('day');
        day.textContent = `${obj.day}`;

        barWithDay.append(bar, day);
        barChart.append(barWithDay);
    });

    barChart.style.height = `${barChart.getBoundingClientRect().height + 36}px`;

    function addHoverState(node, text) {
        node.addEventListener('mouseover', function () {

            if (!node.previousSibling) {
                node.parentNode.insertAdjacentHTML("afterBegin", `<span class="price-bubble">${text}<span>`);
            }

        });
        node.addEventListener('mouseout', function (e) {

            if (node.previousSibling) {
                node.previousSibling.remove();
            }

        });
    }
})();





