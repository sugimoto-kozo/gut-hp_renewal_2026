$(function () {

  function equalizeSliderTopicsHeight() {
    const $dds = $('#slider-topics dd');
    if (!$dds.length) return;
    $dds.css('height', 'auto');
    let maxH = 0;
    $dds.each(function () {
      const h = $(this).outerHeight();
      if (h > maxH) maxH = h;
    });
    $dds.css('height', maxH + 'px');
  }

  function relocateMovePhoto() {
    const $move = $('#move-photo');
    if (!$move.length) return;
    const isSp = (typeof mode !== 'undefined') ? mode : window.innerWidth < 768;
    $move.appendTo(isSp ? '#about2' : '#about1');
  }

  $('#slider-topics').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    speed: 1000,
    autoplaySpeed: 4000,
  });

  $(window).on('load resize', function () {
    equalizeSliderTopicsHeight();
    relocateMovePhoto();
  });

  $('#slider-topics').on('setPosition', equalizeSliderTopicsHeight);

  $('#case-study-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: false,
    centerMode: true,
    centerPadding: '20%',
    responsive: [
      {
        breakpoint: 768,
        settings: { centerMode: false },
      },
    ],
  });

  $('#topics-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  });

});
