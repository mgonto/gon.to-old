$(document).ready(function() {

  function doIsotope(filterQuery) {
    $('.cards-container').isotope({
      filter: filterQuery,
      // options
      itemSelector: '.grid-item',
      // getSortData: {
      //   stars: '.stargazers_count parseInt'
      // },
      // sortAscending: false,
      // sortBy: "stars"
    });
  }

  $('.filterer button').click(function(ev) {
    ev.preventDefault();

    var button = $(this);
    var filterQuery = null;
    if (button.data('type')) {
      filterQuery = '[data-type=' + button.data('type') + ']';
    }

    doIsotope(filterQuery);
  });

  doIsotope();
});
