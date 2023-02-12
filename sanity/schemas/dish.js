import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dishes',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Dish',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of Dish',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    },
  ],
})
