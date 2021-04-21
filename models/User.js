var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const { where } = require("../database/connection");

class User{

    async findAll(){
        try {
            var result = await knex.select(["id","name","email","role"]).table("users");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
        
    }

    async findById(id){
        try {
            var result = await knex.select(["id","name","email","role"]).where({id:id}).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async findByEmail(email){
        try {
            var result = await knex.select(["id","name","password","email","role"]).where({email:email}).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    
    async findByName(name){
        try {
            var result = await knex.select(["id","name","email","role"]).where({name:name}).table("users");
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    

    async new(email,password,name,role){
        try{
            console.log("role",role);
            var hash = await bcrypt.hash(password, 10);
            if (role == undefined){
                role = 0;
            }
            await knex.insert({email, password: hash, name, role}).table("users");

        }catch(err){
            console.log(err);
        }
    }




    async findEmail(email){
        try {
            var result = await knex.select("*").from("users").where({email: email});
            if(result.length > 0){
                return false;
            }else{
                return true;
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async update(id,email,name,role){
        var user = await this.findById(id);
        if(user != undefined){
            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result = await this.findEmail(email);
                    console.log(result);
                    if (result){
                        editUser.email = email;
                    }else{
                        return{status: false, err: "O Email já esta cadastrado!"}
                    }

                }
            }
            if(name != undefined){
                editUser.name = name;
            }
            if (role != undefined){
                editUser.role = role;
            }
            try {
                await knex.update(editUser).where({id:id}).table("users");
                return {status: true}
            } catch (err) {
                return{status: false, err: err}     
            }
        }else{
            return{status: false, err: "O usuário não existe!"}
        }
    }

    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){
            try {
                await knex.delete().where({id: id}).table("users");
                return {status: true};
            } catch (err) {
                return{status: false, err:err} 
            }
        }else{
            return{status: false, err:"Usuário não existe!"}
        }
    }

    //----------------------------------------------------FUNCIONARIOS-------------------------------------------------------

    async newFuncionario(name,password,email,role,endereco,data_nascimento,tel1,tel2,setor,salario,ativo){
        try{
            var hash = await bcrypt.hash(password, 10);
            if (role == undefined){
                role = 0;
            }
            await knex.insert({name,password:hash,email,role,endereco,data_nascimento,tel1,tel2,setor,salario,ativo}).table("funcionarios");

        }catch(err){
            console.log(err);
        }
    }

    async findByEmailFuncionario(email){
        try {
            var result = await knex.select(["id","name","email","role","tel1","tel2","endereco","setor"]).where({email:email}).table("funcionarios");
            if(result.length > 0){
                return result[0];
            }else{
                return false;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findAllFuncionarios(){
        try {
            var result = await knex.select(["id","name","email","role","endereco","data_nascimento","tel1","tel2","setor","salario","ativo"]).table("funcionarios");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
        
    }

    async findByIdFuncionario(id){
        try {
            var result = await knex.select(["id","name","email","role","endereco","data_nascimento","tel1","tel2","setor","salario","ativo"]).where({id:id}).table("funcionarios");
            console.log("findId");
            console.log(result);
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    /*
    async desligarFuncionarioPorId(id){
        var user = await this.findByIdFuncionario(id);
        console.log(user)
        //console.log("antes:" + user.ativo);
        //user.ativo != user.ativo;
        //console.log("depois:" + user.ativo);
        if(user != undefined){
            try {
                await knex.update(user).where({id: id}).table("funcionarios");
                return {status: true};
            } catch (err) {
                return{status: false, err:err} 
            }
        }else{
            return{status: false, err:"Usuário não existe!"}
        }
    }*/
}
module.exports = new User();