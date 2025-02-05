const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "bdportifoliosauer",
    private_key_id: "94dc570559d07bdf8091a9dce9af8847142280b0",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9mVP0CPuoXf4t\nPDPzN4HO/gNhUHR3a6E9Ntxby5tOErToDSpntL4lP1iFoN5zQqt6D6GEvYID1gMb\nQCtEbmUhG0tOx2rTLVJuR1FRgg3cXANkbd1e5CI6V0zE7nhXew/8LjlA3G3+bTfi\n529SwtM6MWh2cpLqSRN1Zq7M5SY7oIfHZFQNRwUAKTYKso5XCYqPAQrpCRYDl6K1\negVkhFoOuJUJjcnzMCU8PntrCV/RtPRnphy5s4cZJeGdZEsYSRj3LMGNWw2Zq+VK\n5eMBloMVHlSy0sprMXu80aepGvZ08KuainNZfL+amQi0NfQyHJuGnoIEHafel897\nRg1xGE7NAgMBAAECggEAVbYKAOlKsyuCq3pq1cnDEgs9BfI0JIRwiNbTOWBLHjlQ\ntRK2l9lamEYRw58c0ShTksOcNgDh1NAb6WbR6IarixLmsX9vKHZ1rErrVRihIXwr\nQGx2Rd6GJq+ukdxoZMvKRyuyUEMWKo2/VQFhDx3qFYWefuV+yxEsDcfUv+Xbqdo6\nLHBwUDcAu5bmufeCXT6hh0yJ1x/0Fem2wrc+hk46/CaDHxojWbmbsEacIX0iP5+P\nIwaQ8QuXEVOaIqkzpSihRNRbnpy6b0AMlddYJCRBVeHWsR7k2EQfMibhu+Kk3oj1\na2UTeFBGVaMsISms4T2Se8PaxpFaDIGOugQLBFgc1QKBgQDgmoCrS+GfSn18QQ9w\nmYm7VG248M7wlTyKH10nQv8TwwivZZoZvH54XFoVkAMUS4eSBrb5hRr318sCGdpL\nQw83qdin8eVCvJpiUMG6fTM1pVwBu3dFZQ6eF973CRlZBBEyLRuX0JyeRnZJjE2Z\nPpB49hPm5+/vyridmhIcnOnOhwKBgQDYGi0/AQzE+A+cOo18R+7am/t1H4kn02Kr\nDWPOatKFQfQLXo5AHj/qgGRP8RUJ1tCIXfbaoFmwOqt8ynE5P2j8YNV925JVHbJ5\nJ0xqbvAmyQRGK2v0ZLfjnNwNV6vSrNUsx+ORzut2FjG/xDiGIUdxfIj+eal1SSVE\n+r86yCTZCwKBgA3uZ2a4mTEJLMllO7DvRRTCgt/CyAMyLoQet+d0h1/RbBt9ANbx\n0yJiEBBgU2CR4sHS+sx1ThvrXaMuuVSLv0jjlxWrsl22VxkcCzgnBeMg85kD6Lz8\nLLDvqBvIi7LyxqJHG/wJq31Bv5qGQlXsBIgMM2XSIxbLizHzWYY+0V3HAoGBANdV\nfjCBw0+iPyvVzJZCt2dudqrGuczNfkwkE4fkOdI/XgbWObj6a4YoWcyu1d/wBetc\ndlZz4esRC0BWGWyKGvshIps+6BmYdfbzidmkofiD5ZZmPjRRCEvuSfehnL1ZKzJs\nG/92yHnqs7f6trgxARe8mGW6pXkRYenSUisotE7xAoGAPL3w5fMFOP9a5B8Q1pBN\n5Re50I6TvYV7okegURpB6bX3pasl6EBQJ3e3Q8L4rMDVbZ9WYy7f50d1MvfbqbUM\nhEztCiQKYyv6U40IDPek7DqFwvoNFG3hvTGO42+QuZALwTOopAfboXOQi26RdOs9\nPlD6IGYzQqCZoMg3IVDfCJ0=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-vsnye@bdportifoliosauer.iam.gserviceaccount.com",
    client_id: "105126159190768700649",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vsnye%40bdportifoliosauer.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }
  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const bd = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

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

const responderErro = (res, status, mensagem)  => {
    console.log(mensagem);
    res.status(status).json({ mensagem }); 
}

app.post('/cartoes', async (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome) {
        return responderErro(res, 400, 'Nome do cartão inválido');	
    }
    if (!descricao) {
        return responderErro(res, 400, 'Descrição do cartão inválida');
    }
     else {
        try {
            const novoCartaoRef = await bd.collection('cartoes').add({
                nome,
                descricao,
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
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ mensagem: 'Id não fornecido' });
        console.log('Id não fornecido');
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id);
            const doc = await cartaoRef.get();
            if (!doc.exists) {
                res.status(404).json({ mensagem: `Cartão com Id ${id} não encontrado` });
                console.log('Cartão não encontrado');
            } else {
                await cartaoRef.delete();
                res.status(200).json({ mensagem: `Cartão com Id ${id} excluido` });
                console.log(`Cartão com Id ${id} excluido`);
            }
        } catch (error) {
            console.error('Erro ao excluir cartão!', error);
            res.status(500).json({ mensagem: 'Erro ao excluir cartão' });
        }
    }
});

app.put('/cartoes', async (req, res) => {
    const { nome, descricao, id } = req.body
    if (!id) {
        res.status(400).json({ mensagem: 'Id não fornecido' })
        console.log('Cartão não atulizado, Id inválido')
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id)
            const doc = await cartaoRef.get()
            if (!doc.exists) {
                res.status(404).json({ mensagem: 'Cartão com id ' + id + ' não encontrado' })
                console.log('Cartão não encontrado')
            } else {
                const dadosAtualizados = {}
                if (nome) dadosAtualizados.nome = nome
                if (descricao) dadosAtualizados.descricao = descricao
                await cartaoRef.update(dadosAtualizados)
                res.status(200).json({ mensagem: 'Cartão com id ' + id + ' atulizado' })
                console.log('Cartão com id ' + id + ' atulizado')
            }
        } catch (e) {
            console.error('Erro ao atulizar cartão!', error)
            res.status(500).json({ mensagem: 'Erro ao atulizar cartão' })
        }
    }
})

module.exports = app;

// app.listen(3000, () => {
//     console.log('rodando');
// });


