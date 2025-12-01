<?php
// Apenas para debug. NÃO inclua require_once aqui.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Se esta linha for executada, significa que o PHP está funcionando
$response = ['success' => true, 'message' => 'TESTE PHP BEM-SUCEDIDO. O arquivo foi executado e retornou JSON.'];

echo json_encode($response);
exit;
?>