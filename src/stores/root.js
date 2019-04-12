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
    console.log(123123, user)
    Object.assign(this, user)
  }

  @action
  setLoaded (loaded) {
    this.loaded = loaded
  }
}

export default new RootStore()

