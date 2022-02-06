//importando o obj cliente do model cliente
import { clientes } from '../model/cliente.js';

//Eventos que serão executados após carregamento completo da pagina
document.addEventListener('DOMContentLoaded', () => {

    preencheLista();

    document.getElementById('btnCadastrar').addEventListener('click', mostraModal);
    document.getElementById('btnCloseModal').addEventListener('click', mostraModal);
    document.getElementById('btnLimpar').addEventListener('click', limparCampos);
    document.getElementById('btnSalvar').addEventListener('click', cadastrar);

    //evento click com função editaCliente
    //em todos os objetos do array
    document.querySelectorAll('.btnEditTd').forEach(e => { e.addEventListener('click', editaCliente) });

    //evento click com função apagaCliente em todos
    //os objetos do array
    document.querySelectorAll('.btnDelTd').forEach(e => { e.addEventListener('click', apagaCliente) });
});

let modal = document.getElementById('modalContainer');
modal.style.display = 'none';

//Ativa o modal
function mostraModal() {

    //console.log("entrou na funcao Mostra Modal")

    if (modal.style.display == 'none') {
        modal.style.display = 'flex';

        limparCampos();
        document.getElementById('btnSalvar').style.display = 'block';
        document.getElementById('btnSalvaEdit').style.display = 'none';
    }
    else {
        modal.style.display = 'none';
    }
}

function cadastrar() {

    console.log('entrou no cadastra')

    let id = generateID();
    let nome = document.getElementById('inputNome').value;
    let email = document.getElementById('inputEmailModal').value;
    let tel = document.getElementById('inputTel').value;
    let city = document.getElementById('inputCity').value;
    let passWord = document.getElementById('inputPasswordModal').value;

    //verifica campos
    if (!id || !nome || !email || !tel || !city || !passWord) {
        alert('Preencha todos os Campos')
        return; //para o código
    } else {

        let clienteTemp = { id: id, nome: nome, email: email, tel: tel, cidade: city, passWord: passWord }

        //adiciona novo obj ao array
        clientes.cliente.push(clienteTemp);

        //console.log(clientes.cliente);

        //LOCAL STORAGE
        //localStorage.setItem(); //Grava
        //localStorage.getItem(); //Pega
        //localStorage.removeItem(); //Remove

        localStorage.clear();

        //salva no localStorage
        localStorage.setItem('cliente', JSON.stringify(clientes.cliente));

        document.getElementById('tableClient').innerHTML +=
            `<tr id="${clienteTemp.id}" class="clientes" >
            <td>${clienteTemp.nome}</td>
            <td>${clienteTemp.email}</td>
            <td>${clienteTemp.tel}</td>
            <td>${clienteTemp.cidade}</td>
            <td class="tdBtn">
                <button id="${clienteTemp.id}" class="btnEditTd">Editar</button>
                <button id="${clienteTemp.id}" class="btnDelTd" ">Excluir</button>
            </td>
            </tr>`;

        limparCampos();

        //fecha o modal
        modal.style.display = 'none';
        //refresh no navegador
        //location.reload();

        preencheLista();
    }
}

//Gerando id aleatório
function generateID() {

    return Math.random().toString(36).substring(2, 9);
}

function limparCampos() {

    document.getElementById('inputNome').value = '';
    document.getElementById('inputEmailModal').value = '';
    document.getElementById('inputTel').value = '';
    document.getElementById('inputCity').value = '';
    document.getElementById('inputPasswordModal').value = '';
}

function preencheLista() {

    let listaClientes = JSON.parse(localStorage.getItem('cliente'));

    //console.log(listaClientes);
    //console.log('Entrou preencheLista');

    //Verifica se localStore está vazio
    if (!listaClientes) {
        console.log('Caiu no if')

        //Será um array vazio
        clientes.cliente = [];

        document.getElementById('tableClient').innerHTML =
            `<table id="tableClient">
        <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Celular</th>
        <th>Cidade</th>
        <th>Ação</th>
        </tr>
        </table>`;
    }
    else {
        //console.log('Caiu no Else')
        //Se não estiver vazio, o nosso
        //model recebe os dados do localStorage
        clientes.cliente = listaClientes;

        document.getElementById('tableClient').innerHTML = '';

        document.getElementById('tableClient').innerHTML =
            `<table id="tableClient">
        <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Celular</th>
        <th>Cidade</th>
        <th>Ação</th>
        </tr>
        </table>`;

        //Loop que vai passar por cada elemento do array
        //pegado os dados e populando a lista
        clientes.cliente.forEach(cliente => {

            document.getElementById('tableClient').innerHTML +=
                `<tr id="${cliente.id}" class="clientes" >
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.tel}</td>
                <td>${cliente.cidade}</td>
                <td class="tdBtn">
                <button id="${cliente.id}" class="btnEditTd">Editar</button>

                <button id="${cliente.id}" class="btnDelTd">Excluir</button>
                </td>
                </tr>`;
        });

        //evento click com função editaCliente
        //em todos os objetos do array
        document.querySelectorAll('.btnEditTd').forEach(e => { e.addEventListener('click', editaCliente) });

        //evento click com função apagaCliente em todos
        //os objetos do array
        document.querySelectorAll('.btnDelTd').forEach(e => { e.addEventListener('click', apagaCliente) });
    }
}

//Vai apagar um cliente da lista
function apagaCliente(e) {

    //console.log('entrou deleta')

    //Pega id do elemento clicado
    let clienteDel = e.target.id;
    //console.log(clienteDel);

    //Filter para retornar todos menos o id clicado
    let listaTemp = clientes.cliente.filter((e) => { return e.id != clienteDel });

    //Reatrubuindo lista nova sem o elemento clicado/apagado
    clientes.cliente = listaTemp;
    //console.log(clientes.cliente)

    //limpa localStorage
    localStorage.clear();

    //salva no localStorage
    localStorage.setItem('cliente', JSON.stringify(clientes.cliente));
    //console.log(localStorage);

    //refresh no navegador
    //location.reload();

    preencheLista();
}

function editaCliente(e) {  

    modal.style.display = 'flex';

    limparCampos();

    console.log('Entrou no Edita Cliente')

    let idEditado = e.target.id;

    console.log(idEditado)

    let clienteTempEdit = [];

    //Retorna o elemento com id igual ao do elemento clicado
    clienteTempEdit = clientes.cliente.filter((cliente) => { return cliente.id == idEditado });

    //Retorno nos campos
    document.getElementById('inputNome').value = clienteTempEdit[0].nome;
    document.getElementById('inputEmailModal').value = clienteTempEdit[0].email;
    document.getElementById('inputTel').value = clienteTempEdit[0].tel;
    document.getElementById('inputCity').value = clienteTempEdit[0].cidade;
    document.getElementById('inputPasswordModal').value = clienteTempEdit[0].passWord;

    document.getElementById('btnSalvar').style.display = 'none';
    document.getElementById('btnSalvaEdit').style.display = 'block';

    document.getElementById('btnSalvaEdit').addEventListener('click', () => {

        if (document.getElementById('inputNome').value != '' &&
            document.getElementById('inputEmailModal').value != '' &&
            document.getElementById('inputTel').value != '' &&
            document.getElementById('inputCity').value != '' &&
            document.getElementById('inputPasswordModal').value != '') {

            //Cliente atualizado
            let clienteEditado = {
                id: idEditado,
                nome: document.getElementById('inputNome').value,
                email: document.getElementById('inputEmailModal').value,
                tel: document.getElementById('inputTel').value,
                cidade: document.getElementById('inputCity').value,
                passWord: document.getElementById('inputPasswordModal').value,
            };

            console.log(clienteEditado)

            //filter para retornar somente objetos do array  
            //com o id diferente ao recebido
            let clientesTemp = clientes.cliente.filter((cliente) => { return cliente.id != idEditado });

            //Adiciona novo cliente editado
            //ao array temporário
            clientesTemp.push(clienteEditado);

            //Substitui os items do array em uso
            //pelos dados atualizados do array temp
            //com o cliente atualizado
            clientes.cliente = clientesTemp;

            //limpa localStorage
            localStorage.clear();

            //salva no localStorage
            localStorage.setItem('cliente', JSON.stringify(clientes.cliente));
            //console.log(localStorage);        

            //fecha o modal
            modal.style.display = 'none';

            preencheLista();

            limparCampos();

            document.getElementById('btnSalvar').style.display = 'block';
            document.getElementById('btnSalvaEdit').style.display = 'none';

        } else {
            window.alert('Preencha todos os campos agora mesmo')
        }

    })
}