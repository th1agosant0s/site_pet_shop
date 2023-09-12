// Importa o serviço de clientes para interagir com a API ou banco de dados.
import {clienteService} from "../service/clientes-service.js"

// Função que cria uma nova linha na tabela para exibir informações de um cliente.
const criaNovaLinha = (produto, preco, desc) => {
   // Cria um novo elemento de linha <tr> para a tabela.
   const linhaNovoProduto = document.createElement('tr')
   
   // Define o conteúdo da linha com informações do cliente e botões de ação.
   const conteudo = `
      <td class="td" data-td>${produto}</td>
      <td>${preco}</td>
      <td>
         <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=${desc}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
         </ul>
      </td>`    
   linhaNovoProduto.innerHTML = conteudo
   linhaNovoProduto.dataset.id = id
   console.log(linhaNovoProduto)
   
   // Retorna o elemento da linha criada.
   return linhaNovoCliente
}

// Seleciona a tabela no documento HTML usando um atributo de dados.
const tabela = document.querySelector('[data-tabela]')

// Adiciona um ouvinte de evento 'click' para o elemento com o id 'tabela'
tabela.addEventListener('click', (evento) => {
  
   // Verifica se o elemento clicado tem a classe 'botao-simples botao-simples--excluir'
   let ehBotaoDeletar = evento.target.className == 'botao-simples botao-simples--excluir';
   
   // Se o elemento clicado é o botão de deletar, então o código dentro deste bloco será executado
   if(ehBotaoDeletar) {
     
     // Encontra o elemento mais próximo com o atributo 'data-id' (geralmente, a linha da tabela que contém o cliente)
     const linhaProduto = evento.target.closest('[data-id]');
     
     // Pega o valor do atributo 'data-id' (o ID do cliente)
     let id = linhaProduto.dataset.id;
     
     // Chama o método 'removeCliente' do serviço de cliente para deletar o cliente com o ID especificado
     clienteService.removeProduto(id)
     .then(() => {
       // Se a operação foi bem-sucedida, remove a linha da tabela
       linhaProduto.remove();
     });
   }
 });
 

// Chama a função do serviço de clientes para listar todos os clientes.
clienteService.listaProduto()
.then(data => {
   // Para cada cliente retornado, cria e adiciona uma nova linha na tabela.
   data.forEach(element => {
      tabela.appendChild(criaNovaLinha(element.produto, element.preco, element.desc))
   })
})
