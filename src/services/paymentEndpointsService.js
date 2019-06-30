const dataSaveEndpoint = "https://hepmcwtdtc.execute-api.us-east-1.amazonaws.com/beta";

class PaymentEndpointsService {
	static getEndpoints() {
		return {
			orderTrackingUrl: dataSaveEndpoint,
			paymentMethodUpdateUrl: dataSaveEndpoint,
			shippingMethodUpdateUrl: dataSaveEndpoint,
			shippingContactUpdateUrl: dataSaveEndpoint,
			fallbackUrl: dataSaveEndpoint
		};
	}
}

module.exports = PaymentEndpointsService;
