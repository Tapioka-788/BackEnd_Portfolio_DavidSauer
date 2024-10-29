const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    type: process.env.TYPE, 
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    client_x509_cert_url: process.env.UNIVERSE_DOMAIN
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const bd = admin.firestore(); 


const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

//const vetor = [
  //  {mensagem: 'oi', numero: 0 },
    //{mensagem: 'ola', numero: 1 },
    //{mensagem: 'hi', numero: 2 },
    //{mensagem: 'hello', numero: 3 },
//]

// let cartoes = [
//     {
//         nome: 'cartao 1',
//         descricao: '10pila',
//         imagem: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/product0/071/a5752-25mg_0057134_btl.tif/_jcr_content/renditions/a5752-25mg_0057134_btl-large'
//     },
//     {
//         nome: 'cartao 2',
//         descricao: '48,89cents',
//         imagem: 'https://images-americanas.b2w.io/produtos/01/00/img/3769059/8/3769059896_1GG.jpg'
//     },
//     {
//         nome: 'cartao 3',
//         descricao: 'fiftcent',
//         imagem: 'https://cdn.awsli.com.br/600x450/1810/1810043/produto/88385637/c76fbaa43e.jpg'
//     },
//     {
//         nome: 'cartao 4',
//         descricao: '2dól',
//         imagem: 'https://cdn.sistemawbuy.com.br/arquivos/3d031251600db30f801738111450cdd4/produtos/65553c13c7c0c/20240205_170005-1-65c37c57574dc.jpg'
//     },
// ];

app.get('/cartoes', async (req, res) => {
    try{
        const response = await bd.collection('cartoes').get();
        const cartoes = response.docs.map(doc => ({
            id: doc.id, ...doc.data(),
        }))
        res.status(200).json({ cartoes });
        console.log('Cartoes carregados com sucesso!');
            
    }catch (e) {
        console.log(e);
        res.status(500).json({mensagem: 'Erro' + e });
        console.log('Erro ao buscar dados' + e);
    }
   

});

app.post('/cartoes', (req, res) => {
    const{nome , descricao , imagem} = req.body;

    cartoes.push({nome: nome, descricao: descricao, imagem: imagem});
    console.log(cartoes);
    res.status(201).json({ mensagem: 'funfo' });
});

app.delete('/cartoes', (req, res) =>{
 const numero = req.body.numero
 vetor.splice(numero, 1)
 console.log(vetor)
 res.status(201).json({ mensagem: 'funfo o delete' })
})

app.put('/cartoes', (req, res) => {
    const numero = req.body.numero
    const mensagem = req.body.mensagem
    vetor[numero].mensagem = mensagem
    console.log(vetor)
    res.status(201).json({ mensagem: 'funfo o put' })
})


app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});