const faker = require('faker');
const fs = require('fs');
var Papa = require('papaparse');

let data = fs.readFileSync('./drivers.csv', 'utf-8');

const anonymise = (data) => {
    let output = [];
    let item;
    for (let i = 1; i < data.length - 1; i++) {
        item = data[i][0].split(',');
        item.splice(0, 2, 'id', 'email'); // explicitly used id and email to anonymise. You could replace them with faker.internet.email() and faker.random.uuid()
        output.push(item);
    } 
    
    return { fields: data[0], result: output };
};

Papa.parse(data, {
	complete: function(results) {
        const { fields, result } = anonymise(results.data);

        const output = Papa.unparse({
            "fields":fields ,
            "data": result
        });

        fs.writeFileSync('output.csv', output, 'utf-8');
	}
});

