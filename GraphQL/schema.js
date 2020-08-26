const { graphql, buildSchema } = require('graphql');

const mockDatabase = {
	1: {
		id: 1,
		avatar: 'https://static001.geekbang.org/account/avatar/00/0f/8a/9e/94bdcdc5.jpg',
		name: '小明',
		isTop: true,
		content: '好课',
		publishDate: '今天',
		commentNum: 10,
		praiseNum: 5,
	},
	2: {
		id: 2,
		avatar: 'https://static001.geekbang.org/account/avatar/00/0f/8a/9e/94bdcdc5.jpg',
		name: '小花',
		isTop: true,
		content: '哈哈哈哈哈',
		publishDate: '昨天',
		commentNum: 10,
		praiseNum: 3,
	},
	3: {
		id: 3,
		avatar: 'https://static001.geekbang.org/account/avatar/00/0f/8a/9e/94bdcdc5.jpg',
		name: '小米',
		isTop: true,
		content: '我问问',
		publishDate: '前天',
		commentNum: 10,
		praiseNum: 0,
	},
};

const schema = buildSchema(`
  type Comment {
      id:Int,
      avatar:String,
      name:String,
      isTop:Boolean,
      content:String,
      commentNum:Int,
      praiseNum:Int,
      publishDate:String,
  }

  type Query {
    comment:[Comment]
  }
  type Mutation {
      praise(id:Int):Int
  }
`);

schema.getQueryType().getFields().comment.resolve = () => {
	return Object.keys(mockDatabase).map((key) => {
		return mockDatabase[key];
	});
};

schema.getMutationType().getFields().praise.resolve = (arg0, { id }) => {
	mockDatabase[id].praiseNum++;
	return mockDatabase[id].praiseNum;
};

module.exports = schema;
