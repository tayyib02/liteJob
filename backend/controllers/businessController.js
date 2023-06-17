const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');
const Business = require('./../models/businessModel');
const BusinessAuth  =require('../models/businessAuthModel');

// const multerStorage = multer.memoryStorage()

// const multerFilter = (req, file, cb) => {
//   if(file.mimetype.startsWith('image')) {
//     cb(null, true)
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false)
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// exports.uploadBusinessImages = upload.fields([
//   {name: 'imageCover', maxCount: 1},
//   {name: 'images', maxCount:3},
// ]);

// exports.resizeBusinessImages = catchAsync(async(req, res, next) => {
//   if(!req.files.imageCover || !req.files.images) return next();

//   // 1) cover images
//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//   .resize(2000, 1333)
//   .toFormat('jpeg')
//   .jpeg({ quality: 90 })
//   .toFile(`public/img/tours/${req.body.imageCover}`);
//   // 2) images

//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async(file, i) => {
//     const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
//     await sharp(file.buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${filename}`);

//     req.body.images.push(filename);
//    })
//  );
//   next();
// });

exports.aliasTopRatedBusiness = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,priceDiscount,ratingsAverage,ratingsQuantity,summary';
  next();
};

exports.aliasMostPopularBusiness = (req, res, next) => {
  req.query.sort = '-ratingsQuantity,price';
  req.query.fields = 'title,price,priceDiscount,ratingsAverage,ratingsQuantity,summary';
  next();
};

exports.aliasTopLanguage = (req, res, next) => {
  req.query.sort = 'language,-ratingsQuantity,price';
  req.query.fields = 'title,price,priceDiscount,ratingsAverage,ratingsQuantity,summary';
  next();
};




exports.getAllBusiness = factory.getAll(Business);
exports.getBusiness = factory.getOne(Business, { path: 'services reviews' });
exports.createBusiness = factory.createOne(Business);
exports.updateBusiness = factory.updateOne(Business);
// exports.deleteBusiness = factory.deleteOne(Business);



exports.setBusinessUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.business) req.body.business = req.params.businessId;
  next();
};


// exports.getBusinessStats = catchAsync(async (req, res, next) => {
//   // swap the { $toUpper: '$price' } with $ratingsAverage to get different type of stats in postman. 
//   const stats = await Business.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 4.5 } }
//     },
//     {
//       $group: {
//         _id: '$price' ,
//         numBusiness: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: '$price' },
//       }
//     },
//     {
//       $sort: { avgPrice: 1 }
//     }
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats
//     }
//   });
// });

exports.getBusinessStats = catchAsync(async (req, res, next) => {
  const stats = await Business.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $unwind: '$services' // Unwind the services array to access the nested price field
    },
    {
      $group: {
        _id: null, // Group all documents together
        numBusiness: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$averagePrice' },
        minPrice: { $min: '$averagePrice' },
        maxPrice: { $max: '$averagePrice' },
      }
    },
    {
      $project: {
        _id: 0 // Exclude the _id field from the output
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});








exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2023

  const businesses = await Business.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        businessesStarted: { $sum: 1 },
        businessNames: { $push: '$title' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { businessesStarted: -1 }
    },
    {
      $limit: 12
    }
  ]);

  // The limit above is for the 12 months. As a failsafe incase the aggregation messes up.

  res.status(200).json({
    status: 'success',
    data: {
      businesses
    }
  });
});

