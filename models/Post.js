// const mongoose = require('mongoose');
//  const Schema = mongoose.Schema;

//  const postSchema = new Schema({
//      content: String,
//      creatorId: {
//          type: Schema.Types.ObjectId, 
//          ref: 'User'
//         },
//         postedID: {
//             type: Schema.Types.ObjectId, 
//             ref: 'User'
//         }
//  },
//  {
//     timestamps: {
//       createdAt: "created_at",
//       updatedAt: "updated_at"
//     }
//   }
//  );

//  module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
     content: String,
     creatorId: {
         type: Schema.Types.ObjectId, 
         ref: 'User'
        },
        postedId: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
 },
 {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
 );

 module.exports = mongoose.model('Post', postSchema);