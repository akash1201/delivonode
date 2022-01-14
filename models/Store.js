import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Address = mongoose.Schema(
          {
            address1: { type: String, required: true },
            address2: { type: String, },
            city: { type: String, required: true },
            country: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
          }
        );

const StoreSchema = mongoose.Schema(
          {
            email : { type : String, required : true,  unique : true},
            password : {type : String},
            storeName: { type : String, required : true},
            phoneNo: { type: String, required: true, unique : true},
            address : Address,
            vendorType : { type : String, default : 'normal'},
            document : {type : String, required : true},
            cancelledCheque : { type : String, required : true},
            liscenseNo : {type : String, required : true,  unique : true},
            longitude : {type : String, required : true},
            latitude : { type : String, required : true}
          }
        );

        StoreSchema.methods.matchPassword = async function (enteredPassword) {
          return await bcrypt.compare(enteredPassword, this.password);
        };
        
        StoreSchema.pre("save", async function (next) {
          if (!this.isModified("password")) {
            next();
          }
        
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
        });
        

const Store = mongoose.model('Store', StoreSchema);
export default Store;