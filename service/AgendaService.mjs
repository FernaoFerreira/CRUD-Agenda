const key = "agenda";

export class AgendaService {
    getContatos() {
        const contatos = localStorage.getItem(key);
        return contatos ? JSON.parse(contatos) : [];
    }
    salvarContato(contato) {
        if (!contato.nome || !contato.telefone || !contato.email) {
            throw new Error("Todos os campos são obrigatórios.");
        }
        const contatos = this.getContatos();
        
        contato.ID = Date.now();
        contatos.push(contato);
        localStorage.setItem(key, JSON.stringify(contatos));
    }
    excluirContato(ID) {
        const contatos = this.getContatos();
        const index = contatos.findIndex(c => c.ID === ID);
        if (index !== -1) {
            contatos.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(contatos));
        }
    }
}