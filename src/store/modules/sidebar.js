
const state = {
  studentOptions: [
    {
      title: 'Mis cursos',
      icon: 'mdi-book-open-variant',
      page: { name: 'mis-cursos.index' }
    }
  ],
  adminOptions: [
    {
      title: 'Usuarios',
      icon: 'mdi-account-multiple',
      page: { name: 'users.index' }
    },
    {
      title: 'Cursos',
      icon: 'mdi-book',
      page: { name: 'cursos.index' }
    }
  ],
}

const mutations = {}

export default {
  namespaced: true,
  state,
  mutations
}