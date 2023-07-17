const mongoose = require("mongoose");
const postModel = require("./models/posts");
const ObjectId = mongoose.Types.ObjectId;

const findData = async (req, res) => {
  let {
    pageNumber = 1,
    pageSize = 10,
    searchObject = {},
    sortKey = "createdAt",
    sortOrder = 1,
  } = req.query;

  console.log("searchObject", searchObject);

  searchObject = JSON.parse(searchObject);

  const Arra = [];

  if (searchObject.userId) {
    Arra.push({ $eq: ["$user_id", new ObjectId(searchObject?.userId)] });
  }
  if (searchObject.brand) {
    Arra.push({ $eq: ["$brand", new ObjectId(searchObject?.brand)] });
  }
  if (searchObject.clothType) {
    Arra.push({ $eq: ["$clothType", new ObjectId(searchObject?.clothType)] });
  }

  console.log("Arra", Arra);
  const result =
    (
      await postModel.aggregate([
        {
          $match: {
            $expr: {
              $and: Arra,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              userId: "$user_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$userId"],
                  },
                },
              },
            ],
            as: "userData",
          },
        },
        {
          $facet: {
            data: [
              { $sort: { [sortKey]: parseInt(sortOrder) } },
              { $skip: parseInt(pageNumber - 1) * parseInt(pageSize) },
              { $limit: parseInt(pageSize) },
            ],
            totalDocuments: [{ $count: "totalDocuments" }],
          },
        },
      ])
    )[0] ?? [];

  const data = result.data;
  const totalRecords = result.totalDocuments[0]?.totalDocuments;

  return res.status(200).json({
    results: result.data,
    totalRecords,
    pageNumber: parseInt(pageNumber),
    pageSize: parseInt(pageSize),
    hasMore: totalRecords > pageNumber,
  });
};

module.exports = findData;
