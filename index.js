const fs = require( "fs" );
const path = require("path"); 
const { readdirSync } = require('fs');
const beautify = require('js-beautify').html;
const test = require('web-resource-inliner');

let normalize =  contents  => {
    return process.platform === "win32" ? contents.replace( /\r\n/g, "\n" ) : contents;
}

let readFile =  file =>  {
    return normalize( fs.readFileSync( file, "utf8" ) );
}

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

getDirectories("creatives").forEach((dir) => {
    if (!fs.existsSync("output")){
        fs.mkdirSync("output")
        if (!fs.existsSync(path.join("output", dir))){
            fs.mkdirSync(path.join("output", dir))
        }
    }

    test.html( {
        fileContent: readFile( path.join('creatives', dir, 'index.html' )),
        relativeTo: path.join('creatives', dir),
        scripts: true,
        links: true,
    },
    ( err, result ) => {
        if(!err){
                fs.writeFile(path.join('output', dir, 'index.html'), beautify(result.replace(/images/g, ".")), function (err) {
                    if (err) throw err;
                    console.log(`${dir} inline file is created successfully.`);
                }); 
            }
        }
    );
})