const form = document.getElementById("form");
const username = document.getElementById("username");
const tipo = document.getElementById("tipo_investimento");
const valor_investimento = document.getElementById("valor_investimento"); // Corrigido o nome da variável
const data = document.getElementById("data_investimento");
const tableBody = document.getElementById("table-body");

let investimentos = JSON.parse(localStorage.getItem("investimentos")) || [];
let editIndex = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkForm();
});

function checkForm() {
  if (username.value.trim() === "" || tipo.value.trim() === "" || valor_investimento.value.trim() === "" || data.value.trim() === "") {
    alert("Preencha todos os campos!");
    return;
  }

  if (isNaN(valor_investimento.value) || Number(valor_investimento.value) <= 0) {
    alert("O valor do investimento deve ser um número válido maior que zero.");
    return;
  }

  const novoInvestimento = {
    username: username.value.trim(),
    tipo: tipo.value.trim(),
    investimento: parseFloat(valor_investimento.value),
    data: data.value.trim(),
  };

  console.log(novoInvestimento)
  if (editIndex !== null) {
    investimentos[editIndex] = novoInvestimento;
    editIndex = null;
  } else {
    investimentos.push(novoInvestimento);
  }

  localStorage.setItem("investimentos", JSON.stringify(investimentos));
  form.reset();
}