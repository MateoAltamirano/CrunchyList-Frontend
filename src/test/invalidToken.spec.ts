import { getFriends } from '../api/user'
test("Send no token", async ()=>{
    //arrange

    //act
    const response = await getFriends(1,undefined)
    console.log(response)
    //assert
    expect(response).not.toBeDefined()
 })