const path = require('path');
const fs = require('fs');
module.exports = app =>
{
    fs.readFile("db/db.json","utf8", (err, data) => 
    {
        if (err) throw err;
        var notes = JSON.parse(data);
        app.get("/api/notes", function(req, res) 
        {
            res.json(notes);
        });
        app.post("/api/notes", function(req, res) 
        {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });
        app.get("/api/notes/:id", function(req, res) 
        {
            res.json(notes[req.params.id]);
        });
        
        app.get('/notes', function(req, res) 
        {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        app.get('*', function(req,res) 
        {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        function updateDb() 
        {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'), err => 
            {
                if (err) throw err;
                return true;
            });
        }

    });
}
