const Dataloader = require('dataloader');
// const { groupBy } = require('lodash');

// eslint-disable-next-line
const testBatch = async (ids, models) => {
	// const attribute_values = await models.AttributeValue.findAll();
	// const attribute_values_by_product_ids = groupBy(attribute_values, 'AttributeValueProductAttributes.product_id');
	// return ids.map(id => attribute_values_by_product_ids[id] || []);
};

module.exports = models => ({
	testDataloader: new Dataloader(ids => testBatch(ids, models)),
});
