const fs = require( "fs" );
const path = require("path"); 
const beautify = require('js-beautify').html;
const test = require('web-resource-inliner');

let normalize =  contents  => {
    return process.platform === "win32" ? contents.replace( /\r\n/g, "\n" ) : contents;
}

let readFile =  file =>  {
    return normalize( fs.readFileSync( file, "utf8" ) );
}

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), filelist)
        : filelist.concat(path.join(dir, file));

    });
    return filelist;
}

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

getDirectories("creatives").forEach((dir) => {
    (!fs.existsSync("output"))
        ? fs.mkdirSync("output")
        : null;

    (!fs.existsSync(path.join("output", dir)))
        ? fs.mkdirSync(path.join("output", dir))
        : null;

    (!fs.existsSync('creatives/300x600-Test/assets/image.jpg'))
        ? fs.copyFileSync('creatives/300x600-Test/assets/image.jpg', 'output/300x600-Test/image.jpg')
        : null;

    walkSync(path.join("creatives", dir)).forEach((file) => {
        if(!file.match(/js|css|html/g)){
            (!fs.existsSync(path.join("output", dir, file.split('/').pop(-1))))
                ? fs.copyFileSync(file, path.join("output", dir, file.split('/').pop(-1)))
                : null;
        }
    })
    
    test.html( {
        fileContent: 
            readFile(path.join('creatives', dir, 'index.html'))
                .replace(/src="https|src="http/g, 'data-inline-ignore src="https'),
        relativeTo: 
            path.join(
                'creatives', 
                dir
            ),
        scripts: true,
        links: true,
        images: false
    },
    ( err, result ) => {
        if(!err){
            fs.writeFile(
                path.join(
                    'output', 
                    dir, 
                    'index.html'
                ), 
                beautify(
                    result.replace(/\.\//g, ".").replace(/assets|images/g , '')), 
                    function (err) {
                        if (err) throw err;
                        console.log(`${dir} inline file is created successfully.`);
                    }
                ); 
            }
        }
    );
})