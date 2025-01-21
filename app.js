const form = document.getElementById('equipmentForm');
const equipmentList = document.getElementById('equipmentList');

const API_URL = 'http://localhost:3001/equipments'; // Endereço do seu backend

async function fetchEquipments() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    equipmentData = data;
    renderEquipments();
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newEquipment = {
    dataRecebimento: document.getElementById('dataRecebimento').value,
    colaborador: document.getElementById('colaborador').value,
    empresa: document.getElementById('empresa').value,
    contato: document.getElementById('contato').value,
    equipamento: document.getElementById('equipamento').value,
    numeroSerie: document.getElementById('numeroSerie').value,
    cargo: document.getElementById('cargo').value,
    servico: document.getElementById('servico').value,
    descricaoProblema: document.getElementById('descricaoProblema').value,
    statusServico: document.getElementById('statusServico').value,
    tecnicoResponsavel: document.getElementById('tecnicoResponsavel').value,
    dataEntrega: document.getElementById('dataEntrega').value,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEquipment),
    });

    if (response.ok) {
        fetchEquipments();
      form.reset();
    } else {
      console.error('Falha ao adicionar equipamento:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao adicionar equipamento:', error);
  }
});

function renderEquipments() {
  equipmentList.innerHTML = '';
  equipmentData.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('equipment-item');
    div.innerHTML = `
        <p><strong>Data Recebimento:</strong> ${item.dataRecebimento}</p>
        <p><strong>Colaborador:</strong> ${item.colaborador}</p>
        <p><strong>Empresa:</strong> ${item.empresa}</p>
        <p><strong>Contato:</strong> ${item.contato}</p>
        <p><strong>Equipamento:</strong> ${item.equipamento}</p>
        <p><strong>Nº Série:</strong> ${item.numeroSerie}</p>
        <p><strong>Cargo:</strong> ${item.cargo}</p>
        <p><strong>Serviço:</strong> ${item.servico}</p>
        <p><strong>Descrição Problema:</strong> ${item.descricaoProblema}</p>
        <p><strong>Status:</strong> ${item.statusServico}</p>
        <p><strong>Técnico:</strong> ${item.tecnicoResponsavel}</p>
        <p><strong>Entrega:</strong> ${item.dataEntrega}</p>
        <button onclick="deleteEquipment(${index})">Excluir</button>
    `;
    equipmentList.appendChild(div);
  });
}

async function deleteEquipment(index) {
  try {
    const response = await fetch(`${API_URL}/${index}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchEquipments();
    } else {
      console.error('Falha ao excluir equipamento:', response.statusText);
    }
  } catch (error) {
      console.error('Erro ao excluir equipamento:', error);
  }
}

// Render inicial
fetchEquipments();