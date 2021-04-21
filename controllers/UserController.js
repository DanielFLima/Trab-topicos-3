const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

//const secret = "kldçawokdaçda5d4a65wd4aea5s4da65dw4ds";

class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUserId(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        
        if (user == undefined){
            res.status(404);
            res.json({err:"Id não encontrado!"});

        }else{
            res.status(200);
            res.json(user);
        }
    }

    async findUserName(req,res){
        var name = req.params.name;
        var user = await User.findByName(name);
        
        if (user == undefined){
            res.status(404);
            res.json({err:"Nome não encontrado!"});

        }else{
            res.status(200);
            res.json(user);
        }
    }

    async create(req,res){
        var {name, email, password,role} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "E-mail inválido"})
        }
        var emailExists = await User.findEmail(email);
        if(!emailExists){
            res.status(406);
            res.json({err:"Email já está cadastrado"});
            return;
        }
        await User.new(email,password,name,role);
        res.status(200);
        res.send("Usuário cadastrado");
        
    }



    async edit(req,res){
        var{id, name, role, email} = req.body;
        var result = await User.update(id,email,name,role);
        if (result != undefined){
            if(result.status){
                res.status(200);
                res.send("Usuário foi atualizado com sucesso!")
            }else{
                res.status(406);
                res.json(result);
            }

        }else{
            res.status(406);
            res.send("ocorreu um erro no servidor!");
        }
    }

    async remove(req,res){
        var id = req.params.id;
        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("deletado com sucesso");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async login(req, res){
        var {email, password} = req.body;
        var user = await User.findByEmail(email);

        if(user != undefined){
            var result = await bcrypt.compare(password, user.password)
            if (result){
                var token = jwt.sign({email:user.email, role: user.role }, process.env.SECRET); ///------
                res.status(200);
                res.json({token:token});
            }else{
                res.status(406);
                res.send("Senha Incorreta!");
            }
        }else{
            res.json({status: false})
        }
    }

    //--------------------------------------------------FUNCIONÁRIOS-----------------------------------------------
    async createFuncionario(req,res){
        var {name,password,email,role,endereco,data_nascimento,tel1,tel2,setor,salario,ativo} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "E-mail inválido"})
        }

        var emailExists = await User.findByEmailFuncionario(email);
        
        if(emailExists){
            res.status(406);
            res.json({err:"Email já está cadastrado"});
            return;
        }
        await User.newFuncionario(name,password,email,role,endereco,data_nascimento,tel1,tel2,setor,salario,ativo);
        res.status(200);
        res.send("Usuário cadastrado");
        
    }

    async allFuncionarios(req, res){
        var users = await User.findAllFuncionarios();
        res.json(users);
    }
//nao esta funcionando
    async desligarFuncionario(req,res){
        var id = req.params.id;
        var result = await User.desligarFuncionarioPorId({id});

        if(result.status){
            res.status(200);
            res.send("Funcionario Desligado com sucesso");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
    
}

module.exports = new UserController();

 