import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Magical Prowess";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let counterGrowthRate = 0;
const counterText = document.createElement("div");
const passiveGainText = document.createElement("p");
const button = document.createElement("button");
button.innerHTML = "🔮";
button.style.fontSize = "150px";
button.style.padding = "0";
button.style.backgroundColor = "transparent";
button.style.borderRadius = "50%";
app.append(button);
button.addEventListener("click", () => {
    counter++;
    counterText.innerHTML = `${counter} sparks`;
    button.style.fontSize = "148.5px";
    setTimeout(() => {
        button.style.fontSize = "150px";
    }, 200);
    updateButtonState();
});
counterText.innerHTML = `${counter} sparks`;
passiveGainText.innerHTML = `Sparks per second: ${counterGrowthRate.toFixed(1)}`;
app.append(counterText);
app.append(passiveGainText)

// setInterval(() => {
//     counter++;
//     counterText.innerHTML = `${counter} sparks`;
// }, 1000);

const upgradeButtons: { button: HTMLButtonElement, cost: number }[] = [];

function addUpgradeButton(name: string, price: number, growthRate: number){
    let timesPurchased = 0;
    const growthButton = document.createElement("button");
    const purchaseText = document.createElement("p");
    purchaseText.innerHTML = `Times purchased: ${timesPurchased}`;
    growthButton.innerHTML = `${name} Cost: ${price.toFixed(1)} sparks`;
    app.append(growthButton);
    app.append(purchaseText);
    updateButtonState();
    upgradeButtons.push({ button: growthButton, cost: price });
    growthButton.addEventListener("click", () => {
        if(counter >= price){
            counterGrowthRate += growthRate;
            counter -= price;
            timesPurchased += 1;
            price *= 1.15;
            passiveGainText.innerHTML = `Sparks per second: ${counterGrowthRate.toFixed(1)}`;
            purchaseText.innerHTML = `Times purchased: ${timesPurchased}`;
            growthButton.innerHTML = `${name} Cost: ${price.toFixed(1)} sparks`;
            const buttonIndex = upgradeButtons.findIndex(upgrade => upgrade.button === growthButton);
            upgradeButtons[buttonIndex].cost = price;
            updateButtonState();
        }
    });
}

function updateButtonState() {
    upgradeButtons.forEach(({ button, cost }) => {
        button.disabled = counter < cost;
    });
}
// const growthButton = document.createElement("button");
// growthButton.innerHTML = "10 sparks for +1 automatic growth rate";
// app.append(growthButton);

// growthButton.addEventListener("click", () => {
//     counterGrowthRate++;
//     counter -= 10;
//     console.log(counterGrowthRate);
// });

// function updateButtonState(){
//     if(counter < 10){
//         growthButton.disabled = true;
//     }else{
//         growthButton.disabled = false;
//     }
// }

addUpgradeButton("Glimmer", 10, 0.1);
addUpgradeButton("Flicker", 100, 2);
addUpgradeButton("Glow", 1000, 50);

let lastTime = performance.now();
requestAnimationFrame(function increaseCounter(){
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    counter += (deltaTime / 1000) * counterGrowthRate;
    counterText.innerHTML = `${Math.floor(counter)} sparks`;
    lastTime = currentTime;
    updateButtonState();
    requestAnimationFrame(increaseCounter);
})