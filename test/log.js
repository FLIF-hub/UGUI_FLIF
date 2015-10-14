var fs = require('fs');

fs.writeFile("log.txt", "", function (err) {
    if (err) {
        console.log("boom");
    }
});

fs.readdir('.', function (err, files) {
    if (err) {
        throw err;
    }
    for (var index in files) {
        var name = files[index];
        var stats = fs.statSync(name);
        var size = stats["size"];
        var output = size + "	" + name + "\n";
        fs.appendFile('log.txt', output, function (err) {
            if (err) {
                console.log("boom");
            }
        });
    }
 });
