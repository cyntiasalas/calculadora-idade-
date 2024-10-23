// Entradas
const DiaInp = document.getElementById("Dia");
const MêsInp = document.getElementById("Mês");
const AnoInp = document.getElementById("Anos");

// Saídas
const DiaOtp = document.getElementById("DD");
const MêsOtp = document.getElementById("MM");
const AnoOtp = document.getElementById("AAAA");

// Elemento de formulários
const form = document.querySelector("form");

// Adicionar o listener de evento de envio ao formulário
form.addEventListener("submit", handleSubmit);

function validate() {
  const inputs = document.querySelectorAll("input");
  let isValid = true; // Use uma variável mais descritiva


  inputs.forEach((input) => {
    const parentElement = input.parentElement;

    if (!input.value) { // Verificar se o valor de entrada está vazio
      input.style.borderColor = "red";
      parentElement.querySelector("small").innerText = "Este campo é obrigatório.";
      isValid = false;
    } else if (MêsInp.value > 12) {
      MêsInp.style.borderColor = "red";
      MêsInp.parentElement.querySelector("small").innerText = "Deve ser um mês válido";
      isValid = false;
    } else if (DiaInp.value > 31) {
      DiaInp.style.borderColor = "red";
      DiaInp.parentElement.querySelector("small").innerText = "Deve ser um dia válido.";
      isValid = false;
    } else {
      input.style.borderColor = "black";
      parentElement.querySelector("small").innerText = "";
    }
  });

  return isValid; // Não está disponível
}

function handleSubmit(event) {
  event.preventDefault();

  if (validate()) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Obter o dia atual
    const currentMonth = currentDate.getMonth() + 1; // Obter o mês atual

    const enteredDay = parseInt(DiaInp.value);
    const enteredMonth = parseInt(MêsInp.value);
    const enteredYear = parseInt(AnoInp.value);

    //Calcular a diferença entre as datas inseridas e as atuais, considerando o desbordamento de ano e mês
    let differenceInDays = enteredDay - currentDay;
    let differenceInMonths = enteredMonth - currentMonth;
    let differenceInYears = enteredYear - currentDate.getFullYear();

    if (differenceInMonths < 0) {
      differenceInMonths += 12;
      differenceInYears--;
    }

    // Tratar caso em que a data inserida está no futuro

    if (differenceInDays < 0) {
      differenceInMonths--;
      differenceInDays += new Date(enteredYear, enteredMonth, 0).getDate(); // Obtenha os dias do mês inserido
    }

    DiaOtp.innerHTML = differenceInDays;
    MêsOtp.innerHTML = differenceInMonths;
    AnoOtp.innerHTML = differenceInYears;
  }
}