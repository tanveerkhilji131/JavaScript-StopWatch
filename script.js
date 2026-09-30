let element = document.createElement('div')
element.className = "container"
document.body.appendChild(element)

let dayParent =  generateElement("div","days",null)
 generateElement("h1","h1","Minutes",dayParent)
 generateElement("span","Minutes","00",dayParent)
 generateElement("button","button","Stop",dayParent)

let day2parent = generateElement("div","days",null)
element.appendChild(day2parent)
 generateElement("h1","h1","Seconds",day2parent)
 generateElement("span","sec","00",day2parent)
 generateElement("button","button","Start",day2parent)

let day3parent = generateElement("div","days",null)
element.appendChild(day3parent)

 generateElement("h1","h1","Milliseconds",day3parent)
 generateElement("span","mili","00",day3parent)
 generateElement("button","button","Reset",day3parent)

function generateElement(tagname,classname,textcontext,parentchild){
     let  elementcreated =  document.createElement(tagname)
    elementcreated.textContent = textcontext
    elementcreated.className = classname
    if(parentchild){
        parentchild.appendChild(elementcreated)
    }
   else{
   element.appendChild(elementcreated)
   }
    return elementcreated
}

let sec = document.querySelectorAll(".sec")[0];
let Minutes = document.querySelectorAll(".Minutes")[0];
let mili = document.querySelectorAll(".mili")[0];
const btn = document.querySelectorAll("button");

let isPaused = false;
let id = null;

let currentsec = 0;
let currentmili = 0;
let currentMinutes = 0;

let startTime = 0;
let elapsedTime = 0;

function updateTime() {
    const elapsed = elapsedTime + performance.now() - startTime;
    const total = Math.floor(elapsed / 10);

    currentmili = total % 100;
    currentsec = Math.floor(total / 100) % 60;
    currentMinutes = Math.floor(total / 6000);

    mili.textContent = String(currentmili).padStart(2, "0");
    sec.textContent = String(currentsec).padStart(2, "0");
    Minutes.textContent = String(currentMinutes).padStart(2, "0");

    id = requestAnimationFrame(updateTime);
}

btn.forEach((v) => {
    v.addEventListener("click", (e) => {
        if (e.target.innerText === "Start") {
            if (id !== null) return;

            isPaused = false;
            startTime = performance.now();
            updateTime();
        }

        else if (e.target.innerText === "Stop" && id !== null) {
            isPaused = true;

            elapsedTime += performance.now() - startTime;

            cancelAnimationFrame(id);
            id = null;
        }

        else if (e.target.innerText === "Reset") {
            isPaused = false;

            if (id !== null) {
                cancelAnimationFrame(id);
            }

            id = null;
            elapsedTime = 0;
            startTime = 0;

            currentmili = 0;
            currentsec = 0;
            currentMinutes = 0;

            mili.textContent = "00";
            sec.textContent = "00";
            Minutes.textContent = "00";
        }
    });
});