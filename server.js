const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

const folderPath = './';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.use(cors()); // Enable all CORS requests

app.get('/items', (req, res) => {


    //Items

    $currentPath = folderPath+"items";
    let items;
    fs.readdir($currentPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        items = files.map(file => {
            const filenameWithoutUnderscores = path.parse(file).name.replace(/_/g, ' ');
            return {
                name: filenameWithoutUnderscores,
                img: `items/${file}`
            };
        });

        items = shuffleArray(items);
        items = items.slice(2, 15);
        items = items.concat(items);
        items = shuffleArray(items);
        items = items.slice(0, 25);
        
        //console.log (items);
        res.json(items);

        
    });


    
   
});

app.use('/items', express.static(folderPath+"items"));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



