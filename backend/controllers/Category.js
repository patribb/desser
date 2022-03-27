const {validationResult} = require("express-validator")
const CatgoryModel = require("../models/Category")

class Category {
    async create(req, res) {
        const errors = validationResult(req);
        const {name} = req.body;
        if(errors.isEmpty()){
           const exist = await CatgoryModel.findOne({name});
           if(!exist) {
                await CatgoryModel.create({name})
                return res.status(201).json({message: 'Categoría creada con éxito!'})
           } else {
               return res.status(400).json({errors: [{msg: `La categoría ${name} ya existe`}]})
           }
        } else {
            return res.status(400).json({errors: errors.array()});
        }
    }
    async categories(req, res) {
         const page = req.params.page;
         const perPage = 3;
         const skip = (page - 1) * perPage;
         try {
             const count = await CatgoryModel.find({}).countDocuments();
             const response = await CatgoryModel.find({}).skip(skip).limit(perPage).sort({updatedAt: -1})
             console.log(response)
            return res.status(200).json({categories: response, perPage, count})
         } catch (error) {
             console.log(error.message);
         }

    }
    async fetchCategory(req, res) {
        const {id} = req.params;
        try {
            const response = await CatgoryModel.findOne({_id: id})
            return res.status(200).json({category: response})
        } catch (error) {
            console.log(error.message)
        }
    }
    async updateCategory(req, res) {
        const {id} = req.params;
        const {name} = req.body; 
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            const exist = await CatgoryModel.findOne({name});
            if(!exist) {
                const response = await CatgoryModel.updateOne({_id: id}, {$set: {name}});
                return res.status(200).json({message: 'La categoría se ha actualizado correctamente!'})
            } else {
                return res.status(400).json({errors: [{msg: `La categoría${name} ya existe`}]})
            }

        } else {
            return res.status(400).json({errors: errors.array()})
        }
    }
    async deleteCategory(req ,res) {
        const {id} = req.params;
        try {
            await CatgoryModel.deleteOne({_id: id});
            return res.status(200).json({message: 'Categoría eliminada correctmente!'})
        } catch (error) {
            console.log(error.message);
            return res.status(500).json('Error interno del servidor!');
        }
    }
    async allCategories(req, res) {
        try {
            const categories = await CatgoryModel.find({});
            return res.status(200).json({categories})
        } catch (error) {
            return res.status(500).json('Error interno del servidor!');
        }
    }
}
module.exports = new Category;