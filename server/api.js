import express from 'express';
import bodyParser from 'body-parser';

var router = express.Router();

// for parsing application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
router.use(bodyParser.json());


// ------------ BEGIN: RESPONSE HELPERS
function MakeResponse({success, data, message}) {
    // make sure success is bool
    success = !!success;
    return { success, data, message };
}
function Success(data) {
    return MakeResponse({success:true, data});
}
function Fail(message) {
    return MakeResponse({success:false, message});
}
// ------------ END: RESPONSE HELPERS

// return a succes with user params
router.post('/testfct', function(req, res, next) {
    res.json(Success(req.body));
});

router.post('*', function(req, res, next) {
    res.json(Fail("Unknown API path: " + req.path));
});

export default router;
