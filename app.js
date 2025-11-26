const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const sequelize = require("./models/database");
const Disciplina = require("./models/Disciplina");

const app = express();
const PORT = 3000;


console.log("Conectado no banco:", sequelize.config.database);
console.log("Host:", sequelize.config.host);
console.log("User:", sequelize.config.username);
// Tentando conectar ao banco
sequelize.sync()
  .then(() => console.log("Conectado ao MySQL e sincronizado!"))
  .catch(err => console.error("Erro ao conectar:", err));








// Configurações gerais
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Rotas fixas
app.get("/", (req, res) => res.render("main"));
app.get("/sobre", (req, res) => res.render("sobre"));
app.get("/contato", (req, res) => res.render("contato"));
app.get("/skills", (req, res) => res.render("skills"));

app.get("/projetos", (req, res) => {
  const projetos = [
    {
      imagem: "/css/images/travia.jpg",
      titulo: "Sistema de Controle de Tráfego",
      descricao: "Desenvolvimento de um site focado na contagem de veículos em tempo real."
    },
    {
      imagem: "/css/images/vendas.png",
      titulo: "Sistema de controle de vendas",
      descricao: "Plataforma para registro e gerenciamento de vendas."
    },
    {
      imagem: "/css/images/replica.png",
      titulo: "Réplica do Spotify com React",
      descricao: "Aplicação inspirada no Spotify usando React."
    },
    {
      imagem: "/css/images/restful.jpg",
      titulo: "Criação de REST APIs",
      descricao: "Desenvolvimento de APIs RESTful escaláveis."
    },
    {
      imagem: "/css/images/fatecexport.png",
      titulo: "Projeto de Aprendizado FATEC",
      descricao: "Sistema baseado em dados públicos com gráficos interativos."
    },
    {
      imagem: "/css/images/forecast.png",
      titulo: "Aplicativo de Previsão do Tempo",
      descricao: "App que exibe previsão do tempo em tempo real."
    }
  ];
  res.render("projetos", { projetos });
});

// ------------------------------
//   ROTAS COM SEQUELIZE
// ------------------------------

// Listar disciplinas
app.get("/disciplinas", async (req, res) => {
  const disciplinas = await Disciplina.findAll();
  res.render("disciplinas", { disciplinas });
});

// Página de criar nova disciplina
app.get("/disciplinas/nova", (req, res) => {
  res.render("novadisciplinas", {
    editar: false,
    disciplina: null,
  });
});

// Criar disciplina
app.post("/disciplinas/nova", async (req, res) => {
  console.log("Recebido do formulário:", req.body);
  const nome = req.body.nome;
  

  if (!nome || nome.trim() === "") {
    return res.render("novadisciplinas", {
      editar: false,
      disciplina: null,
      error: "Nome da disciplina é obrigatório",
    });
  }

  await Disciplina.create({ nome: nome.trim() });
  res.redirect("/disciplinas");
});

// Editar disciplina (carregar dados)
app.get("/disciplinas/:id/editar", async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);

  if (!disciplina) return res.status(404).send("Disciplina não encontrada");

  res.render("novadisciplinas", {
    editar: true,
    disciplina,
  });
});

// Atualizar disciplina
app.put("/disciplinas/:id", async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  const nome = req.body.nome;

  if (!disciplina) return res.status(404).send("Disciplina não encontrada");

  if (!nome || nome.trim() === "") {
    return res.render("novadisciplinas", {
      editar: true,
      disciplina,
      error: "Nome da disciplina é obrigatório",
    });
  }

  disciplina.nome = nome.trim();
  await disciplina.save();

  res.redirect("/disciplinas");
});

// Excluir disciplina
app.delete("/disciplinas/:id", async (req, res) => {
  await Disciplina.destroy({ where: { id: req.params.id } });
  res.redirect("/disciplinas");
});

// Inicialização
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
