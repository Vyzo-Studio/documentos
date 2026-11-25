# Auditoria v2.1 — 25/11/2026

## Revisão documental
215 registros: 121 ProUni e 94 SISU. 40 novos registros; IDs anteriores preservados. A modalidade LI_EP continua padrão. O catálogo considera todos os perfis existentes e separa a empresa de sua proprietária.

Referências consultadas:
- IFB, edital 5/2026, anexos D (cotas) e E (matrícula): https://www.ifb.edu.br/estude-no-ifb/noticias/45562-sistema-de-selecao-unificada-sisu-2026-documentos
- UCB, relação de documentos 2026/1: https://ucb2.catolica.edu.br/portal/wp-content/uploads/2026/02/Relacao-de-Documentos-ProUni-2026.1.pdf
- IESB, checklist 2025: https://www.iesb.br/content/uploads/2021/07/Documentos-Prouni-2025-Candidatos-2.pdf
- IESB, orientações 2026/2: https://www.iesb.br/noticias/edital-prouni-2026-2-inicia-inscricoes-nesta-terca-feira-7/
- MEC: https://prouniportal.mec.gov.br/tire-suas-duvidas-pesquisa/documentacao

Novidades: residência individual e declarações substitutivas; CTPS; CNIS; consulta de não declarante IRPF; extratos de contas ativas e encerradas; extratos da menor se houver conta; DECORE; contribuição ao INSS; férias e 13º; CAM; comprovantes MEI e fiscais específicos; rescisão e seguro-desemprego quando aplicáveis; ajuda financeira; guarda; pensão e renda de aluguel; protocolos e conferência de originais. Não confundir exigências históricas da instituição com regras universais. Não há confirmação dos requisitos finais de 2027, regime da empresa nem aceitação concreta de documento militar provisório. Verificar também oferta do curso ADS presencial.

## QA executado nos arquivos recuperados do GitHub
13 testes de lógica em ambiente JS com DOM e localStorage simulados: IDs, LI_EP, isolamento, persistência simulada, cotas, não se aplica, backup, backup inválido, migração v1, CPF LB_EP, geração de perfis/telas, novos documentos e falha de armazenamento. Todos passaram.
6 verificações adicionais: Checkbox condicional confirma aplicabilidade; Status não se aplica remove do denominador; Evento de checkbox não altera SISU; Observação escapada; Link institucional UCB presente; IDs anteriores presentes. Todas passaram.
A versão portátil teve seus três scripts comparados com os módulos publicados; são idênticos. Sintaxe JS verificada após correção de expressão de validação.

Limites: não houve teste visual em navegador real, teste de teclado, download/importação pelo seletor real, reinício real do navegador ou validação definitiva de 2027. A publicação foi de código em repositório privado, não deploy público. Não foram enviados backups ou dados reais de documentos.
