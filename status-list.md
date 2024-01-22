# Códigos de Status HTTP

## Códigos de status 200 (Sucesso)

- 200 OK: A solicitação foi bem-sucedida. A resposta contém o corpo do recurso solicitado.
- 201 Created: A solicitação resultou na criação de um novo recurso.
- 202 Accepted: A solicitação foi aceita para processamento, mas o processamento ainda não foi concluído.
- 204 No Content: A solicitação foi bem-sucedida, mas não há representação para retornar (i.e., o corpo da mensagem está vazio).
- 206 Partial Content: A solicitação foi bem-sucedida e o corpo da mensagem contém uma parte da resposta.

## Códigos de status 400 (Erro do cliente)

- 400 Bad Request: A solicitação não pode ser entendida devido à sintaxe mal formada.
- 401 Unauthorized: Autenticação requerida e falha ou falta na autenticação.
- 403 Forbidden: O servidor compreendeu a solicitação, mas se recusa a autorizá-la.
- 404 Not Found: O recurso solicitado não pode ser encontrado.
- 405 Method Not Allowed: O método especificado na solicitação não é permitido para o recurso identificado.
- 406 Not Acceptable: Não é possível produzir uma resposta que corresponda aos cabeçalhos de aceitação fornecidos pelo cliente.
- 407 Proxy Authentication Required: O cliente deve primeiro autenticar-se com o servidor proxy.
- 408 Request Timeout: O servidor não atendeu a tempo à solicitação.
- 409 Conflict: A solicitação não pode ser concluída devido a um conflito com o estado atual do recurso.

## Códigos de status 500 (Erro do servidor)

- 500 Internal Server Error: Ocorreu um erro interno no servidor e não foi possível completar a solicitação.
- 501 Not Implemented: O método de solicitação especificado não é suportado pelo servidor e não pode ser tratado.
- 502 Bad Gateway: O servidor recebeu uma resposta inválida ao tentar atender à solicitação.
- 503 Service Unavailable: O servidor não está pronto para lidar com a solicitação, geralmente porque está em manutenção ou sob carga pesada.
- 504 Gateway Timeout: O servidor agiu como gateway ou proxy e não recebeu uma resposta adequada de um servidor a montante.
- 505 HTTP Version Not Supported: A versão do protocolo HTTP usada na solicitação não é suportada pelo servidor.
- 506 Variant Also Negotiates: Indica que o servidor subjacente retornou uma resposta de status '506'. Isso indica que o servidor precisa de alguma negociação adicional para finalizar a solicitação.
- 507 Insufficient Storage: O servidor web não conseguiu armazenar o conteúdo temporário necessário para processar a solicitação.
- 508 Loop Detected: A solicitação causou um loop infinito ao ser processada.
- 511 Network Authentication Required: É necessária uma autenticação de rede para acessar o recurso solicitado.
