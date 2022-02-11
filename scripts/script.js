import { clientes } from '../model/cliente.js';

document.addEventListener('DOMContentLoaded', () => {

    preencheLista();

    document.getElementById('btnCadastrar').addEventListener('click', mostraModal);
    document.getElementById('btnCloseModal').addEventListener('click', mostraModal);
    document.getElementById('btnLimpar').addEventListener('click', limparCampos);
    document.getElementById('btnSalvar').addEventListener('click', cadastrar);

    document.querySelectorAll('.btnDelTd').forEach(e => { e.addEventListener('click', apagaCliente) });
});

let id = null;
let nome = null;
let email = null;
let tel = null;
let city = null;
let passWord = null;

let editar = false;
let idEditado = null;
let listaClientes = null;
let listaViewTemplate = null;

let modal = document.getElementById('modalContainer');
modal.style.display = 'none';


function mostraModal() {

    if (modal.style.display == 'none') {
        modal.style.display = 'flex';
    }
    else {
        modal.style.display = 'none';
    }
}

function cadastrar() {

    console.log('entrou no cadastra')

    if (!editar) {

        id = generateID();
        nome = document.querySelector('#inputNome').value;
        email = document.querySelector('#inputEmailModal').value;
        tel = document.querySelector('#inputTel').value;
        city = document.querySelector('#inputCity').value;
        passWord = document.querySelector('#inputPasswordModal').value;

        if (!id || !nome || !email || !tel || !city || !passWord) {

            alert('Preencha todos os Campos')
            return;
        } else {

            let clienteTemp = { id: id, nome: nome, email: email, tel: tel, cidade: city, passWord: passWord }

            clientes.cliente.push(clienteTemp);

            localStorage.clear();

            localStorage.setItem('cliente', JSON.stringify(clientes.cliente));

            preencheLista();

            modal.style.display = 'none';
        }

    } else {

        id = idEditado;
        nome = document.querySelector('#inputNome').value;
        email = document.querySelector('#inputEmailModal').value;
        tel = document.querySelector('#inputTel').value;
        city = document.querySelector('#inputCity').value;
        passWord = document.querySelector('#inputPasswordModal').value;

        if (id || nome || email || tel || city || passWord) {

            let clienteEditado = {
                id: idEditado,
                nome: nome,
                email: email,
                tel: tel,
                cidade: city,
                passWord: passWord,
            };

            console.log(clienteEditado)

            let clientesTemp = clientes.cliente.filter((cliente) => { return cliente.id != idEditado });

            clientesTemp.push(clienteEditado);

            clientes.cliente = clientesTemp;

            localStorage.clear();

            localStorage.setItem('cliente', JSON.stringify(clientes.cliente));

            modal.style.display = 'none';

            preencheLista();

            editar = false;

        } else {
            window.alert('Preencha todos os campos agora mesmo');
        }
    }
}

function generateID() {

    return Math.random().toString(36).substring(2, 9);
}

function limparCampos() {

    document.querySelector('#inputNome').value = '';
    document.querySelector('#inputEmailModal').value = '';
    document.querySelector('#inputTel').value = '';
    document.querySelector('#inputCity').value = '';
    document.querySelector('#inputPasswordModal').value = '';
}

function preencheLista() {

    listaClientes = JSON.parse(localStorage.getItem('cliente'));

    if (!listaClientes) {
        console.log('Caiu no if')

        clientes.cliente = [];
    }
    else {

        clientes.cliente = listaClientes;

        listaViewTemplate = `<tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Celular</th>
        <th>Cidade</th>
        <th>Ação</th>
        </tr>`;

        clientes.cliente.forEach(cliente => {

            listaViewTemplate +=
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

        document.getElementById('tableClient').innerHTML = listaViewTemplate;

        document.querySelectorAll('.btnEditTd').forEach(e => { e.addEventListener('click', editaCliente) });

        document.querySelectorAll('.btnDelTd').forEach(e => { e.addEventListener('click', apagaCliente) });

        limparCampos();
    }
}

function apagaCliente(e) {

    let clienteDel = e.target.id;

    let listaTemp = clientes.cliente.filter((e) => { return e.id != clienteDel });

    clientes.cliente = listaTemp;

    localStorage.clear();

    localStorage.setItem('cliente', JSON.stringify(clientes.cliente));

    preencheLista();
}

function editaCliente(e) {

    editar = true;

    modal.style.display = 'flex';

    console.log('Entrou no Edita Cliente')

    idEditado = e.target.id;

    console.log(idEditado)

    let clienteTempEdit = [];

    clienteTempEdit = clientes.cliente.filter((cliente) => { return cliente.id == idEditado });

    document.getElementById('inputNome').value = clienteTempEdit[0].nome;
    document.getElementById('inputEmailModal').value = clienteTempEdit[0].email;
    document.getElementById('inputTel').value = clienteTempEdit[0].tel;
    document.getElementById('inputCity').value = clienteTempEdit[0].cidade;
    document.getElementById('inputPasswordModal').value = clienteTempEdit[0].passWord;
}