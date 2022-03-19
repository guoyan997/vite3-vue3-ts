export interface IUserState {
  name: string;
  age: number
}
// module信息
export default {
  namespace: true,
  state(): IUserState {
    return {
      name: 'aaaa',
      age: 18
    }
  },
  mutations: {
    changeName(state: IUserState, payload: string):void {
      state.name = payload
    }
  }
}