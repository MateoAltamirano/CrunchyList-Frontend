export const formatDateISO=(isoDate:string)=>{
  return new Date(isoDate).toISOString().replace(/T.*/,'').split('-').reverse().join('-')
}