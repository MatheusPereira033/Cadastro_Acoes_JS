function mostrarPage(pageId) {
  const pages = ['Page01', 'Page02'];

  // Oculta todas as páginas
  for (const page of pages) {
    document.getElementById(page).style.display = 'none';
  }

  // Exibe a página com o ID especificado
  document.getElementById(pageId).style.display = 'block';
}

// Função para alternar entre as páginas ao clicar nos botões "Avançar" e "Voltar"
function passarPagina() {
  // Evento de clique no botão "Avançar" da primeira página
  document.getElementById('avancarButton').addEventListener('click', function () {
    const dataAcaoInput = document.getElementById('dateAcao');
    if (dataAcaoInput.value.trim() === '') {
      alert('Data da ação deve estar preenchida.');
      return; // Impede a transição para a próxima página se o campo não estiver preenchido
    }

    mostrarPage('Page02');
  });

  // Evento de clique no botão "Voltar" da segunda página
  document.getElementById('divButtonFooterVoltar').addEventListener('click', function () {
    mostrarPage('Page01');
  });
}

// Função para gerar um ID aleatório
function gerarID() {
  const novoID = Math.floor(Math.random() * 1000);
  const labelElement = document.getElementById('labelID');
  labelElement.textContent = novoID;
}

function obterDataHoraFormatada() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function atualizarDataHora() {
  const dataHoraFormatada = obterDataHoraFormatada();
  const labelElement = document.getElementById('labelDataHora');
  labelElement.textContent = dataHoraFormatada;
}

function adicionar10DiasAoLabel() {
  const labelElement = document.getElementById('add10dias');
  const dataAtualTexto = document.getElementById('labelDataHora').textContent;
  const partesData = dataAtualTexto.split('/');
  const dia = parseInt(partesData[0], 10);
  const mes = parseInt(partesData[1], 10) - 1;
  const ano = parseInt(partesData[2], 10);

  const data = new Date(ano, mes, dia);
  data.setDate(data.getDate() + 10);

  const novoDia = String(data.getDate()).padStart(2, '0');
  const novoMes = String(data.getMonth() + 1).padStart(2, '0');
  const novoAno = data.getFullYear();

  labelElement.textContent = `${novoDia}/${novoMes}/${novoAno}`;
}

function validarDataAcao() {
  const dataAcaoInput = document.getElementById('dateAcao');
  const dataAcao = new Date(dataAcaoInput.value);
  const dataMinimaTexto = document.getElementById('add10dias').textContent;
  const partesDataMinima = dataMinimaTexto.split('/');
  const diaMinimo = parseInt(partesDataMinima[0], 10);
  const mesMinimo = parseInt(partesDataMinima[1], 10) - 1;
  const anoMinimo = parseInt(partesDataMinima[2], 10);

  const dataMinima = new Date(anoMinimo, mesMinimo, diaMinimo);

  if (dataAcao < dataMinima) {
    alert("A data da ação não pode ser menor que a data mínima.");
    dataAcaoInput.value = ''; // Limpa o campo de data para evitar uma data inválida
    return false;
  }

  return true; // A data é válida
}

const nomesUsuarios = ['Mayara Livramento', 'João Silva', 'Ana Souza', 'Carlos Santos', 'Mariana Oliveira'];

function escolherNomeAleatorio() {
  const indiceAleatorio = Math.floor(Math.random() * nomesUsuarios.length);
  return nomesUsuarios[indiceAleatorio];
}

function definirNomeUsuario() {
  const labelUsuario = document.getElementById('labelUsuario');
  const nomeAleatorio = escolherNomeAleatorio();
  labelUsuario.textContent = nomeAleatorio;
}

function verificarCampoDataAcao() {
  
  const dataAcaoInput = document.getElementById('dateAcao');
  const avancarButton = document.getElementById('avancarButton');

  // Verifique se o campo dateAcao está preenchido
  if (dataAcaoInput.value.trim() !== '') {
    avancarButton.removeAttribute('disabled');
  } else {
    avancarButton.setAttribute('disabled', 'disabled');
  }

  
}

function calcularInvestimentoPrevistoRateio() {
  const inputRateio = document.getElementById('inputRateio');
  const porcentagem = parseFloat(inputRateio.value);

  const inputInvst = document.getElementById('inputInvst');
  const investimentoPrevisto = parseFloat(inputInvst.value);

  if (!isNaN(investimentoPrevisto) && investimentoPrevisto > 0) {
    if (!isNaN(porcentagem) && porcentagem >= 0 && porcentagem <= 100) {
      const investimentoPrevistoRateio = (porcentagem / 100) * investimentoPrevisto;

      // Exibir o valor calculado
      const labelInvestimentoPrevistoRateio = document.getElementById('InvestPrev');
      labelInvestimentoPrevistoRateio.textContent = `R$${investimentoPrevistoRateio.toFixed(2)}`;
    } else {
      alert('Porcentagem inválida. Por favor, insira um valor entre 0 e 100.');
    }
  } else {
    alert('Investimento previsto inválido. Por favor, insira um valor maior que zero.');
  }
}

function adicionarNaTabela() {
  const produtoPagadorSelect = document.querySelector('#form1Invest select');
  const produtoAlvoSelect = document.querySelector('#form2Invest select');
  const rateioInput = document.querySelector('#inputRateio');
  const investimentoPrevistoRateioLabel = document.querySelector('#InvestPrev');

  if (rateioInput.value.trim() === '') {
    alert('A porcentagem do rateio é obrigatória.');
    return;
  }

  const table = document.querySelector('table');
  const newRow = table.insertRow(-1);

  const rowCount = table.rows.length;
  const newRowClass = rowCount % 2 === 0 ? 'par' : 'impar';

  newRow.className = newRowClass;

  const produtoPagadorCell = newRow.insertCell(0);
  const produtoAlvoCell = newRow.insertCell(1);
  const rateioCell = newRow.insertCell(2);
  const investimentoPrevistoRateioCell = newRow.insertCell(3);
  const editarCell = newRow.insertCell(4);
  const excluirCell = newRow.insertCell(5);

  produtoPagadorCell.textContent = produtoPagadorSelect.value;
  produtoAlvoCell.textContent = produtoAlvoSelect.value;
  rateioCell.textContent = rateioInput.value + '%';
  investimentoPrevistoRateioCell.textContent = investimentoPrevistoRateioLabel.textContent;

  // Adicione ícones de edição e exclusão às células de editar e excluir
  editarCell.innerHTML = '<i class="material-icons" style="color: #1f068d; font-size: 16px; margin-left: 2px; vertical-align: bottom;">edit</i>';
  excluirCell.innerHTML = '<i class="material-icons" style="color: #ec0c04; font-size: 16px; margin-left: 2px; vertical-align: bottom;">close</i>';
  
    // Limpe os campos #inputRateio e #InvestPrev
  rateioInput.value = '';
  investimentoPrevistoRateioLabel.textContent = '';
}


function enviarForm() {
  const rateioCells = document.querySelectorAll('table tr td:nth-child(3)');
  let somaRateio = 0;

  // Calcula a soma dos valores de rateio
  rateioCells.forEach((cell) => {
    const rateioValue = parseFloat(cell.textContent); // Converte o valor de texto para número
    if (!isNaN(rateioValue)) {
      somaRateio += rateioValue;
    }
  });

  // Verifica se a soma é igual a 100
  if (somaRateio === 100) {
    // Envie o formulário
    const form = document.querySelector('form');
    form.submit();
    alert("Seu formulário foi enviado com sucesso.");
  } else {
    alert("Você precisa fechar 100% no rateio antes de enviar o formulário.");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  gerarID();
  atualizarDataHora();
  adicionar10DiasAoLabel();
  passarPagina();
  definirNomeUsuario();

  const dataAcaoInput = document.getElementById('dateAcao');
  dataAcaoInput.addEventListener('blur', validarDataAcao);

  dataAcaoInput.addEventListener('input', verificarCampoDataAcao);

  const inputRateio = document.getElementById('inputRateio');
  inputRateio.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      calcularInvestimentoPrevistoRateio();
    }
  });

  inputRateio.addEventListener('blur', function () {
    calcularInvestimentoPrevistoRateio();
  });

  const addInvestButton = document.querySelector('#AddInvest');
  addInvestButton.addEventListener('click', function (event) {
    event.preventDefault();

    adicionarNaTabela();
  });

 

  verificarCampoDataAcao();
});
