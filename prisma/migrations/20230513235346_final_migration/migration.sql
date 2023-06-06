-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('Professor', 'Coordenador', 'Diretor');

-- CreateEnum
CREATE TYPE "StatusDoBrinquedo" AS ENUM ('Manutencao', 'Reservado', 'Disponivel', 'Alugado', 'Atrasado', 'Descartado', 'Analise');

-- CreateEnum
CREATE TYPE "FormadeEntrada" AS ENUM ('Compra', 'Doacao');

-- CreateTable
CREATE TABLE "EstoqueBrinquedo" (
    "id_estoque" SERIAL NOT NULL,
    "Data_Entrada" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Data_Saida" TIMESTAMPTZ,
    "Referencia" VARCHAR(255) NOT NULL,
    "FormaDeEntrada" "FormadeEntrada" NOT NULL,
    "deletedAt" BOOLEAN DEFAULT false,
    "id_brinquedo" INTEGER,
    "id_Emprestimo" INTEGER,
    "id_status" INTEGER,

    CONSTRAINT "EstoqueBrinquedo_pkey" PRIMARY KEY ("id_estoque")
);

-- CreateTable
CREATE TABLE "CadastroBrinquedo" (
    "id_brinquedo" SERIAL NOT NULL,
    "Descricao" VARCHAR(255) NOT NULL,
    "idade_min" INTEGER NOT NULL,
    "idade_max" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "id_area" INTEGER,
    "id_classificacao" INTEGER,

    CONSTRAINT "CadastroBrinquedo_pkey" PRIMARY KEY ("id_brinquedo")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id_Emprestimo" SERIAL NOT NULL,
    "Data_Retirada" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Data_devolucao" TIMESTAMPTZ NOT NULL,
    "Data_Retorno" TIMESTAMPTZ,
    "id_status" INTEGER,
    "id_brinquedo" INTEGER,
    "id_aluno" INTEGER,

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id_Emprestimo")
);

-- CreateTable
CREATE TABLE "Status" (
    "id_status" SERIAL NOT NULL,
    "status" "StatusDoBrinquedo" NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id_status")
);

-- CreateTable
CREATE TABLE "CadastroUsuario" (
    "id_usuario" SERIAL NOT NULL,
    "Nome" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Senha" VARCHAR(255) NOT NULL,
    "Nivel" "Cargo" NOT NULL,

    CONSTRAINT "CadastroUsuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Controle" (
    "id_controle" SERIAL NOT NULL,
    "Descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Controle_pkey" PRIMARY KEY ("id_controle")
);

-- CreateTable
CREATE TABLE "ControleUsuario" (
    "id_controleU" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "id_controle" INTEGER,

    CONSTRAINT "ControleUsuario_pkey" PRIMARY KEY ("id_controleU")
);

-- CreateTable
CREATE TABLE "CadastroAluno" (
    "id_aluno" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "RA" INTEGER NOT NULL,
    "Serie" INTEGER NOT NULL,

    CONSTRAINT "CadastroAluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateTable
CREATE TABLE "Manutencao" (
    "id_manutencao" SERIAL NOT NULL,
    "Data_Entrada" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Data_Saida" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Descricao" TEXT NOT NULL,
    "id_estoque" INTEGER,

    CONSTRAINT "Manutencao_pkey" PRIMARY KEY ("id_manutencao")
);

-- CreateTable
CREATE TABLE "AreaDeDesenvolvimento" (
    "id_area" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "AreaDeDesenvolvimento_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "Classificacao" (
    "id_classificacao" SERIAL NOT NULL,
    "Descricao" TEXT NOT NULL,

    CONSTRAINT "Classificacao_pkey" PRIMARY KEY ("id_classificacao")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id_reserva" SERIAL NOT NULL,
    "id_aluno" INTEGER,
    "id_brinquedo" INTEGER,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- AddForeignKey
ALTER TABLE "EstoqueBrinquedo" ADD CONSTRAINT "EstoqueBrinquedo_id_brinquedo_fkey" FOREIGN KEY ("id_brinquedo") REFERENCES "CadastroBrinquedo"("id_brinquedo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueBrinquedo" ADD CONSTRAINT "EstoqueBrinquedo_id_Emprestimo_fkey" FOREIGN KEY ("id_Emprestimo") REFERENCES "Emprestimo"("id_Emprestimo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueBrinquedo" ADD CONSTRAINT "EstoqueBrinquedo_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CadastroBrinquedo" ADD CONSTRAINT "CadastroBrinquedo_id_area_fkey" FOREIGN KEY ("id_area") REFERENCES "AreaDeDesenvolvimento"("id_area") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CadastroBrinquedo" ADD CONSTRAINT "CadastroBrinquedo_id_classificacao_fkey" FOREIGN KEY ("id_classificacao") REFERENCES "Classificacao"("id_classificacao") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_id_brinquedo_fkey" FOREIGN KEY ("id_brinquedo") REFERENCES "CadastroBrinquedo"("id_brinquedo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "CadastroAluno"("id_aluno") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControleUsuario" ADD CONSTRAINT "ControleUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "CadastroUsuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControleUsuario" ADD CONSTRAINT "ControleUsuario_id_controle_fkey" FOREIGN KEY ("id_controle") REFERENCES "Controle"("id_controle") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_id_estoque_fkey" FOREIGN KEY ("id_estoque") REFERENCES "EstoqueBrinquedo"("id_estoque") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "CadastroAluno"("id_aluno") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_brinquedo_fkey" FOREIGN KEY ("id_brinquedo") REFERENCES "CadastroBrinquedo"("id_brinquedo") ON DELETE SET NULL ON UPDATE CASCADE;
