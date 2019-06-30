const dataFilePath = __dirname + "/../data/Offer-API.json";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(dataFilePath);
const DB = low(adapter);

class OffersService {
	static insert(offerData) {
		return DB.get("offers")
			.push(offerData)
			.write();
	}
}

module.exports = OffersService;
