# Central de Documentos — v2.1
Aplicação privada de organização documental para SISU e ProUni 2027. Abra index.html ou use um servidor local fixo: python -m http.server 8765 --bind 127.0.0.1 e acesse http://127.0.0.1:8765/. A versão portátil está em Central_de_Documentos_2027.html.
## Revisão de 25/11/2026
Catálogo anterior preservado com IDs estáveis; acrescentadas evidências de residência individual, CTPS, CNIS, IRPF não declarante, extratos e contas encerradas, DECORE, INSS, férias/13º, CAM, documentação do regime empresarial e controles de matrícula. Os itens de referência institucional são provisórios. Não confundir faturamento com renda familiar. Não solicitar documentos societários ao pai ou candidato. Menor: certidão ou RG/CIN no ProUni; IFB LB_EP exige identificação com foto na referência de 2026.
## Fontes oficiais
- MEC: https://prouniportal.mec.gov.br/tire-suas-duvidas-pesquisa/documentacao
- IFB edital e anexos: https://www.ifb.edu.br/estude-no-ifb/noticias/45562-sistema-de-selecao-unificada-sisu-2026-documentos
- UCB 2026/1: https://ucb2.catolica.edu.br/portal/wp-content/uploads/2026/02/Relacao-de-Documentos-ProUni-2026.1.pdf
- IESB 2025: https://www.iesb.br/content/uploads/2021/07/Documentos-Prouni-2025-Candidatos-2.pdf
- IESB 2026/2: https://www.iesb.br/noticias/edital-prouni-2026-2-inicia-inscricoes-nesta-terca-feira-7/
- INEP: https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/resultados-do-enem-serao-divulgados-em-18-de-janeiro
## Persistência
Mantidas as quatro chaves v2, permitindo recuperar estados na mesma origem. Backups JSON v2 e registros v1 do painel são importáveis; exporte antes de mudar de origem. Sem sincronização. Não armazene números de documentos, senhas, extratos reais ou imagens. Não publique este repositório como público: contém nomes e contexto familiar. Não inclui documentos reais nem backups.
## Testes
Execute node test-logic.js. O teste usa DOM e armazenamento simulados, não substitui teste real de navegador.
## Pendências
Confirmar editais 2027, oferta de ADS presencial e regime da empresa; confirmar documento militar provisório com o IFB e UCB. Nenhuma lista preliminar garante deferimento.