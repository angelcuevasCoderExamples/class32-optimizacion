const cluster = require('cluster');
const os = require('os')

const cpuCount  = os.cpus().length;

cluster.setupPrimary({
    exec: __dirname + '/app.js'
})

console.log("CPU COUNT", os.cpus()[0].model)
console.log("CPU COUNT", cpuCount)

for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
}