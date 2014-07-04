$(document).ready(function(){
    FastClick.attach(document.body);
    
	$(window).scroll(function(e){
    	if( $('.hero').size()>0 && $('.hero').is_on_screen() > 0 ) {
			var scrolled = $(window).scrollTop();
    		$('.hero').css({'background-position-y': -Math.abs((scrolled * 0.6)) + 'px'});
		}
	});

    $('input, select').styler();

    $('.button_loadAllAdvices').on('click', function(){
        $(this).addClass('button__loading');
        $buttonWrapper = $(this).parent('.content-lessonAdvice-load');
        $adviceBlock = $('.content-lessonAdvice-all');

        var oldAdviceHeight = $adviceBlock.css('height');
        $adviceBlock.css('height', oldAdviceHeight);
        adviceText = '<div class="content-lessonAdvice-one cf"><div class="content-lessonAdvice-pic"><img src="temp/avatar.png" alt="" /></div><div class="content-lessonAdvice-text"><div class="content-lessonAdvice-author"><strong>Виталия Чукина</strong>, учитель украинского языка Украинского гуманитарного лицея КНУ им. Т. Шевченко</div><p>Определите свой хронометраж, прогнав при включенном таймере 1-2 варианта тестов УЦ или любой другой, каких сейчас много продается на "Петровке" (учебник Беляева, сборник тестовых заданий Авраменко-Коваленко). Обратите внимание, сколько раз приходится переписывать сочинение и удается ли уложиться в его оптимальный формат, а также сколько времени уходит на перенос крестиков в бланк ответов.</p><p>На некоторые вопросы можно получить ответ, идя от противного, т.е. вычеркивая неправильные варианты.</p><p>Некоторые ученики сомневаются в себе, полагая, что не может быть подряд несколько ответов под одной буквой, или что якобы должно быть одинаковое количество ответов А, Б, В и Г. Не стоит выводить подобные закономерности.</p></div></div>';
        $adviceBlock.append(adviceText+adviceText+adviceText).css('height', 'auto');
        var newAdviceHeight = $adviceBlock.css('height');
        $adviceBlock.css('height', oldAdviceHeight).animate({'height': newAdviceHeight}, 300);
        $buttonWrapper.slideUp();
    });

    $('.main-startTimer').on('click', function(){
        var timerOn = $(this).data('timer');
        $('.main-startingTestInfo').slideUp();
    });

    $('input.test-question-radio').on('change', function(){
        $label = $(this).parents('.test-question-answer');
        $label.siblings('.test-question-answer__active').removeClass('test-question-answer__active');
        $label.addClass('test-question-answer__active');
        console.log('test');
    })

    $('a[rel=\'iload\']').fancybox();

    $('.test-question-slider').each(function(e) {
        var startValue = ($(this).data('start'))?parseInt($(this).data('start')):0;
        var maxValue = ($(this).data('max'))?parseInt($(this).data('max')):10;
        $(this).noUiSlider({
            start: startValue,
            connect: "lower",
            step: 1,
            range: {
              'min': 0,
              'max': maxValue
            }
        });
        $(this).on('slide', function(){
            $(this).siblings('.test-question-sliderAfter').find('.test-question-workBall').val(parseInt($(this).val()));
        }).trigger('slide');
    });

    $('.main-test').on('submit', function(){
        $endTestButton = $(this).find('.test-endButton');
        $endTestButton.addClass('button__loading');

        var disabled = $(this).find(':input:disabled').removeAttr('disabled');
        var serialized = $(this).serialize();
        disabled.attr('disabled','disabled');
        console.log(serialized);
        return false;
    });

});

$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right ||    viewport.bottom < bounds.top || viewport.top > bounds.bottom));
 };