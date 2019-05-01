(function () {
    const requisicao = {
        url: "https://api.github.com/users/",
        resposta: " ",
        resultado: " "
    }
    // 1 - parte que busca e mostrar os resultados da pesquisa quando clica no Buscar
    async function buscaUser() {
        const userGit = document.getElementById("userGit").value;
        requisicao.url += userGit;
        requisicao.resposta = await fetch(requisicao.url);
        requisicao.resultado = await requisicao.resposta.json();

        limpaPesquisa();
        document.getElementById("gitUser").innerHTML = requisicao.resultado.login;
    }
    const userBusca = document.getElementById("buscaUser");
    userBusca.addEventListener("click", buscaUser);

    // 2 - parte que busca os repositorio quando o botao repos e clicado
    async function buscaRepos() {
        const repos = await fetch(requisicao.resultado.repos_url),
            reposResult = await repos.json();
        var repo = " ";
        if (!reposResult.length) {
            repo += "<li>Usuário não possui repositórios</li>";
        } else {
            for (let i = 0; i < reposResult.length; i++) {
                repo += "<li>" + reposResult[i].name + "</li>";
            }
        }
        document.getElementById("repos").innerHTML = repo;
    }
    const reposBusca = document.getElementById("buscaRepos");
    reposBusca.addEventListener("click", buscaRepos);

    // 3 - parte que busca os starred quando o botao starred e clicado
    async function buscaStarred() {
        const starred_url = "https://api.github.com/users/" + requisicao.resultado.login + "/starred";
        const starred = await fetch(starred_url),
            starredResult = await starred.json();
        var star = " ";
        if (!starredResult.length) {
            star += "<li>Não há repositórios Starred</li>";
        } else {
            for (let i = 0; i < starredResult.length; i++) {
                star += "<li>" + starredResult[i].name + "</li>";
            }
        }
        document.getElementById("starred").innerHTML = star;
    }
    const starredBusca = document.getElementById("buscaStarred");
    starredBusca.addEventListener("click", buscaStarred);

    //parte responsavel por abrir a função buscaUser com a tecla ENTER
    const userGit = document.getElementById("userGit");
    userGit.addEventListener("keyup", function (evento) {
        if (evento.keyCode === 13) {
            evento.preventDefault();
            buscaUser();
        }
    });

    //limpa o campo de pequisa e mostra o resultado
    function limpaPesquisa() {
        document.getElementsByTagName("header")[0].style.display = "none";
        document.getElementsByTagName("main")[0].style.display = "grid";
        document.getElementsByTagName("footer")[0].style.display = "grid";
    }

    //limpa tudo, dando um F5 na pagina
    const limpa = document.getElementById("voltar");
    limpa.addEventListener("click", function () {
        location.reload();
    });
})();
