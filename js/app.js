'use strict'
import {getCursos} from './cursos.js'

let cursos = await getCursos()
console.log(cursos);


var voltarButtom = document.getElementById("voltar")
var home_cursos = document.getElementById("home__cursos")
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

cursos.cursos.map(createCardCurso);

function createCardCurso(curso) {
    console.log(curso);
    
    let cursoCard = document.createElement('div')
    let cursoIcon = document.createElement('i')
    let cursoSigla = document.createElement('p')

    cursoCard.classList.add('home__card')
    console.log(curso.icone.length);
    
    for(let i = 0;curso.icone.length > i; i++){
        cursoIcon.classList.add(curso.icone[i])
    }
    cursoSigla.textContent = curso.sigla

    cursoCard.append(cursoIcon)
    cursoCard.append(cursoSigla)
    cursoCard.addEventListener("click", changePage)

    home_cursos.append(cursoCard)

}
//cursoSelect[0].addEventListener("click", changePage)
//alunoSelect[0].addEventListener("click", changePage)

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

var status_turma = document.getElementById("status_turma")
var status_turma_selected = document.getElementById("status_turma_selected")
var status_turma_status = document.getElementById("status_turma_status")
var status_turma_finalizado = document.getElementById("status_turma_finalizado")
var status_turma_cursando = document.getElementById("status_turma_cursando")

status_turma_status.addEventListener('click', filter)
status_turma_finalizado.addEventListener('click', filter)
status_turma_cursando.addEventListener('click', filter)

let checked = status_turma_status

let checkMark =document.createElement('i')
checkMark.classList.add("fa-solid")
checkMark.classList.add("fa-check")
checked.appendChild(checkMark)

function filter(){
    let filtro = document.getElementById(this.id)
    status_turma_selected.textContent = filtro.textContent


    checked.removeChild(checkMark)
    filtro.appendChild(checkMark)
    checked = filtro
}

let open = false
status_turma_selected.addEventListener("click", () => {
    console.log('click')
    if(!open){
        status_turma.style.height = "130px"
        open = true
    }else{
        status_turma.style.height = "19px"
        open = false
    }
})