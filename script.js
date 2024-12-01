let tabuleiro;
let jogador;
let aviso;
let nomes = ["Jogador 1", "Jogador 2"];
let vencedor = null;
let placar = [0, 0];  // [Jogador 1, Jogador 2]

function iniciarJogo() {
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();

    if (!player1 || !player2) {
        alert("Por favor, preencha os nomes dos jogadores.");
        return;
    }

    nomes = [player1, player2];
    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    inicial();
}

function inicial() {
    tabuleiro = new Array(3).fill(null).map(() => new Array(3).fill(0));
    jogador = 1;
    vencedor = null;
    aviso = document.getElementById("aviso");
    const board = document.getElementById("board");

    // Limpar o tabuleiro
    board.innerHTML = "";

    // Criar as células
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.onclick = () => jogar(i, j, cell);
            board.appendChild(cell);
        }
    }

    aviso.innerHTML = `Vez do jogador: ${nomes[0]}`;
    atualizarPlacar();  // Atualiza o placar ao iniciar o jogo
}

function jogar(row, col, cell) {
    if (vencedor || tabuleiro[row][col] !== 0) {
        aviso.innerHTML = "Campo já marcado!";
        return;
    }

    // Atualizar o tabuleiro e exibir o símbolo
    tabuleiro[row][col] = jogador === 1 ? 1 : -1;
    cell.textContent = jogador === 1 ? "❌" : "⭕";
    cell.classList.add("taken");

    // Verificar vitória ou alternar jogador
    if (checa(row, col)) {
        vencedor = nomes[jogador - 1];
        placar[jogador - 1]++;  // Incrementa o placar do jogador vencedor
        aviso.innerHTML = `${vencedor} GANHOU! 🏆`;
        atualizarPlacar();  // Atualiza o placar
        return;
    }

    if (tabuleiro.flat().every(cell => cell !== 0)) {
        aviso.innerHTML = "Empate! 🤡";
        return;
    }

    // Alternar jogador
    jogador = jogador === 1 ? 2 : 1;
    aviso.innerHTML = `Vez do jogador: ${nomes[jogador - 1]}`;
}

function checa(row, col) {
    const somaLinha = tabuleiro[row].reduce((a, b) => a + b, 0);
    const somaColuna = tabuleiro[0][col] + tabuleiro[1][col] + tabuleiro[2][col];
    const somaDiagonalPrincipal = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2];
    const somaDiagonalSecundaria = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0];

    if (Math.abs(somaLinha) === 3) {
        destacarCélulas([[row, 0], [row, 1], [row, 2]]);
        return true;
    }
    if (Math.abs(somaColuna) === 3) {
        destacarCélulas([[0, col], [1, col], [2, col]]);
        return true;
    }
    if (Math.abs(somaDiagonalPrincipal) === 3) {
        destacarCélulas([[0, 0], [1, 1], [2, 2]]);
        return true;
    }
    if (Math.abs(somaDiagonalSecundaria) === 3) {
        destacarCélulas([[0, 2], [1, 1], [2, 0]]);
        return true;
    }

    return false;
}

function destacarCélulas(cells) {
    const board = document.getElementById("board").children;
    cells.forEach(([i, j]) => {
        board[i * 3 + j].classList.add("winning");
    });
}

function reiniciar() {
    vencedor = null;  // Resetar vencedor
    jogador = 1;      // Resetar jogador
    document.getElementById("aviso").innerHTML = `Vez do jogador: ${nomes[0]}`;
    inicial();  // Reiniciar o jogo
}

function voltarMenu() {
    document.getElementById("setup").style.display = "block";
    document.getElementById("game").style.display = "none";
}

function atualizarPlacar() {
    // Atualiza o placar na tela
    document.getElementById("placar").innerHTML = `
        <p><strong>Placar:</strong></p>
        <p>${nomes[0]}: ${placar[0]} | ${nomes[1]}: ${placar[1]}</p>
    `;
}
