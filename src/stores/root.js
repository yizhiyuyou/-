import { observable, action } from 'mobx'

class RootStore {
  @observable id = ''
  @observable post = ''
  @observable mobile = ''
  @observable realname = ''
  @observable username = ''
  @observable roles = []
  @observable loaded = false

  @action
  setUser (user) {
    Object.assign(this, user)
  }

  @action
  clearUser () {
    Object.assign(this, {
      id: '',
      post: '',
      mobile: '',
      realname: '',
      username: '',
      roles: [],
      loaded: false,
    })
  }

  @action
  setLoaded (loaded) {
    this.loaded = loaded
  }
}

export default new RootStore()

