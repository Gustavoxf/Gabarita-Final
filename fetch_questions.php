<?php
// fetch_questions.php

header('Content-Type: application/json');
// Permite que o seu frontend (que roda no navegador) acesse este script PHP.
header('Access-Control-Allow-Origin: *'); 

// Inclui o arquivo que contém a função getConnection()
require_once 'db_connect.php'; 

// Tenta obter a conexão com o banco de dados
$conn = getConnection();
if ($conn === null) {
    // Se a conexão falhar, retorna um erro em JSON
    echo json_encode(["error" => "Não foi possível conectar ao banco de dados."]);
    exit;
}

$questions = [];

// 1. Seleciona todas as perguntas
$sql_perguntas = "SELECT id, assunto, texto_pergunta, explicacao, resposta_correta_indice FROM perguntas ORDER BY id ASC";
$result_perguntas = $conn->query($sql_perguntas);

if ($result_perguntas && $result_perguntas->num_rows > 0) {
    while($row_pergunta = $result_perguntas->fetch_assoc()) {
        $pergunta_id = $row_pergunta['id'];
        
        // 2. Para cada pergunta, seleciona as opções de resposta usando prepared statement
        // Prepared statements são mais seguros contra SQL Injection.
        $sql_opcoes = "SELECT texto_opcao FROM opcoes_resposta WHERE pergunta_id = ? ORDER BY indice ASC";
        
        $stmt_opcoes = $conn->prepare($sql_opcoes);
        $stmt_opcoes->bind_param("i", $pergunta_id); // 'i' significa que é um inteiro
        $stmt_opcoes->execute();
        $result_opcoes = $stmt_opcoes->get_result();

        $opcoes = [];
        if ($result_opcoes->num_rows > 0) {
            while($row_opcao = $result_opcoes->fetch_assoc()) {
                // Adiciona o texto da opção no array
                $opcoes[] = $row_opcao['texto_opcao'];
            }
        }
        $stmt_opcoes->close();
        
        // 3. Monta o objeto de questão no formato esperado pelo JavaScript
        $questions[] = [
            'id' => $row_pergunta['id'],
            'subject' => $row_pergunta['assunto'],
            'question' => $row_pergunta['texto_pergunta'],
            'options' => $opcoes,
            // O índice de resposta correta precisa ser um número no JS
            'correctAnswer' => (int)$row_pergunta['resposta_correta_indice'], 
            'explanation' => $row_pergunta['explicacao']
        ];
    }
}

$conn->close();

// Retorna o array de questões completo em formato JSON
echo json_encode($questions);
?>