'use strict'
import {getCursos} from './cursos.js'
import {getAlunosCurso} from './cursos.js'
import {getStatus} from './cursos.js'

let cursos = await getCursos()



var voltarButtom = document.getElementById("voltar")
var home_cursos = document.getElementById("home__cursos")
var turma__titulo = document.getElementById("turma__titulo")
var turma_alunos = document.getElementById("turma__alunos")
var home = document.getElementById("HOME")
var turma = document.getElementById("TURMA")
var aluno = document.getElementById("ALUNO")
var telas = [home,turma,aluno]
var currentPage = document.getElementById("HOME")

var id = 0
turma.style.display = "none"
aluno.style.display = "none"

cursos.cursos.map(createCardCurso);

function createCardCurso(curso) {
    
    let cursoCard = document.createElement('div')
    let cursoIcon = document.createElement('i')
    let cursoSigla = document.createElement('p')

    cursoCard.classList.add('home__card')
    
    for(let i = 0;curso.icone.length > i; i++){
        cursoIcon.classList.add(curso.icone[i])
    }
    cursoSigla.textContent = curso.sigla

    cursoCard.append(cursoIcon)
    cursoCard.append(cursoSigla)
    cursoCard.addEventListener("click", changePage)
    cursoCard.addEventListener("click", () =>{
        createCardAlunos((curso.sigla))
    })

    home_cursos.append(cursoCard)

}

async function createCardAlunos(curso) {
    let alunos = await getAlunosCurso(curso)
    let titulo = alunos[0].curso[0].nome
    turma__titulo.textContent = titulo

    let teste = document.createElement('div')
    teste.classList.add("turma__alunos__container")
    alunos.forEach( async aluno  =>  {
        let card = document.createElement('div')
        card.classList.add("turma__card")
        let matricula = await getStatus(aluno.matricula)
        if( matricula.status == "Finalizado"){
            card.classList.add("turma__card__finalizado")
        }else{
            card.classList.add("turma__card__cursando")
        }
        
    
        let image = document.createElement('img')
        image.classList.add("aluno__img")
        if(aluno.sexo =="F"){
            image.setAttribute("src","./img/mulher.png")
        }else{
            image.setAttribute("src","./img/homem.png")
        }
    
        let name = document.createElement('p')
        name.textContent = aluno.nome

        card.append(image)
        card.append(name)

        card.addEventListener("click", changePage)
        card.addEventListener("click", () => {
            getStatusAluno(aluno)
        }
        )
        
    
        teste.append(card)
    });
    turma_alunos.replaceChildren(teste )
    



}
async function getStatusAluno(aluno){
    console.log(aluno.curso[0].disciplinas);
    let profile = document.getElementById('profile')
    let image = document.createElement('img')
    image.classList.add("aluno__img__profile")
    if(aluno.sexo =="F"){
        image.setAttribute("src","./img/mulher.png")
    }else{
        image.setAttribute("src","./img/homem.png")
    }

    let name = document.createElement('p')
    name.textContent = aluno.nome

    profile.replaceChildren(image,name)

    let diciplinas = aluno.curso[0].disciplinas

    let boletim = document.getElementById('boletim')
    let div = document.createElement('div')
    div.classList.add("boletim__div")

     diciplinas.forEach(diciplina => {

        let boletim_materia = document.createElement('div')
        boletim_materia.classList.add("boletim__materia")
        let boletim_nota = document.createElement('span')
        boletim_nota.classList.add("boletim__nota")
        boletim_nota.textContent = diciplina.media
        boletim_materia.append(boletim_nota)

        let boletim_barra = document.createElement('div')
        boletim_barra.classList.add("boletim__barra")
        boletim_materia.append(boletim_barra)

        let boletim_barra_nota= document.createElement('div')
        boletim_barra_nota.classList.add("boletim__barra__porcentagem")

        boletim_barra_nota.style.height = diciplina.media + "%"

        if(diciplina.status == "Exame"){
            boletim_barra_nota.classList.add("boletim__barra__amarela")
        }else if(diciplina.status == "Aprovado"){
            boletim_barra_nota.classList.add("boletim__barra__azul")
        }else{
            boletim_barra_nota.classList.add("boletim__barra__vermelha")
        }
        boletim_barra.append(boletim_barra_nota)

        let boletim_sigla = document.createElement('span')
        let palavra =  diciplina.nome.split(" ")
        let sigla = ""
        palavra.forEach(palavra => {
            if(palavra.length <= 2){
                sigla += palavra.substring(0,2)
            }else{
                sigla += palavra.substring(0,1)
            }
            
        })
        boletim_sigla.textContent = sigla ;


        boletim_materia.append(boletim_sigla)
        div.append(boletim_materia)
     } )
    boletim.replaceChildren(div)
 }

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
    let filtro =  document.getElementById(this.id)
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