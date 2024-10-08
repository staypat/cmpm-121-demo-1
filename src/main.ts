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
button.addEventListener("click", () =>{
    counter++;
    counterText.innerHTML = `${counter} sparks`;
    console.log(counter);
});
counterText.innerHTML = `${counter} sparks`;
app.append(counterText)