import TypeForm from "../model/typeform.js";
import { hashedPassword } from "../auth/auth.service.js";
/* `TypeSchema` is defining the schema for a MongoDB collection named "typeforms". It specifies
the structure of documents that will be stored in the collection, including the fields `name`,
`createdOn`, and `updatedOn`. The `name` field is of type String and is required. The
`createdOn` and `updatedOn` fields are of type Date and have default values set to the current
date and time when a document is created. This schema will be used by Mongoose to interact
with the "typeforms" collection in the MongoDB database. */

const findTypeFormById = async (id) => {
  let typeForm = await TypeForm.findById(id);
  if (!typeForm) throw new Error("ไม่พบชื่อนี้ในระบบ");
  return user;
};

const matchQuery = (args) => {
  let where = {};
  if (args?.query) {
    where = {
      $or: [{ name: { $regex: args?.query, $options: "i" } }],
    };
  }
  return where;
};

const typeFormController = {
  typeForms: async (args) => {
    console.log("args=========>", args);
    const typeForms = await TypeForm.aggregate([
      {
        $match: matchQuery(args),
      },
      {
        $facet: {
          metadata: [
            {
              $count: "total",
            },
          ],
          results: [
            { $skip: Number(args?.skip) || 0 },
            { $limit: Number(args?.limit) || 10 },
            { $sort: { createdOn: -1 } },
          ],
        },
      },
      {
        $project: {
          total: {
            $arrayElemAt: ["$metadata.total", 0],
          },
          results: 1,
        },
      },
    ]);
    return typeForms?.length > 0 ? typeForms[0] : { total: 0, results: [] };
  },
  create: async (args, user) => {
    let typeForm = await TypeForm.findOne({ name: args?.name });
    if (typeForm) throw new Error("มีชื่อนี้อยู่ในระบบอยู่แล้ว");
    return await TypeForm.create({ ...args, createdBy: user?.id || user?._id });
  },
  update: async (args, user) => {
    let typeForm = await TypeForm.findOne({
      _id: { $ne: args?.id },
      name: args?.name,
    });
    if (typeForm) throw new Error("มีชื่อนี้อยู่ในระบบอยู่แล้ว");
    return await TypeForm.findByIdAndUpdate(args?.id, {
      name: args?.name,
      updatedOn: new Date(),
      updatedBy: user?.id || user?._id,
    });
  },
  delete: async (args) => {
    return await TypeForm.findByIdAndDelete(args?.id);
  },
};

export default typeFormController;
