const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    activeHome: true
  });
};

module.exports = {
  index
};
