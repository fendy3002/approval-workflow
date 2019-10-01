const http = require('http');
const express = require('express');
const chokidar = require('chokidar');
const SwaggerParser = require('swagger-parser');
const _path = require('path');
const yaml = require('write-yaml');
const fs = require('fs');

let folder = _path.join(__dirname, "reference", "approval");
let source = _path.join(folder, "index.yaml");
let compiled = _path.join(folder, "compiled.yaml");
const bundle = () => {
    return SwaggerParser.dereference(source, {

    }).then((api) => {
        return new Promise(resolve => yaml(compiled, api, (err) => {
            console.log("compile done");
            SwaggerParser.validate(compiled)
            .then((err, api) => {
                resolve();
            }).catch((err) => {
                console.log("Validation Error", err);
                fs.writeFile(_path.join(__dirname, "storage", "log", "apierror.log"), JSON.stringify(err, 0, 2), () => {
                    resolve();
                });
            })
        }));
    }).catch((err) => {
        console.log("Error", err);
    });
};
bundle();
chokidar.watch([
    _path.join(folder, "**", "*")
]).on("change", (event, path) => {
    bundle();
});

const app = express();
app.use(express.static(folder));

const server = http.createServer(app);
const port = process.argv[2] || 0;
const listener = server.listen(port, () => {
    console.log("server running on: http://127.0.0.1:" + listener.address().port);
});
