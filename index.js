//formulario

const handleSubmit = (event) => {
  event.preventDefault();
  
  const name = document.querySelector('input[name=Name]').value;
  const email = document.querySelector('input[name=Email]').value;
  const cep = document.querySelector('input[name=CEP]').value;
  const latitude = document.querySelector('input[name=Latitude]').value;
  const longitude = document.querySelector('input[name=Longitude]').value;


  fetch('https://api.sheetmonkey.io/form/rU9q4bXeTR8qTfzWmr8Pcn', {

    method: 'POST',
    headers: {
      'Accept': 'applicantion/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, cep, latitude, longitude}),
  });
}

document.querySelector('form').addEventListener('submit', handleSubmit);

//via cep

const resultadoCep = (endereco) =>{
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
}

const pesquisarCep = async() => {
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const dados = await fetch(url);
  const endereco = await dados.json();
  resultadoCep(endereco);
}

document.getElementById('searchButton').addEventListener('click', pesquisarCep);

//open-meteo

async function getPrevisao() {
  const lat = document.getElementById('lat').value;
  const long = document.getElementById('long').value;
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);
    const data = await response.json();
    console.log(data);
   
    if (data.hourly && Array.isArray(data.hourly.temperature_2m)) {
      const lastTemperature = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
      document.getElementById('temperatura').textContent = `${lastTemperature}°C`;
    } else {
      throw new Error("Dados de previsão horária não encontrados.");
    }

  } catch (error) {
    alert(error.message);
  }
}