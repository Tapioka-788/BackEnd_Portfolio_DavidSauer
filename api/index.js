const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "bdportifoliosauer",
    private_key_id: "f2efbfbd21423b9ff95982221def796d7f31d49b",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvzZJdD9lXAMBH\n//Hoo3OJBSEyk3kqVcsTe2eY+w33Up2JEqwD0U5SkG58JkPnUXzNCjAQfHX2d7N2\nYZjz6gz/U0RIm7BJEIf7mqyzdBHq87E0fHybOvzlt+7sm2d2UfrDqoKSmm4l1INL\nGnj+gC+NLiuL+U2YL+SKiwEts0DXXnnWmuRw5oq/e0W8LVbfO7oX8RWQnt5S6ke8\n7Cfk3mg4L26B1f/Zw0Jz2inK7/Qy/F+SwJUueQdW44r2pOsadlwqnU7ZPz5Y7VSA\ntgqv/p8WH0euRNNn2/BZZDUUvnB7N81ydahm+1MuVoYk7P+wEYnBvkys9TuWhuKu\n5kcXMjDrAgMBAAECggEAULVYl166UaXnoGZRIZNAbEwtlHF9s8DVTSlfQy0mmT+V\nUSOAUvRZN7BU+Kv8ioqvd9ZQgJES+sazXgqqVHhD5UfN1mObR7/OHeVBmdUUkL+1\nv7nS3tTy22dYyckCc6BpNkDmVvWM0dNBP05086nXqsHifg1C4TZDfpMYRGnBv909\nG+SEYkMNN86e2e8Ui0rQIF6Zi7TpecB5SJBo6cJM8+bsc2TsmYNXhks7pWV3fgRC\nMgv14xSNY0z+0DEeCcl/CbSLKsumBvPDH1El6125nOLHHvnHYBtOUTd973x3txxr\n54VA0xTSiB+Jv72reN0m8r9yWcQ1Fd4jZ3QrUGseKQKBgQDnhCEBChIjGZJi4oMx\n+xBWaqLKs4AXvFs+ozJD5t5/XyRVdPhPgmUnRn0T6HqD6J915DpCulpEKuuXwKBd\nFPgnK/pmJyyNrIUG7xKGQUQoFYuazuPhvjuuGcDS8ItDEiGiGaAyi1iYOZBdxjwc\num9nszx7l7vA0X+j1B38XT+w3wKBgQDCZRz/Nbj4CF+PLg3YMOof2CqQt5wzR9Qb\nyQHRmFPvXR2kyzOTRaCm7S9TkShViP9OqO7k4PWNDKdHSr7XZHZLom58+0qlAvE5\nRD3e8Xm20gxWJVrQlPg+Qxgnpy/xP9XgtaUaTUwdjhDBEojvxN1qGa8iDKsoEJmt\nXljOD54FdQKBgQCXDO8XpYF14y5OVClzB7J+H279P6Y4Vk1WDdYy1UOf6Oxk0T9d\naN8kg+oBfjHJNJItse2NMdbJGRPDXAuFD7Rkol3qHm8ENGZKwtrcO2MDoCMIqyml\nVJ/NlMHpHsZNyVumTn/l2mLAVvZpKHh56e3bw+aXYMVAJa/YrQGvcQuoEwKBgBOO\nWoFuJSKGrR5ZUrk6CoOTmoyefA9InZUB/rXYLjF5W58VdiXNrmC8obM1eipIsu51\n3jqWSv2alUV9xn8isyfeumDGYvcAucW6EMNZ5ZW3wdf0wBMVuXeCBm8Oyarqchi+\nDVL9Dbg3b4YM2EvOsTuYQ98YCSvpp5wiTqrENXB1AoGBALHb5UtGzevloSOqDsxS\nxcyPEf2aCD+oJDX+s7QK12LAkqocY0jkjJG17I/bGJRfT6apVt85MWLOxCXJlE+5\nF1kUOTbPEhcUiFhr7lyGbqcVBcnU71/4R/cipOnxk13FDNqxvryten9U1FNV+wts\n3LcVFCg89SlUeKe8fj0gpDQ4\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-vsnye@bdportifoliosauer.iam.gserviceaccount.com",
    client_id: "105126159190768700649",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vsnye%40bdportifoliosauer.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const bd = admin.firestore();

const app = express();

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
    try {
        const response = await bd.collection('cartoes').get();
        const cartoes = response.docs.map(doc => ({
            id: doc.id, ...doc.data(),
        }))
        res.status(200).json({ cartoes });
        console.log('Cartoes carregados com sucesso!');

    } catch (e) {
        console.log(e);
        res.status(500).json({ mensagem: 'Erro' + e });
        console.log('Erro ao buscar dados' + e);
    }
});

app.post('/cartoes', async (req, res) => {
    const { nome, descricao, imagem } = req.body;
    if (!nome) {
        res.status(400).json({ mensagem: 'Nome do cartão inválido!' })
        console.log('Novo cartão não cadastrado, nome inválido!');
    } else if (!descricao) {
        res.status(400).json({ mensagem: 'Descrição do cartão inválida!' });
        console.log('Novo cartão não cadastrado, nome inválido!');
    } else if (!imagem) {
        res.status(400).json({ mensagem: 'Imagem do cartão inválida!' });
        console.log('Novo cartão não cadastrado, imagem inválida!');
    } else {
        try {
            const novoCartaoRef = await bd.collection('cartoes').add({
                nome,
                descricao,
                imagem,
                criadoEm: admin.firestore.FieldValue.serverTimestamp()
            });
            res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!', id: novoCartaoRef.id });
            console.log('Novo cartão cadastrado com ID:', novoCartaoRef.id);
        } catch (error) {
            console.error('Erro ao cadastrar cartão:', error);
            res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' });
        }
    }
});

app.delete('/cartoes', async (req, res) => {
    const cartao = req.body.cartao
    if (!id) {
        res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
        console.log('Novo cartão não foi deletado, o id é obrigatório');
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id);
            const doc = await cartaoRef.get();
            if (!doc.exists) {
                res.status(404).json({ mensagem: 'Cartão com ID' + cartao + "nao encontrado" });
                console.log('Cartão com ID' + cartao + 'deletado');
            }
        }
        catch (e) {
            console.error('Erro ao deletar o cartão:', e);
            res.status(500).json({ mensagem: 'Erro ao deletar o cartão' });
        }
    }
})

app.put('/cartoes', async (req, res) => {
    const { nome, descricao, imagem, id } = req.body;
    if (!id) {
        res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
        console.log('Cartão não atualizado, ID INVÁLIDO.');
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id);
            const doc = await cartaoRef.get();
            if (!doc.exists) {
                res.status(404).json({ mensagem: 'Cartão com ID' + id + 'não encontrado' })
                console.log('Cartão não encontrado');
            } else {
                const dadosAtualizados = {};
                if (nome) dadosAtualizados.nome = nome;
                if (descricao) dadosAtualizados.descricao = descricao;
                if (imagem) dadosAtualizados.imagem = imagem;
                await cartaoRef.update(dadosAtualizados);
                res.status(200).json({ mensagem: 'Cartão com ID' + id + 'atualizado' });
                console.log('Cartão com ID' + id + 'atualizado');
            }
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
            res.status(500).json({ mensagem: 'Erro ao atualizar cartão' })
        }
    }
});

module.exports = app;

app.listen(3000, () => {
    console.log('rodando');
});