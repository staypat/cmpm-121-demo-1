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

function createButtonElement(text: string, title: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.title = title;
  return button;
}

function createParagraphElement(text: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = text;
  return paragraph;
}

const PRICE_INCREASE_MULTIPLIER = 1.15;

function addUpgradeButtons() {
  availableItems.forEach((item) => {
    let timesPurchased = 0;
    const growthButton = createButtonElement(`${item.name} Cost: ${item.price.toFixed(1)} sparks`, item.description);
    const purchaseText = createParagraphElement(`Times purchased: ${timesPurchased}`);

    app.append(growthButton);
    app.append(purchaseText);

    growthButton.addEventListener("click", () => {
      if (counter >= item.price) {
        processPurchase(item, growthButton);
        timesPurchased++;
        updatePurchaseText(purchaseText, timesPurchased);
      }
    });

    upgradeButtons.push({ button: growthButton, cost: item.price });
    updateButtonState();
  });
}

function processPurchase(item: Item, button: HTMLButtonElement) {
  counterGrowthRate += item.growthRate;
  counter -= item.price;
  item.price *= PRICE_INCREASE_MULTIPLIER;
  passiveGainText.innerHTML = `Sparks per second: ${counterGrowthRate.toFixed(1)}`;
  button.innerHTML = `${item.name} Cost: ${item.price.toFixed(1)} sparks`;

  const buttonIndex = upgradeButtons.findIndex(
    (upgrade) => upgrade.button === button
  );
  upgradeButtons[buttonIndex].cost = item.price;
  updateButtonState();
}

function updatePurchaseText(purchaseText: HTMLParagraphElement, timesPurchased: number) {
  purchaseText.innerHTML = `Times purchased: ${timesPurchased}`;
}

function updateButtonState() {
  upgradeButtons.forEach(({ button, cost }) => {
    button.disabled = counter < cost;
  });
}

addUpgradeButtons();

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