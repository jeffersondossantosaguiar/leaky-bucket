import { mergeSchemas } from '@graphql-tools/schema';
import pixSchema from './modules/pix/pix.schema.js';
import userSchema from './modules/user/user.schema.js';

const schema = mergeSchemas({
  schemas: [userSchema, pixSchema],

});

export default schema;