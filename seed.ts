
const mongoose = require('mongoose') 
import UserModel from './src/models/User';
const path = require('path');
const dotenv = require('dotenv');
// const envFile = process.env.NODE_ENV === 'production' ? 'production.env' : 'development.env';

// // Load environment variables from the file
// dotenv.config({
//   path: path.resolve(__dirname, 'env', envFile)
// });

require('dotenv').config();


const seedSuperAdmin = async () => {
  const superAdmin = await UserModel.findOne({
    role: 'super'
  });
  
  if (!superAdmin) {
    const createSuperAdmin = await UserModel.create({
      email: 'superadmin@gmail.com',
      phone: '9000000000',
      password: 'password',
      stateOfOrigin: 'AkwaIbom',
      localGovtOfOrigin: 'akwaibom',
      stateOfResidence: 'abuja',
      localGovtOfResidence: 'lubge',
      role: 'super',
    });
    console.log(createSuperAdmin, 'createSuperAdmin');
    return createSuperAdmin;
  }
  console.log(superAdmin, 'superAdmin');
  return superAdmin;
}
// const locale = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : process.env.DEBUG_MONGO_URL;
// if (!locale) {
//     console.log(process.env.MONGO_URL,"process.env.MONGO_URL", locale)
//   console.error("MongoDB URL is not defined.");
//   process.exit(1); // Exit the process if MongoDB URL is not defined
// }
console.log(process.env.MONGO_URL, "process.env.MONGO_URL")
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  try {
    await seedSuperAdmin()
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
});


