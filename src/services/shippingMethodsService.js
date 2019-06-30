const shippingMethods = [
	{
		label: "Free shipping",
		detail: "Send with SendPro",
		identifier: "FREE",
		amount: 0,
		currency: "USD"
	},
	{
		label: "Fast shipping",
		detail: "Send with Road Runner",
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
