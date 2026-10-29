import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LEGAL_VERSION,
  LEGAL_EFFECTIVE_DATE,
  CONTROLLER,
} from '@/lib/legal-config';
import {
  ShieldCheck,
  Lock,
  Clock,
  ArrowRight,
  Database,
  Eye,
  Server,
  Globe,
  Trash2,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade (LGPD) — ClickServiço',
  description:
    'Política de Privacidade e Proteção de Dados Pessoais da plataforma ClickServiço em conformidade com a LGPD (Lei nº 13.709/2018).',
};

const SECTIONS = [
  { id: 'controlador-dpo', title: '1. Controlador e Encarregado de Dados (DPO)' },
  { id: 'dados-coletados', title: '2. Dados Pessoais Coletados e Finalidades' },
  { id: 'bases-legais', title: '3. Bases Legais para o Tratamento (LGPD)' },
  { id: 'quem-ve-o-que', title: '4. Quem Vê o Quê (Matriz de Acesso e Visibilidade)' },
  { id: 'terceiros-compartilhamento', title: '5. Compartilhamento e Prestadores de Infraestrutura' },
  { id: 'transferencia-internacional', title: '6. Transferência Internacional de Dados' },
  { id: 'cookies', title: '7. Cookies e Armazenamento Local' },
  { id: 'armazenamento-imagens', title: '8. Armazenamento de Fotos e URLs Públicas' },
  { id: 'retencao-descarte', title: '9. Retenção e Descarte Seguro de Dados' },
  { id: 'direitos-titular', title: '10. Seus Direitos como Titular de Dados (Art. 18 LGPD)' },
  { id: 'seguranca-informacao', title: '11. Medidas de Segurança da Informação' },
  { id: 'dados-menores', title: '12. Tratamento de Dados de Menores de Idade' },
  { id: 'incidentes', title: '13. Procedimentos em Caso de Incidentes de Segurança' },
  { id: 'alteracoes-contato', title: '14. Alterações desta Política e Canal de Privacidade' },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho do Documento */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck size={14} className="text-emerald-600" /> Conformidade LGPD (Lei nº 13.709/2018)
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
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Esta Política de Privacidade descreve com transparência e clareza como a plataforma <strong>{CONTROLLER.projectName}</strong> coleta, utiliza, armazena, protege e descarta seus dados pessoais, em estrita observância à Lei Geral de Proteção de Dados Pessoais (LGPD).
          </p>

          {/* Aviso de Projeto Acadêmico */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="shrink-0 text-amber-600 mt-0.5" size={20} />
            <div>
              <p className="font-bold mb-1">Aviso de Projeto Acadêmico de TCC</p>
              <p className="text-amber-800/90 text-xs sm:text-sm">
                O <strong>{CONTROLLER.projectName}</strong> é um projeto experimental desenvolvido sem fins lucrativos por estudantes de Engenharia de Computação ({CONTROLLER.team}) na instituição {CONTROLLER.institution}. O tratamento de dados tem finalidade de viabilizar a demonstração acadêmica da plataforma.
              </p>
            </div>
          </div>

          {/* Navegação Rápida entre Documentos */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ver também:</span>
            <Link
              href="/termos-de-uso"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103569] hover:text-[#f7941d] bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl transition-colors no-underline"
            >
              Termos e Condições de Uso <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Grade: Índice Lateral (Desktop) + Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Índice de Seções */}
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
            <section id="controlador-dpo" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <UserCheck size={20} className="text-[#103569]" />
                1. Controlador e Encarregado de Dados (DPO)
              </h2>
              <p>
                Para os fins da LGPD (Art. 5º, VI), o <strong>Controlador</strong> das operações de tratamento de dados pessoais é o <strong>Projeto Acadêmico {CONTROLLER.projectName}</strong>, desenvolvido pela equipe de {CONTROLLER.team}, vinculado à instituição de ensino {CONTROLLER.institution}.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs sm:text-sm">
                <p>
                  <strong>Encarregado pelo Tratamento de Dados Pessoais (DPO):</strong> {CONTROLLER.dpoName}
                </p>
                <p>
                  <strong>Canal Exclusivo de Privacidade:</strong>{' '}
                  <a href={`mailto:${CONTROLLER.privacyEmail}`} className="text-[#103569] font-bold underline">
                    {CONTROLLER.privacyEmail}
                  </a>
                </p>
                <p className="text-slate-500">
                  Os titulares podem acionar o Encarregado para esclarecer dúvidas ou exercer qualquer dos direitos previstos na LGPD.
                </p>
              </div>
            </section>

            {/* Seção 2 */}
            <section id="dados-coletados" className="scroll-mt-6 space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Database size={20} className="text-[#103569]" />
                2. Dados Pessoais Coletados e Finalidades
              </h2>
              <p>
                A plataforma coleta e processa apenas os dados estritamente necessários para viabilizar o cadastro, o contato entre contratantes e prestadores e a segurança das contas.
              </p>

              {/* Tabela de Dados Coletados */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Dado Pessoal</th>
                      <th className="p-3">Momento da Coleta</th>
                      <th className="p-3">Finalidade Técnica e Operacional</th>
                      <th className="p-3">Base Legal (LGPD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Nome Completo</td>
                      <td className="p-3">Cadastro de cliente ou profissional</td>
                      <td className="p-3">Identificação na plataforma, perfil público e mensagens</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">E-mail</td>
                      <td className="p-3">Cadastro de conta</td>
                      <td className="p-3">Credencial de login, envio de recuperação de senha e contato de pedido</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Senha (Hash Criptográfico)</td>
                      <td className="p-3">Cadastro de conta</td>
                      <td className="p-3">Autenticação segura (armazenada em hash unidirecional no Supabase Auth)</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Telefone e Sinalizador WhatsApp</td>
                      <td className="p-3">Cadastro ou edição de perfil</td>
                      <td className="p-3">Contato direto entre as partes exclusivamente quando o pedido entra em andamento</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Foto de Perfil (Avatar) e Banner</td>
                      <td className="p-3">Upload voluntário no perfil</td>
                      <td className="p-3">Personalização visual e apresentação no catálogo de prestadores</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, I (Consentimento)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">CPF ou CNPJ do Profissional</td>
                      <td className="p-3">Ativação do perfil profissional</td>
                      <td className="p-3">
                        Validação de unicidade e prevenção contra fraudes.
                        <strong> Tratamento: Cifrado com AES-256-GCM em repouso e hash determinístico HMAC-SHA256</strong>. Nunca é exibido ao público nem ao admin.
                      </td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, IX (Legítimo Interesse / Prevenção a Fraude)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Endereço do Profissional</td>
                      <td className="p-3">Ativação do perfil profissional</td>
                      <td className="p-3">Definição do raio geográfico de atendimento (apenas Cidade-UF são públicas)</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Bio, Especialidade e Portfólio</td>
                      <td className="p-3">Configuração do profissional</td>
                      <td className="p-3">Exibição no perfil público para atração de novos clientes</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Endereço e CEP do Pedido</td>
                      <td className="p-3">Formulário de orçamento</td>
                      <td className="p-3">Disponibilizado ao prestador solicitado para cálculo de deslocamento e execução</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Descrição do Pedido e Fotos do Local</td>
                      <td className="p-3">Formulário de orçamento</td>
                      <td className="p-3">Permitir que o profissional compreenda o defeito ou reforma pretendida</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Mensagens e Imagens de Chat</td>
                      <td className="p-3">Troca de mensagens no pedido</td>
                      <td className="p-3">Comunicação e alinhamento de prazos e valores entre cliente e prestador</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, V (Contrato)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Avaliações e Notas (1 a 5)</td>
                      <td className="p-3">Conclusão de serviço ou conversa</td>
                      <td className="p-3">Reputação pública e transparência da qualidade para a comunidade</td>
                      <td className="p-3 font-mono text-[11px]">Art. 7º, IX (Legítimo Interesse)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Seção 3 */}
            <section id="bases-legais" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                3. Bases Legais para o Tratamento (LGPD)
              </h2>
              <p>O tratamento dos seus dados é fundamentado nas seguintes hipóteses legais previstas no Art. 7º da LGPD:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Execução de Contrato (Art. 7º, V):</strong> Para criar sua conta, permitir a publicação de serviços, intermediar orçamentos, liberar o chat do pedido e viabilizar a prestação de serviços.
                </li>
                <li>
                  <strong>Consentimento (Art. 7º, I):</strong> Ao marcar o aceite obrigatório no cadastro, concordar com a inclusão voluntária de fotos de portfólio, avatar e permissão para exibição no catálogo.
                </li>
                <li>
                  <strong>Legítimo Interesse (Art. 7º, IX):</strong> Para aprimoramento da plataforma acadêmica, prevenção de fraudes (como duplicidade de CPF via hash criptográfico) e controle de qualidade via avaliações comunitárias.
                </li>
                <li>
                  <strong>Cumprimento de Obrigação Legal (Art. 7º, II):</strong> Guarda de registros de data, hora e IP de acesso aos serviços, quando exigido pelo Marco Civil da Internet (Lei nº 12.965/2014).
                </li>
              </ul>
            </section>

            {/* Seção 4 */}
            <section id="quem-ve-o-que" className="scroll-mt-6 space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Eye size={20} className="text-[#103569]" />
                4. Quem Vê o Quê (Matriz de Acesso e Visibilidade)
              </h2>
              <p>
                Adotamos o princípio do privilégio mínimo. Seus dados são segregados conforme o papel do participante e o status do pedido:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Dado Pessoal</th>
                      <th className="p-3">Público na Web</th>
                      <th className="p-3">Outro Participante (Pendente)</th>
                      <th className="p-3">Outro Participante (Em Andamento)</th>
                      <th className="p-3">Administração do Sistema</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Telefone do Cliente</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-emerald-700 font-bold">Liberado</td>
                      <td className="p-3 text-slate-700">Visível no painel</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Telefone do Profissional</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto no perfil</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-emerald-700 font-bold">Liberado</td>
                      <td className="p-3 text-slate-700">Visível no painel</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">E-mail dos Participantes</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto no perfil</td>
                      <td className="p-3 text-slate-700">Visível no pedido</td>
                      <td className="p-3 text-slate-700">Visível no pedido</td>
                      <td className="p-3 text-slate-700">Visível no painel</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Endereço Completo do Serviço</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-slate-700">Visível ao profissional</td>
                      <td className="p-3 text-slate-700">Visível ao profissional</td>
                      <td className="p-3 text-slate-700">Visível no pedido</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Endereço do Profissional</td>
                      <td className="p-3 text-slate-500">Apenas Cidade / UF</td>
                      <td className="p-3 text-slate-500">Apenas Cidade / UF</td>
                      <td className="p-3 text-slate-500">Apenas Cidade / UF</td>
                      <td className="p-3 text-slate-700">Visível no painel</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Mensagens e Imagens de Chat</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-rose-600 font-bold">Chat inacessível</td>
                      <td className="p-3 text-emerald-700 font-bold">Apenas cliente e pro</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto (sem tela)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">CPF ou CNPJ</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto</td>
                      <td className="p-3 text-rose-600 font-bold">Oculto (cifrado no banco)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Seção 5 */}
            <section id="terceiros-compartilhamento" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Server size={20} className="text-[#103569]" />
                5. Compartilhamento e Prestadores de Infraestrutura
              </h2>
              <p>
                Não comercializamos, não alugamos e não compartilhamos seus dados com corretores de dados ou redes de publicidade. O compartilhamento ocorre exclusivamente com provedores de infraestrutura indispensáveis para manter a plataforma no ar:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Supabase Inc.:</strong> Provedor de infraestrutura de banco de dados PostgreSQL, autenticação de usuários (Supabase Auth) e armazenamento de fotos em nuvem (Storage).
                </li>
                <li>
                  <strong>Vercel Inc.:</strong> Plataforma de hospedagem e execução das rotas e funções serverless da aplicação Next.js.
                </li>
                <li>
                  <strong>Servidor SMTP:</strong> Provedor de serviço de e-mail utilizado exclusivamente para disparar links transacionais de recuperação de senha.
                </li>
                <li>
                  <strong>BrasilAPI, ViaCEP e IBGE:</strong> Serviços web que recebem apenas o CEP, número de CNPJ ou UF para retorno automatizado de logradouros e municípios, sem armazenar dados do usuário.
                </li>
                <li>
                  <strong>WhatsApp (Meta):</strong> A plataforma não utiliza a API corporativa do WhatsApp; apenas fornece redirecionamento por link aberto (<code>https://wa.me/55...</code>) quando autorizado pelo usuário.
                </li>
              </ul>
              <div className="bg-slate-50 border-l-4 border-emerald-600 p-3 rounded-r-xl text-xs sm:text-sm">
                <strong>Declaração de Isenção Publicitária:</strong> A plataforma NÃO possui anúncios de terceiros, NÃO integra ferramentas invasivas de rastreamento (como Pixel da Meta ou Google Analytics) e NÃO realiza intermediação de pagamentos com operadoras financeiras.
              </div>
            </section>

            {/* Seção 6 */}
            <section id="transferencia-internacional" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Globe size={20} className="text-[#103569]" />
                6. Transferência Internacional de Dados
              </h2>
              <p>
                O banco de dados PostgreSQL hospedado no Supabase está configurado na região <code>sa-east-1</code> (São Paulo, Brasil).
              </p>
              <p>
                Entretanto, os servidores de autenticação, o armazenamento de arquivos e as rotas de entrega de conteúdo (CDN) operados pelas empresas Vercel Inc. e Supabase Inc. possuem nós de processamento distribuídos nos Estados Unidos da América. Dessa forma, seus dados podem ser transferidos internacionalmente com base no Art. 33 da LGPD, estritamente para a finalidade de execução de serviços de computação em nuvem sob rígidos padrões contratuais de confidencialidade e segurança.
              </p>
            </section>

            {/* Seção 7 */}
            <section id="cookies" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                7. Cookies e Armazenamento Local
              </h2>
              <p>
                <strong>7.1. Cookies Estritamente Necessários:</strong> Utilizamos unicamente cookies essenciais de sessão originados pela biblioteca <code>@supabase/ssr</code> (prefixados como <code>sb-*-auth-token</code>). Tais cookies servem exclusivamente para manter o usuário autenticado de forma segura ao navegar entre as páginas.
              </p>
              <p>
                <strong>7.2. Ausência de Rastreamento:</strong> Não utilizamos cookies de terceiros, cookies analíticos ou de remarketing. Da mesma forma, não utilizamos o <code>localStorage</code> nem o <code>sessionStorage</code> do seu navegador para guardar dados pessoais cadastrais.
              </p>
            </section>

            {/* Seção 8 */}
            <section id="armazenamento-imagens" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                8. Armazenamento de Fotos e URLs Públicas
              </h2>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs sm:text-sm text-amber-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle size={16} className="text-amber-600" />
                  Atenção sobre o Armazenamento de Arquivos em Nuvem:
                </p>
                <p>
                  As imagens enviadas para a plataforma (fotos de perfil, capa, portfólio, fotos anexadas aos pedidos e imagens trocadas no chat) são salvas em buckets de armazenamento com <strong>URL pública direta</strong>.
                </p>
                <p>
                  Embora as URLs sejam protegidas por identificadores únicos aleatórios (UUIDs) que dificultam a adivinhação, qualquer indivíduo que tiver posse do endereço do link poderá visualizar o arquivo no navegador.
                </p>
                <p className="font-semibold text-amber-950">
                  RECOMENDAÇÃO EXPRESSA: Nunca faça upload de fotografias contendo documentos pessoais (RG, CPF, CNH), dados bancários, cartões de crédito ou imagens íntimas em seus orçamentos ou chats.
                </p>
              </div>
            </section>

            {/* Seção 9 */}
            <section id="retencao-descarte" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Trash2 size={20} className="text-[#103569]" />
                9. Retenção e Descarte Seguro de Dados
              </h2>
              <p>
                <strong>9.1. Prazo de Guarda:</strong> Os dados pessoais, históricos de conversas no chat, fotos e registros de agendamentos permanecem armazenados enquanto a sua conta de usuário estiver ativa na plataforma.
              </p>
              <p>
                <strong>9.2. Procedimento de Exclusão:</strong> Ao solicitar a exclusão da sua conta pelo painel de configurações, o sistema aciona uma rotina transacional que:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Remove todos os arquivos vinculados nos buckets de armazenamento (avatares, banners e fotos);</li>
                <li>Exclui os registros de chat, pedidos finalizados, agendamentos e notificações do banco relacional;</li>
                <li>Elimina o registro do usuário no serviço Supabase Auth e revoga as sessões ativas.</li>
              </ul>
              <p className="text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong>Pendências Impeditivas:</strong> A exclusão da conta é temporariamente impedida caso existam pedidos com status <code>EM_ANDAMENTO</code> ou <code>DISPUTA</code>, garantindo a proteção e integridade probatória de ambas as partes enquanto houver prestação de serviços pendente.
              </p>
              <p>
                <strong>9.3. Encerramento do Projeto:</strong> Ao término definitivo do ciclo do projeto acadêmico de TCC, a base de dados poderá ser integralmente descontinuada e apagada, com aviso prévio na plataforma.
              </p>
            </section>

            {/* Seção 10 */}
            <section id="direitos-titular" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                10. Seus Direitos como Titular de Dados (Art. 18 LGPD)
              </h2>
              <p>A LGPD assegura a você os seguintes direitos fundamentais:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Acesso e Confirmação:</strong> Saber se tratamos seus dados e consultar as informações registradas.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Correção:</strong> Solicitar a retificação de dados incorretos, inexatos ou desatualizados.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Eliminação:</strong> Excluir seus dados tratados com base no consentimento ou ao encerrar a conta.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Informação sobre Compartilhamento:</strong> Saber com quais entidades compartilhamos seus dados.
                </div>
              </div>
              <p className="font-semibold text-slate-800 pt-2">Canais para Exercício dos Direitos:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>
                  <strong>Autoatendimento pelo Painel:</strong> Você pode editar seu nome, telefone e fotos diretamente na tela de perfil, bem como executar a exclusão completa da sua conta com um clique.
                </li>
                <li>
                  <strong>Atendimento pelo Encarregado (E-mail):</strong> Solicitações de portabilidade, dúvidas ou pedidos específicos devem ser encaminhados ao e-mail{' '}
                  <a href={`mailto:${CONTROLLER.privacyEmail}`} className="text-[#103569] font-bold underline">
                    {CONTROLLER.privacyEmail}
                  </a>
                  . A equipe responderá no prazo de até 15 (quinze) dias úteis. <em>(Nota de transparência: informamos que a plataforma não dispõe de botão automatizado de exportação instantânea em arquivos de dados)</em>.
                </li>
              </ul>
            </section>

            {/* Seção 11 */}
            <section id="seguranca-informacao" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Lock size={20} className="text-[#103569]" />
                11. Medidas de Segurança da Informação
              </h2>
              <p>Adotamos medidas técnicas e organizacionais proporcionais para proteger seus dados pessoais:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>
                  <strong>Blindagem Criptográfica de CPF:</strong> Cifragem simétrica autenticada com padrão militar AES-256-GCM para armazenamento do documento, complementada por hash determinístico com pepper secreto (HMAC-SHA256) para detecção de duplicidade sem exposição do dado.
                </li>
                <li>
                  <strong>Trânsito Seguro:</strong> Todo o tráfego entre seu dispositivo e nossos servidores ocorre por canais cifrados com protocolo HTTPS/TLS.
                </li>
                <li>
                  <strong>Controle Rígido de Acesso:</strong> Isolamento de consultas no servidor e proibição de leitura de dados pessoais não pertinentes mesmo para administradores (o painel de admin não acessa conversas privadas nem decifra CPFs).
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                Apesar de todos os esforços e boas práticas adotadas, nenhum sistema na internet é completamente inexpugnável. A equipe não pode garantir segurança absoluta contra ataques cibernéticos maliciosos altamente sofisticados que excedam o padrão razoável de proteção.
              </p>
            </section>

            {/* Seção 12 */}
            <section id="dados-menores" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                12. Tratamento de Dados de Menores de Idade
              </h2>
              <p>
                A plataforma não é voltada a menores de 18 anos e não coleta intencionalmente dados de crianças ou adolescentes. Caso seja identificado que um menor realizou cadastro na plataforma, a respectiva conta e todos os dados associados serão prontamente excluídos de nossos sistemas. Pais ou responsáveis legais podem reportar cadastros indevidos pelo e-mail {CONTROLLER.privacyEmail}.
              </p>
            </section>

            {/* Seção 13 */}
            <section id="incidentes" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                13. Procedimentos em Caso de Incidentes de Segurança
              </h2>
              <p>
                Em conformidade com o Art. 48 da LGPD, na hipótese de ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos direitos dos titulares, a equipe gestora comunicará o fato aos usuários afetados e à Autoridade Nacional de Proteção de Dados (ANPD) em prazo razoável, prestando esclarecimentos sobre a natureza dos dados atingidos e as medidas de mitigação adotadas.
              </p>
            </section>

            {/* Seção 14 */}
            <section id="alteracoes-contato" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#0b2545] border-b border-slate-100 pb-2">
                14. Alterações desta Política e Canal de Privacidade
              </h2>
              <p>
                Esta Política de Privacidade poderá sofrer atualizações visando ao aprimoramento técnico ou à adequação regulatória. Toda modificação será acompanhada da revisão da data de vigência e da versão no cabeçalho.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">Canal Oficial de Privacidade (LGPD)</span>
                  <a
                    href={`mailto:${CONTROLLER.privacyEmail}`}
                    className="text-[#103569] font-black text-sm sm:text-base hover:underline"
                  >
                    {CONTROLLER.privacyEmail}
                  </a>
                </div>
                <div className="text-xs text-slate-500">
                  Encarregado: <strong>{CONTROLLER.dpoName}</strong>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

