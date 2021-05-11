import { getFriends } from '../api/user'
test("Send no token", async ()=>{
    //act
    const response = await getFriends(1,undefined)
    //assert
    expect(response).not.toBeDefined()
 })