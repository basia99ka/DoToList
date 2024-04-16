const userInput = document.getElementById("userInput");
const listTrack = document.getElementById("listTrack")

/*Progress Bar*/
function updateProgressBar(){
    let totalTasks = document.querySelectorAll('#listTrack li').length;
    let completedTasks = document.querySelectorAll('#listTrack li.checkedTask').length;
    let progress = (completedTasks /totalTasks) * 100;
    document.getElementById('progress').style.width = progress + '%';
    saveTask()
}

/*add Task*/
function addTasks(){
    if(userInput.value === ''){
        alert("Write a task to your list!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = userInput.value ;
        listTrack.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00D7";
        li.appendChild(span);
    }
    userInput.value="";
    updateProgressBar();
    saveTask();
}

/*change background*/
function changeBackground() {
    const backgroundSelect = document.getElementById("backgroundSelect");
    const selectedBackground = backgroundSelect.value;
    const mainCon = document.getElementById("main-con");
    mainCon.className = "";

    if (selectedBackground === "light") {
        mainCon.classList.add("Background3");
    } else if (selectedBackground === "dark") {
        mainCon.classList.add("Background2");
    }
    else if (selectedBackground === "orange") {
        mainCon.classList.add("Background4");
    }
    else if (selectedBackground === "blue") {
        mainCon.classList.add("Background5");
    }
    else {
        mainCon.classList.add("defaultBackground");
    }
}

/*Water track*/
let waterAmount = 0;
const maxWater = 2500; 
function updateWaterProgress() {
    const progressElement = document.getElementById('water-progress');
    const percentage = (waterAmount / maxWater) * 100;
    progressElement.style.width = percentage + '%';
    saveWaterProgress();
}

function addWater() {
    waterAmount += 250;
    if (waterAmount > maxWater) {
        waterAmount = maxWater;
    }
    updateWaterProgress();
}

function removeWater() {
    waterAmount -= 250;
    if (waterAmount < 0) {
        waterAmount = 0;
    }
    updateWaterProgress();
}

function resetWater() {
    waterAmount = 0;
    updateWaterProgress();
}


listTrack.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checkedTask");
        if (e.target.classList.contains("checkedTask")){
            e.target.classList.add("shake");
        }
        updateProgressBar();
        saveTask();
        
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.classList.add("fadeOut");
        setTimeout(()=>{
            e.target.parentElement.remove();
            updateProgressBar();
            saveTask();
        },400);   
}
}, false);


/*save data*/
function saveTask(){
    localStorage.setItem("data", listTrack.innerHTML);
    localStorage.setItem("progress",  document.getElementById('progress').style.width);

}


function saveWaterProgress() {
    localStorage.setItem("waterProgressWidth",  document.getElementById('water-progress').style.width);
}

/*show data*/

function showTasks(){
    listTrack.innerHTML = localStorage.getItem("data");
    document.getElementById('progress').style.width = localStorage.getItem("progress");
}

function showWaterProgress() {
    document.getElementById('water-progress').style.width = localStorage.getItem("waterProgressWidth");
}


showTasks();
showWaterProgress();
