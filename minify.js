const minify = require('minify');
const fs = require('fs');

const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false
    },
};
 
minify('./index.js', options)
    .then(result => write(result))
    .catch(console.error);
    
const write = (minified) => {
    fs.writeFile('index.min.js', minified, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
    