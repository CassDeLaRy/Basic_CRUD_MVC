var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    var result = null;
    try {
        result = await userService.createUserDBService(req.body);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var findUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.finduserDBService(req.body);
        if (result.status) {
            // res.send({ "status": true, "message": result.msg });
            res.send({ "status": true, "message": result.msg, "firstname": result.firstname, "lastname": result.lastname });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUseDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.deleteUseDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUseDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.updateUseDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}


module.exports = { createUserControllerFunc, loginUserControllerFunc, findUserControllerFunc, deleteUseDBServiceControllerFunc,updateUseDBServiceControllerFunc };