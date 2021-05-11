import {formatDateISO} from '../utils/formating-functions'

test("Format ISO Date", ()=>{
   //arrange
   const customInput = '2019-04-29T00:00:00.000Z'
   //expected
   const expectedresult = '29-04-2019'
   //act
   const response = formatDateISO(customInput)
   //assert
   expect(response).toBe(expectedresult)
})