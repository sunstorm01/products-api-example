const serverPort = process.env.PORT || 80;
const serverListenAddress = process.env.HOST || "0.0.0.0";
const apiSchemaVersion = "1.0.0";
const apiSchemaUrlPath = "/v1";

const productsService = require("./services/productsService");
const offersService = require("./services/offersService");
const shippingMethodsService = require("./services/shippingMethodsService");
const requiredContactFieldsService = require("./services/requiredContactFieldsService");
const paymentEndpointsService = require("./services/paymentEndpointsService");

const fastify = require("fastify")({
	logger: true
});

fastify.get("/", (request, reply) => {
	reply.type("text/plain").send("Example API implementation for EngageOne Converse Products API schema");
});

fastify.get(apiSchemaUrlPath + "/ping", (request, reply) => {
	reply.type("application/json").send({
		status: "ok",
		version: apiSchemaVersion,
		timestamp: Math.trunc((new Date()).getTime() / 1000)
	});
});

fastify.get(apiSchemaUrlPath + "/products", (request, reply) => {
	let page = parseInt(request.query.page, 10) || 1,
		size = parseInt(request.query.size, 10) || 10,
		name = request.query.name || null,
		totalItems = productsService.count(name),
		totalPages = Math.ceil(totalItems / size);

	const offerTitle = "Our selection of products";
	const paymentRequestTitle = "Please complete payment process";
	const countryCode = "US";
	const currencyCode = "USD";

	const result = productsService.list(page, size, name);
	reply.type("application/json").send({
		items: result,
		offerTitle: offerTitle,
		paymentRequestTitle: paymentRequestTitle,
		countryCode: countryCode,
		currency: currencyCode,
		pagination: {
			page,
			size,
			totalItems,
			totalPages
		}
	});
});

fastify.get(apiSchemaUrlPath + "/product/:productId", (request, reply) => {
	reply.type("application/json").send(
		productsService.find(request.params.productId)
	);
});

fastify.post(apiSchemaUrlPath + "/offer", (request, reply) => {
	if (request.headers["content-type"] !== "application/json") {
		reply.type("application/json").status(400).send({ status: "Expected application/json" });
		return;
	}

	offersService.insert(request.body);
	reply.type("application/json").send({ status: "ok" });
});

fastify.get(apiSchemaUrlPath + "/shippingMethods", (request, reply) => {
	reply.type("application/json").send(
		shippingMethodsService.list()
	);
});

fastify.get(apiSchemaUrlPath + "/requiredContactFields/billing", (request, reply) => {
	reply.type("application/json").send(
		requiredContactFieldsService.getBillingFields()
	);
});

fastify.get(apiSchemaUrlPath + "/requiredContactFields/shipping", (request, reply) => {
	reply.type("application/json").send(
		requiredContactFieldsService.getShippingFields()
	);
});

fastify.get(apiSchemaUrlPath + "/paymentEndpoints", (request, reply) => {
	reply.type("application/json").send(
		paymentEndpointsService.getEndpoints()
	);
});

fastify.listen(serverPort, serverListenAddress, (err, address) => {
	if (err) {
		throw err;
	}
	fastify.log.info(`server listening on ${address}`)
});
