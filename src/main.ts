import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Magical Sparks";
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
app.append(passiveGainText);

// setInterval(() => {
//     counter++;
//     counterText.innerHTML = `${counter} sparks`;
// }, 1000);

const upgradeButtons: { button: HTMLButtonElement; cost: number }[] = [];

interface Item {
  name: string;
  price: number;
  growthRate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Glimmer",
    price: 10,
    growthRate: 0.1,
    description:
      "A glimmer of hope that grants you a short break from clicking.",
  },
  {
    name: "Flicker",
    price: 100,
    growthRate: 2,
    description:
      "Swish and flick--Wingardium Leviosa! Wait, flicker is related to lights here... Lumos?",
  },
  {
    name: "Glow",
    price: 1000,
    growthRate: 50,
    description: "Glowing with pride, this upgrade will make you shine.",
  },
  {
    name: "Dazzle",
    price: 5000,
    growthRate: 200,
    description: "Reality twinkles; sunglasses optional.",
  },
  {
    name: "Flare",
    price: 20000,
    growthRate: 800,
    description:
      "A fiery flourish that summons both fireflies and fancies. Hey that's good alliteration!",
  },
];

function addUpgradeButton() {
  availableItems.forEach((item) => {
    let timesPurchased = 0;
    const growthButton = document.createElement("button");
    const purchaseText = document.createElement("p");
    purchaseText.innerHTML = `Times purchased: ${timesPurchased}`;
    growthButton.innerHTML = `${item.name} Cost: ${item.price.toFixed(1)} sparks`;
    growthButton.title = item.description;
    app.append(growthButton);
    app.append(purchaseText);
    upgradeButtons.push({ button: growthButton, cost: item.price });
    growthButton.addEventListener("click", () => {
      if (counter >= item.price) {
        counterGrowthRate += item.growthRate;
        counter -= item.price;
        timesPurchased++;
        item.price *= 1.15;
        passiveGainText.innerHTML = `Sparks per second: ${counterGrowthRate.toFixed(1)}`;
        purchaseText.innerHTML = `Times purchased: ${timesPurchased}`;
        growthButton.innerHTML = `${item.name} Cost: ${item.price.toFixed(1)} sparks`;
        const buttonIndex = upgradeButtons.findIndex(
          (upgrade) => upgrade.button === growthButton,
        );
        upgradeButtons[buttonIndex].cost = item.price;
        updateButtonState();
      }
    });
    updateButtonState();
  });
}

function updateButtonState() {
  upgradeButtons.forEach(({ button, cost }) => {
    button.disabled = counter < cost;
  });
}

addUpgradeButton();
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
let lastTime = performance.now();
requestAnimationFrame(function increaseCounter() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  counter += (deltaTime / 1000) * counterGrowthRate;
  counterText.innerHTML = `${Math.floor(counter)} sparks`;
  lastTime = currentTime;
  updateButtonState();
  requestAnimationFrame(increaseCounter);
});
