class HomeController{

    async index(req, res){
        res.send("APP DE GERENCIAMENTO DE RESTAURANTE");
    }

}

module.exports = new HomeController();