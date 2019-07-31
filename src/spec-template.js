
describe('Type Describe', function () {

	it('Type fetch details', async function () {

	  browser.waitForAngular

	  await browser.get('http://localhost:TypeHere/');

	  await expect(browser.getTitle()).toEqual('TypeHere');

	});
  });

  /* 
describe('Type Describe', function ()\n		it('Type fetch details', async function () {\n 		browser.waitForAngular\n		\nawait browser.get('http://localhost:TypeHere/');\n		 await expect(browser.getTitle()).toEqual('TypeHere');\n			});\n				});
*/

/*
//let metin = "describe('Type Describe', function () {    \n	it('Type fetch details', async function () {\n			browser.waitForAngular\n	});\n	});";
*/