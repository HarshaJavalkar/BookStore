export function errorHandler(res){
  if(res.status=='200'){
        return null
  }
  else{
    return res;
  }
}