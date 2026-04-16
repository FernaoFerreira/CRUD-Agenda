import { AgendaService } from "../service/AgendaService.mjs";

export class AgendaController {
  constructor() {
    this.service = new AgendaService();

    this.configurarEventos();
    this.render();
  }

  configurarEventos() {
    const form = document.getElementById("contato-form");
    const container = document.getElementById("contatos-container");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = form.elements["nome"].value;
      const telefone = form.elements["telefone"].value;
      const email = form.elements["email"].value;

      try {
        this.service.salvarContato({ nome, telefone, email });
        form.reset();
        this.render();
      } catch (error) {
        alert(error.message);
      }
    });

    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("excluir-btn")) {
        const ID = Number(event.target.dataset.id);
        this.service.excluirContato(ID);
        this.render();
      }
    });
  }

  render() {
    const contatos = this.service.getContatos();
    const container = document.getElementById("contatos-container");

    container.innerHTML = "";

    contatos.forEach((contato) => {
      const li = document.createElement("li");
      
      li.classList.add("contato-item", "list-group-item");

      li.innerHTML = `
        <h3>${contato.nome}</h3>
        <p>Telefone: ${contato.telefone}</p>
        <p>Email: ${contato.email}</p>
        <button data-id="${contato.ID}" class="excluir-btn">Excluir</button>
      `;

      container.appendChild(li);
    });
  }
}