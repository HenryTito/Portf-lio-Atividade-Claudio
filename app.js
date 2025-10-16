const express = require("express");
const methodOverride = require("method-override");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const dataPath = path.join(process.cwd(), 'disciplinas.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler o arquivo de dados:", error);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
    }
};


app.set("view engine", "ejs");
app.use(express.static("public"));



app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
});



app.get("/projetos", (req, res) => {
  const projetos = [
    {
      imagem: "/css/images/travia.jpg",
      titulo: "Sistema de Controle de Tráfego",
      descricao:
        "Desenvolvimento de um site focado na contagem de veículos em tempo real. O sistema registra o fluxo de automóveis em diferentes pontos, permitindo o acompanhamento e análise básica do tráfego local.",
    },
    {
      imagem: "/css/images/vendas.png",
      titulo: "Sistema de controle de vendas",
      descricao:
        "Plataforma completa para registro e gerenciamento de vendas, desenvolvida em Java, com controle de estoque, cadastro de clientes e geração de relatórios em tempo real, otimizando o processo comercial de pequenas empresas.",
    },
    {
      imagem: "/css/images/replica.png",
      titulo: "Réplica do Spotify com React",
      descricao:
        "Criação de uma aplicação web interativa inspirada no Spotify, utilizando React para renderização dinâmica, gerenciamento de estados e simulação de funcionalidades como playlists e busca de músicas.",
    },
    {
      imagem: "/css/images/restful.jpg",
      titulo: "Criação de REST APIs",
      descricao:
        "Desenvolvimento de APIs RESTful organizadas e escaláveis, com foco em boas práticas como versionamento, autenticação JWT, estrutura em camadas e integração com bancos de dados relacionais e não relacionais.",
    },
    {
      imagem: "/css/images/fatecexport.png",
      titulo: "Projeto de Aprendizado FATEC",
      descricao:
        "Projeto acadêmico desenvolvido com base em dados públicos do governo, voltado à filtragem de informações sobre importação e exportação. O sistema organiza os dados e os apresenta de forma visual por meio de gráficos interativos.",
    },
    {
      imagem: "/css/images/forecast.png",
      titulo: "Aplicativo de Previsão do Tempo",
      descricao:
        "Aplicativo web desenvolvido com JavaScript que exibe a previsão do tempo em tempo real. Utiliza APIs externas para obter dados climáticos, mostrando informações como temperatura, umidade e condições atuais de forma clara e responsiva.",
    },
  ];

  res.render("projetos", { projetos });
});


app.get("/contato",(req,res)=> {
  res.render("contato")
})

app.get("/skills",(req,res)=> {
  res.render("skills")
})



app.get('/disciplinas', (req, res) => {
  const disciplinas = readData();
  res.render('disciplinas', { disciplinas: disciplinas });
});

app.get('/disciplinas/nova', (req, res) => {
  res.render('novadisciplinas', { 
    editar: false, 
    disciplina: null 
  });
});

app.post('/disciplinas/nova', (req, res) => {
  try {
    const disciplinas = readData();
    const nextId = disciplinas.length > 0 ? Math.max(...disciplinas.map(d => d.id)) + 1 : 1;
    const nomeDisciplina = req.body.nome;
    
    if (nomeDisciplina && nomeDisciplina.trim() !== '') {
      disciplinas.push({ 
        id: nextId, 
        nome: nomeDisciplina.trim() 
      });
      writeData(disciplinas);
      res.redirect('/disciplinas');
    } else {
      res.render('novadisciplina', { 
        editar: false, 
        disciplina: null,
        error: 'Nome da disciplina é obrigatório' 
      });
    }
  } catch (error) {
    console.error('Erro ao criar disciplina:', error);
    res.status(500).render('novadisciplina', { 
      editar: false, 
      disciplina: null,
      error: 'Erro interno ao criar disciplina' 
    });
  }
});

app.get('/disciplinas/:id/editar', (req, res) => {
  const disciplinas = readData();
  const id = parseInt(req.params.id);
  const disciplina = disciplinas.find(d => d.id === id);
  if (disciplina) {
      res.render('novadisciplinas', { 
        editar: true, 
        disciplina: disciplina 
      });
  } else {
      res.status(404).send("Disciplina não encontrada");
  }
});

app.put('/disciplinas/:id', (req, res) => {
  try {
    const disciplinas = readData();
    const id = parseInt(req.params.id);
    const disciplinaIndex = disciplinas.findIndex(d => d.id === id);
    
    if (disciplinaIndex !== -1 && req.body.nome && req.body.nome.trim() !== '') {
      disciplinas[disciplinaIndex].nome = req.body.nome.trim();
      writeData(disciplinas);
      res.redirect('/disciplinas');
    } else {
      const disciplina = disciplinas.find(d => d.id === id);
      res.render('novadisciplina', { 
        editar: true, 
        disciplina: disciplina,
        error: 'Nome da disciplina é obrigatório' 
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar disciplina:', error);
    res.status(500).send('Erro interno ao atualizar disciplina');
  }
});

app.delete('/disciplinas/:id', (req, res) => {
  let disciplinas = readData();
  const id = parseInt(req.params.id);
  disciplinas = disciplinas.filter(d => d.id !== id);
  writeData(disciplinas);
  res.redirect('/disciplinas');
});




app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});