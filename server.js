
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 200;
        res.write('<html>')
        res.write('<head>');
        res.write('<title> website</title>')
        res.write('<body><h1>WellCome to My Website</h1>')
        res.write('<form action="/create-user" method="POST">')
        res.write('<input type="text" name="username" Placeholder="Enter Username"><br>');
        res.write('<button type ="submit">Submit</button></form></body')
        res.write('</head>')
        res.write('</html>')
      return  res.end();
    }
    if (req.url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 200;
        res.write('<html>')
        res.write('<head>');
        res.write('<title> website</title>')
        res.write('<body><h1>User of webiste</h1>')
        res.write('<ul><li>user1</li><li>user2</li><li>user3</li><li>user4</li></ul></body>')
        res.write('</head>')
        res.write('</html>')
     return   res.end();
    }
    if (req.url === '/create-user' && req.method === 'POST') {
        let dataArray = [];
        req.on('data', (chunk) => {
            dataArray.push(chunk);
        })
        req.on('end', () => {
            let parseData = Buffer.concat(dataArray);
            let dataString = parseData.toString();
            let value = dataString.split('=')[1];
            fs.writeFile('database.txt', value, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
              return  res.end();
            });

        })
    }

})
server.listen(3000);