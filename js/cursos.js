'use strict'

export const getCursos = async () =>  {

    let url = "http://school-lion-integration.onrender.com/v1/lion-school/cursos"

    let response = await fetch(url)

    let cursos = await response.json()

    return cursos

}

export const getAlunosCurso = async (curso) =>  {

    let url = `http://school-lion-integration.onrender.com/v1/lion-school/alunos/materia?curso=${curso}`

    let response = await fetch(url)

    let alunos = await response.json()

    return alunos.alunos

}

export const getStatus = async (matricula) =>  {

    let url = `http://school-lion-integration.onrender.com/v1/lion-school/alunos/numero?matricula=${matricula}`

    let response = await fetch(url)

    let matriculaAlunos = await response.json()

    return matriculaAlunos

}

