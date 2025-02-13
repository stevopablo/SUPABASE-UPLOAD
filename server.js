const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Item = require('./src/Models/itemModels');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
// const dotenv = require('dotenv')
// dotenv.config()
const app = express();
app.use(express.json());

// let url = 'mongodb+srv://stevaopabllo:1EX4l5Vz78SnNijj@eclat-db.subei.mongodb.net/?retryWrites=true&w=majority&appName=eclat-db'
// console.log("🚀 ~ url:", url)
const MONGO_URL = process.env.MONGO_URL
supabaseKey = process.env.SUPABASE_KEY
supabaseUrl = process.env.SUPABASE_URL

// Configuração do MongoDB
mongoose.connect(MONGO_URL, {})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Configuração do Multer para upload de imagem
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





// Criar item
// app.post('/items', upload.single('image'), async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { buffer, originalname } = req.file;

//         const { data, error } = await supabase.storage
//             .from('images')
//             .upload(originalname, buffer);

//         if (error) throw error;

//         const newItem = new Item({
//             name,
//             imageUrl: data.Key
//         });

//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// app.post('/items', upload.single('image'), async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { buffer, originalname } = req.file;

//         const { data, error } = await supabase.storage
//             .from('images')
//             .upload(`public/images/${originalname}`, buffer);

//         if (error) throw error;

//         const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${originalname}`;

//         const newItem = new Item({
//             name,
//             imageUrl: imageUrl
//         });

//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
app.post('/items', upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;
        const { buffer, originalname } = req.file;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(`public/images/${originalname}`, buffer);

        if (error) throw error;

        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${originalname}`;

        const newItem = new Item({
            name,
            imageUrl: imageUrl
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
});



// Listar itens
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar item
app.put('/items/:id', upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;
        const { buffer, originalname } = req.file;
        const { id } = req.params;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(originalname, buffer);

        if (error) throw error;

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, imageUrl: data.Key },
            { new: true }
        );

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar item
app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/',(req, res)=>{
    res.status(200).send({msg:"Hello world"})
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`);
});
