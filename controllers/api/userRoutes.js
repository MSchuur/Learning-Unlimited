const router = require('express').Router();
const { User, Tutor, Student, Address } = require('../../model');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include:[Student, Tutor, Address]});
    if (!userData) {
      res.status(400).json({ message: "Unable to retrieve tutor data."});
      return;
    }
    res.status(200).json(userData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({where:{user_id:req.params.id}, include:[Student, Tutor, Address]});
    res.status(200).json(userData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
      const UserData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.User_id = UserData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', (req, res) => {
  User.update(req.body,{where:{user_id:req.params.id}})
  .then(userData => res.status(200).json(userData))
  .catch (err => res.status(400).json(err));
});

  router.delete('/:id', withAuth, async (req, res) => {
        try {
          const userData = await User.destroy({
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
          });
      
          if (!userData) {
            res.status(404).json({ message: 'user ID incorrect.' });
            return;
          }
      
          res.status(200).json(UserData);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    



module.exports =  router;