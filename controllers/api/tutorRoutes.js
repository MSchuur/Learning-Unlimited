const router = require('express').Router();
const { Tutor } = require('../../model');
const withAuth = require('../../utils/auth');

//router.get
router.get('/', async (req, res) => {
    res.render('all', {tutor});
  });
  

//   router.get('/tutor/:num', async (req, res) => {
//     return res.render('tutor', tutors[req.params.num - 1]);
//   });
  


router.get('/tutor/:id', async (req, res) => {
    try {
      const tutorData = await Tutor.findByPk(req.params.id);
      //console.log(tutorData)
    //   const tutor = dblearningUnlimited.get({ plain: true });

    //   res.render('tutor', { tutor });
      res.render('tutor', tutorData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post('/', async (req, res) => {
    try {
      const tutorData = await Tutor.create(req.body);
  
      req.session.save(() => {
        req.session.tutor_id = tutorData.id;
        req.session.logged_in = true;
  
        res.status(200).json(tutorData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/',async (req, res) => {
    try {
      const tutorData = await Tutor.create(req.body);
  
      req.session.save(() => {
        req.session.tutor_id = tutorData.id;
        req.session.logged_in = true;
  
        res.status(200).json(tutorData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
        try {
          const tutorData = await Tutor.destroy({
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
          });
      
          if (!tutorData) {
            res.status(404).json({ message: 'No tutor found with this id!' });
            return;
          }
      
          res.status(200).json(tutorData);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    



module.exports = router;