const tasks = [];
let time;
let timer = null; //contador tarea
let timerBreak = null; //contador tarea
let current = null; //contador tarea

const taskName = document.querySelector('#taskName');

const form = document.querySelector('#form');
const inputTask = document.querySelector('#inputTask');
const taskList = document.querySelector('#taskList');

form.addEventListener('submit', e => {
    e.preventDefault();
    if(inputTask.value !== ''){
        createTask(inputTask.value);
        inputTask.value = '';
        renderTask();
    };
});

const createTask = task => {
    const newTask = { //nuevo obj con data tarea
        id: Math.round((Math.random()*100)),
        title: task,
        status: false
    }
    tasks.unshift(newTask);
}

const renderTask = () => {
    const htmlTaskList = tasks.map(task => {
        return `
        <div class="task">
            <div class="title">${task.title}</div>
            <div class="status">${(task.status)?`<span class='done'>Done</span>`:`<button class='btnStart' data-id='${task.id}'>Start</button>`}</div>
        </div>

        `;
    });
    taskList.innerHTML = htmlTaskList.join(''); //add html, "join" para pasar unico arreglo y quitar ","

    const startBtns = document.querySelectorAll('.btnStart');
    startBtns.forEach(btn => { //agrega listener a cada btn
        btn.addEventListener('click', e => {
            if(!timer){//valida otra tarea en curso
                const id = btn.getAttribute('data-id'); //captura id de btn
                startTask(parseInt(id));
                btn.textContent = 'In progress...'
            }
        })
    })
};

const startTask = id => { //asigna tiempo  de tarea, ubica tarea segund index/id
    time = 5; //asigna tiempo para tarea
    current = id;
    const taskIx = tasks.findIndex( task => task.id === id );
    taskName.textContent = tasks[taskIx].title;
    timer = setInterval(()=>{
            timeControl(id);
    },1000);
    tasks[taskIx].status = true;
};

const timeControl = id => {
    time--;
    renderTime();
    if(time ===0){ //detiene timer
        clearInterval(timer);
        taskName.textContent = '';
        timer = null; //reinicializa timer para poder iniciar nueva tarea
        renderTask();
        startBreak();
    }
    current = null;
};

const renderTime = () => {
    const valueTime = document.querySelector('#valueTime');
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    valueTime.textContent = `${(minutes < 10)? '0' : ''}${minutes}:${(seconds < 10)? '0' : ''}${seconds}`; //formato a timer
};

const startBreak = () => {
    time = 3;
    taskName.textContent = 'Break';
    timerBreak = setInterval(()=>{
        breakControl();
    },1000);
};

const breakControl = () => {
    time--;
    renderTime();
    if(time ===0){ //detiene timer
        clearInterval(timerBreak);
        current = null;
        timerBreak = null; //reinicializa timer del break para poder iniciar nueva tarea
        taskName.textContent = '';
        renderTask();
    }
    //current = null;
};

