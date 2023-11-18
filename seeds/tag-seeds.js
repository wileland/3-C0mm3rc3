const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

const seedTags = async () => {
  try {
    await Tag.bulkCreate(tagData);
    console.log('\n----- TAGS SEEDED -----\n');
  } catch (err) {
    console.error('Error seeding tags: ', err);
  }
};

module.exports = seedTags;
