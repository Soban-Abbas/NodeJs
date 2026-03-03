const http = require('http')
const fs = require('fs');
const { buffer } = require('stream/consumers');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    if (req.url === '/') {
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" Placeholder="Enter Username"><br> <Button type="submit">Submit</Button></form></body>');
        res.write('</html>');
        return res.end()
    }
    if (req.url === '/message' && req.method === "POST") {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);

        })

        req.on("end", () => {
            let parsedata = Buffer.concat(data)
            let dataString = parsedata.toString();

            let value = dataString.split('=')[1];
            console.log(value);
            // fs.writeFileSync('database.txt', value);//instead of writing this we should use writefile becasue it not block code execution
            fs.writeFile('database', value, (err) => {
                if (err) {
                    res.write(err);
                    res.end();
                } else {
                    res.statusCode = 302;//(redirect status code )
                    res.setHeader("Location", "/");/*//Ye browser ko instruction deta hai:

                     “Next request / (home route) par bhejo.”

                     Lekin sirf ye line alone kuch nahi karti.
                     Ye tab kaam karti hai jab redirect status code bhi ho jo oper dya huia ha res.statusCode=302.*/
                    res.end();
                }
            })
        })

    }
    res.setHeader("Content-type", "text/html");
    res.write('<html>')
    res.write('<head><title>Response</title></head>')
    res.write('<body>Respose from server</body>')
    res.write('</html>')
    res.end();

})

server.listen(3000);