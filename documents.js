
const PROFILES=[['Lucas','Candidato','L'],['Cátia','Mãe','C'],['José Francisco','Pai','JF'],['Larissa Luenda','Irmã','LL'],['Maria Eduarda','Irmã','ME'],['Serralheria','Pessoa jurídica','PJ'],['Documentação familiar','Grupo familiar','GF']];
const CATS=['Documentos pessoais','Documentos escolares','Documentos militares','Documentos eleitorais','Documentos trabalhistas','Comprovantes de renda','Documentos bancários','Documentos empresariais','Documentos tributários','Declarações','Documentos complementares'];
const SOURCES={mec:'https://prouniportal.mec.gov.br/tire-suas-duvidas-pesquisa/documentacao',ifb:'https://www.ifb.edu.br/estude-no-ifb/noticias/45562-sistema-de-selecao-unificada-sisu-2026-documentos',cin:'https://www.nahora.df.gov.br/',cpf:'https://servicos.receitafederal.gov.br/',mil:'https://alistamento.eb.mil.br/',tse:'https://www.tse.jus.br/',ctps:'https://www.gov.br/pt-br/servicos/obter-a-carteira-de-trabalho',cnis:'https://meu.inss.gov.br/',mei:'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',enem:'https://enem.inep.gov.br/participante/',prouni:'https://acessounico.mec.gov.br/prouni',sisu:'https://acessounico.mec.gov.br/sisu',cad:'https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico'};
// id|perfil|categoria|nome|SISU (A/E/R/-)|ProUni (1/0)|tipo S|tipo P|prazo|emissão|orientação
const RAW=`01|0|0|RG ou CIN|A|1|O|O|N|cin|Identidade oficial com foto; outras identificações oficiais podem ser aceitas.
02|0|0|Comprovante de CPF|A|1|C|C|N|cpf|No IFB, cópia separada se o CPF não constar na identidade; na LB_EP, conferir exigência específica.
03|0|1|Histórico escolar do ensino médio|A|1|A|A|N||Solicitar na escola; comprovar todo o ensino médio público nas cotas.
04|0|1|Certificado ou declaração de conclusão do ensino médio|A|1|A|A|N||IFB: certificado ou histórico acompanhado da declaração de conclusão. ProUni: confirmar forma aceita pela instituição.
05|0|1|Declaração de ensino médio integralmente público|E|1|A|A|N||Alternativa ao histórico que comprove o percurso escolar, conforme edital.
06|0|3|Título eleitoral|A|1|O|C|N|tse|IFB: número ou cópia para maiores de 18 e menores de 70 anos. ProUni: somente se solicitado na matrícula.
07|0|3|Certidão de quitação eleitoral|A|1|P|P|M|tse|Complementar; não substitui automaticamente o título.
08|0|2|Certificado de Dispensa de Incorporação (CDI)|A|1|A|C|N|mil|Aguardando emissão conforme relato. IFB 2026 também prevê documento de apresentação à corporação militar; confirmar o comprovante específico com o campus.
09|0|2|Comprovante de apresentação ou dispensa militar|A|0|A|C|N|mil|Alternativa ao CDI no IFB 2026. Confirme aceitação antes de substituir.
10|0|0|Duas fotografias 3x4 recentes|A|0|O|C|M||Duas fotos idênticas e recentes conforme IFB 2026.
11|0|0|Comprovante de residência com CEP|A|1|O|O|M||Conta ou declaração de residência aceita; guardar original e PDF.
12|0|4|Carteira de Trabalho Digital|R|1|C|C|E|ctps|Complementar para comprovar vínculos; não comprova sozinha ausência de renda.
13|0|4|Extrato previdenciário CNIS|R|1|P|P|E|cnis|Complementar se solicitado.
14|0|6|Extratos bancários pessoais|R|1|A|A|E||Últimos três meses, como referência; verificar período oficial.
15|0|5|Declaração de trabalho e renda informal|R|1|C|C|E||Declarar atividade e rendimentos reais, variáveis; confirmar modelo e aceitação.
16|0|5|Recibos ou comprovantes dos pagamentos informais|R|1|C|C|E||Organizar pagamentos efetivamente recebidos.
17|0|8|IRPF, recibo de entrega e restituição, se houver|R|1|A|A|E|cpf|Se apresentou declaração; não inventar isenção.
18|0|9|Declaração de recebimento ou não de pensão alimentícia|R|1|O|C|E||IFB LB_EP: declaração de cada integrante. ProUni conforme situação e exigência.
19|0|9|Formulário oficial de comprovação da reserva de vaga|E|0|O|C|E|sisu|Usar o anexo da edição de 2027.
20|0|9|Declaração de não ocupação simultânea de vaga ou bolsa|A|0|O|C|E|sisu|Usar formulário do IFB na matrícula.
21|0|10|Formulário de matrícula|A|1|O|C|E||Modelo fornecido pela instituição na convocação.
22|0|10|Boletim de desempenho do ENEM|-|1|C|P|E|enem|Guardar após divulgação; não substitui dados oficiais da seleção.
23|0|10|Comprovante de inscrição e pré-seleção ProUni|-|1|C|P|E|prouni|Gerado no processo seletivo.
24|0|9|Formulário de comprovação de informações ProUni|-|1|C|V|E|prouni|Confirmar formulário institucional de 2027.
25|1|0|RG ou CIN|R|1|O|O|N|cin|Identificação pessoal; outras formas oficiais conforme regras.
26|1|0|Comprovante de CPF|R|1|O|C|N|cpf|Conferir se é necessário documento separado no ProUni.
27|1|4|Carteira de Trabalho Digital|R|1|C|C|E|ctps|Ausência de CLT não significa ausência de renda.
28|1|4|Extrato previdenciário CNIS|R|1|P|P|E|cnis|Complementar.
29|1|6|Extratos bancários da pessoa física|R|1|A|A|E||Pelo menos três meses como referência; separar PF e PJ.
30|1|5|Comprovantes de pró-labore e distribuição de lucros|R|1|C|A|E||Se houver; verificar contabilidade e valores pessoais.
31|1|5|Declaração de rendimentos pessoais da atividade empresarial|R|1|C|C|E||Não confundir faturamento bruto com rendimentos pessoais.
32|1|8|IRPF com recibo e restituição, se houver|R|1|A|A|E|cpf|Se apresentou declaração.
33|1|9|Declaração de recebimento ou não de pensão alimentícia|R|1|O|C|E||IFB LB_EP; ProUni quando pertinente.
34|2|0|RG ou CIN|R|1|O|O|N|cin|Identificação pessoal.
35|2|0|Comprovante de CPF|R|1|O|C|N|cpf|Conferir documento separado.
36|2|4|Carteira de Trabalho Digital com vínculo CLT|R|1|A|A|E|ctps|Vínculo de porteiro.
37|2|5|Contracheques atualizados|R|1|A|A|E||ProUni: três para salário fixo, seis quando há comissão ou horas extras. IFB: contracheques ou declaração atualizada.
38|2|5|Declaração do empregador com cargo e salário bruto|R|1|A|C|E||Alternativa IFB; confirmar ProUni.
39|2|4|Extrato previdenciário CNIS|R|1|P|P|E|cnis|Complementar.
40|2|4|Extrato do FGTS|R|1|A|A|E||Obter no aplicativo oficial FGTS, se necessário.
41|2|6|Extratos bancários pessoais|R|1|A|A|E||Pelo menos três meses; incluir atividade informal na análise.
42|2|5|Declaração de renda informal na serralheria|R|1|C|C|E||O pai não é proprietário nem sócio; declarar renda adicional real.
43|2|5|Comprovantes de recebimentos informais|R|1|C|C|E||Pagamentos efetivos da atividade informal.
44|2|8|IRPF com recibo e restituição, se houver|R|1|A|A|E|cpf|Se apresentou declaração.
45|2|9|Declaração de recebimento ou não de pensão alimentícia|R|1|O|C|E||IFB LB_EP; ProUni conforme situação.
46|3|0|RG ou CIN|R|1|O|O|N|cin|Identificação pessoal.
47|3|0|Comprovante de CPF|R|1|O|C|N|cpf|Conferir documento separado.
48|3|4|Carteira de Trabalho Digital com vínculo CLT|R|1|A|A|E|ctps|Vínculo de porteira.
49|3|5|Contracheques atualizados|R|1|A|A|E||ProUni: três fixos ou seis com comissão ou horas extras. IFB: contracheques ou declaração atualizada.
50|3|5|Declaração do empregador com cargo e salário bruto|R|1|A|C|E||Alternativa IFB; confirmar ProUni.
51|3|4|Extrato previdenciário CNIS|R|1|P|P|E|cnis|Complementar.
52|3|4|Extrato do FGTS|R|1|A|A|E||Se solicitado.
53|3|6|Extratos bancários pessoais|R|1|A|A|E||Pelo menos três meses.
54|3|8|IRPF com recibo e restituição, se houver|R|1|A|A|E|cpf|Se apresentou declaração.
55|3|9|Declaração de recebimento ou não de pensão alimentícia|R|1|O|C|E||IFB LB_EP; ProUni conforme situação.
56|4|0|Certidão de nascimento|R|1|C|O|N||ProUni: alternativa de identificação para menor de 18 anos. IFB LB_EP 2026 pede identificação com foto; confirmar exceção.
57|4|0|Comprovante de CPF|R|1|O|C|N|cpf|Já possui CPF, mas cópia ainda não confirmada.
58|4|0|Primeira via da CIN|R|1|O|A|N|cin|IFB LB_EP: identidade com foto. No ProUni, alternativa à certidão de nascimento; não exigir ambas.
59|4|1|Declaração de matrícula escolar|R|1|C|C|E||Se solicitada pela instituição.
60|4|9|Declaração de ausência de renda assinada pelo responsável|R|1|C|C|E||Menor estudante sem renda; não solicitar documentos de emprego.
61|4|9|Declaração de recebimento ou não de pensão alimentícia|R|1|O|C|E||Responsável declara conforme situação; verificar modelo.
62|5|7|Cartão CNPJ|R|1|P|C|N|cpf|Identificação da empresa exclusivamente de Cátia.
63|5|7|CCMEI, requerimento de empresário ou contrato social|R|1|P|C|N|mei|Somente o ato correspondente à natureza jurídica.
64|5|8|Comprovante do regime tributário|R|1|P|P|N|cpf|Identificar MEI, Simples ou outro regime. Não presumir MEI.
65|5|8|Declaração anual DASN-SIMEI|R|1|C|C|E|mei|Somente MEI.
66|5|8|DEFIS e apurações PGDAS-D|R|1|C|C|E|cpf|Somente Simples Nacional não MEI, conforme obrigação.
67|5|8|ECF ou outras declarações tributárias aplicáveis|R|1|C|C|E|cpf|Somente conforme regime e orientação contábil.
68|5|8|Comprovantes de tributos e contribuições|R|1|C|C|E|cpf|DAS ou demais tributos aplicáveis.
69|5|6|Extratos bancários da pessoa jurídica|R|1|A|A|E||Pelo menos três meses, se houver conta PJ.
70|5|7|Relatórios mensais de faturamento|R|1|P|P|E||Receitas brutas dos serviços; não equivalem à renda familiar.
71|5|7|Notas fiscais de serviços e recibos|R|1|C|C|E||Organizar por competência.
72|5|7|Comprovantes de despesas empresariais|R|1|P|P|E||Despesas reais comprovadas, conforme orientação contábil.
73|5|7|Demonstrativo contábil de receitas, despesas e resultado|R|1|C|C|E||Solicitar ao contador se pertinente.
74|5|5|Comprovantes de retiradas, pró-labore e lucros|R|1|C|C|E||Conciliar com documentos de Cátia.
75|5|7|Registro de pagamentos informais ao pai e ao candidato|R|1|P|P|E||Evitar dupla contagem; não atribuir propriedade da empresa a eles.
76|6|9|Declaração de composição familiar|R|1|C|V|E||Cinco integrantes conforme relato; confirmar definição e modelo oficial.
77|6|0|Certidão de casamento ou união estável dos pais|R|1|C|C|N||Se aplicável e solicitado.
78|6|0|Comprovante de residência familiar|R|1|A|A|M||Reutilizar documento do candidato se aceito; não emitir duas vezes.
79|6|10|Comprovante de Cadastro Único|R|1|A|C|E|cad|Somente se inscritos e pertinente.
80|6|5|Comprovantes de outras rendas e benefícios|R|1|C|C|E||Se houver; observar exclusões legais.
81|6|9|Formulário socioeconômico oficial|R|1|V|V|E||Aguardar modelos da edição e instituição.
82|6|5|Demonstrativo consolidado da renda dos cinco integrantes|R|1|P|P|E||Controle preventivo; não é exigência universal.
83|0|5|Comprovação suficiente da renda informal do candidato|R|1|O|O|E||Confirmar com a instituição os comprovantes aceitos (extratos, IRPF, contribuições e outros); marcar após reunir o conjunto aceito.
84|1|5|Comprovação suficiente dos rendimentos pessoais de Cátia|R|1|O|O|E||Conjunto aceito pela instituição para comprovar renda empresarial pessoal; não é um formulário adicional.
85|2|5|Comprovação suficiente da renda CLT do pai|R|1|O|O|E||Marcar quando reunir a combinação aceita de contracheques ou outros comprovantes.
86|2|5|Comprovação suficiente da renda informal do pai|R|1|O|O|E||Marcar após reunir a documentação aceita da renda adicional.
87|3|5|Comprovação suficiente da renda CLT de Larissa|R|1|O|O|E||Marcar quando reunir a combinação aceita de comprovantes.
88|4|5|Comprovação da situação sem renda da menor|R|1|O|V|E||IFB prevê meios alternativos para estudante sem renda; confirmar formato para menor. ProUni: confirmar necessidade.
89|0|1|Comprovação de conclusão do ensino médio|A|1|O|O|N||Controle do conjunto aceito, não um documento adicional: certificado ou histórico com declaração, conforme IFB; confirmar ProUni.
90|0|1|Comprovação do percurso integral em escola pública|E|0|O|C|N||Controle da comprovação por histórico ou declaração que abranja todo o ensino médio; não exige nova emissão.
91|5|7|Comprovação empresarial pertinente ao regime tributário|R|1|C|V|E||Confirmar conjunto de documentos com instituição e contador; não exigir obrigações mutuamente exclusivas.
92|0|2|Comprovação da situação militar aceita pelo IFB|A|0|O|C|N|mil|Controle da comprovação por CDI ou alternativa aceita pelo campus; não é um documento adicional.`;
const CATALOG={P:[],S:[]};
for(const row of RAW.split('\n')){const [id,g,cat,name,mode,p,sk,pk,time,link,detail]=row.split('|');for(const prog of ['P','S']){if(prog==='P'?p!=='1':mode==='-')continue;CATALOG[prog].push({id:prog+id,g:+g,cat:+cat,name,mode:prog==='S'?mode:'P',kind:prog==='S'?sk:pk,time,link,detail,shared:mode!=='-'&&p==='1',urgent:['03','04','08','09','58','92','62','63','64','83','84','85','86','87'].includes(id)});}}
const TIMELINES={P:['Publicação do edital','Inscrição','Escolha dos cursos','Notas de corte','Primeira chamada','Segunda chamada (se necessária)','Lista de espera (se necessária)','Comprovação das informações','Entrega dos documentos','Análise documental','Aprovação da bolsa','Termo de concessão','Matrícula'],S:['Publicação do edital','Inscrição','Escolha dos cursos','Notas de corte','Resultado','Convocação','Entrega dos documentos','Análise documental','Recurso (se necessário)','Matrícula']};


Object.assign(SOURCES,{
 ucb:'https://ucb2.catolica.edu.br/portal/wp-content/uploads/2026/02/Relacao-de-Documentos-ProUni-2026.1.pdf',
 ucbPortal:'https://ucb2.catolica.edu.br/portal/cursos/bolsas-financiamento-e-convenios/prouni/',
 iesb:'https://www.iesb.br/content/uploads/2021/07/Documentos-Prouni-2025-Candidatos-2.pdf',
 iesbPortal:'https://www.iesb.br/noticias/edital-prouni-2026-2-inicia-inscricoes-nesta-terca-feira-7/',
 ir:'https://www.restituicao.receita.fazenda.gov.br/#/',
 cnis:'https://meu.inss.gov.br/',
 assinatura:'https://www.gov.br/governodigital/pt-br/identidade/assinatura-eletronica',
 ifbD:'https://www.ifb.edu.br/attachments/article/45464/ANEXO%20D%20Documenta%C3%A7%C3%A3o%20para%20Comprova%C3%A7%C3%A3o%20das%20Reservas%20de%20Vagas%20ao%20SiSU%20na%20Sele%C3%A7%C3%A3o%202026.pdf',
 ifbE:'https://www.ifb.edu.br/attachments/article/45464/ANEXO%20E%20Documentos%20para%20Matr%C3%ADcula%20pelo%20SiSU%20na%20Sele%C3%A7%C3%A3o%202026.pdf',
 enemData:'https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/resultados-do-enem-serao-divulgados-em-18-de-janeiro'
});
function revise(p,id,patch){const d=CATALOG[p].find(x=>x.id===p+id);if(!d)throw Error('ID ausente: '+p+id);Object.assign(d,patch);}
function addAudit(p,id,g,cat,name,kind,time,link,detail,mode='R',urgent=false,ref=''){
 if(CATALOG[p].some(d=>d.id===p+id))throw Error('ID duplicado');
 CATALOG[p].push({id:p+id,g,cat,name,kind,time,link,detail,mode:p==='P'?'P':mode,shared:false,urgent,ref});
}
for(const id of ['02','26','35','47'])revise('P',id,{kind:'O',detail:'Referência UCB 2026/1 e IESB 2025: identificação e CPF dos adultos. Confira se o CPF integrado ou CNH dispensa cópia separada.',ref:'ucb'});
for(const id of ['12','27','36','48'])revise('P',id,{kind:'O',detail:'UCB 2026/1 e IESB 2025 solicitam CTPS dos adultos. Na UCB, PDF digital atualizado em até 30 dias, com os dois últimos vínculos; sem contrato, página de dados pessoais. CTPS física conforme páginas indicadas pela instituição.',ref:'ucb'});
for(const id of ['13','28','39','51'])revise('P',id,{kind:'C',detail:'IESB 2025 exige CNIS completo de todos os adultos. Na UCB, confirmar eventual exigência adicional. Emitir no Meu INSS.',ref:'iesb'});
for(const id of ['14','29','41','53'])revise('P',id,{kind:'C',detail:'UCB 2026/1: extratos de todas as contas ativas, bancos tradicionais e digitais, dos três meses completos anteriores ao mês atual, identificando banco, conta e titular. IESB 2025: seis meses para autônomos ou MEI; três para sócios/dirigentes. Confirmar conforme atividade e instituição.',ref:'ucb'});
for(const id of ['17','32','44','54'])revise('P',id,{kind:'C',detail:'UCB 2026/1: todas as páginas da declaração do último exercício exigido, recibo de entrega; se não declarou, usar o comprovante de consulta específico em item separado. MEC também prevê notificação de restituição quando houver.',ref:'ucb'});
for(const id of ['37','49'])revise('P',id,{kind:'O',detail:'UCB 2026/1: três meses completos anteriores ao mês atual para salário fixo, seis para horista, comissões, gorjetas ou horas extras. Juntar recibos de férias e 13º quando recebidos no período. IESB 2025 também distingue três e seis meses.',ref:'ucb'});
for(const id of ['15','42'])revise('P',id,{kind:'O',detail:'UCB 2026/1: declaração de atividade remunerada no modelo da instituição, com atividade e média mensal real. IESB 2025: verificar DECORE e extratos de seis meses para autônomos. Não declarar ausência de renda.',ref:'ucb'});
revise('P','03',{kind:'O',detail:'UCB 2026/1 solicita histórico e certificado ou declaração de conclusão. IESB 2025 solicita histórico e certificado (frente e verso), com declaração substitutiva na falta de um deles. Confirmar 2027.',ref:'ucb'});
revise('P','04',{kind:'O',detail:'UCB 2026/1: certificado OU declaração de conclusão, além do histórico. IESB 2025: conferir substituição por declaração escolar com as séries cursadas.',ref:'ucb'});
revise('P','89',{kind:'P',detail:'Controle preventivo da conferência do conjunto escolar; não é documento adicional.',ref:'ucb'});
revise('P','06',{kind:'O',detail:'UCB 2026/1 exige título eleitoral do candidato maior de 18 anos. Conferir instituição escolhida.',ref:'ucb'});
revise('P','22',{kind:'O',detail:'UCB 2026/1 exige resultado do ENEM usado na inscrição. INEP informou divulgação dos resultados do ENEM 2026 em 18/01/2027.',ref:'ucb'});
revise('P','23',{kind:'O',detail:'Ficha de inscrição do ProUni; UCB 2026/1 e IESB 2025 pedem este registro.',ref:'ucb'});
revise('P','24',{kind:'O',detail:'UCB 2026/1 pede formulário socioeconômico unificado preenchido, datado e assinado; aguarde modelo de 2027.',ref:'ucb',link:'ucbPortal'});
revise('P','56',{name:'Identificação da menor: certidão de nascimento ou RG/CIN',kind:'O',detail:'UCB 2026/1 e IESB 2025 aceitam uma das duas opções para menores de 18 anos; marque quando tiver uma delas. Não é necessário obter ambas para este fim.',ref:'ucb'});
revise('P','58',{kind:'P',detail:'Alternativa à certidão de nascimento. A CIN é prioritária para SISU LB_EP, não é exigência cumulativa no ProUni.',ref:'ucb'});
revise('P','11',{detail:'UCB 2026/1: comprovante de até seis meses em nome do adulto ou declaração de residência no modelo oficial. IESB 2025 também exige comprovante pessoal atualizado.',ref:'ucb'});
revise('P','30',{detail:'UCB 2026/1: três meses completos de pró-labore para sócios e dirigentes. Se for MEI, seguir as exigências específicas de MEI. Separar lucros efetivamente recebidos.',ref:'ucb'});
revise('P','63',{detail:'UCB 2026/1: CCMEI se MEI; requerimento empresarial ou contrato social e alterações, se sócia/dirigente. IESB 2025 prevê registro de MEI ou contrato conforme categoria.',ref:'ucb'});
revise('P','65',{detail:'DASN-SIMEI somente se MEI. UCB 2026/1 e IESB 2025 solicitam declaração anual correspondente.',ref:'ucb'});
revise('P','69',{detail:'Extratos PJ, quando aplicáveis: separar da conta pessoal. IESB 2025 pede seis meses para MEI e três para sócios/dirigentes; confirmar se inclui todas as contas PJ no caso concreto.',ref:'iesb'});
revise('S','02',{detail:'IFB 2026: na matrícula, CPF separado se não estiver na identificação; em LB_EP o Anexo D pede cópia do CPF de todos, inclusive candidato.',ref:'ifbD'});
revise('S','78',{kind:'O',detail:'LB_EP: declaração de residência assinada ou comprovante com CEP em nome do candidato ou familiar. Reutilize o documento já obtido; não é nova emissão.',ref:'ifbD'});
revise('S','58',{detail:'Anexo D do IFB 2026 pede identificação oficial com foto de todos do grupo familiar. A certidão de nascimento isolada não consta como alternativa nesta modalidade. Confirme exceção com o campus.',ref:'ifbD'});
revise('S','08',{detail:'IFB Anexo E 2026 aceita reservista, dispensa ou apresentação à corporação militar, para homens maiores de 18 e abaixo de 45 anos. CDI ainda não confirmado; consultar campus.',ref:'ifbE'});
revise('S','09',{ref:'ifbE'});
revise('S','19',{link:'ifb',ref:'ifbD'});
revise('S','20',{link:'ifb',ref:'ifbE'});
for(const [i,g] of [[93,1],[94,2],[95,3]])addAudit('P',String(i),g,0,'Comprovante de residência individual ou declaração','O','M','ucbPortal','UCB 2026/1: documento nominal de até seis meses; cônjuges/conviventes legalmente comprovados podem compartilhar um comprovante. IESB 2025 pede comprovante por adulto. Usar declaração institucional se necessário.','R',false,'ucb');
for(const [i,g] of [[96,0],[97,1],[98,2],[99,3]])addAudit('P',String(i),g,8,'Consulta de IRPF para não declarante','C','E','ir','Somente se não apresentou IRPF: UCB 2026/1 pede impressão da consulta do exercício indicado com resultado de ausência de informação. Não é uma declaração genérica de isenção; confirmar o exercício de 2027.','R',false,'ucb');
for(const [i,g] of [[100,0],[101,1],[102,2],[103,3],[104,4]])addAudit('P',String(i),g,6,'Comprovante de encerramento de conta bancária','C','E','','UCB 2026/1: se encerrou conta nos dois meses anteriores à entrega, pedir comprovante formal do banco. Não se aplica se não houve encerramento.','R',false,'ucb');
addAudit('P','105',4,6,'Extratos bancários da menor, se possuir conta','C','E','','UCB 2026/1: todos com contas ativas, inclusive menores, devem apresentar três meses completos. Se não possui conta, não se aplica.','R',false,'ucb');
addAudit('P','106',0,5,'DECORE do trabalho informal, se exigida','C','E','','IESB 2025: para autônomos, DECORE por profissional contábil regular, referente aos três últimos meses. UCB usa declaração de atividade remunerada; confirmar enquadramento do trabalho informal.','R',true,'iesb');
addAudit('P','107',2,5,'DECORE da renda informal adicional, se exigida','C','E','','IESB 2025: confirmar enquadramento como autônomo e DECORE dos três últimos meses. Não é documento de propriedade da empresa.','R',true,'iesb');
for(const [i,g] of [[108,0],[109,2]])for(const p of ['P','S'])addAudit(p,String(i),g,4,'Guias de contribuição ao INSS, se houver','A','E','cnis','IFB 2026 aceita guia do último mês paga, compatível com renda de autônomo; MEC prevê comprovação de contribuições conforme atividade. Não criar recolhimentos fictícios.');
for(const [i,g] of [[110,2],[111,3]])addAudit('P',String(i),g,5,'Recibos de férias e 13º salário','C','E','','UCB 2026/1: enviar recibos se recebidos durante os meses de referência dos contracheques.','R',false,'ucb');
addAudit('P','112',0,2,'Certificado de Alistamento Militar (CAM)','C','N','mil','UCB 2026/1 lista expressamente o CAM para homens na faixa militar. Verificar se o CDI ou comprovante provisório é aceito na edição 2027.','R',true,'ucb');
addAudit('P','113',5,8,'DAS ou comprovantes de pró-labore do MEI','C','E','mei','IESB 2025: três últimos meses de DAS ou pró-labore, somente se o regime for MEI.','R',false,'iesb');
addAudit('P','114',5,8,'Declaração fiscal da pessoa jurídica (IRPJ ou obrigação equivalente)','C','E','cpf','IESB 2025 prevê documentação de IRPJ para sócios/dirigentes. Consultar contador sobre obrigação efetivamente aplicável; não exigir IRPJ de forma indiscriminada.','R',false,'iesb');
for(const [i,g] of [[115,0],[116,1],[117,2],[118,3]])addAudit('P',String(i),g,4,'Rescisão e seguro-desemprego, se aplicáveis','C','E','','UCB 2026/1: se ficou desempregado nos cinco meses anteriores à inscrição, apresentar rescisão e comprovantes de seguro-desemprego se recebeu.','R',false,'ucb');
addAudit('P','119',6,9,'Declaração de ajuda financeira externa, se houver','C','E','ucbPortal','UCB 2026/1 exige declaração no modelo institucional para ajuda recebida. Não duplicar transferências entre integrantes.','R',false,'ucb');
addAudit('P','120',4,9,'Guarda, tutela ou declaração do responsável, se aplicável','C','E','ucbPortal','Somente quando houver situação de guarda ou tutela pertinente; não presumir ausência dos pais.','R',false,'ucb');
addAudit('P','121',6,5,'Contrato de locação e recebimentos de aluguel, se houver','C','E','','UCB 2026/1: contrato e/ou comprovantes de três meses quando há renda de aluguel; observar situação real.','R',false,'ucb');
addAudit('P','122',0,10,'Encerramento de vínculo anterior, se exigível','C','E','ucbPortal','Se houver bolsa ProUni, financiamento FIES ou matrícula pública incompatível, verificar termo ou encerramento conforme instituição. Não presumir vínculo ativo.','A',false,'ucb');
addAudit('S','123',0,10,'Conferência presencial de originais e assinatura da matrícula','C','M','ifb','IFB 2026: após deferimento de matrícula on-line, apresentar originais e cópias agendados e assinar ficha física. Confirmar modalidade de entrega.','A',false,'ifbE');
addAudit('S','124',0,10,'Comprovante de manifestação de interesse em lista de espera','C','E','sisu','Guardar se participar da lista de espera; acompanhar homologação e convocação.','A');
addAudit('P','125',0,10,'Protocolo de entrega da documentação','C','E','prouni','Guardar recibo ou comprovante de envio e acompanhar análise. Não é documento de renda.');
addAudit('P','126',1,5,'Declaração de atividade remunerada da proprietária, se MEI','C','E','ucbPortal','UCB 2026/1 exige declaração de atividade remunerada para MEI; se outro enquadramento, seguir categoria correspondente.','R',false,'ucb');
addAudit('P','127',6,10,'Conferir edital e lista de documentos da instituição de 2027','O','E','prouni','Verificar oferta de ADS presencial, campus, turno, bolsa integral, forma de entrega e prazos antes de enviar. As referências de 2025/2026 são preventivas.');
addAudit('S','128',0,10,'Conferir edital IFB e anexos de 2027','O','E','ifb','Verificar curso, campus, modalidade, anexos e cronograma antes da entrega.','A');
addAudit('P','129',6,0,'Comprovantes de estado civil dos demais adultos, se aplicáveis','C','E','ucbPortal','UCB 2026/1 exige comprovante de casamento, união estável, divórcio ou viuvez conforme situação real.','R',false,'ucb');
addAudit('P','130',6,5,'Decisão ou comprovantes de pensão alimentícia, se houver','C','E','ucbPortal','Apresentar decisão judicial, acordo ou escritura e comprovantes de recebimento, conforme situação; declaração espontânea quando pertinente.','R',false,'ucb');
