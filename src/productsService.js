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
			return result.find({name: name});
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
		return this.findByName(name)
			.slice(page * size, page * size + size)
			.value();
	}

	static count(name) {
		return this.findByName(name)
			.size()
			.value();
	}
}

module.exports = ProductsService;
