import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Fun Clicker Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
const counterText = document.createElement("div");
const button = document.createElement("button");
button.innerHTML = "Click this ✨";
app.append(button);
button.addEventListener("click", () => {
    counter++;
    counterText.innerHTML = `${counter} sparks`;
    updateButtonState();
});
counterText.innerHTML = `${counter} sparks`;
app.append(counterText);

// setInterval(() => {
//     counter++;
//     counterText.innerHTML = `${counter} sparks`;
// }, 1000);

let counterGrowthRate = 0;
const growthButton = document.createElement("button");
growthButton.innerHTML = "10 sparks for +1 automatic growth rate";
app.append(growthButton);

growthButton.addEventListener("click", () => {
    counterGrowthRate++;
    counter -= 10;
    console.log(counterGrowthRate);
});

function updateButtonState(){
    if(counter < 10){
        growthButton.disabled = true;
    }else{
        growthButton.disabled = false;
    }
}

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