const minify = require('minify');
const fs = require('fs');
const package = require('./package.json');
const babel = require("@babel/core");

const copyright = `
/*!
* Sesam ${package.version} - https://github.com/lennertderyck/sesam
* Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
*
* Copyright (c) ${new Date().getFullYear()} Lennert De Ryck
*/

`;

const options = {
    minify: {
        html: {
            removeAttributeQuotes: false,
            removeOptionalTags: false
        },
    },
    babel: {
        plugins: [
            "@babel/plugin-transform-arrow-functions", 
            "@babel/plugin-transform-modules-commonjs"
        ],
        presets: ["minify"]
    },
    src: './src/index.js',
    out: './dist/'
};

const write = {
    normal() {
        fs.readFile(options.src, (err, result) => {
            fs.writeFile(options.out + 'index.js', copyright + result, (err) => {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    },
    
    minified() {
        minify(options.src, options.minify)
        .then(result => {
            fs.writeFile(options.out + 'index.min.js', copyright + result, (err) => {
                if (err) throw err;
                console.log('Saved!');
            });
        })
        .catch(console.error);
    },
    
    async legacy() {
        try {
            const parsed = await babel.transformFileAsync(options.src, options.babel)
            fs.writeFileSync(options.out + 'legacy.min.js', copyright + parsed.code);
            console.log('Saved!');
        } catch {console.log(`${options.src} couldn't be parsed by Babel`)}
    },
    
    all() {
        write.normal();
        write.minified();
        write.legacy();
    }
}

write.all();
    
