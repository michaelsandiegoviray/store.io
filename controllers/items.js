const Item = require("../models/Item");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const item = await Item.find({ user: req.user.id });
      res.render("inventory.ejs", { item: item, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getServices: async(req,res)=> {
    try{
      res.render('services.ejs')
    }
    catch(err){
      console.log(err)
    }
  },
  getBenefits: async(req,res)=> {
    try{
      res.render('benefits.ejs')
    }
    catch(err){
      console.log(err)
    }
  },
  getNews: async(req,res)=> {
    try{
      res.render('news.ejs')
    }
    catch(err){
      console.log(err)
    }
  },
  
  getFeed: async (req, res) => {
    try {
      const item = await Item.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { item: item });
    } catch (err) {
      console.log(err);
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      res.render("post.ejs", { item: item, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

      createItem: async (req, res) => {
        try {
    
          await Item.create({
name:req.body.name,
location:req.body.location,
expirationDate:req.body.expirationDate,
howMuch:req.body.howMuch,
notes:req.body.notes,
user: req.user.id,});
          console.log("Post has been added!");
          res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
  likeItem: async (req, res) => {
    try {
      await Item.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/item/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      // Find post by id
      let item = await Item.findById({ _id: req.params.id });
      // Delete post from db
      await Item.remove({ _id: req.params.id });
      console.log("Deleted Item");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
