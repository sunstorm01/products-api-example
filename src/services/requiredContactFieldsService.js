const fullListOfContactFields = [
	"postalAddress",
	"name",
	"phoneticName",
	"phone",
	"email"
];

class RequiredContactFieldsService {
	static getBillingFields() {
		return fullListOfContactFields;
	}

	static getShippingFields() {
		return fullListOfContactFields;
	}
}

module.exports = RequiredContactFieldsService;
