/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      id: 1,
      user_id: 1,
      body: 'I found this really interesting book, you should check it out',
      image:
        'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
      created_at: new Date(Date.now()),
    },
    {
      id: 2,
      user_id: 2,
      body: 'I found this really cool Italian place, they have the best food',
      image:
        'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
      created_at: new Date(Date.now()),
    },
    {
      id: 3,
      user_id: 2,
      body: 'No pineapples',
      image:
        'https://img.freepik.com/free-photo/pineapple-with-knife-white-cutting-board_176474-8791.jpg',
      created_at: new Date(Date.now()),
    },
    {
      id: 4,
      user_id: 4,
      body: 'I love a full English breakfast',
      image: '',
      created_at: new Date(Date.now()),
    },
    {
      id: 5,
      user_id: 4,
      body: 'I love a full English breakfast',
      image: '',
      created_at: new Date(Date.now()),
    },
    {
      id: 6,
      user_id: 2,
      body: 'I love a full English breakfast',
      image:
        'https://img.freepik.com/free-photo/pineapple-with-knife-white-cutting-board_176474-8791.jpg',
      created_at: new Date(Date.now()),
    },
    {
      id: 7,
      user_id: 3,
      body: 'I love a full English breakfast',
      image: '',
      created_at: new Date(Date.now()),
    },
    {
      id: 8,
      user_id: 1,
      body: 'I love a full English breakfast',
      image: '',
      created_at: new Date(Date.now()),
    },
  ])
}
