window.addEventListener('DOMContentLoaded', ()=> {
    const wrapper = document.querySelector('.sentences-wrapper');
    const sentencesElem = document.querySelector('.sentences');
    const btn = document.querySelector('.switch-light');
    const lights = document.querySelectorAll('.light');

    const sentences = [
        'Оля, у тебе сьогодні день народження, і я вітаю тебе!',
        'Я рада, що знаю тебе і відчуваю підтримку за тисячі кілометрів.',
        'Ти маєш в собі те, з чого варто брати приклад.',
        'Бажаю тобі завжди відчувати свою цінність і якнайменше втомлюватися',
        'Проводити час з тими, хто тобі близький.',
        'Відчувати опору навіть у складних ситуаціях.',
        'Надихатися простими речами і хорошими книгами. Обіймаю)',
    ];

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'violet'];



    function wrapLetters(sentences, colors){
        return sentences.map((item, i) => {
            const p = document.createElement('p');
            p.classList.add('sentence');
            const divs = item.split(' ').map(item => {
                const div = document.createElement('div');
                div.classList.add('sentence-word');
                const spans = item.split('').map(item => {
                    const span = document.createElement('span');
                    span.innerHTML = item;
                    span.setAttribute('data-color', colors[i]);
                    span.classList.add('sentence-letter');
                    span.addEventListener('click', turnLetterBack);
                    return span;
                });
                div.append(...spans);
                return div;
            });
            p.append(...divs);
            return p;
        });
    }


    function toggleLight(e){
        const isDark = document.body.hasAttribute('data-dark');
        if (isDark) {
            document.body.removeAttribute('data-dark');
            e.target.innerText = 'Зробити темно';
        } else {
            document.body.setAttribute('data-dark', '');
            e.target.innerText = 'Зробити світло';
        }
    }

    function turnLetterBack(e){
        if(e.target.classList.contains('colored')) {
            e.target.classList.add('picked');
            e.target.style.transform = '';
            e.target.classList.remove('colored');
            e.target.removeEventListener('click', turnLetterBack);
        }   
    }

    function scatterLetters(letters, lettersBox){
        letters.forEach(item => {

            let { x: letterX, y: letterY, width: letterWidth, height: letterHeight } = item.getBoundingClientRect();
            let { x: boxX, y: boxY, width: boxWidth, height: boxHeight } = lettersBox.getBoundingClientRect();

            const minValueX = +boxX.toFixed(2) - letterX.toFixed(2);
            const maxValueX = +boxWidth.toFixed(2) - letterWidth.toFixed(2); 
            const randomX = Math.floor(Math.random() * maxValueX) + minValueX;
            
            const minValueY = +boxY.toFixed(2) - letterY.toFixed(2);
            const maxValueY = boxHeight.toFixed(2) - letterHeight.toFixed(2);
            const randomY = Math.floor(Math.random() * maxValueY) + minValueY;
    
            item.setAttribute('data-x', Math.floor(randomX));
            item.setAttribute('data-y', Math.floor(randomY))
            item.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }

    function moveMagicLight(e){
        const color = e.target.getAttribute('data-light');
            e.target.classList.add('light_increase');
            e.target.removeEventListener('click', moveMagicLight);
            setTimeout(()=> {
                e.target.remove();
                const lightedLetters = document.querySelectorAll(`.sentence-letter[data-color="${color}"]`);
                lightedLetters.forEach(item => {
                    item.style.transform = `${item.style.transform} scale(2)`;
                    item.classList.add('colored');
                });
            }, 5000);
    }

    btn.addEventListener('click', toggleLight);

    sentencesElem.append(...wrapLetters(sentences, colors));

    scatterLetters(sentencesElem.querySelectorAll('.sentence-letter'), wrapper);

    lights.forEach(light => {
        light.addEventListener('click', moveMagicLight);
    });

});