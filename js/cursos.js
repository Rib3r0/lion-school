'use strict'

export const getCursos = async () =>  {

    let url = "http://localhost:8080/v1/lion-school/cursos"

    let response = await fetch(url)

    let cursos = await response.json()

    return cursos

}

export const getAlunosCurso = async (curso) =>  {

    let url = `http://localhost:8080/v1/lion-school/alunos/materia?curso=${curso}`

    let response = await fetch(url)

    let alunos = await response.json()

    return alunos

}

