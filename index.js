const fs = require('fs');
const cherrio = require('cheerio');

function readFile() {
    let text = fs.readFileSync('html.html').toString();
    return text;
}

function parseHtml(text) {
    let $ = cherrio.load(text);
    let arr = $("#searchMainGrid tr");
    let jsonObject = {
        client: []
    };
    arr.each(function (i, element) {
        let tmp = {
            "country": $(element).find("td:nth-child(4)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "disablity": $(element).find("td:nth-child(5)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "plan": $(element).find("td:nth-child(6)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "cov": $(element).find("td:nth-child(7)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "contact": $(element).find("td:nth-child(8)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "documents": $(element).find("td:nth-child(9)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, ''),
            "number": $(element).find("td:nth-child(11)").text().replace(/\s/g, '').replace(/[^\w\s]/gi, '')
        };
        jsonObject.client.push(tmp);
    });
    return jsonObject;
}


function Main() {
    let text = readFile();
    let parsedJSON = parseHtml(text);
    fs.writeFileSync("object.json", JSON.stringify(parsedJSON));

}

Main();
