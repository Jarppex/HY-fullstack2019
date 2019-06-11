const blogs = [
  {
    title: 'Kirjoitelmia elämästä',
    author: 'Helena',
    url: 'www.helenankirjoitelmat.fi',
    likes: 3,
    user: {
      name: 'Helena Helisevä'
    }
  },
  {
    title: 'Ruoanlaitto',
    author: 'Timppa',
    url: 'www.ruoakaonhyvää.fi',
    likes: 5,
    user: {
      name: 'Timppa Tekijä'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }