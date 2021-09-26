const path = require('path');
module.exports = {
 // outputDir: path.resolve(__dirname,'../api/public'),
 devServer:{
        proxy:{
            '/api':{
                target: process.env.VUE_APP_API_ENDPOINT
            }
        }
    },

  transpileDependencies: ["vuetify"],
};
