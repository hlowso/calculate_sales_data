var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function add(a, b) {
	return a + b;
}

function calculateOnce(report, tax_rates) {
	sales = report.sales.reduce(add, 0);
	taxes = tax_rates[report.province] * sales;
	return [sales, taxes];
}

function calculateSalesTax(salesData, taxRates) {
	var result = {};
  for(var entry_index in salesData) {
  	data = salesData[entry_index];
  	calculation = calculateOnce(data, taxRates);
  	if(data.name in result) {
  		result[data.name].totalSales += calculation[0];
  		result[data.name].totalTaxes += calculation[1];
  	}
  	else {
  		result[data.name] = {
  			totalSales: calculation[0],
  			totalTaxes: calculation[1]
  		};
  	}
  }
  return result;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);

// # Expected Results:
// # {
// #   Telus: {
// #     totalSales: 1300
// #     totalTaxes: 144
// #   },
// #   Bombardier: {
// #     totalSales: 800,
// #     totalTaxes: 40
// #   }
// # }
