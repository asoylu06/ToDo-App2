onload = function() {
    local_tasks = localStorage.getItem('local_tasks');
    if (local_tasks) {
        list.innerHTML = local_tasks;
    }
    tasks = Array.from(document.querySelectorAll('.task')).map(task => task.textContent);

    result();
}

let tasks = [];


let input = document.getElementById('todo_input');
let list = document.querySelector('.todo-items');


// btn.onclick = function() {
//     let item = document.createElement('div');
//     item.className = 'item-div'
//     let cb = document.createElement('input');
//     cb.type = 'checkbox';
//     let li_item = document.createElement("li");
//     li_item.innerHTML = input.value;
//     let del_btn = document.createElement('button');
//     del_btn.innerHTML = "DEL";
//     del_btn.className = 'del_btn';
//     item.appendChild(cb);
//     item.appendChild(li_item);
//     item.appendChild(del_btn);
//     list.appendChild(item);
// }

onclick = (e) => {
    if (e.target.classList.contains('add-btn') || e.target.classList.contains('fa-plus')) {
        if (input.value == '') {
            alert('Please enter a task');
        } else if (input.value.length > 10000) {
            alert('Task is too long');
        } else if (input.value.length < 3) {
            alert('Task is too short');
        } else if (input.value.split('').every(char => char === ' ')) {
            alert('Task is empty');
        } else if (tasks.includes(input.value)) {
            alert('Task already exists'); 
        } else {
            let item = 
            `<li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 my-2">
                <input class="checkbox form-check-input text-white me-2" type="checkbox" value="" aria-label="..."/>
                <p class="task m-0 px-2 flex-grow-1 text-start word-wrap text-break"></p>
                <i class="fas fa-times text-danger"></i>
            </li>`;
            
            list.innerHTML += item;
            list.lastElementChild.querySelector('.task').innerHTML = input.value;
            tasks.push(input.value);
        }
        input.value = '';
    }

    if (e.target.classList.contains('fas')) {
        e.target.parentElement.remove();
        tasks.splice(tasks.indexOf(e.target.parentElement.querySelector('.task').innerHTML), 1);
    }

    if (e.target.classList.contains('checkbox')) {

        e.target.checked ? e.target.setAttribute('checked', '') : e.target.removeAttribute('checked');

        console.log(e.target.nextElementSibling);
        e.target.checked ? e.target.nextElementSibling.classList.add('drawn') : e.target.nextElementSibling.classList.remove('drawn');
    }

    localStorage.setItem('local_tasks', list.innerHTML);
    result();
};
onkeydown = (e) => {
    if (e.key == 'Enter') {
        document.querySelector('.fa-plus').click();
    }
}
let result = function() {

    let task_num = Array.from(document.querySelectorAll('li')).length;
    let comp_num = Array.from(document.querySelectorAll('input:checked')).length;
    task_num > 0 ? (document.querySelector('.result').innerHTML = `${comp_num} number of tasks are completed out of ${task_num}`) : (document.querySelector('.result').innerHTML = 'No tasks');
}