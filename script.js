// import data from "./data.json" assert {type: 'json'};
// import assertions not currently supported in the FireFox browser!!

(async () => {
    const response = await fetch('./data.json');
    const data = await response.json();

    const barChart = document.querySelector('.bar-chart');
    console.log(data);
    let maxAmount = 0;
    data.map(obj => obj.amount).forEach(amount => {
        if (amount > maxAmount) {
            maxAmount = amount;
        }
    });

    data.forEach(obj => {
        const barWithDay = document.createElement('div');
        barWithDay.classList.add('bar-with-day');

        const barBubble = document.createElement('span');
        barBubble.classList.add('price-bubble');
        barBubble.textContent = `$${obj.amount}`;
        barWithDay.append(barBubble);

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${obj.amount * 0.12}rem`;
        
        if (obj.amount === 52.36) {
            bar.classList.add("max-bar");
        }

        addHoverState(bar);

        const day = document.createElement('span');
        day.classList.add('day');
        day.textContent = `${obj.day}`;

        barWithDay.append(bar, day);
        barChart.append(barWithDay);
    });

    function addHoverState(node) {
        node.addEventListener('mouseover', function () {

            node.previousSibling.style.opacity = 1;

        });
        node.addEventListener('mouseout', function (e) {

            node.previousSibling.style.opacity = 0;

        });
    }
})();





