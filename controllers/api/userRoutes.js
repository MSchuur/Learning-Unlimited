const router = require('express').Router();
const { User, Tutor, Student, Address, Subject } = require('../../model');
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
//router.get('/:id', async (req, res) => {
  //try {
    //const userData = await User.findOne({where:{user_id:req.params.id}, include:[Student, Tutor, Address]});
    //res.status(200).json(userData);
  //}
  //catch(err) {
    //res.status(500).json(err);
  //}
//});
//router.post('/', async (req, res) => {
    //try {
      //const UserData = await User.create(req.body);
      //req.session.save(() => {
       // req.session.User_id = UserData.id;
        //req.session.logged_in = true;
       // res.status(200).json(userData);
      //});
    //} catch (err) {
     // res.status(400).json(err);
   // }
  //});
//router.put('/:id', (req, res) => {
  //User.update(req.body,{where:{user_id:req.params.id}})
  //.then(userData => res.status(200).json(userData))
  //.catch (err => res.status(400).json(err));
//});
  //router.delete('/:id', withAuth, async (req, res) => {
        //try {
          //const userData = await User.destroy({
            //where: {
              //id: req.params.id,
              //user_id: req.session.user_id,
            //},
          //});
          //if (!userData) {
            //res.status(404).json({ message: 'user ID incorrect.' });
            //return;
         // }
         //res.status(200).json(userData);
       // } catch (err) {
         // res.status(500).json(err);
       // }
      //});
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {include: [Student, Tutor, Address] });
    console.log(userData)
    const user = userData.get({ plain: true });
    res.status(200).json(user);
    //res.render('user', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res)=> {
  try{
    const userData = await User.create(req.body);
    //req.session.save(() => {
      //req.session.User_id = userDAta.id;
      //req.session.logged_in = true;
    //});
    res.status(200).json(userData);
  } catch (err) {res.status(400).json(err);}
});

// router.post('/', async (req, res) => {
//   try {
//     const newUser = await User.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.put('/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body)
    const userData = await User.update(req.body, {where:{user_id:req.params.id}});
    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;
    //  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err)
  };
});
router.delete('/:id',  async (req, res) => {
  try {
    const userData = await User.destroy({where:{user_id:req.params.id}})
    // user.destroy({
    //   where: {
    //     id: req.params.id,
    //     user_id: req.session.user_id,
    //   },
    // });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id. please try again.' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err)
  };
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports =  router;