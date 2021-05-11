import { searchUsers } from '../api/user'
test("Get rodrixkill user", async ()=>{
    //arrange
    const username = 'rodrixKill'
    //act
    const response = await searchUsers(username)
    console.log(response)
    const responseexpected = [{"nombre": "Rodrigo Villarroel", "username": "rodrixKill"}]
    //assert
    expect(response).toStrictEqual(responseexpected)
 })