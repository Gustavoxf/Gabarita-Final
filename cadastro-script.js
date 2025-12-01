// ------------------------------------------
// Lógica de Submissão do Formulário de Cadastro
// ------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const mensagemElement = document.getElementById('mensagem');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const successMessageContainer = document.getElementById('successMessage');
    
    // Define o caminho do seu script PHP. Deve ser acessível via XAMPP.
    // Ex: Se o arquivo está em htdocs/Gabarita/cadastro.php, o caminho é 'cadastro.php'
    const phpScriptUrl = 'cadastro.php'; 

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            // 1. Estado de Carregamento
            setLoadingState(true, 'Aguarde...');

            // 2. Coleta de Dados
            const formData = new FormData(form);

            try {
                // 3. Requisição AJAX (fetch)
                const response = await fetch(phpScriptUrl, {
                    method: 'POST',
                    body: formData,
                });

                // Verifica se a resposta HTTP foi bem-sucedida (status 200)
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}. Verifique se o XAMPP está ligado.`);
                }
                
                // Tenta parsear a resposta JSON
                const result = await response.json();

                // 4. Tratamento da Resposta do Servidor (PHP)
                if (result.success) {
                    // Sucesso!
                    setLoadingState(false, result.message, 'text-green-600');
                    form.style.display = 'none'; // Esconde o formulário
                    successMessageContainer.style.display = 'block'; // Mostra a mensagem de sucesso
                    
                    // Opcional: Redirecionar após um pequeno delay
                    setTimeout(() => {
                        window.location.href = 'questoes.html'; // Altere para a sua página de quiz/próxima etapa
                    }, 2000); 

                } else {
                    // Falha no Cadastro (ex: email já existe, erro de SQL, etc.)
                    setLoadingState(false, result.message, 'text-red-600');
                }

            } catch (error) {
                // 5. Tratamento de Erros de Conexão ou Parse
                console.error('Erro na requisição AJAX:', error);
                
                // Mensagem genérica de erro (O que você estava vendo!)
                setLoadingState(false, `Erro de conexão com o servidor. Verifique o XAMPP e o caminho do PHP. Detalhe: ${error.message}`, 'text-red-600');
            }
        });
    }

    /**
     * Define o estado de carregamento do botão e exibe a mensagem.
     * @param {boolean} isLoading Se o formulário está carregando.
     * @param {string} message Mensagem a ser exibida.
     * @param {string} messageClass Classe Tailwind CSS para a mensagem (ex: text-red-600).
     */
    function setLoadingState(isLoading, message = '', messageClass = 'text-gray-700') {
        submitButton.disabled = isLoading;
        buttonText.style.display = isLoading ? 'none' : 'inline';
        buttonLoader.style.display = isLoading ? 'inline' : 'none';
        
        mensagemElement.textContent = message;
        mensagemElement.className = `text-center mt-4 text-sm ${messageClass}`;
    }
});