const form = document.getElementById("form");
const username = document.getElementById("username");
const tipo = document.getElementById("tipo_investimento");
const valor_investimento = document.getElementById("valor_investimento");
const data = document.getElementById("data_investimento");
const tableBody = document.getElementById("table-body");

let investimentos = JSON.parse(localStorage.getItem("investimentos")) || [];
let editIndex = null;

function renderTable() {
  tableBody.innerHTML = "";
  investimentos.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.username}</td>
      <td>${item.tipo}</td>
      <td>R$ ${item.investimento.toFixed(2)}</td>
      <td>${item.data}</td>
      <td>
        <button class="edit-btn" onclick="editInvestimento(${index})">✏️ Editar</button>
        <button class="delete-btn" onclick="deleteInvestimento(${index})">🗑 Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editInvestimento(index) {
  const investimento = investimentos[index];
  username.value = investimento.username;
  tipo.value = investimento.tipo;
  valor_investimento.value = investimento.investimento;
  data.value = investimento.data;
  editIndex = index;
}

function deleteInvestimento(index) {
  if (confirm("Tem certeza que deseja excluir este investimento?")) {
    investimentos.splice(index, 1);
    localStorage.setItem("investimentos", JSON.stringify(investimentos));
    renderTable();
  }
}

// Função para lidar com o envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previne o envio tradicional do formulário

  const usernameValue = username.value.trim();
  const tipoValue = tipo.value.trim();
  const valorValue = parseFloat(valor_investimento.value.trim());
  const dataValue = data.value.trim();

  // Validação simples para garantir que os campos não estejam vazios
  if (!usernameValue || !tipoValue || !valorValue || !dataValue) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Atualizar ou adicionar o investimento
  const investimento = {
    username: usernameValue,
    tipo: tipoValue,
    investimento: valorValue,
    data: dataValue
  };

  if (editIndex !== null) {
    // Editando um investimento existente
    investimentos[editIndex] = investimento;
    editIndex = null;
  } else {
    // Adicionando um novo investimento
    investimentos.push(investimento);
  }

  // Salvar os investimentos no localStorage
  localStorage.setItem("investimentos", JSON.stringify(investimentos));

  // Limpar o formulário
  form.reset();

  // Re-renderizar a tabela
  renderTable();
});

renderTable(); // Inicializar a renderização da tabela