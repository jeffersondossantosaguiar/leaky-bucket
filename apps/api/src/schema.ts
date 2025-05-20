import { mergeSchemas } from '@graphql-tools/schema';
import pixSchema from './modules/pix/schema.js';
import userSchema from './modules/user/schema.js';

const schema = mergeSchemas({
  schemas: [userSchema, pixSchema],

});

export default schema;