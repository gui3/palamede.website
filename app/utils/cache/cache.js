
module.exports = (provider) => {
   // provider here is an abstraction of redis or in memory node
   // implement your logic

   const set = (key, item) => {
     provider.save(key, item);
     // return promise callback etc
   }

   const get = (key) => {
      provider.get(key);
   }

   return {
     save,
     getItem,
   }
}
