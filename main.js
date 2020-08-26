function init(){

  console.log('Ciao');

  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);


  var input = $("#new-todo");
  var btn = $("#todo-btn");
  var listTodo = $(".list-todo");
  var urlApi = "http://157.230.17.132:3017/todos";

  printAll(urlApi, listTodo, template)

  btn.click(() =>{
    addTodo(input, urlApi, listTodo, template)
  })
}

/* Functions -------------------------------------------*/


//aggiungi una nuova Todo (Crud)
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
.fail((error) =>{
  console.log("Si è verificato un errore " + error.status);
})

}



//printa tutte le todo presente nell'api (cRud)
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

  })
  .fail((error) =>{
    console.log("Si è verificato un errore " + error.status);
  })
}



$(document).ready(init);
