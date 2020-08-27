function init(){

  console.log('Ciao');

  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);


  var input = $("#new-todo");
  var btn = $("#todo-btn");
  var listTodo = $(".list-todo");
  var urlApi = "http://157.230.17.132:3017/todos";

  printAll(urlApi, listTodo, template);

  btn.click(() =>{
    addTodo(input, urlApi, listTodo, template);
  })

  listTodo.on("click","remove", function(){
    console.log(idRemove);

    deleteTodo($(this),urlApi, listTodo, template);
  })
}

/* Functions -------------------------------------------*/


// Aggiunta
function addTodo(input, urlApi, listTodo, template){

var todoValue = input.val().trim();

var settings = {
  url: urlApi,
  method: "POST",
  data: {
    text: todoValue
  }
}

$.ajax(settings)
.done(() =>{
  printAll(urlApi, listTodo, template)
})
.fail(error =>{
  console.log("Si è verificato un errore " + error.status);
})

}



// Stampa tutte le todo
function printAll(urlApi, listTodo, template){
listTodo.html("");

var settings = {
  url: urlApi,
  method: "GET"
}

$.ajax(settings)
  .done(dati =>{

    dati.forEach(dati =>{

      var context = {
        todo: dati.text,
        id: dati.id
      }

      listTodo.append(template(context))
    })

     listTodo.on('click',".remove", () =>{
     var idRemove = $(this).data("id");
     console.log(idRemove);

    deleteTodo(idRemove,urlApi, listTodo, template);

    })
  })
  .fail(error =>{
    console.log("Si è verificato un errore " + error.status);
  })
}

// Elimina
function deleteTodo(self, urlApi, listTodo, template){
  var idRemove = self.data("id");


  var settings = {
    url: urlApi + "/" + idRemove,
    method: "DELETE"
  }

  $.ajax(settings)
  .done(() =>{
    printAll(urlApi, listTodo, template);
  })
  .fail(error =>{
    console.log("Si è verificato un errore " + error.status);
  })
}



$(document).ready(init);
