const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLString = require("graphql").GraphQLString;

exports.todoType = new GraphQLObjectType({
  name: "todo",
  fields: function() {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      createdDate: {
        type: GraphQLString
      },
      modifiedDate: {
        type: GraphQLString
      }
    };
  }
});
