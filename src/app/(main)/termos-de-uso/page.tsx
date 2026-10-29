import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LEGAL_VERSION,
  LEGAL_EFFECTIVE_DATE,
  CONTROLLER,
} from '@/lib/legal-config';
import {
  FileText,
  AlertTriangle,
  Clock,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso — ClickServiço',
  description:
    'Termos e Condições Gerais de Uso da plataforma ClickServiço. Conheça as regras de intermediação, direitos e responsabilidades.',
};

const SECTIONS = [
  { id: 'quem-somos', title: '1. Quem Somos e Aceite dos Termos' },
  { id: 'definicoes', title: '2. Definições' },
  { id: 'cadastro-conta', title: '3. Cadastro, Capacidade e Conta de Acesso' },
  { id: 'papel-plataforma', title: '4. Papel da Plataforma e Isenção de Responsabilidade' },
  { id: 'fluxo-pedidos', title: '5. Fluxo de Solicitações e Status dos Pedidos' },
  { id: 'comunicacao-contato', title: '6. Regras de Comunicação e Liberação de Contato' },
  { id: 'prestadores-servico', title: '7. Diretrizes para Profissionais Prestadores' },
  { id: 'avaliacoes', title: '8. Sistema de Avaliações e Depoimentos' },
  { id: 'conteudo-condutas', title: '9. Conteúdo do Usuário e Condutas Proibidas' },
  { id: 'suspensao-exclusao', title: '10. Suspensão, Bloqueio e Exclusão de Conta' },
  { id: 'propriedade-intelectual', title: '11. Propriedade Intelectual' },
  { id: 'disponibilidade', title: '12. Disponibilidade do Serviço e Limitação de Garantias' },
  { id: 'alteracoes-encerramento', title: '13. Alterações dos Termos e Encerramento do Projeto' },
  { id: 'contato-foro', title: '14. Canal de Contato e Foro de Eleição' },
];

export default function TermosDeUsoPage() {
  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho do Documento */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#103569]/10 text-[#103569]">
              <FileText size={14} /> Documento Legal
            </span>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Versão: <strong>{LEGAL_VERSION}</strong></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> Vigência: <strong>{LEGAL_EFFECTIVE_DATE}</strong>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
            Termos e Condições Gerais de Uso
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Bem-vindo ao <strong>{CONTROLLER.projectName}</strong>. Estes Termos de Uso regulam o acesso e a utilização dos nossos serviços por clientes e prestadores autônomos. Leia atentamente antes de criar sua conta.
          </p>

          {/* Aviso de Projeto Acadêmico */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="shrink-0 text-amber-600 mt-0.5" size={20} />
            <div>
              <p className="font-bold mb-1">Aviso de Projeto Acadêmico e Demonstração Técnica</p>
              <p className="text-amber-800/90 text-xs sm:text-sm">
                O <strong>{CONTROLLER.projectName}</strong> é um projeto sem fins lucrativos desenvolvido no âmbito do Trabalho de Conclusão de Curso (TCC) por estudantes de Engenharia de Computação ({CONTROLLER.team}) da instituição {CONTROLLER.institution}. O sistema opera em caráter experimental para demonstração funcional e acadêmica.
              </p>
            </div>
          </div>

          {/* Navegação Rápida entre Documentos */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ver também:</span>
            <Link
              href="/politica-de-privacidade"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103569] hover:text-[#f7941d] bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl transition-colors no-underline"
            >
              <Lock size={13} /> Política de Privacidade (LGPD) <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Grade: Índice Lateral (Desktop) + Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Índice de Seções (Sticky na lateral em telas grandes) */}
          <aside className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 lg:sticky lg:top-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#103569] mb-4 pb-2 border-b border-slate-100">
              Índice de Seções
            </h2>
            <nav className="space-y-1.5">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#103569] hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors no-underline"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Conteúdo Textual Integral */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
            {/* Seção 1 */}
            <section id="quem-somos" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                1. Quem Somos e Aceite dos Termos
              </h2>
              <p>
                O <strong>{CONTROLLER.projectName}</strong> é uma aplicação web idealizada e operada pela equipe de {CONTROLLER.team}, no contexto do Trabalho de Conclusão de Curso em Engenharia de Computação da instituição {CONTROLLER.institution}.
              </p>
              <p>
                O projeto não possui constituição de pessoa jurídica societária, não tem fins lucrativos e opera em fase de demonstração tecnológica e acadêmica.
              </p>
              <p>
                Ao criar uma conta na plataforma na qualidade de cliente ou de profissional, você declara que leu, compreendeu e concorda integralmente com estes Termos de Uso e com a nossa{' '}
                <Link href="/politica-de-privacidade" className="text-[#103569] font-bold underline hover:text-[#f7941d]">
                  Política de Privacidade
                </Link>
                . Caso discorde de qualquer disposição, não prossiga com o cadastro e cesse o uso da plataforma.
              </p>
            </section>

            {/* Seção 2 */}
            <section id="definicoes" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                2. Definições
              </h2>
              <p>Para fins destes Termos de Uso, aplicam-se as seguintes definições:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Plataforma:</strong> O site, as interfaces e os serviços digitais integrados acessíveis sob a marca {CONTROLLER.projectName}.
                </li>
                <li>
                  <strong>Cliente:</strong> Pessoa física que utiliza a plataforma para pesquisar prestadores, solicitar orçamentos e negociar serviços.
                </li>
                <li>
                  <strong>Profissional ou Prestador:</strong> Profissional autônomo ou microempreendedor que divulga suas especialidades e atende solicitações de orçamento.
                </li>
                <li>
                  <strong>Pedido ou Orçamento:</strong> Solicitação de serviço criada pelo cliente, detalhando tipo de trabalho, descrição da necessidade, localização e eventuais fotos.
                </li>
                <li>
                  <strong>Serviço Contratado:</strong> A obrigação de fazer combinada diretamente entre cliente e profissional fora da plataforma ou documentada via chat.
                </li>
              </ul>
            </section>

            {/* Seção 3 */}
            <section id="cadastro-conta" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                3. Cadastro, Capacidade e Conta de Acesso
              </h2>
              <p>
                <strong>3.1. Idade Mínima:</strong> A utilização da plataforma é destinada exclusivamente a pessoas com idade igual ou superior a 18 (dezoito) anos completos ou legalmente emancipadas. Ao realizar o cadastro, o usuário declara solenemente sua maioridade civil.
              </p>
              <p>
                <strong>3.2. Veracidade dos Dados:</strong> O usuário obriga-se a fornecer informações exatas, precisas e verdadeiras em seu formulário de inscrição, assumindo o compromisso de mantê-las permanentemente atualizadas.
              </p>
              <p>
                <strong>3.3. Segurança da Credencial:</strong> A conta de acesso é pessoal e intransferível. O usuário é o único responsável pela confidencialidade de sua senha e por todas as atividades efetuadas sob sua autenticação. Em caso de extravio ou suspeita de invasão, deve redefinir a senha imediatamente.
              </p>
              <p>
                <strong>3.4. Perfil Duplo:</strong> A arquitetura da plataforma permite que uma mesma conta de usuário possua simultaneamente o perfil de Cliente e o perfil de Profissional, respondendo em cada caso pelas regras e obrigações inerentes à modalidade em operação. É vedada a criação de múltiplas contas pela mesma pessoa com intuito de burlar limites, suspensões ou avaliações.
              </p>
            </section>

            {/* Seção 4 */}
            <section id="papel-plataforma" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                4. Papel da Plataforma e Isenção de Responsabilidade
              </h2>
              <p className="font-semibold text-[#0b2545]">
                4.1. Natureza de Mera Intermediadora de Contato:
              </p>
              <p>
                O {CONTROLLER.projectName} atua <strong>exclusivamente como um catálogo digital e intermediador de contato</strong> entre pessoas interessadas em contratar e profissionais habilitados a prestar serviços. A plataforma aproxima as partes e facilita a comunicação inicial.
              </p>
              <div className="bg-slate-50 border-l-4 border-[#103569] p-4 rounded-r-xl space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-[#103569]">O {CONTROLLER.projectName} NÃO realiza e NÃO é responsável por:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Execução técnica, cumprimento de cronograma ou qualidade dos serviços prestados.</li>
                  <li>Fiscalização in loco de obras, segurança do trabalho ou adequação a normas técnicas.</li>
                  <li>Garantia sobre os materiais aplicados ou solidez da edificação e reforma.</li>
                  <li>Fixação de preços, orçamentos finais ou concessão de descontos.</li>
                  <li>Indenização por danos materiais, corporais ou morais causados por clientes ou prestadores.</li>
                </ul>
              </div>
              <p>
                <strong>4.2. Inexistência de Intermediação Financeira:</strong> A plataforma <strong>não processa pagamentos</strong>, não retém valores em custódia (escrow), não cobra taxas sobre o valor da obra e não recebe comissões das transações realizadas entre cliente e profissional. O pagamento deve ser combinado e liquidado <strong>diretamente entre as partes, pelos meios que convencionarem fora da plataforma</strong>.
              </p>
              <p>
                <strong>4.3. Ausência de Contrato Formal:</strong> As trocas de mensagens na plataforma ou anotações de preço no chat não substituem a elaboração de um contrato formal de prestação de serviços e orçamento detalhado por escrito entre cliente e profissional. Recomendamos enfaticamente que as partes firmem instrumento contratual próprio contendo escopo, garantias e condições de pagamento.
              </p>
            </section>

            {/* Seção 5 */}
            <section id="fluxo-pedidos" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                5. Fluxo de Solicitações e Status dos Pedidos
              </h2>
              <p>Os pedidos de orçamento transitam pelos seguintes status no sistema:</p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-amber-700">PENDENTE:</span> O cliente envia a solicitação de orçamento com descrição, fotos e endereço. Fica visível para o profissional avaliar se atende a região e o escopo.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-700">EM_ANDAMENTO:</span> O profissional aceita o contato com o cliente. Neste momento, os canais de contato direto (telefone/WhatsApp) são mutuamente liberados e o chat da ordem é ativado.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-emerald-700">CONCLUIDO:</span> O profissional sinaliza no painel que o serviço foi finalizado. Libera a possibilidade de avaliação pelo cliente.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-rose-700">CANCELADO:</span> O profissional encerra o pedido quando não há acordo ou não é possível realizar o trabalho.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-purple-700">DISPUTA:</span> Status reservado para intervenção da administração da plataforma quando há relato fundamentado de conflito grave entre as partes, gerando anotação de auditoria interna.
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong>Regra de Exclusão de Pedidos:</strong> O cliente só pode excluir permanentemente um pedido do seu histórico se ele estiver com status <code>PENDENTE</code> ou <code>CANCELADO</code>. Pedidos em <code>EM_ANDAMENTO</code>, <code>CONCLUIDO</code> ou <code>DISPUTA</code> não podem ser apagados unilateralmente pelo cliente para resguardar o histórico probatório da relação entre os usuários.
              </p>
            </section>

            {/* Seção 6 */}
            <section id="comunicacao-contato" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                6. Regras de Comunicação e Liberação de Contato
              </h2>
              <p>
                <strong>6.1. Proteção de Telefone e WhatsApp:</strong> Em consonância com a minimização de dados, o número de telefone e o atalho de WhatsApp dos participantes permanecem totalmente ocultos enquanto o pedido estiver com status <code>PENDENTE</code>. Os dados de telefone só são revelados após a transição do pedido para <code>EM_ANDAMENTO</code>.
              </p>
              <p>
                <strong>6.2. Visualização de Endereço e E-mail:</strong> O profissional do pedido tem acesso ao e-mail cadastrado do cliente e ao endereço informado para o serviço desde o momento da solicitação, dado que a localização é informação estritamente necessária para que o prestador possa calcular a viabilidade técnica e os custos de deslocamento.
              </p>
              <p>
                <strong>6.3. Uso Estrito dos Dados de Contato:</strong> É expressamente proibido ao cliente e ao profissional utilizar dados de telefone, e-mail ou endereço obtidos na plataforma para fins alheios à negociação e execução do serviço, sendo vedado o envio de mensagens promocionais em massa, cobranças abusivas, perseguição ou comercialização com terceiros.
              </p>
            </section>

            {/* Seção 7 */}
            <section id="prestadores-servico" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                7. Diretrizes para Profissionais Prestadores
              </h2>
              <p>
                <strong>7.1. Responsabilidade Técnica e Legal:</strong> O profissional é o único e exclusivo responsável por deter as habilidades práticas, cursos, certificações e registros profissionais (ex.: CREA, CFT, CRT ou similares) exigidos pela legislação brasileira para as atividades que ofertar na plataforma.
              </p>
              <p>
                <strong>7.2. Identificação por CPF/CNPJ:</strong> Para ativar o perfil profissional, é exigido o fornecimento de CPF ou CNPJ válido. O documento é protegido por forte criptografia de dados e destina-se à validação de integridade e prevenção contra perfis fraudulentos.
              </p>
              <p>
                <strong>7.3. Selo de Verificação (isVerified):</strong> O selo &quot;Verificado&quot; atribuído eventualmente no perfil é uma ferramenta discricionária e manual da administração da plataforma para indicar conferência cadastral básica. <strong>O selo NÃO constitui garantia de idoneidade, chancela de perícia técnica nem seguro de responsabilidade civil</strong>. Ressalta-se que o selo não é obrigatório para que o profissional apareça nas listagens de busca nem para que receba solicitações de serviço.
              </p>
            </section>

            {/* Seção 8 */}
            <section id="avaliacoes" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                8. Sistema de Avaliações e Depoimentos
              </h2>
              <p>
                <strong>8.1. Regras de Elegibilidade:</strong> Para garantir a legitimidade das notas e coibir avaliações falsas, um cliente só pode avaliar um prestador se cumprir ao menos uma das seguintes condições de contato prévio real:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Possuir ao menos 1 (um) pedido com status <code>CONCLUIDO</code> com o respectivo profissional; OU</li>
                <li>Possuir histórico de conversa bidirecional no chat da ordem (no mínimo 1 mensagem enviada pelo cliente e 1 resposta emitida pelo profissional).</li>
              </ul>
              <p>
                <strong>8.2. Unicidade e Edição:</strong> Cada cliente pode registrar no máximo 1 (uma) avaliação por profissional, sendo facultado ao cliente editar sua pontuação (1 a 5 estrelas) e comentário a qualquer momento pelo perfil do prestador.
              </p>
              <p>
                <strong>8.3. Conteúdo das Avaliações:</strong> As avaliações são públicas e refletem a opinião pessoal dos clientes. É vedada a inclusão de termos injuriosos, caluniosos, racistas, discriminatórios ou dados sensíveis de terceiros. A plataforma não faz moderação prévia, mas pode remover avaliações mediante ordem judicial ou comprovada falsidade cadastral.
              </p>
            </section>

            {/* Seção 9 */}
            <section id="conteudo-condutas" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                9. Conteúdo do Usuário e Condutas Proibidas
              </h2>
              <p>Ao utilizar o {CONTROLLER.projectName}, o usuário compromete-se a NÃO:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                <li>Publicar ou transmitir conteúdo obsceno, pornográfico, violento ou degradante no chat ou fotos de pedidos;</li>
                <li>Praticar assédio moral, sexual, ameaças ou discriminação de qualquer natureza;</li>
                <li>Criar perfis falsos, passar-se por outra pessoa ou praticar fraudes cadastrais e de identidade;</li>
                <li>Utilizar a plataforma para comércio de produtos ilícitos, serviços proibidos por lei ou jogos de azar;</li>
                <li>Tentar acessar indevidamente servidores, quebrar credenciais ou praticar engenharia reversa no sistema;</li>
                <li>Coletar dados de usuários para fins de spam, marketing não solicitado ou enriquecimento de bases externas.</li>
              </ul>
              <p>
                <strong>Licença de Conteúdo:</strong> O usuário concede à equipe da plataforma uma licença não exclusiva, gratuita e limitada para hospedar, processar e exibir fotos de serviços, banners, avatares e mensagens estritamente na medida necessária para o funcionamento operacional da plataforma.
              </p>
            </section>

            {/* Seção 10 */}
            <section id="suspensao-exclusao" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                10. Suspensão, Bloqueio e Exclusão de Conta
              </h2>
              <p>
                <strong>10.1. Suspensão Administrativa:</strong> A administração reserva-se o direito de suspender ou desativar temporária ou permanentemente a conta de qualquer usuário que violar estes Termos, a legislação em vigor ou a boa-fé das negociações, mediante registro interno de justificativa em log auditável.
              </p>
              <p>
                <strong>10.2. Exclusão de Conta pelo Titular:</strong> O usuário tem o direito de excluir definitivamente sua conta a qualquer momento por meio do painel de configurações.
              </p>
              <p className="text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong>Bloqueio de Exclusão por Pendências:</strong> A exclusão será bloqueada pelo sistema caso o usuário possua pedidos com status <code>EM_ANDAMENTO</code> ou <code>DISPUTA</code>. Para efetivar o encerramento da conta, tais pedidos devem ser concluídos ou cancelados previamente.
              </p>
            </section>

            {/* Seção 11 */}
            <section id="propriedade-intelectual" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                11. Propriedade Intelectual
              </h2>
              <p>
                Todos os direitos sobre a marca {CONTROLLER.projectName}, layout da interface, código-fonte, elementos gráficos, logotipos e banco de dados pertencem à equipe desenvolvedora do projeto acadêmico. É proibida a reprodução, cópia, descompilação ou comercialização desautorizada de qualquer componente da plataforma.
              </p>
            </section>

            {/* Seção 12 */}
            <section id="disponibilidade" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                12. Disponibilidade do Serviço e Limitação de Garantias
              </h2>
              <p>
                A plataforma é disponibilizada no estado em que se encontra (<em>&quot;as is&quot;</em>) e conforme a disponibilidade técnica (<em>&quot;as available&quot;</em>).
              </p>
              <p>
                Tratando-se de um projeto experimental e acadêmico, a equipe não garante disponibilidade contínua e ininterrupta do site, ausência de falhas técnicas ou manutenção perene da infraestrutura. A equipe não poderá ser responsabilizada por lucros cessantes, perdas de negócios ou falhas decorrentes de instabilidades de provedores de nuvem, conexão de internet ou indisponibilidade de serviços terceiros.
              </p>
            </section>

            {/* Seção 13 */}
            <section id="alteracoes-encerramento" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                13. Alterações dos Termos e Encerramento do Projeto
              </h2>
              <p>
                <strong>13.1. Revisão Periódica:</strong> Estes Termos podem ser atualizados a qualquer momento. A nova versão entrará em vigor a partir de sua publicação nesta página, com indicação no cabeçalho da data de vigência correspondente. O uso continuado da plataforma após as alterações representa consentimento tácito com os novos termos.
              </p>
              <p>
                <strong>13.2. Encerramento Acadêmico:</strong> Por se tratar de um projeto com finalidade universitária vinculada ao Trabalho de Conclusão de Curso, a plataforma poderá ter suas atividades encerradas ou desativadas ao término do ciclo acadêmico ou da fase de demonstração. Nesse cenário, os usuários serão previamente avisados por comunicado na plataforma, procedendo-se ao descarte seguro e eliminação dos dados armazenados.
              </p>
            </section>

            {/* Seção 14 */}
            <section id="contato-foro" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                14. Canal de Contato e Foro de Eleição
              </h2>
              <p>
                Para dúvidas, esclarecimentos, comunicados de infração ou notificações sobre estes Termos de Uso, entre em contato com a equipe responsável por meio do e-mail oficial:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">E-mail de Contato Geral</span>
                  <a
                    href={`mailto:${CONTROLLER.contactEmail}`}
                    className="text-[#103569] font-black text-sm sm:text-base hover:underline"
                  >
                    {CONTROLLER.contactEmail}
                  </a>
                </div>
                <div className="text-xs text-slate-500">
                  Responsável: <strong>{CONTROLLER.team}</strong>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 pt-2">
                Para dirimir eventuais controvérsias decorrentes da interpretação destes Termos, é eleita a Comarca de {CONTROLLER.forum}, com renúncia expressa a qualquer outro foro, por mais privilegiado que seja, ressalvadas as hipóteses de competência absoluta previstas em lei.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

