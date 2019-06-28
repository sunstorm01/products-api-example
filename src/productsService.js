const dataFilePath = __dirname + "/data/Product-API.json";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(dataFilePath);
const DB = low(adapter);

class ProductsService {
	static find(productID) {
		return DB.get("products")
			.find({ id: productID })
			.value();
	}

	static findByName(name) {
		const result = DB.get("products");

		if (name) {
			const nameRegex = new RegExp(name, "i");
			return result.filter(product => nameRegex.test(product.name));
		}

		return result;
	}

	static list(page, size, name) {
		page -= 1;
		if (page < 0) {
			page = 0;
		}
		if (size < 0) {
			size = 10;
		}

		const startIndex = page * size;
		const endIndex = page * size + size;

		return ProductsService.findByName(name)
			.slice(startIndex, endIndex)
			.value();
	}

	static count(name) {
		return ProductsService.findByName(name)
			.size()
			.value();
	}
}

module.exports = ProductsService;
