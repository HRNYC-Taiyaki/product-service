const csvSrubber = require('./csvScrubber.js');

csvSrubber('/Users/co-star/Documents/product.csv','/Users/co-star/Documents/clean-product.csv', 
['id',' name',' slogan',' description',' category',' default_price'], 
[['number','number'],['string','string'],['string','string'],['string','string'],['string','string'],['number','number'],], null);