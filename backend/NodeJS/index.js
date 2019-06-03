const express = require('express')
const app = express()
const vm = require('vm');
const port = 3000

app.get('/runCode/:code', (req, res) => {
    const util = require('util');
    const vm = require('vm');

    console.log(req.params.code);

    const script = new vm.Script(req.params.code);

    const sandbox = {};
    script.runInNewContext(sandbox);

    console.log(util.inspect(sandbox.result));
    res.send({result:util.inspect(sandbox.result)})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))