const shippingMethods = [
	{
		name: "Free shipping",
		description: "Send with SendPro",
		identifier: "FREE",
		amount: 0,
		currency: "USD"
	},
	{
		name: "Fast shipping",
		description: "Send with Road Runner",
		identifier: "FAST",
		amount: 10,
		currency: "USD"
	}
];

class ShippingMethodsService {
	static list() {
		return shippingMethods;
	}
}

module.exports = ShippingMethodsService;
