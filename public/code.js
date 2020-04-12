const socket = io.connect('http://localhost:8080')

let message = document.querySelector("#message")

let username = document.querySelector("#username")
let id = document.querySelector("#id")

let send_message = document.querySelector("#send_message")
let send_username = document.querySelector("#send_username")
let chatroom = document.querySelector("#chatroom")
let feedback = document.querySelector("#feedback")
let color = document.querySelector(".color")

let show_name = document.querySelector("#show_name");

  
  function display_name(name){
      show_name.innerHTML = `Ваш ник сейчас <span class="has-text-danger"> ${name} </span>`;
    }
    


display_name('Аноним');

send_message.onclick = () => {
    socket.emit("new_message", {message: message.value})
    clear(message); 
}


function clear(input){
    input.value = '';
}

send_username.onclick = () => {
    socket.emit('change_username', {username: username.value})
    display_name(username.value);
    clear(username) 
}

socket.on("add_mes", (data)=>{
    if (data.username == "Аноним"){
        let {username, message,id} = data;
        feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single color ${id}'> <span> ${username} </span>:   ${message} </h5> `);
        clear(message); 
    }
    else{
        if (id == 1){
            let {username, message,id} = data;
            feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single green' id="${id}"> <span> ${username} </span>:   ${message} </h5> `); 
        }
        else if (id == 2){
                let {username, message,id} = data;
                feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single red' id="${id}"> <span> ${username} </span>:   ${message} </h5> `); 

        }
        else if (id == 3){
                let {username, message,id} = data;
                feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single blue' id="${id}"> <span> ${username} </span>:   ${message} </h5> `);

        }
        else if (id == 4){
                let {username, message,id} = data;
                feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single purple' id="${id}"> <span> ${username} </span>:   ${message} </h5> `);

        }
        else if (id == 5){
                let {username, message,id} = data;
                feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single coral' id="${id}"> <span> ${username} </span>:   ${message} </h5> `);

        }
        else{
                let {username, message,id} = data;
                feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single color' id="${id}"> <span> ${username} </span>:   ${message} </h5> `);
        }
    }

})

document.onkeypress = function(event) {
    if (event.code == 'Enter' && username.value != "") {
        socket.emit('change_username', {username: username.value})
        display_name(username.value);
        clear(username) 
        
    }
    else if (event.code == 'Enter' && message.value != ""){
        socket.emit("new_message", {message: message.value})
        clear(message); 
    }
  };




