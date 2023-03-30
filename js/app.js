'use strict'

var voltarButtom = document.getElementById("voltar")
var cursoSelect = document.getElementsByClassName("home__card")
var alunoSelect = document.getElementsByClassName("turma__card")
var home = document.getElementById("HOME")
var turma = document.getElementById("TURMA")
var aluno = document.getElementById("ALUNO")
var telas = [home,turma,aluno]
var lastPage 
var currentPage = document.getElementById("HOME")
var id = 0
turma.style.display = "none"
aluno.style.display = "none"


cursoSelect[0].addEventListener("click", changePage)
alunoSelect[0].addEventListener("click", changePage)

function changePage (){
    currentPage.style.display = "none"
    telas[id+1].style.display = ""
    currentPage = telas[id+1]
    id++
}
voltarButtom.addEventListener("click", () => {
    if(id > 0){
        currentPage.style.display = "none"
        telas[id-1].style.display = ""
        currentPage = telas[id-1]
        id--
    }
   
})