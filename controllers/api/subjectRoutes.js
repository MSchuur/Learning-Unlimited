const router = require('express').Router();
const { Subject, Student, Tutor } = require('../../model');

module.exports = router;

router.get('/', async (req, res) => {
  try {
    const subjectData = await Subject.findAll({
      include: [{ model: Student, Tutor }],
    });
    if (!subjectData) {
      res.status(400).json({ message: "Unable to retrieve subject data."});
      return;
    }
    res.status(200).json(subjectData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

//router.get('/:id', (req, res) => {
 // Subject.findOne({where:{subject_id:req.params.id}})
//.then(subjectData => res.json(subjectData)).catch(err =>res.status(500).json(err))
//});

//router.put('/:id', (req, res) => {
  //Subject.update(req.body, {where:{subject_id:req.params.id}})
//.then(subjectData => res.json(subjectData)).catch(err =>res.json(err))
//});

//router.post('/:id', (req, res)=>{
 // Subject.create(req.body).then(subjectData =>res.json()).catch(err =>res.json(err))
//});

//router.put('/:id', (req, res) => {Subject.update(req.body,{where:{subject_id:req.params.id}}).then(subjectData =>res.json(subjectData)).catch(err =>res.json(err))
//});

//router.delete('/:id', (req, res) => {
 // Subject.destroy({where:{subject_id:req.params.id}}).then(subjectData =>res.json(subjectData)).catch(err =>res.json(err))
//});

//router.post('/', async (req, res) => {
  //try {
    //const newSubject = await Subject.create({
      //...req.body,
    //});
    //res.status(200).json(newSubject);
  //} catch (err) {
    //res.status(400).json(err);
  //}
//});

router.get('/:id', async (req, res) => {
  try {
    const subjectData = await subject.findByPk(req.params.id, {include: [Student, User, tutor] });
    console.log(subjectrData)
    const subject = subjectData.get({ plain: true });
    res.status(200).json(tutor);
    //res.render('subject', { subject });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res)=> {
  try{
    const subjectData =  await Subject.create(req.body);

    //req.session.save(() => {
      //req.sessionID.subject_id = subjectData.id;
      //req.session.logged_in = true;
   // });
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(400).json(err)
  };
});     

router.put('/id', async (req, res)=> {
  try{
    console.log(req.params.id, req.body)
      const subjectData = await Subject.update(req.body, {where:{subject_id:req.params.id}});


   // req.session.save(() => {
      //req.session.User_id = SubjectData.id;
      //req.session.logged_in = true;
    //});
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const subjectData = await Subject.destroy({where:{subject_id:req.params.id}})
    // subject.destroy({
    //   where: {
    //     id: req.params.id,
    //     subject_id: req.session.subject_id,
    //   },
    // });

    if (!subjectData) {
      res.status(404).json({ message: 'No subject found with this id.' });
      return;
    }

    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
